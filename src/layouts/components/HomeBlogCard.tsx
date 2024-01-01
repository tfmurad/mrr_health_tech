import Button from "@/shortcodes/Button"
import { Blog } from "@/types";
import Image from "next/image";
import React from "react";

const HomeBlogCard = ({blog}: {blog: Blog}) => {
    const { title, image, button, content } = blog;
    console.log(blog)
    const gradientColor = 'linear-gradient(0deg, rgba(0, 33, 71, 0.30) 0%, rgba(0, 33, 71, 0.30) 100%)';

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-0 rounded-xl" style={{ background: gradientColor }}/>
        <Image
          src={image}
          alt={title}
          width={424}
          height={307}
          className="rounded-xl w-full"
        />
      </div>

      <div className="bg-dark p-6 pb-9 rounded-xl absolute -bottom-52 mx-6">
        <div className="text-center">
          <h3 className="text-white h4 font-bold pb-4">{title}</h3>
          <p className="text-white pb-6">{content}</p>
          <div className="inline-block">
            <Button
              label={button.label}
              link={button.link}
              Icon={button.icon}
              className="text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBlogCard;
