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

export const findCategoryById = async (id: string): Promise<Category> => {
  const documentSnapshot = await collection.doc(id).get();
  const data = documentSnapshot.data() as Category;
  data.id = id;
  return data;
};

export const subscribeToCategories = (
  handler: (notes: Category[]) => void,
): (() => void) => {
  const subscription = collection.onSnapshot(async querySnapshot => {
    const data = await Promise.all(
      querySnapshot.docs.map(async doc => {
        const single = doc.data() as Category;
        single.id = doc.id;
        return single;
      }),
    );

    handler(data);
  });

  return subscription;
};

export const addCategory = (category: Category) => {
  collection
    .add({
      name: category.name,
      color: category.color,
    })
    .then(() => {
      console.log('User added!');
    });
};
