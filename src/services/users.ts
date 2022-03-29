import firestore from '@react-native-firebase/firestore';
import User from 'models/user';

const usersCollection = firestore().collection('users');

export const getAllUsers = async (): Promise<User[]> => {
  const querySnapshot = await usersCollection.get();
  const allUsers = querySnapshot.docs.map(doc => doc.data() as User);
  return allUsers;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const querySnapshot = await usersCollection
      .where('email', '==', email)
      .limit(1)
      .get();
    const foundUser = querySnapshot.docs[0].data() as User;
    return foundUser || null;
  } catch (error) {
    return null;
  }
};
