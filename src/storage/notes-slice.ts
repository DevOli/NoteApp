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
      state.value.push(...action.payload);
    },
    clearNotes: state => {
      state.value = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.value = [...state.value, ...action.payload];
    });
    builder.addCase(getAllNotes.rejected, () => {
      console.error('Errors');
    });
  },
});

export default NotesSlide.reducer;

export const {addNote, getNotes, clearNotes} = NotesSlide.actions;
export const selectAllNotes = (state: RootState) => state.notes.value;
