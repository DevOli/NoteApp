import User from 'models/user';
import {useState, ProviderProps} from 'react';
import {cleanAll} from 'storage/secure-store';
import {AppContextProps} from './AppContext';

export const AppState = (): ProviderProps<AppContextProps> => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const value = {
    isLoading,
    isAuthenticated,
    setIsLoading,
    logout: () => {
      setIsAuthenticated(false);
      cleanAll();
    },
    login: function (userParam: User) {
      setUser(userParam);
      setIsAuthenticated(true);
    },
    user,
  };

  return {value};
};
