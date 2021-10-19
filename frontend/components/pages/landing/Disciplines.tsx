import React from "react";
import Link from "next/link";
import Image from "next/image";
import DisciplineItem from "./DisciplineItem";

const Disciplines = () => {
  // Compress image
  // Upload them to S3 Bucket
  // Fix animation on the images

  return (
    <section className="disciplines">
      <div className="container">
        <h2>Popular Disciplines</h2>
        <div className="grid">
          {items.map((item, index) => (
            <DisciplineItem
              key={index}
              src={item.src}
              link={item.link}
              title={item.title}
              alt={item.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const items = [
  {
    title: "Guitarist",
    src: "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/guitarist.jpg",
    link: "guitarist",
    alt: "Person playing the guitar",
  },
  {
    title: "Photographer",
    src: "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/photographer.jpg",
    link: "photograper",
    alt: "Person taking a photo",
  },
  {
    title: "Graphic Designer",
    src: "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/graphic-designer.jpg",
    link: "graphic-designer",
    alt: "Person doing graphic design",
  },
  {
    title: "Pianist",
    src: "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/pianist.jpg",
    link: "pianist",
    alt: "Person playing the piano",
  },
  {
    title: "Videographer",
    src: "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/videographer.jpg",
    link: "videographer",
    alt: "Person filming a video",
  },
  {
    title: "More",
    src: "https://collabor8-image-bucket.s3.eu-west-1.amazonaws.com/static/more.jpg",
    link: "more",
    alt: "Person standing",
  },
];

export default Disciplines;
