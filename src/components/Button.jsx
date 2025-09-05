import clsx from "clsx";
import React from "react";

export const Button = ({
  icon,
  className,
  label,
  type,
  onClick = () => {},
}) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={clsx("px-3 py-2 outline-none rounded-4xl", className)}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};
