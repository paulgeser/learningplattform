/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LearnSet, LearnSetSchema } from './schemas/learnset.schema';
import { LearnSetWord, LearnSetWordSchema } from './schemas/learnset-word.schema';
import { LearnSetType, LearnSetTypeSchema } from './schemas/learnset-type.schema';
import { LearnsetTypeDataController } from './controllers/learnset-type.controller';
import { LearnsetTypeService } from './services/learnset-type.service';
import { LearnsetStateDataController } from './controllers/learnset-state.controller';
import { LearnsetDataController } from './controllers/learnset.controller';
import { LearnsetService } from './services/learnset.service';
import { LearnsetWordService } from './services/learnset-word.service';
import { LearnsetWordDataController } from './controllers/learnset-word.controller';
import { JwtModule } from '@nestjs/jwt'
import { AppUserDataController } from './controllers/app-user.controller';
import { AppUserService } from './services/app-user.service';
import { Argon2IdService } from './services/argon2-id.service';
import { AppUser, AppUserSchema } from './schemas/app-user.schema';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { StudyCycleService } from './services/study-cycle.service';
import { StudyCycleDataController } from './controllers/study-cycle.controller';
import { StudyCycle, StudyCycleSchema } from './schemas/study-cycle.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: LearnSet.name, schema: LearnSetSchema },
      { name: LearnSetType.name, schema: LearnSetTypeSchema },
      { name: LearnSetWord.name, schema: LearnSetWordSchema },
      { name: AppUser.name, schema: AppUserSchema },
      { name: StudyCycle.name, schema: StudyCycleSchema }
    ]),
    MongooseModule.forRoot('mongodb://localhost/learningplattform'),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [
    LearnsetTypeDataController,
    LearnsetStateDataController,
    LearnsetDataController,
    LearnsetWordDataController,
    AppUserDataController,
    AuthController,
    StudyCycleDataController
  ],
  providers: [
    LearnsetTypeService,
    LearnsetService,
    LearnsetWordService,
    AppUserService,
    Argon2IdService,
    AuthService,
    StudyCycleService
  ],
})
export class AppModule { }
