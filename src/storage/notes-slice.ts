import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

import {GetAllNotes} from 'services/notes-service';
import Note from 'models/note';
import {RootState} from './store';

export type NoteState = {
  value: Note[];
};

const initialState: NoteState = {
  value: [
    {
      id: 10,
      title: 'Titulo nota default',
      content: 'Contenido de la nota default',
      image: 1,
      category: null,
    },
  ],
};

export const getAllNotes = createAsyncThunk('notes/getAllNotes', GetAllNotes);

export const NotesSlide = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.value.push(action.payload);
    },
    getNotes: (state, action: PayloadAction<Note[]>) => {
      // state.groups = [];
      state.value.push(...action.payload);
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

export const {addNote, getNotes} = NotesSlide.actions;
export const selectAllNotes = (state: RootState) => state.notes.value;
