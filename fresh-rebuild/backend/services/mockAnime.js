// Mock anime database for instant results (no API delay)

const MOCK_ANIME_DATABASE = [
  {
    mal_id: 38480,
    title: "Demon Slayer: Kimetsu no Yaiba",
    type: "TV",
    episodes: 26,
    status: "Finished Airing",
    aired: {
      from: "2019-04-06T00:00:00+00:00",
      to: "2019-09-28T00:00:00+00:00",
    },
    score: 8.73,
    synopsis:
      "Tanjiro's family is slaughtered by demons, and his sister Nezuko is turned into a demon. To undo this curse, Tanjiro sets out on a journey to find a cure.",
    genres: [
      { mal_id: 1, type: "anime", name: "Action" },
      { mal_id: 8, type: "anime", name: "Adventure" },
      { mal_id: 6, type: "anime", name: "Fantasy" },
    ],
    images: {
      jpg: {
        image_url: "https://api.jikan.moe/v4/images/anime/38480.jpg",
        small_image_url: "https://api.jikan.moe/v4/images/anime/38480_sml.jpg",
        large_image_url:
          "https://api.jikan.moe/v4/images/anime/38480_large.jpg",
      },
    },
  },
  {
    mal_id: 16498,
    title: "Attack on Titan",
    type: "TV",
    episodes: 25,
    status: "Finished Airing",
    aired: {
      from: "2013-04-07T00:00:00+00:00",
      to: "2013-09-28T00:00:00+00:00",
    },
    score: 8.51,
    synopsis:
      "In a world where giant humanoid Titans devour human flesh, the last remnants of humanity live behind enormous concrete walls.",
    genres: [
      { mal_id: 1, type: "anime", name: "Action" },
      { mal_id: 8, type: "anime", name: "Adventure" },
      { mal_id: 32, type: "anime", name: "Mystery" },
    ],
    images: {
      jpg: {
        image_url: "https://api.jikan.moe/v4/images/anime/16498.jpg",
        small_image_url: "https://api.jikan.moe/v4/images/anime/16498_sml.jpg",
        large_image_url:
          "https://api.jikan.moe/v4/images/anime/16498_large.jpg",
      },
    },
  },
  {
    mal_id: 20,
    title: "Naruto",
    type: "TV",
    episodes: 220,
    status: "Finished Airing",
    aired: {
      from: "2002-10-03T00:00:00+00:00",
      to: "2007-02-08T00:00:00+00:00",
    },
    score: 7.92,
    synopsis:
      "Naruto Uzumaki, a hyperactive ninja-in-training, constantly searches for recognition from his peers in the village of Konoha.",
    genres: [
      { mal_id: 1, type: "anime", name: "Action" },
      { mal_id: 8, type: "anime", name: "Adventure" },
      { mal_id: 30, type: "anime", name: "School" },
    ],
    images: {
      jpg: {
        image_url: "https://api.jikan.moe/v4/images/anime/20.jpg",
        small_image_url: "https://api.jikan.moe/v4/images/anime/20_sml.jpg",
        large_image_url: "https://api.jikan.moe/v4/images/anime/20_large.jpg",
      },
    },
  },
  {
    mal_id: 21,
    title: "One Piece",
    type: "TV",
    episodes: 1000,
    status: "Currently Airing",
    aired: { from: "1999-10-20T00:00:00+00:00", to: null },
    score: 8.5,
    synopsis:
      "As a child, Monkey D. Luffy dreamed of becoming the greatest fisherman. But a misunderstanding led him to want to become the greatest pirate instead!",
    genres: [
      { mal_id: 1, type: "anime", name: "Action" },
      { mal_id: 8, type: "anime", name: "Adventure" },
      { mal_id: 2, type: "anime", name: "Comedy" },
    ],
    images: {
      jpg: {
        image_url: "https://api.jikan.moe/v4/images/anime/21.jpg",
        small_image_url: "https://api.jikan.moe/v4/images/anime/21_sml.jpg",
        large_image_url: "https://api.jikan.moe/v4/images/anime/21_large.jpg",
      },
    },
  },
  {
    mal_id: 37989,
    title: "Jujutsu Kaisen",
    type: "TV",
    episodes: 24,
    status: "Finished Airing",
    aired: {
      from: "2020-10-03T00:00:00+00:00",
      to: "2021-03-27T00:00:00+00:00",
    },
    score: 8.47,
    synopsis:
      "A boy swallows a cursed finger and joins a secret organization of jujutsu sorcerers to find the rest of the body of a demon king.",
    genres: [
      { mal_id: 1, type: "anime", name: "Action" },
      { mal_id: 6, type: "anime", name: "Fantasy" },
      { mal_id: 7, type: "anime", name: "Supernatural" },
    ],
    images: {
      jpg: {
        image_url: "https://api.jikan.moe/v4/images/anime/37989.jpg",
        small_image_url: "https://api.jikan.moe/v4/images/anime/37989_sml.jpg",
        large_image_url:
          "https://api.jikan.moe/v4/images/anime/37989_large.jpg",
      },
    },
  },
  {
    mal_id: 1535,
    title: "Death Note",
    type: "TV",
    episodes: 37,
    status: "Finished Airing",
    aired: {
      from: "2006-10-03T00:00:00+00:00",
      to: "2007-06-26T00:00:00+00:00",
    },
    score: 8.62,
    synopsis:
      "An intelligent high school student goes on a secret crusade to eliminate criminals using a supernatural power that allows him to kill anyone.",
    genres: [
      { mal_id: 4, type: "anime", name: "Psychological" },
      { mal_id: 7, type: "anime", name: "Supernatural" },
      { mal_id: 32, type: "anime", name: "Mystery" },
    ],
    images: {
      jpg: {
        image_url: "https://api.jikan.moe/v4/images/anime/1535.jpg",
        small_image_url: "https://api.jikan.moe/v4/images/anime/1535_sml.jpg",
        large_image_url: "https://api.jikan.moe/v4/images/anime/1535_large.jpg",
      },
    },
  },
  {
    mal_id: 9253,
    title: "Steins;Gate",
    type: "TV",
    episodes: 24,
    status: "Finished Airing",
    aired: {
      from: "2011-04-09T00:00:00+00:00",
      to: "2011-09-14T00:00:00+00:00",
    },
    score: 8.73,
    synopsis:
      "Okabe Rintaro is a mad scientist who discovers a method to send messages to the past through a microwave oven.",
    genres: [
      { mal_id: 7, type: "anime", name: "Supernatural" },
      { mal_id: 6, type: "anime", name: "Fantasy" },
      { mal_id: 4, type: "anime", name: "Psychological" },
    ],
    images: {
      jpg: {
        image_url: "https://api.jikan.moe/v4/images/anime/9253.jpg",
        small_image_url: "https://api.jikan.moe/v4/images/anime/9253_sml.jpg",
        large_image_url: "https://api.jikan.moe/v4/images/anime/9253_large.jpg",
      },
    },
  },
  {
    mal_id: 5114,
    title: "Fullmetal Alchemist: Brotherhood",
    type: "TV",
    episodes: 64,
    status: "Finished Airing",
    aired: {
      from: "2009-04-05T00:00:00+00:00",
      to: "2010-07-04T00:00:00+00:00",
    },
    score: 9.16,
    synopsis:
      "Two brothers use alchemy to try to resurrect their dead mother, but the transmutation goes wrong, and they become outcasts.",
    genres: [
      { mal_id: 1, type: "anime", name: "Action" },
      { mal_id: 8, type: "anime", name: "Adventure" },
      { mal_id: 6, type: "anime", name: "Fantasy" },
    ],
    images: {
      jpg: {
        image_url: "https://api.jikan.moe/v4/images/anime/5114.jpg",
        small_image_url: "https://api.jikan.moe/v4/images/anime/5114_sml.jpg",
        large_image_url: "https://api.jikan.moe/v4/images/anime/5114_large.jpg",
      },
    },
  },
  {
    mal_id: 6594,
    title: "Bleach",
    type: "TV",
    episodes: 366,
    status: "Finished Airing",
    aired: {
      from: "2004-10-05T00:00:00+00:00",
      to: "2012-12-13T00:00:00+00:00",
    },
    score: 7.71,
    synopsis:
      "Ichigo Kurosaki is a teenager capable of seeing ghosts. He is surprised to meet Rukia, a Soul Reaper assigned to protect his town.",
    genres: [
      { mal_id: 1, type: "anime", name: "Action" },
      { mal_id: 8, type: "anime", name: "Adventure" },
      { mal_id: 7, type: "anime", name: "Supernatural" },
    ],
    images: {
      jpg: {
        image_url: "https://api.jikan.moe/v4/images/anime/6594.jpg",
        small_image_url: "https://api.jikan.moe/v4/images/anime/6594_sml.jpg",
        large_image_url: "https://api.jikan.moe/v4/images/anime/6594_large.jpg",
      },
    },
  },
  {
    mal_id: 28977,
    title: "Sword Art Online",
    type: "TV",
    episodes: 25,
    status: "Finished Airing",
    aired: {
      from: "2012-07-07T00:00:00+00:00",
      to: "2012-12-22T00:00:00+00:00",
    },
    score: 7.44,
    synopsis:
      "In the year 2022, gamers are thrilled by the announcement of an upcoming virtual reality MMORPG called Sword Art Online.",
    genres: [
      { mal_id: 1, type: "anime", name: "Action" },
      { mal_id: 8, type: "anime", name: "Adventure" },
      { mal_id: 6, type: "anime", name: "Fantasy" },
    ],
    images: {
      jpg: {
        image_url: "https://api.jikan.moe/v4/images/anime/28977.jpg",
        small_image_url: "https://api.jikan.moe/v4/images/anime/28977_sml.jpg",
        large_image_url:
          "https://api.jikan.moe/v4/images/anime/28977_large.jpg",
      },
    },
  },
];

// Search mock anime database
function searchMockAnime(query) {
  if (!query) return [];

  const q = query.toLowerCase();
  return MOCK_ANIME_DATABASE.filter(
    (anime) =>
      anime.title.toLowerCase().includes(q) ||
      anime.synopsis.toLowerCase().includes(q) ||
      anime.genres.some((g) => g.name.toLowerCase().includes(q))
  ).slice(0, 25);
}

// Get mock anime by ID
function getMockAnimeById(id) {
  return MOCK_ANIME_DATABASE.find((anime) => anime.mal_id === parseInt(id));
}

module.exports = {
  MOCK_ANIME_DATABASE,
  searchMockAnime,
  getMockAnimeById,
};
