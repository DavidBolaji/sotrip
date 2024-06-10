import { IMAGES } from "@/constants";
import Image, { StaticImageData } from "next/image";
import React from "react";

const AuthComponent: React.FC<{ text: string, src: StaticImageData }> = ({ text, src }) => {
  return (
    <div
      className="h-full w-full bg-cover bg-center flex flex-col justify-center items-center relative"
    >
      <div className="absolute w-full h-full top-0 bottom-0 left-0 right-0">
        <Image
        src={src.src}
        alt={text}
        className={`${text.trim().length > 0 ? 'object-cover': 'object-contain'}`}
        fill
          
        />
      </div>
      <h1 className="text-white text-center text-4xl font-bold flex items-center justify-center mx-20 absolute z-30">
        {text}
      </h1>
      {text.trim().length > 0 && <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 absolute h-full w-full z-10 opacity-[0.6]"></div>}
    </div>
  );
};

export default AuthComponent;
