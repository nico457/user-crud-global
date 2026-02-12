import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schemas';
import { Profile } from './schemas/profiles.schemas';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(Profile.name)
    private readonly profilesModel: Model<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const {nombre, apellido, edad, genero, ...userData} = createUserDto;
      const { password, ...rest } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await this.userModel.create({...rest, password: hashedPassword});
      const profile = await this.profilesModel.create({
        nombre,
        apellido,
        edad,
        genero,
        user: createdUser._id,
      });
        
      createdUser.profile = profile._id as any;
      await createdUser.save();
      return this.userModel.findById(createdUser._id).populate('profile').exec();
    } catch (error) {
      if (error.code === 11000) {
        // Manejo de errores de clave duplicada
       // Identificar el campo duplicado
       const duplicateField = Object.keys(error.keyPattern)[0];
       const duplicateValue = error.keyValue[duplicateField];
        throw new BadRequestException(`El ${duplicateField} '${duplicateValue}' ya está en uso.`)

      }
      throw new BadRequestException(error.message);
  }
}

async findAll(query: UserQueryDto) {
  const {
    q,
    role,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc',
  } = query;

  const userFilter: any = {};
  if (role) userFilter.role = role;

  const skip = (page - 1) * limit;
  const sort: Record<string, 1 | -1> = {
    [sortBy]: order === 'asc' ? 1 : -1,
  };

  let users = await this.userModel
    .find(userFilter)
    .sort(sort) 
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'profile',
      match: q
        ? {
            $or: [
              { nombre: { $regex: q, $options: 'i' } },
              { apellido: { $regex: q, $options: 'i' } },
            ],
          }
        : {},
    })
    .exec();

  if (q) {
    const regex = new RegExp(q, 'i');
    users = users.filter(
      (u) =>
        regex.test(u.username) ||
        regex.test(u.email) ||
        u.profile !== null,
    );
  }

  return users;
}


  async findOne(id: string): Promise<User> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`El ID proporcionado no es válido.`);
    }
    const user = await this.userModel.findById(id).populate('profile').exec();
    if (!user) {
       throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      if (!this.isValidObjectId(id)) {
        throw new NotFoundException(`El ID proporcionado no es válido.`);
      }
    const {nombre, apellido, edad, genero, ...userData} = updateUserDto;
    const updatedUser= await this.userModel.findByIdAndUpdate(id, { $set: userData }, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (nombre || apellido || edad || genero) {
      await this.profilesModel.findOneAndUpdate(
        { user: updatedUser._id },
        {
          $set: {
            ...(nombre && { nombre }),
            ...(apellido && { apellido }),
            ...(edad && { edad }),
            ...(genero && { genero }),
          },
        },
        { new: true },
      );
    }
    return this.userModel
      .findById(updatedUser._id)
      .populate('profile');
    } catch (error) {
        if (error.code === 11000) {
          // Manejo de errores de clave duplicada
         // Identificar el campo duplicado
         const duplicateField = Object.keys(error.keyPattern)[0];
         const duplicateValue = error.keyValue[duplicateField];
          throw new BadRequestException(`El ${duplicateField} '${duplicateValue}' ya está en uso.`)
  
        }
        throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`El ID proporcionado no es válido.`);
    }
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
   }
   return user;
  }

  async findByEmail(email: string) {
  return this.userModel.findOne({ email }).exec();
}


  private isValidObjectId(id: string): boolean {
    // Utiliza el método de validación de Mongoose
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId.isValid(id);
  }
}
