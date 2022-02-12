import React from "react";
import Image from "next/image";
import { IDiscipline } from "@/types-interfaces/form";

interface IProps {
  id: number;
  title: string;
  active: boolean;
  disciplineHandler: (item: IDiscipline) => void;
}

const DisciplineItem = ({ id, title, active, disciplineHandler }: IProps) => {
  return (
    <li
      className={`list-item${active ? " active" : ""}`}
      onClick={() => disciplineHandler({ id, title })}
    >
      <span>{title}</span>
      <div className="check-circle">
        <Image
          src="/icons/check-solid-white.svg"
          alt="Checkmark"
          width={14}
          height={14}
          layout="fixed"
        />
      </div>
    </li>
  );
};

export default DisciplineItem;
