import Link from "next/link";
import { ComponentType } from "react";

const Button = ({
  label,
  link,
  className,
  style,
  Icon,
  rel,
}: {
  label: string;
  link: string;
  className?: string;
  style?: string;
  Icon?: ComponentType;
  rel?: string;
}) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      className={`btn no-underline flex items-center gap-x-2 ${className} ${
        style === "outline" ? "btn-outline-primary" : "btn-primary"
      }`}
    >
      {label}
      {Icon && <span><Icon /></span>}
    </Link>
  );
};

export default Button;
