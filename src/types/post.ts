import LocalUser from './localUser';

export interface PostPreview {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: LocalUser;
  _count: {
    Reposts: number;
    likedBy: number;
    postComments: number;
    savedBy: number;
  };
  postTags: {
    id: string;
    name: string;
  }[];
  isLiked: boolean;
  isSaved: boolean;
}
