import { IImage } from "./image.model";

export interface IUser {
accepted_tos?: boolean;
bio: string; 
first_name: string;
for_hire?: boolean;
id: string;
numeric_id?: number;
photos: IImage[];
instagram_username?: string
last_name?: string;
links: {
    followers?: string;
    following?: string;
    html: string, 
    likes: string, 
    photos: string, 
    portfolio: string,
    self: string, 
};
location: string;
name: string;
portfolio_url: string;
profile_image?: 
{
    small: string;
    medium: string;
    large: string;
}
social?: {
    instagram_username?: string, 
    portfolio_url?: string, 
    twitter_username?: string, 
    paypal_email?: string
};
total_collections: number; 
total_likes: number;
total_photos: number;
twitter_username?: string;
updated_at?: Date;
username: string;
}