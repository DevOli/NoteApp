import {createContext} from 'react';

export type AppContextProps = {
  isLoading: boolean;
  isAuthenticated?: undefined | boolean;
  login: () => void;
  logout: () => void;
  setIsLoading: (loading: boolean) => void;
};

export const AppContext = createContext<AppContextProps>({
  isLoading: false,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  setIsLoading: () => {},
});
