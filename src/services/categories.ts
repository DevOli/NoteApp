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

export const findCategoryById = async (
  id: string,
): Promise<Category | undefined> => {
  try {
    const documentSnapshot = await collection.doc(id).get();
    const data = documentSnapshot.data() as Category;
    console.log(data);
    data.id = id;
    return data;
  } catch (error) {
    return undefined;
  }
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
      console.log('Category added!');
    });
};

export const deleteCategory = (categoryId: string) => {
  collection
    .doc(categoryId)
    .delete()
    .then(() => {
      console.log('Category deleted!');
    });
};
