export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
export type CreateUser = Omit<User, "id">;
export type UpdateUser = Partial<CreateUser>;

export interface Post {
  id: number;
  userId: number;
  title: string;
}
export type CreatePost = Omit<Post, "id">;
export type UpdatePost = Partial<Omit<Post, "id">>;
