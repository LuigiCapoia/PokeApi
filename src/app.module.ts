import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pokemon-db'),
    PokemonModule,
  ],
})
export class AppModule { }
