
import { ContentContainer } from "../components/ContentContainer/ContentContainer"
import { Hero } from "../components/Hero/Hero";
import { useSearch } from "../contexts/SearchContext";

export const MainPage: React.FC = () => {
  const { searchInput } = useSearch();

  return (
    <>
      {searchInput ? <ContentContainer searchPhrase={searchInput} /> : <Hero />}
    </>
  );
};
