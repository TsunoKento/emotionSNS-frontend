export type Post = {
  postId: number;
  content: string;
  postImage?: string;
  publishedAt: Date;
  emotionId: number;
  userId: string;
  name: string;
  userImage: string;
  likeFlag: boolean;
  likeCount: number;
};
