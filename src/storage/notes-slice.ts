import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

//import {GetAllNotes} from 'services/notes-service';
import {getAllNotes} from 'services';
import Note from 'models/note';
import {RootState} from './store';

export type NoteState = {
  value: Note[];
};

const notesAdapter = createEntityAdapter<Note>({
  selectId: note => note.id,
});

// const initialState: NoteState = {
//   value: [
//     {
//       id: 10,
//       title: 'Titulo nota default',
//       content: 'Contenido de la nota default',
//       category: null,
//     },
//   ],
// };

export const getNotes = createAsyncThunk('notes/getAllNotes', getAllNotes);

export const NotesSlide = createSlice({
  name: 'notes',
  initialState: notesAdapter.getInitialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      //state.value.push(action.payload);
      notesAdapter.addOne(state, action.payload);
    },
    // getNotes: (state, action: PayloadAction<Note[]>) => {
    //   state.value.push(...action.payload);
    // },
    addNotes: (state, action: PayloadAction<Note[]>) => {
      // myGroupsAdapter.removeAll();
      notesAdapter.setAll(state, action.payload);
    },
    clearNotes: state => {
      //state.value = [];
      notesAdapter.removeAll(state);
    },
  },
  extraReducers: builder => {
    // builder.addCase(getAllNotes.fulfilled, (state, action) => {
    //   state.value = [...state.value, ...action.payload];
    // });
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
