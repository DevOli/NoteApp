import firestore from '@react-native-firebase/firestore';
import Note from 'models/note';

const collection = firestore().collection('notes');

export const getAllNotes = async (): Promise<Note[]> => {
  const querySnapshot = await collection.get();
  const data = querySnapshot.docs.map(doc => {
    return {id: doc.id, ...doc.data()} as unknown as Note;
  });
  console.log(data);
  return data;
};

export const findNoteById = async (email: string): Promise<Note | null> => {
  const querySnapshot = await collection
    .where('email', '==', email)
    .limit(1)
    .get();
  const data = querySnapshot.docs[0].data() as Note;
  return data || null;
};
