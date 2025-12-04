import { CollectionItem, CollectionItemCreate, CollectionItemUpdate } from '../types/api';
import axiosInstance from './axiosInstance';

export const collectionService = {
  getUserCollection: async (userId: number, skip: number = 0, limit: number = 100): Promise<CollectionItem[]> => {
    const response = await axiosInstance.get<CollectionItem[]>(`/collection/${userId}?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  getCollectionItemById: async (itemId: number): Promise<CollectionItem> => {
    const response = await axiosInstance.get<CollectionItem>(`/collection/item/${itemId}`);
    return response.data;
  },

  createCollectionItem: async (itemData: CollectionItemCreate): Promise<CollectionItem> => {
    const response = await axiosInstance.post<CollectionItem>('/collection/', itemData);
    return response.data;
  },

  updateCollectionItem: async (itemId: number, itemData: CollectionItemUpdate): Promise<CollectionItem> => {
    const response = await axiosInstance.patch<CollectionItem>(`/collection/item/${itemId}`, itemData);
    return response.data;
  },

  deleteCollectionItem: async (itemId: number): Promise<{ message: string; id: number }> => {
    const response = await axiosInstance.delete<{ message: string; id: number }>(`/collection/item/${itemId}`);
    return response.data;
  },
};
