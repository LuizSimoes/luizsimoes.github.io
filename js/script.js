function procuraMusica(artist, song) {
  return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
}

const formulario = document.querySelector('#lyrics_form');
formulario.addEventListener('submit', evt => {
  evt.preventDefault();
  doSubmit();
});

async function doSubmit() {
  const lyrics_el = document.querySelector('#lyrics');
  const artist = document.querySelector('#artist');
  const song = document.querySelector('#song');

  // para verificar se preencheu todos os campos
  if(!artist.value || !song.value) {
    lyrics_el.innerHTML = 'Preencha todas as informações';
  } else {
    lyrics_el.innerHTML = '<div class="spinner"></div>';
  }

  try {
    const lyricsresponse = await procuraMusica(artist.value, song.value);
    const data = await lyricsresponse.json();
    if (data.lyrics)
      lyrics_el.innerHTML = data.lyrics;
    else
      lyrics_el.innerHTML = data.error;
  } catch (err) {
    console.log(err);
  }
}