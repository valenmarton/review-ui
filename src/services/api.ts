import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/posts',
});

export const getPendingPosts = (page: number = 1, limit: number = 15) =>
  api.get<Post[]>(`/pending?page=${page}&limit=${limit}`);

export const approvePost = (id: string) => api.patch(`/approve/${id}`);

export const disapprovePost = (id: string) => api.patch(`/disapprove/${id}`);

export interface Post {
  _id: string;
  public: boolean;
  caption: string;
  createdBy: string;
  createdAt: string;
  scheduledAt?: string;
  media: string[];
  categories: string[];
  isApproved?: boolean | null | undefined;
}

