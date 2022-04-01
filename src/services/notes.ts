import firestore from '@react-native-firebase/firestore';
import Note from 'models/note';
import {findCategoryById} from './categories';

const collection = firestore().collection('notes');

export const getAllNotes = async (): Promise<Note[]> => {
  try {
    const querySnapshot = await collection.get();
    const data = Promise.all(
      querySnapshot.docs.map(async doc => {
        const single = doc.data() as Note;
        single.id = doc.id;
        const extra = await findCategoryById(single.categoryId);
        single.category = extra;
        return single;
      }),
    );
    return data;
  } catch (error) {
    console.error('Something wrong happened in getAllNotes');
    throw new Error();
  }
};

export const subscribeToNotes = (
  handler: (notes: Note[]) => void,
): (() => void) => {
  const subscription = collection.onSnapshot(async querySnapshot => {
    const data = await Promise.all(
      querySnapshot.docs.map(async doc => {
        const single = doc.data() as Note;
        single.id = doc.id;
        const extra = await findCategoryById(single.categoryId);
        single.category = extra;
        return single;
      }),
    );

    handler(data);
  });

  return subscription;
};

export const findNoteById = async (id: string): Promise<Note | null> => {
  const documentSnapshot = await collection.doc(id).get();
  const data = documentSnapshot.data() as Note;
  return data || null;
};
