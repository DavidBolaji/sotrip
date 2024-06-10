// components/PlaceCard.jsx
import React from "react";
import Image, { StaticImageData } from "next/image";
import { FaStar } from "react-icons/fa";

interface IPlaceCard {
  imageSrc: StaticImageData | string;
  name: string;
  rating: number;
}

const PlaceCard: React.FC<IPlaceCard> = ({ imageSrc, name, rating }) => {
  return (
    <div className="w-[300px]">
      <div
        className={`w-[300px] h-[200px] bg-red-400 relative rounded-2xl overflow-hidden`}
      >
        <Image
        src={imageSrc}
        alt={name}
        priority
        width={300}
        height={200}
        className="w-full h-full rounded-xl overflow-hidden absolute top-0 bottom-0 left-0 right-0 object-cover"
        />
      </div>

      <div className="py-4">
        <h3 className="text-md font-semibold text-black">{name}</h3>
        <div className="flex items-center mt-1">
          <FaStar className="text-yellow-500" />
          <span className="ml-1">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
