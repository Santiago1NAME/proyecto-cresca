import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UsersModule } from './modules/users/infrastructure/users.module';
import { AuthModule } from './modules/auth/infrastructure/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { ReservaModule } from './modules/reserva/reserva.module';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    AuthModule,
    RolesModule,
    ReservaModule,
  ],
})
export class AppModule { }
