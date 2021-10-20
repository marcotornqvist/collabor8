import Showcase from "@components-pages/landing/Showcase";
import Disciplines from "@components-pages/landing/Disciplines";
import Profiles from "@components-pages/landing/Profiles";
import About from "@components-pages/landing/About";

const Home = () => {
  // Follow this guide to properly use the useMutation hook with proper caching
  // https://www.apollographql.com/docs/react/data/mutations/
  // https://www.youtube.com/watch?v=4smsVPgZDOo

  return (
    <div className="landing-page">
      <Showcase />
      <Disciplines />
      <Profiles />
      <About />
    </div>
  );
};
 
export default Home;
