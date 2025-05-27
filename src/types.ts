export interface IMovie {
  id: number;
  name: string;
  genres: string[];
  image: Image;
  summary: string;
}

type Image = {
  medium: string;
};
