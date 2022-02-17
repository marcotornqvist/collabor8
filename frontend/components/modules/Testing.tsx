import React from "react";

const Testing = ({
  items,
}: {
  items: {
    name: string;
    href: string;
    status: boolean;
  }[];
}) => (
  <div>
    {items.map((item) => (
      <div key={item.href}>
        <a role="navigation" href={item.href}>
          {item.name}
        </a>
      </div>
    ))}
  </div>
);

export default Testing;
