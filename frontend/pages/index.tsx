import Showcase from "@/components-pages/landing/Showcase";
import Disciplines from "@/components-pages/landing/Disciplines";
import Profiles from "@/components-pages/landing/Profiles";
import About from "@/components-pages/landing/About";
import {
  DisciplinesLandingDocument,
  DisciplinesLandingQuery,
  DisciplinesLandingQueryVariables,
  DisciplinesQuery,
  DisciplinesQueryVariables,
} from "generated/graphql";
import { initializeApollo } from "utils/useApollo";

const Home = ({ disciplines }: any) => {
  // Follow this guide to properly use the useMutation hook with proper caching
  // https://www.apollographql.com/docs/react/data/mutations/
  // https://www.youtube.com/watch?v=4smsVPgZDOo

  // https://blog.logrocket.com/implementing-animated-toasts-in-react/

  console.log(disciplines);
  return (
    <div className="landing-page">
      <Showcase />
      {/* <Disciplines disciplines={disciplines} /> */}
      <Profiles first={3} />
      <About />
    </div>
  );
};

export const getStaticProps = async () => {
  const client = initializeApollo();
  const result = await client.query<
    DisciplinesLandingQuery,
    DisciplinesLandingQueryVariables
  >({
    query: DisciplinesLandingDocument,
    variables: {
      data: {
        disciplineIds: [1, 2, 3, 4, 5],
      },
    },
  });

  return {
    props: {
      disciplines: result?.data.disciplines,
    },
  };
};

export default Home;
