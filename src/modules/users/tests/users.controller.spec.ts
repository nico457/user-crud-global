import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserSerializer } from '../serializers/user.serializer';
import { User } from '../schemas/users.schemas';
import { UsersController } from '../users.controller';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto'; 

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule]
    })
    .overrideProvider(getModelToken(User.name))
    .useValue(jest.fn())
    .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('getUsers', () => {
    it('Debe retornar un arreglo de tipo UserSerializaer', async () => {
      jest.spyOn(usersService, 'findAll').mockImplementation(() =>
        Promise.resolve([{ name: 'example' }] as unknown as Promise<User[]>));

      const result = await controller.findAll();

      expect(result).toHaveLength(1)
      expect(result[0] instanceof UserSerializer).toEqual(true)
      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    })
  })

  describe('createUser', () => {
    it('Debe retornar un objeto de tipo UserSerializaer', async () => {
      jest.spyOn(usersService, 'create').mockImplementation(() =>
        Promise.resolve({ name: 'example' } as unknown as Promise<User>));

      const userCreated = await controller.create({ example: '' } as unknown as CreateUserDto);

      expect(userCreated instanceof UserSerializer).toEqual(true);
      expect(usersService.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('findUser', () => {
    it('Debe retornar un objeto de tipo UserSerializaer', async () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(() =>
        Promise.resolve({ name: 'example' } as unknown as Promise<User>));

      const user = await controller.findOne('1');

      expect(user instanceof UserSerializer).toEqual(true);
      expect(usersService.findOne).toHaveBeenCalledTimes(1);
    })
  })
});