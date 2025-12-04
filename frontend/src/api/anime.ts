import { Anime, AnimeCreate, AnimeUpdate } from '../types/api';
import axiosInstance from './axiosInstance';

export const animeService = {
  getAnimeList: async (skip: number = 0, limit: number = 100): Promise<Anime[]> => {
    const response = await axiosInstance.get<Anime[]>(`/anime/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  getAnimeById: async (animeId: number): Promise<Anime> => {
    const response = await axiosInstance.get<Anime>(`/anime/${animeId}`);
    return response.data;
  },

  createAnime: async (animeData: AnimeCreate): Promise<Anime> => {
    const response = await axiosInstance.post<Anime>('/anime/', animeData);
    return response.data;
  },

  updateAnime: async (animeId: number, animeData: AnimeUpdate): Promise<Anime> => {
    const response = await axiosInstance.patch<Anime>(`/anime/${animeId}`, animeData);
    return response.data;
  },

  deleteAnime: async (animeId: number): Promise<{ message: string; id: number }> => {
    const response = await axiosInstance.delete<{ message: string; id: number }>(`/anime/${animeId}`);
    return response.data;
  },

  searchExternalAnime: async (query: string, page: number = 1, per_page: number = 10): Promise<Anime[]> => {
    const response = await axiosInstance.get<Anime[]>(`/anime/external/search?q=${query}&page=${page}&per_page=${per_page}`);
    return response.data;
  },

  saveExternalAnime: async (externalId: number): Promise<Anime> => {
    const response = await axiosInstance.post<Anime>(`/anime/external/save/${externalId}`);
    return response.data;
  },
};
