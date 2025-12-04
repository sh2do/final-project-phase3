"""
Small mock dataset used by the mock API router.
"""

SAMPLE_ANIME = [
    {
        "id": 1,
        "title": {"english": "Naruto", "romaji": "Naruto"},
        "description": "A young ninja who seeks recognition and dreams of becoming Hokage.",
        "episodes": 220,
        "seasonYear": 2002,
        "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20-1.jpg"},
    },
    {
        "id": 2,
        "title": {"english": "Death Note", "romaji": "Death Note"},
        "description": "A high school student discovers a supernatural notebook that grants him the power to kill.",
        "episodes": 37,
        "seasonYear": 2006,
        "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-1.jpg"},
    },
    {
        "id": 3,
        "title": {"english": "Fullmetal Alchemist: Brotherhood", "romaji": "Hagane no Renkinjutsushi: Fullmetal Alchemist"},
        "description": "Two brothers search for the Philosopher's Stone after an attempt to revive their mother goes wrong.",
        "episodes": 64,
        "seasonYear": 2009,
        "coverImage": {"large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-1.jpg"},
    },
]
