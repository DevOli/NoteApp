import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

import {GetAllNotes} from 'services/notes-service';
import Note from 'models/note';

export type NoteState = {
  value: Note[];
};

const initialState: NoteState = {
  value: [
    {
      id: 10,
      title: 'Titulo 10',
      content: 'Contenido ficha 10',
      image: 1,
      category: null,
    },
  ],
};

// export const getAllNotes = createAsyncThunk(
//   'groups/getAllGroupsApi',
//   GetAllGroups,
// );

export const NotesSlide = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      // state.groups = [];
      state.value.push(action.payload);
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(getAllGroups.fulfilled, (state, action) => {
  //     state.groups = [...state.groups, ...action.payload];
  //   });
  //   builder.addCase(getAllGroups.rejected, state => {
  //     console.error('Error');
  //   });
  // },
});

export default NotesSlide.reducer;

export const {addNote} = NotesSlide.actions;
