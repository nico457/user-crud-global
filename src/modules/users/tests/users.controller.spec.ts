import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserQueryDto } from '../dto/user-query.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    _id: '507f1f77bcf86cd799439011',
    username: 'juan123',
    email: 'juan@mail.com',
    role: 'USER',
    profile: {
      nombre: 'Juan',
      apellido: 'Perez',
      edad: 30,
      genero: 'M',
    },
  };

  const mockUsers = [mockUser];

  const usersServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ---------------- CREATE ----------------
  describe('create', () => {
    it('Debe retornar un UserSerializer', async () => {
      usersServiceMock.create.mockResolvedValue(mockUser);
      const dto: CreateUserDto = {
    "nombre": "Sofía",
    "apellido": "Martínez",
    "edad": 29,
    "genero": "F",
    "username": "sofiamartinez",
    "email": "sofia.martinez@example.com",
    "role": "USER"
      };

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toHaveProperty('username', 'juan123');
      expect(result).toHaveProperty('email', 'juan@mail.com');
      expect(result).toHaveProperty('profile');
    });
  });

  // ---------------- FIND ALL ----------------
  describe('findAll', () => {
    it('Debe retornar un arreglo de UserSerializer', async () => {
      usersServiceMock.findAll.mockResolvedValue(mockUsers);

      const query: UserQueryDto = {
        q: 'juan',
        page: 1,
        limit: 10,
        role: 'USER',
      };

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('username');
    });
  });

  // ---------------- FIND ONE ----------------
  describe('findOne', () => {
    it('Debe retornar un UserSerializer', async () => {
      usersServiceMock.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne(mockUser._id);

      expect(service.findOne).toHaveBeenCalledWith(mockUser._id);
      expect(result).toHaveProperty('username', 'juan123');
      expect(result).toHaveProperty('email');
    });

    it('Debe lanzar NotFoundException si el usuario no existe', async () => {
      usersServiceMock.findOne.mockRejectedValue(
        new NotFoundException('Usuario no encontrado'),
      );

      await expect(controller.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ---------------- UPDATE ----------------
  describe('update', () => {
    it('Debe retornar el usuario actualizado', async () => {
      usersServiceMock.update.mockResolvedValue({
        ...mockUser,
        username: 'juanUpdated',
      });

      const dto: UpdateUserDto = {
        username: 'juanUpdated',
      };

      const result = await controller.update(mockUser._id, dto);

      expect(service.update).toHaveBeenCalledWith(mockUser._id, dto);
      expect(result).toHaveProperty('username', 'juanUpdated');
    });
  });

  // ---------------- REMOVE ----------------
  describe('remove', () => {
    it('Debe eliminar el usuario', async () => {
      usersServiceMock.remove.mockResolvedValue({
        deleted: true,
      });

      const result = await controller.remove(mockUser._id);

      expect(service.remove).toHaveBeenCalledWith(mockUser._id);
      expect(result).toEqual({ deleted: true });
    });
  });
});
