import { showPokemon } from './elements.mjs';

const form = document.querySelector('form');
const wrapper = document.querySelector('.wrapper');
const intro = document.querySelector('.intro');

async function getPokemon(pokemon) {
	const formattedPokemon = pokemon.trim().toLowerCase();

	try {
		const pokemonInfo = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/${formattedPokemon}`);
			xhr.send(null);

			xhr.addEventListener('readystatechange', (e) => {
				if (xhr.readyState === 4) {
					if (xhr.status >= 200 && xhr.status < 300) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject();
					}
				}
			});
		});

		const pokemonDescriptions = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(
				'GET',
				`https://pokeapi.co/api/v2/pokemon-species/${formattedPokemon}`
			);
			xhr.send(null);

			xhr.addEventListener('readystatechange', (e) => {
				if (xhr.readyState === 4) {
					if (xhr.status >= 200 && xhr.status < 300) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject();
					}
				}
			});
		});

		return {
			name: pokemonInfo.name.replace(
				pokemonInfo.name.charAt(0),
				pokemonInfo.name.charAt(0).toUpperCase()
			),
			pokedexNumber: pokemonDescriptions.pokedex_numbers[0].entry_number,
			description: pokemonDescriptions.flavor_text_entries
				.filter((item) => item.language.name === 'en')[0]
				.flavor_text.replace(/\W/gi, ' '),
			infos: {
				type:
					pokemonInfo.types.length > 1
						? pokemonInfo.types
								.map((item) =>
									item.type.name.replace(
										item.type.name.charAt(0),
										item.type.name.charAt(0).toUpperCase()
									)
								)
								.join('/')
						: pokemonInfo.types[0].type.name.replace(
								pokemonInfo.types[0].type.name.charAt(0),
								pokemonInfo.types[0].type.name.charAt(0).toUpperCase()
						  ),
				height: `${pokemonInfo.height / 10}m`,
				weight: `${pokemonInfo.weight / 10}kg`,
				generation: pokemonDescriptions.generation.name
					.split('-')[1]
					.toUpperCase(),
			},
			image: pokemonInfo.sprites.other['official-artwork'].front_default,
			stats: {
				hp: pokemonInfo.stats.filter((item) => item.stat.name === 'hp')[0]
					.base_stat,
				attack: pokemonInfo.stats.filter(
					(item) => item.stat.name === 'attack'
				)[0].base_stat,
				defense: pokemonInfo.stats.filter(
					(item) => item.stat.name === 'defense'
				)[0].base_stat,
				specialAttack: pokemonInfo.stats.filter(
					(item) => item.stat.name === 'special-attack'
				)[0].base_stat,
				specialDefense: pokemonInfo.stats.filter(
					(item) => item.stat.name === 'special-defense'
				)[0].base_stat,
				speed: pokemonInfo.stats.filter((item) => item.stat.name === 'speed')[0]
					.base_stat,
			},
		};
	} catch (err) {
		throw new Error('Pokémon does not exist');
	}
}

async function handleSubmit(e) {
	e.preventDefault();

	const search = e.target[0].value.trim().toLowerCase();

	if (search.length > 0) {
		wrapper.innerHTML = '';

		intro.textContent = 'Loading...';
		wrapper.appendChild(intro);

		try {
			wrapper.innerHTML = '';

			const pokemon = await getPokemon(search);

			const pokemonTitle = document.createElement('h2');
			pokemonTitle.textContent = `#${pokemon.pokedexNumber} ${pokemon.name}`;

			const mainElement = showPokemon({
				description: pokemon.description,
				image: pokemon.image,
				infos: pokemon.infos,
				stats: pokemon.stats,
			});

			wrapper.appendChild(pokemonTitle);

			wrapper.appendChild(mainElement);
		} catch (err) {
			intro.textContent = 'Pokémon not found';
			wrapper.appendChild(intro);
		}
	} else {
		intro.textContent = 'Type a Pokémon name or number';
	}
}

form.addEventListener('submit', handleSubmit);
