import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import {getAllNotes} from 'services';
import Note from 'models/note';
import {RootState} from './store';

const notesAdapter = createEntityAdapter<Note>({
  selectId: note => note.id,
});

export const getNotes = createAsyncThunk('notes/getAllNotes', getAllNotes);

export const NotesSlide = createSlice({
  name: 'notes',
  initialState: notesAdapter.getInitialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      notesAdapter.addOne(state, action.payload);
    },
    addNotes: (state, action: PayloadAction<Note[]>) => {
      notesAdapter.setAll(state, action.payload);
    },
    clearNotes: state => {
      notesAdapter.removeAll(state);
    },
  },
  extraReducers: builder => {
    builder.addCase(getNotes.fulfilled, notesAdapter.setAll);
    builder.addCase(getNotes.rejected, error => {
      console.error(error);
    });
  },
});

export default NotesSlide.reducer;

export const {addNote, clearNotes, addNotes} = NotesSlide.actions;
// export const selectAllNotes = (state: RootState) => state.notes.value;
export const {selectAll: selectAllNotes, selectById: selectNoteById} =
  notesAdapter.getSelectors<RootState>(state => state.notes);

export const selectFilteredNotes = createSelector(
  selectAllNotes,
  (state: RootState) => state.filterReducer,
  // Output selector: receives both values
  (notes, filters) => {
    const {value} = filters;
    if (!value) {
      return notes;
    }
    return notes.filter(todo =>
      todo.title.toLowerCase().includes(value.toLowerCase()),
    );
  },
);
