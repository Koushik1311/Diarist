import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
};

export default function FontFamilyBtn({ children, onClick, className }: Props) {
  return (
    <button onClick={onClick} className={`${className}`}>
      {children}
    </button>
  );
}
