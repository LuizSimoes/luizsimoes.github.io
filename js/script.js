const form = document.querySelector('#search_form');
const resultsOutput = document.querySelector('#results');
const queryInput = document.querySelector('#query');

form.addEventListener('submit', event => {
  event.preventDefault();
  searchPokemon();
});

function showMessage(message) {
  resultsOutput.textContent = message;
}

function showLoading() {
  resultsOutput.innerHTML = '<div class="spinner"></div>';
}

async function fetchPokemon(query) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
  if (!response.ok) {
    throw new Error('Pokémon não encontrado.');
  }
  return response.json();
}

function formatStats(stats) {
  return stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(' | ');
}

function formatPokemonResult(data) {
  const image = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
  const types = data.types.map(t => t.type.name).join(', ');
  const height = (data.height / 10).toFixed(1);
  const weight = (data.weight / 10).toFixed(1);
  const abilities = data.abilities.map(a => a.ability.name).join(', ');
  const stats = formatStats(data.stats);

  return `
    <div class="pokemon-card">
      <div class="pokemon-image-container">
        <img src="${image}" alt="${data.name}" class="pokemon-image">
      </div>
      <div class="pokemon-info">
        <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)} (#${data.id})</h3>
        <p><strong>Tipo:</strong> ${types}</p>
        <p><strong>Altura:</strong> ${height} m</p>
        <p><strong>Peso:</strong> ${weight} kg</p>
        <p><strong>Habilidades:</strong> ${abilities}</p>
        <details>
          <summary>Ver Stats</summary>
          <p>${stats}</p>
        </details>
      </div>
    </div>`;
}

async function searchPokemon() {
  const query = queryInput.value.trim();

  if (!query) {
    showMessage('Digite o nome ou número de um Pokémon.');
    return;
  }

  showLoading();

  try {
    const data = await fetchPokemon(query);
    resultsOutput.innerHTML = formatPokemonResult(data);
  } catch (error) {
    showMessage('Pokémon não encontrado. Tente outro nome ou número.');
    console.error(error);
  }
}
