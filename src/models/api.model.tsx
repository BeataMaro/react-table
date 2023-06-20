import { IPhoto } from './photo.model';

export interface IApi {
  total: number;
  total_pages: number;
  results: IPhoto[];
}
