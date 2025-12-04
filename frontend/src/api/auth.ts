import { Token, UserLogin, UserRegister, User } from '../types/api';
import axiosInstance from './axiosInstance';

export const authService = {
  login: async (userData: UserLogin): Promise<Token> => {
    // For OAuth2PasswordRequestForm, username/password are sent as form data
    const formData = new URLSearchParams();
    if (userData.username) {
        formData.append('username', userData.username);
    } else if (userData.email) {
        formData.append('username', userData.email); // FastAPI expects 'username' field for email too
    }
    if (userData.password) {
        formData.append('password', userData.password);
    }

    const response = await axiosInstance.post<Token>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  },

  register: async (userData: UserRegister): Promise<User> => {
    const response = await axiosInstance.post<User>('/auth/register', userData);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await axiosInstance.get<User>('/users/me');
    return response.data;
  },
};
