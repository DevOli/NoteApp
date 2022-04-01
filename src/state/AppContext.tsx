import User from 'models/user';
import {createContext} from 'react';

export type AppContextProps = {
  isLoading: boolean;
  isAuthenticated?: undefined | boolean;
  login: (user: User) => void;
  logout: () => void;
  setIsLoading: (loading: boolean) => void;
  user: User | null;
};

export const AppContext = createContext<AppContextProps>({
  isLoading: false,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  setIsLoading: () => {},
  user: null,
});
