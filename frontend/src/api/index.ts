import axios from "axios";
import { API_BASE_URL } from "../config";
import type {
  User,
  Post,
  CreateUser,
  CreatePost,
  UpdateUser,
  UpdatePost,
} from "../types";
import { extractApiMessage } from "./api-error";

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const { data } = await http.get<User[]>("/users");
    return data;
  } catch (e) {
    throw new Error(extractApiMessage(e, "Failed to fetch users"));
  }
};

export const createUser = async (payload: CreateUser): Promise<User> => {
  try {
    const { data } = await http.post<User>("/users", payload);
    return data;
  } catch (e) {
    throw new Error(extractApiMessage(e, "Failed to create user"));
  }
};

export const updateUser = async (
  id: number,
  payload: UpdateUser,
): Promise<User> => {
  try {
    const { data } = await http.put<User>(`/users/${id}`, payload);
    return data;
  } catch (e) {
    throw new Error(extractApiMessage(e, "Failed to update user"));
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await http.delete(`/users/${id}`);
  } catch (e) {
    throw new Error(extractApiMessage(e, "Failed to delete user"));
  }
};

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const { data } = await http.get<Post[]>("/posts");
    return data;
  } catch (e) {
    throw new Error(extractApiMessage(e, "Failed to fetch posts"));
  }
};

export const createPost = async (payload: CreatePost): Promise<Post> => {
  try {
    const { data } = await http.post<Post>("/posts", payload);
    return data;
  } catch (e) {
    throw new Error(extractApiMessage(e, "Failed to create post"));
  }
};

export const updatePost = async (
  id: number,
  payload: UpdatePost,
): Promise<Post> => {
  try {
    const { data } = await http.put<Post>(`/posts/${id}`, payload);
    return data;
  } catch (e) {
    throw new Error(extractApiMessage(e, "Failed to update post"));
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await http.delete(`/posts/${id}`);
  } catch (e) {
    throw new Error(extractApiMessage(e, "Failed to delete post"));
  }
};
