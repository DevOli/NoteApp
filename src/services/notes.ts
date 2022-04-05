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
        if (single.categoryId) {
          const extra = await findCategoryById(single.categoryId);
          single.category = extra;
        }
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
        if (single.categoryId) {
          const extra = await findCategoryById(single.categoryId);
          single.category = extra;
        }
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

export const addNote = (note: Note) => {
  collection
    .add({
      title: note.title,
      content: note.content,
      categoryId: note.categoryId,
    })
    .then(() => {
      console.log('User added!');
    });
};

export const updateNote = async (note: Note): Promise<boolean> => {
  return collection
    .doc(`${note.id}`)
    .set({
      title: note.title,
      content: note.content,
      categoryId: note.categoryId,
    })
    .then(() => {
      return true;
    });
};

export const deleteNote = (noteId: string) => {
  collection
    .doc(noteId)
    .delete()
    .then(() => {
      console.log('User deleted!');
    });
};
