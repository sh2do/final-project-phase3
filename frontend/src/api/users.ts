import { User, UserUpdate } from '../types/api';
import axiosInstance from './axiosInstance';

export const userService = {
  getUsers: async (skip: number = 0, limit: number = 100): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>(`/users/?skip=${skip}&limit=${limit}`);
    return response.data;
  },

  getUserById: async (userId: number): Promise<User> => {
    const response = await axiosInstance.get<User>(`/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId: number, userData: UserUpdate): Promise<User> => {
    const response = await axiosInstance.patch<User>(`/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: number): Promise<{ message: string; id: number }> => {
    const response = await axiosInstance.delete<{ message: string; id: number }>(`/users/${userId}`);
    return response.data;
  },
};
