import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemons')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    findAll() {
        return this.pokemonService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pokemonService.findOne(id);
    }

    @Post()
    create(@Body() createDto: CreatePokemonDto) {
        return this.pokemonService.create(createDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdatePokemonDto) {
        return this.pokemonService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pokemonService.remove(id);
    }
}
