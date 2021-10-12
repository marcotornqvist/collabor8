import Link from "next/link";
import styles from "@styles-modules/Button.module.scss";
import Image from "next/image";
import { authState } from "store";
import { useSnapshot } from "valtio";
import Showcase from "@components-pages/landing/Showcase";

const Home = () => {
  // Follow this guide to properly use the useMutation hook with proper caching
  // https://www.apollographql.com/docs/react/data/mutations/
  // https://www.youtube.com/watch?v=4smsVPgZDOo

  return (
    <div className="landing-page">
      <Showcase />
      <section className="disciplines">
        <div className="container">
          <h2>Popular Disciplines</h2>
        </div>
      </section>
    </div>
  );
};

export default Home;
