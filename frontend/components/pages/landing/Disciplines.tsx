import { DisciplinesLandingQuery } from "generated/graphql";
import React from "react";
import DisciplineItem from "./DisciplineItem";

const Disciplines = ({ disciplines }: DisciplinesLandingQuery) => {
  return (
    <section className="disciplines">
      <div className="container">
        <h2>Popular Disciplines</h2>
        <div className="grid">
          {disciplines?.map(
            (item) =>
              item.image?.small && (
                <DisciplineItem
                  key={item.id}
                  src={item.image?.small}
                  link={item.id}
                  title={item.title}
                  alt={item.image.alt || ""}
                />
              )
          )}
          <DisciplineItem
            src={
              "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/more-small.jpg"
            }
            title={"More"}
            alt={"Person looking up"}
          />
        </div>
      </div>
    </section>
  );
};

export default Disciplines;
