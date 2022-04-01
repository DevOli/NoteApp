import * as Users from './users';
import * as Notes from './notes';
import * as Categories from './categories';

export const getAllUsers = Users.getAllUsers;
export const findUserByEmail = Users.findUserByEmail;

export const getAllNotes = Notes.getAllNotes;
export const findNoteById = Notes.findNoteById;
export const subscribeToNotes = Notes.subscribeToNotes;

export const getAllCategories = Categories.getAllCategories;
export const findCategoryById = Categories.findCategoryById;
