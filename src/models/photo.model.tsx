export interface IPhoto {
    created_at?: Date;
    updated_at?: Date;
    promoted_at?: Date;
    id: string;
    slug: string;
    color: string;
    width: number;
    height: number;
    urls: { full: string; regular: string; raw: string; small: string, thumb: string };
    description?: string;
    alt_description?: string;
    blur_hash: string;
    likes: number;
    liked_by_user?: boolean;
    user: {
      id: string;
      updated_at: Date;
      username: string;
      name: string;
      first_name: string;
      profile_image: {
        small: string;
      };
    };
    current_user_collections: [];
    links: {
      self: string;
      html: string;
      download: string;
      download_location: string;

    }
    sponsorship?: {
      impressions_urls: [],
      tagline: string,
      tagline_url: string;
      sponsor: {

      }
    }
    topic_submissions?: {}
  }
 