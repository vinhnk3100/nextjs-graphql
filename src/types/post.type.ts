export type PostProps = {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  datePost: string;
  username: string;
  userId: number;
  postLike: [];
  postDislike: [];
  postApproval: boolean;
};