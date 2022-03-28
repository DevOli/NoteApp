import Note from 'models/note';

export const GetAllNotes = (): Promise<Note[]> => {
  const notes: Note[] = [
    {
      id: 1,
      title: 'My work',
      image: require('assets/react-logo.png'),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      category: null,
    },
    {
      id: 2,
      title: 'Shopping List',
      image: require('assets/react-logo.png'),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      category: null,
    },
    {
      id: 3,
      title: 'Links',
      image: require('assets/react-logo.png'),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      category: null,
    },
    {
      id: 4,
      title: 'Homework',
      image: require('assets/react-logo.png'),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      category: null,
    },
  ];

  return Promise.resolve(notes);
};
