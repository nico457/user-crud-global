import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schemas';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
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

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    if (!this.isValidObjectId(id)) {
      throw new NotFoundException(`El ID proporcionado no es válido.`);
    }
    const user = await this.userModel.findById(id).exec();
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
    const updatedUser= await this.userModel.findByIdAndUpdate(id, { $set: updateUserDto }, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return updatedUser;
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

  private isValidObjectId(id: string): boolean {
    // Utiliza el método de validación de Mongoose
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId.isValid(id);
  }
}
