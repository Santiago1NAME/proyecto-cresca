import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './in/http/create-user/create-user.controller';
import { FindUsersController } from './in/http/find-users/find-users.controller';
import { FindUserByIdController } from './in/http/find-user-by-id/find-user-by-id.controller';
import { UpdateUserByIdController } from './in/http/update-user-by-id/update-user-by-id.controller';
import { CreateUserUseCase } from '../application/use-case/create-user';
import { FindUsersTableUseCase } from '../application/use-case/find-users-table';
import { FindUserByIdUseCase } from '../application/use-case/find-user-by-id';
import { UpdateUserByIdUseCase } from '../application/use-case/update-user-by-id';
import { UserRepository } from '../domain/repository/user.repository';
import { PasswordHasherRepository } from '../domain/repository/password-hasher.repository';
import { UserTypeOrmRepository } from './out/persistence/typeorm/repositories/user.typeorm.repository';
import { BcryptPasswordHasher } from './out/crypto/bcrypt-password-hasher';
import { UserEntity } from './out/persistence/typeorm/entities/user.entity';
import { RoleEntity } from './out/persistence/typeorm/entities/role.entity';
import { UserRoleEntity } from './out/persistence/typeorm/entities/user-role.entity';
import { DeleteUserUseCase } from '../application/use-case/delete-user';
import { DeleteUserByIdController } from './in/http/delete-user-by-id/delete-user-by-id.controller';
import { UpdateUserRolesController } from './in/http/update-user-roles/update-user-roles.controller';
import { UpdateUserRolesUseCase } from '../application/use-case/update-user-roles';
import { RolesUserPort } from 'src/core/roles/roles-user.port';
import { RolesUserTypeOrmAdapter } from './out/roles/roles-user-typeorm.adapter';

const userProviders = [
  {
    provide: PasswordHasherRepository,
    useClass: BcryptPasswordHasher,
  },
  {
    provide: UserRepository,
    useClass: UserTypeOrmRepository,
  },
];

const useCases = [
  CreateUserUseCase,
  FindUsersTableUseCase,
  FindUserByIdUseCase,
  UpdateUserByIdUseCase,
  DeleteUserUseCase,
  UpdateUserRolesUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, UserRoleEntity]),
  ],
  controllers: [
    CreateUserController,
    FindUsersController,
    FindUserByIdController,
    UpdateUserByIdController,
    DeleteUserByIdController,
    UpdateUserRolesController,
  ],
  providers: [
    ...useCases,
    ...userProviders,
    {
      provide: RolesUserPort,
      useClass: RolesUserTypeOrmAdapter,
    },
  ],
  exports: [
    ...useCases,
    UserRepository,
    RolesUserPort,
  ],
})
export class UsersModule { }
