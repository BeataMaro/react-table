export interface IPhoto {
    created_at?: Date;
    updated_at?: Date;
    promoted_at?: Date;
    id: string;
    width: number;
    height: number;
    urls: { full: string; regular: string; raw: string; small: string };
    description?: string;
    alt_description?: string;
    likes: number;
    user: {
      username: string;
      name: string;
      profile_image: {
        small: string;
      };
    };
  }
  