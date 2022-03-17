import Storage from 'react-native-encrypted-storage';

export const save = async (key: string, value: any) => {
  let valueString = (value || '').toString();

  if (value !== null && typeof value === 'object') {
    valueString = JSON.stringify(value);
  }

  await Storage.setItem(key, valueString);
};

export const getItem = (key: string, defaultValue = '') =>
  Storage.getItem(key).then(value => value || defaultValue);

export async function getObject<T>(key: string): Promise<T | null> {
  const value = await Storage.getItem(key);
  const stringValue = value || '';
  if (!stringValue) {
    return null;
  }
  return JSON.parse(stringValue) as T;
}

export const cleanAll = Storage.clear;
