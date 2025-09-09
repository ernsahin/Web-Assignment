import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../types';
import { mockPosts, nextPostId } from '../data/mock-posts';

@Injectable()
export class PostsService {
  private posts: Post[] = [...mockPosts];
  private nextId = nextPostId;

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  create(postData: Omit<Post, 'id'>): Post {
    const newPost: Post = {
      id: this.nextId++,
      ...postData,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, postData: Partial<Post>): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    const updatedPost = { ...this.posts[postIndex], ...postData };
    this.posts[postIndex] = updatedPost;
    return updatedPost;
  }

  remove(id: number): { message: string } {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    this.posts.splice(postIndex, 1);
    return { message: `Post with ID ${id} deleted successfully` };
  }
}
