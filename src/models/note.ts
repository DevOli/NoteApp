import Category from './category';
import User from './user';

export default interface Note {
  id: string;
  title: string;
  content: string;
  category?: Category;
  categoryId?: string;
  user?: User;
  userId?: string;
}
