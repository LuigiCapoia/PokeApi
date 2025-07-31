import { Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
    private pokemons: Pokemon[] = [
        { id: 1, name: 'Bulbasaur', type: 'Grass' },
        { id: 2, name: 'Charmander', type: 'Fire' },
    ];

    findAll(): Pokemon[] {
        return this.pokemons;
    }

    findOne(id: number): Pokemon {
        const pokemon = this.pokemons.find(p => p.id === id);
        if (!pokemon) throw new NotFoundException('Pokémon not found');
        return pokemon;
    }

    create(pokemon: Pokemon): Pokemon {
        this.pokemons.push(pokemon);
        return pokemon;
    }

    update(id: number, data: Partial<Pokemon>): Pokemon {
        const pokemon = this.findOne(id);
        Object.assign(pokemon, data);
        return pokemon;
    }

    remove(id: number): void {
        const index = this.pokemons.findIndex(p => p.id === id);
        if (index === -1) throw new NotFoundException('Pokémon not found');
        this.pokemons.splice(index, 1);
    }
}
