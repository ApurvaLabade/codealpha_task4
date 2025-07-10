const songs = [
    {
      title: "Sample Song 1",
      artist: "Artist 1",
      src: "music/song1.mp3"
    },
    {
      title: "Sample Song 2",
      artist: "Artist 2",
      src: "music/song2.mp3"
    }
  ];
  
  let currentSongIndex = 0;
  const audio = document.getElementById("audio");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const progress = document.getElementById("progress");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");
  const volume = document.getElementById("volume");
  const playlist = document.getElementById("playlist");
  
  function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    audio.load();
    updatePlaylistHighlight();
  }
  
  function togglePlayPause() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
  
  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
  }
  
  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
  }
  
  audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  });
  
  progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });
  
  volume.addEventListener("input", () => {
    audio.volume = volume.value;
  });
  
  function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  
  function updatePlaylistHighlight() {
    const items = playlist.querySelectorAll("li");
    items.forEach((li, i) => {
      li.style.fontWeight = i === currentSongIndex ? "bold" : "normal";
    });
  }
  
  // Populate playlist
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(index);
      audio.play();
    });
    playlist.appendChild(li);
  });
  
  // Autoplay next
  audio.addEventListener("ended", nextSong);
  
  // Initial load
  loadSong(currentSongIndex);
  