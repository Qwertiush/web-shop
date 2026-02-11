
import { useEffect } from "react";
import { ContentContainer } from "../components/ContentContainer/ContentContainer"
import { Hero } from "../components/Hero/Hero";
import { useSearch } from "../contexts/SearchContext";
import { checkConnection2API} from "../data/dummyDB/dbAPI";

export const MainPage: React.FC = () => {
  const { searchInput } = useSearch();

  useEffect(()=>{

    const checkAPI = async () => {
      const response = await checkConnection2API();

      console.log("Connection to API: ",response);
    }

    checkAPI();
    
  },[]);

  return (
    <>
      {searchInput ? <ContentContainer searchPhrase={searchInput} /> : <Hero />}
    </>
  );
};
