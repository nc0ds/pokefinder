export function showPokemon({ description, infos, image, stats }) {
	const mainElement = document.createElement('main');
	mainElement.classList.add('pokedex');

	const leftSectionElement = document.createElement('section');
	leftSectionElement.classList.add('left');

	const middleSectionElement = document.createElement('section');
	middleSectionElement.classList.add('middle');

	const rightSectionElement = document.createElement('section');
	rightSectionElement.classList.add('right');

	const descriptionArticleElement = document.createElement('article');
	descriptionArticleElement.classList.add('description');

	const descriptionTitleElement = document.createElement('h3');
	descriptionTitleElement.textContent = 'Description:';

	const descriptionParagraphElement = document.createElement('p');
	descriptionParagraphElement.textContent = description;

	descriptionArticleElement.appendChild(descriptionTitleElement);
	descriptionArticleElement.appendChild(descriptionParagraphElement);

	const infoArticleElement = document.createElement('article');
	infoArticleElement.classList.add('info');

	const infoTitleElement = document.createElement('h3');
	infoTitleElement.textContent = 'Infos:';

	const infoListElement = document.createElement('ul');

	infoArticleElement.appendChild(infoTitleElement);

	for (let item in infos) {
		const listItem = document.createElement('li');
		listItem.textContent = `${item.replace(
			item.charAt(0),
			item.charAt(0).toUpperCase()
		)}: ${infos[item]}`;

		infoListElement.appendChild(listItem);
	}

	infoArticleElement.appendChild(infoListElement);

	leftSectionElement.appendChild(descriptionArticleElement);
	leftSectionElement.appendChild(infoArticleElement);

	const pokemonImgBoxArticleElement = document.createElement('article');
	pokemonImgBoxArticleElement.classList.add('pokemon-img-box');

	const backgroundImageElement = document.createElement('img');
	backgroundImageElement.setAttribute('src', './assets/images/pokeball.png');
	backgroundImageElement.setAttribute('alt', '');

	const foregroundImageElement = document.createElement('img');
	foregroundImageElement.setAttribute('src', image);
	foregroundImageElement.setAttribute('alt', '');

	pokemonImgBoxArticleElement.appendChild(backgroundImageElement);
	pokemonImgBoxArticleElement.appendChild(foregroundImageElement);

	middleSectionElement.appendChild(pokemonImgBoxArticleElement);

	const statsArticleElement = document.createElement('article');
	statsArticleElement.classList.add('stats');

	const statsTitleElement = document.createElement('h3');
	statsTitleElement.textContent = 'Base stats:';

	statsArticleElement.appendChild(statsTitleElement);

	for (let item in stats) {
		const maxEV = 255;

		const spanElement = document.createElement('span');
		spanElement.textContent = item.replace(
			item.charAt(0),
			item.charAt(0).toUpperCase()
		);

		const progressBarElement = document.createElement('div');
		progressBarElement.classList.add('progress-bar');
		progressBarElement.style.backgroundSize = `${(stats[item] * 100) / maxEV}%`;

		statsArticleElement.appendChild(spanElement);
		statsArticleElement.appendChild(progressBarElement);
	}

	rightSectionElement.appendChild(statsArticleElement);

	mainElement.appendChild(leftSectionElement);
	mainElement.appendChild(middleSectionElement);
	mainElement.appendChild(rightSectionElement);

	return mainElement;
}
