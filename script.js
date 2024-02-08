const songData = [
  {
      name: "Husn",
      artist: "Anuv jain",
      img:"images/husn.jpg",
      src: "song4"
  },
  {
      name: "Pehle bhi mai",
      artist: "Vishal mishra",
      img:"images/animal.jpg",
      src: "song2"
  },
  {
      name: "Lutt putt gaya",
      artist: "Arjit singh",
      img:"images/dunki.jpg",
      src: "song3"
  },
  {
      name: "Tera ghata",
      artist: "Gajendra-varma",
      img:"images/tera-ghata.jpg",
      src: "song9"
  },
  {
      name: "Papa meri jaan",
      artist: "Sonu nigam",
      img:"images/papamerijaan.jpg",
      src: "song10"
  },
  {
      name: "Kahani suno",
      artist: "Kaifi khalil",
      img:"images/kahanisuno.jpg",
      src: "song8"
  },
  {
      name: "Tera zikr",
      artist: "Darshan raval",
      img:"images/tera-zikr.jpg",
      src: "song1"
    },
  {
    name:"Railin oligal",
    artist:"Pradeep kumar",
    img:"images/Railin-OligalBlueStar.jpg",
    src:"song5"
  },
  {
    name:"kavvala",
    artist:"Anirudh ravichandar",
    img:"images/kavala.jpg",
    src:"song12"
  },
  {
    name:"Billa Thme",
    artist:"Yuvan shankar raja",
    img:"images/Billa-Theme.jpg",
    src:"song13"
  },
  {
    name:"Hukum thalaivar",
    artist:"Anirudh ravichandar",
    img:"images/hukum-thalaivar.jpg",
    src:"song14"
  },
  {
    name:"Idhazhin Oram",
    artist:"Ashok, Anirudh",
    img:"images/3(moonu).webp",
    src:"song18"
  },

  {
    name:"KGF Theme",
    artist:"Ravi basur",
    img:"images/Kgf-chapter-1-2018.webp",
    src:"song15"
  },
  {
    name:"KGF Dheera Dheera",
    artist:"Ravi basur",
    img:"images/Kgf-chapter-1-2018.webp",
    src:"song11"
  },
  {
    name:"KGF Thanani Thane",
    artist:"Ravi basur",
    img:"images/Kgf-Thanthane-Thane.jpg",
    src:"song19"
  },
  {
    name:"Badass",
    artist:"Anirudh ravichandar",
    img:"images/leo-tamil-2023.webp",
    src:"song20"
  },
  {
    name:"Glimpse of Harold Das",
    artist:"Anirudh ravichandar",
    img:"images/leo-tamil-2023.webp",
    src:"song21"
  },
  {
    name:"Kangal Edho",
    artist:"G.V Prakash",
    img:"images/chithha-tamil-2023.webp",
    src:"song22"
  },
  {
    name:"Ore Kanaa",
    artist:"Siddhu kumar",
    img:"images/joe-tamil-2023.webp",
    src:"song23"
  }
];

const container = document.querySelector(".container")
const songName = document.querySelector(".song-name")
const songArtist = document.querySelector(".song-artist")
const cover = document.querySelector(".cover")
const playPauseBtn = document.querySelector(".play-pause")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const audio = document.querySelector(".audio")
const songTime = document.querySelector(".song-time")
const songProgress = document.querySelector(".song-progress")
const images = document.querySelector(".images")
// const coverArtist = document.querySelector(".cover img:nth-child(1)")
// const coverName = document.querySelector(".cover img:nth-child(2)")

let songIndex = 0;

window.addEventListener("load", () => {
  loadSong(songIndex);
});

const loadSong = (index) => {
  // coverName.textContent = songData[index].name;
  // coverArtist.textContent = songData[index].artist;
  songName.textContent = songData[index].name;
  songArtist.textContent = songData[index].artist;
  audio.src = `Songs/${songData[index].src}.mp3`;
  images.src = `${songData[index].img}`;
  console.log(songData[index].img)
};

const playSong = () => {
  container.classList.add("pause");
  cover.classList.add("rotate")
  playPauseBtn.firstElementChild.className = "fa fa-pause"; 
  audio.play();
}

const pauseSong = () => {
  container.classList.remove("pause");
  cover.classList.remove("rotate")
  playPauseBtn.firstElementChild.className = "fa fa-play";
  audio.pause();
}

playPauseBtn.addEventListener("click", () => {
  console.log("Button clicked");
  if (container.classList.contains("pause")) {
    pauseSong();
  } else {
    playSong();
  }
});

const prevSongPlay = () => {
  songIndex--;
  if (songIndex < 0) {
      songIndex = songData.length - 1;
  }
   
  loadSong(songIndex);
  playSong();
};

const nextSongPlay = () => {
  songIndex++;
  if (songIndex > songData.length - 1 ) {
      songIndex = 0;
  }
   
  loadSong(songIndex);
  playSong();
};

prevBtn.addEventListener("click", prevSongPlay);
nextBtn.addEventListener("click", nextSongPlay);


audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let currentTimeWidth = (currentTime / duration) * 100;
  songProgress.style.width = `${currentTimeWidth}%`;

  let songCurrentTime = document.querySelector(".time span:nth-child(1)");
  let songDuration = document.querySelector(".time span:nth-child(2)");

  audio.addEventListener("loadeddata", () => {
    let audioDuration = audio.duration;
    let totalMinutes = Math.floor(audioDuration / 60);
    let totalSeconds = Math.floor(audioDuration % 60);

    if (totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }

    songDuration.textContent = `${totalMinutes}:${totalSeconds}`;
  });

  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
});

songTime.addEventListener("click", (e) => {
  let progressWidth = songTime.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = audio.duration;
  audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;

  playSong();
});

audio.addEventListener("ended", nextSongPlay);