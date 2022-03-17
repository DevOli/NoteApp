import {useState, ProviderProps} from 'react';
import {cleanAll} from 'storage/secure-store';
import {AppContextProps} from './AppContext';
//import {cleanAll} from '~store/secure-store';

export const AppState = (): ProviderProps<AppContextProps> => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = {
    isLoading,
    isAuthenticated,
    setIsLoading,
    logout: () => {
      setIsAuthenticated(false);
      cleanAll();
    },
    login: function () {
      setIsAuthenticated(true);
    },
  };

  return {value};
};
