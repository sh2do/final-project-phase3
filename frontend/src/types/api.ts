export interface User {
  id: number;
  email: string;
  username?: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at?: string;
}

export interface UserLogin {
  email?: string;
  username?: string;
  password?: string;
}

export interface UserRegister extends UserLogin {
  email: string;
  password: string;
}

export interface UserUpdate {
  email?: string;
  username?: string;
  password?: string;
  is_active?: boolean;
  is_superuser?: boolean;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface Anime {
  id: number;
  title: string;
  external_id?: number;
  synopsis?: string;
  episodes?: number;
  score?: number;
  image_url?: string;
  release_year?: number;
  source?: string;
  created_at: string;
  updated_at?: string;
}

export interface AnimeCreate {
  title: string;
  external_id?: number;
  synopsis?: string;
  episodes?: number;
  score?: number;
  image_url?: string;
  release_year?: number;
  source?: string;
}

export interface AnimeUpdate {
  title?: string;
  external_id?: number;
  synopsis?: string;
  episodes?: number;
  score?: number;
  image_url?: string;
  release_year?: number;
  source?: string;
}

export interface CollectionItem {
  id: number;
  user_id: number;
  anime_id: number;
  episodes_watched: number;
  rating?: number;
  notes?: string;
  is_favorite: boolean;
  created_at: string;
  updated_at?: string;
  user?: User; // Nested user object
  anime?: Anime; // Nested anime object
}

export interface CollectionItemCreate {
  user_id: number;
  anime_id: number;
  episodes_watched?: number;
  rating?: number;
  notes?: string;
  is_favorite?: boolean;
}

export interface CollectionItemUpdate {
  episodes_watched?: number;
  rating?: number;
  notes?: string;
  is_favorite?: boolean;
}
