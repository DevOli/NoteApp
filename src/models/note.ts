import Category from './category';

export default interface Note {
  id: number;
  title: string;
  content: string;
  image: number;
  category: Category | null;
}
