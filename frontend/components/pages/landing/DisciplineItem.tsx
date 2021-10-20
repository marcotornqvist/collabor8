import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  title: string;
  src: string;
  link: string;
  alt: string;
}

const DisciplineItem = ({ title, src, link, alt }: IProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={"/profiles/" + link}>
      <a className="grid-item">
        {loaded && <h3>{title}</h3>}
        <Image
          onLoadingComplete={(e) => {
            setLoaded(true);
          }}
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </a>
    </Link>
  );
};

export default DisciplineItem;
