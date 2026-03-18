
import { useEffect, useState } from "react";
import { ContentContainer } from "../components/ContentContainer/ContentContainer"
import { Hero } from "../components/Hero/Hero";
import { useSearch } from "../contexts/SearchContext";
import { waitForAPI} from "../data/dummyDB/dbAPI";
import { LoadingComponent } from "../components/LoadingComponent/LoadingComponent";

export const MainPage: React.FC = () => {
  const { searchInput } = useSearch();

  const [apiReady, setApiReady] = useState<boolean | null>(null);

  useEffect(()=>{

    const checkAPI = async () => {
      const response = await waitForAPI();
      setApiReady(response);
    }

    checkAPI();
    
  },[]);

  if(apiReady === null){
    return (
      <div style={{height:"100vh"}}>
      <LoadingComponent text="This site is using free tier hosting service for backend API, please wait for API to wake up ⏰. (It might take about 60 seconds)."/>
      </div>
    )
  }

  if (!apiReady) {
    return <div>API failed to start.</div>;
  }

  return (
    <>
      {searchInput ? <ContentContainer searchPhrase={searchInput} /> : <Hero />}
    </>
  );
};
