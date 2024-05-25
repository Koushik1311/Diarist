import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
};

export default function AddEntryButton({ children, className }: Props) {
  return <button className={className}>{children}</button>;
}
