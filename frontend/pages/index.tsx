import Users from "@components-pages/landing/Users";
import LoggedInUser from "@components-pages/landing/LoggedInUser";

export default function Home() {
  // Follow this guide to properly use the useMutation hook with proper caching
  // https://www.apollographql.com/docs/react/data/mutations/
  // https://www.youtube.com/watch?v=4smsVPgZDOo
  return (
    <div className="landing-page">
      <section className="showcase">
        <div className="container">
          {/* <LoggedInUser />
          <hr />
          <Users />
          <br /> */}
        </div>
      </section>
    </div>
  );
}
