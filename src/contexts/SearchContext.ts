import { createContext, useContext } from 'react';

interface SearchContextType {
  searchInput: string;
  setSearchInput: (val: string) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
};
