import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
    constructor(
        @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
    ) { }

    async findAll(): Promise<Pokemon[]> {
        return this.pokemonModel.find().exec();
    }

    async findOne(id: string): Promise<Pokemon> {
        const pokemon = await this.pokemonModel.findById(id).exec();
        if (!pokemon) throw new NotFoundException('Pokémon não encontrado');
        return pokemon;
    }

    async create(dto: CreatePokemonDto): Promise<Pokemon> {
        const created = new this.pokemonModel(dto);
        return created.save();
    }

    async update(id: string, dto: UpdatePokemonDto): Promise<Pokemon> {
        const updated = await this.pokemonModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!updated) throw new NotFoundException('Pokémon não encontrado');
        return updated;
    }

    async remove(id: string): Promise<void> {
        const result = await this.pokemonModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Pokémon não encontrado');
    }
}
