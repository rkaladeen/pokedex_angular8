import { Component } from '@angular/core';
import { HttpService } from './http.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedex';
  db_pokemon: Object;
  pokemon: Object;
  noSelection: Boolean = true;
  group: Number = 0;

  constructor(private _httpService: HttpService) { }

  ngOnInit () {
    this.getPokemonDB(this.group);
    this.getPokemon ("https://pokeapi.co/api/v2/pokemon/1/");
  }

  getPokemonDB (group) {
    this.group = group;
    let pokemonDB = this._httpService.getPokemonList(group);
    pokemonDB.subscribe(data => {
      this.db_pokemon = data;
      console.log(data);
    })
  }

  getPokemon (url) {
    let pokemon = this._httpService.getPokemon(url);
    pokemon.subscribe(data => {
      this.pokemon = data;
      console.log(data);
    })
  }

  moveGroup (num) {
    this.group = num + this.group;
    this.getPokemonDB(this.group);
  }
}
