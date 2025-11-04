const songListEl = document.getElementById('song-list');
const nowPlayingTitleEl = document.getElementById('now-playing-title');
const nowPlayingArtistEl = document.getElementById('now-playing-artist');
const nowPlayingCoverEl = document.getElementById('now-playing-cover');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const audio = document.getElementById('audio');

let songs = [];
let currentIndex = -1;
let isPlaying = false;

// To add a new song:
// 1. Open songs.json.
// 2. Append a new object with "title", "artist", "cover", and "url" fields.
//    - "cover" should point to an image stored locally (e.g., assets/covers/my-cover.png).
//    - "url" can be a local MP3 path or a direct Google Drive download link (uc?export=download&id=...).
// 3. Save the file. The player will automatically load it next time the page is refreshed.

async function loadSongs() {
  try {
    const response = await fetch('songs.json');
    songs = await response.json();
    renderSongList();
  } catch (error) {
    songListEl.innerHTML = '<p class="song-list__error">Unable to load songs. Please check songs.json.</p>';
    console.error('Failed to load songs.json', error);
  }
}

function renderSongList() {
  songListEl.innerHTML = '';

  songs.forEach((song, index) => {
    const card = document.createElement('button');
    card.className = 'song-card';
    card.setAttribute('type', 'button');
    card.setAttribute('aria-label', `${song.title} by ${song.artist}`);

    card.innerHTML = `
      <img src="${song.cover}" alt="${song.title} cover" class="song-card__cover" />
      <div>
        <p class="song-card__title">${song.title}</p>
        <p class="song-card__artist">${song.artist}</p>
      </div>
    `;

    card.addEventListener('click', () => {
      if (currentIndex === index) {
        togglePlay();
      } else {
        loadSong(index);
        playAudio();
      }
    });

    songListEl.appendChild(card);
  });
}

function loadSong(index) {
  const song = songs[index];
  if (!song) return;

  currentIndex = index;
  audio.src = song.url;
  nowPlayingTitleEl.textContent = song.title;
  nowPlayingArtistEl.textContent = song.artist;
  nowPlayingCoverEl.src = song.cover || 'assets/covers/placeholder.png';
  nowPlayingCoverEl.alt = `${song.title} cover art`;

  progressBar.value = 0;
  currentTimeEl.textContent = '0:00';
  durationEl.textContent = '0:00';

  updateActiveSong();
}

function updateActiveSong() {
  const cards = document.querySelectorAll('.song-card');
  cards.forEach((card, index) => {
    card.classList.toggle('song-card--active', index === currentIndex);
  });
}

function togglePlay() {
  if (!audio.src) {
    if (songs.length > 0) {
      loadSong(0);
    } else {
      return;
    }
  }

  if (audio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
}

function playAudio() {
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        isPlaying = true;
        playBtn.textContent = '⏸';
      })
      .catch((error) => {
        console.error('Playback failed', error);
      });
  } else {
    isPlaying = true;
    playBtn.textContent = '⏸';
  }
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = '▶️';
}

function playNext() {
  if (songs.length === 0) return;
  const nextIndex = (currentIndex + 1) % songs.length;
  loadSong(nextIndex);
  playAudio();
}

function playPrev() {
  if (songs.length === 0) return;
  const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(prevIndex);
  playAudio();
}

function updateProgress() {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percent;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
  if (Number.isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

function seek(event) {
  if (!audio.duration) return;
  const newTime = (event.target.value / 100) * audio.duration;
  audio.currentTime = newTime;
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
progressBar.addEventListener('input', seek);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateProgress);
audio.addEventListener('ended', playNext);
audio.addEventListener('play', () => {
  isPlaying = true;
  playBtn.textContent = '⏸';
});
audio.addEventListener('pause', () => {
  isPlaying = false;
  playBtn.textContent = '▶️';
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && event.target.tagName !== 'INPUT') {
    event.preventDefault();
    togglePlay();
  }
});

loadSongs();
