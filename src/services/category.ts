import firestore from '@react-native-firebase/firestore';
import Category from 'models/category';

const collection = firestore().collection('category');

export const getAllCategories = async (): Promise<Category[]> => {
  const querySnapshot = await collection.get();
  const data = querySnapshot.docs.map(doc => {
    const single = doc.data() as Category;
    single.id = doc.id;
    return single;
  });
  return data;
};

export const findCategoryById = async (id?: string): Promise<Category> => {
  const documentSnapshot = await collection.doc(id).get();
  const data = documentSnapshot.data() as Category;
  return data;
};
