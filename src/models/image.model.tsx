export interface IImage {
    blur_hash?: string;
    created_at?: Date;
    id?: string;
    slug?: string;
    updated_at?: Date;
    urls?: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        small_s3: string;
        thumb: string;
    }
}