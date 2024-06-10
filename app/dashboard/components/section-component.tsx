import React from 'react';
import PlaceCard from './place-card';


interface ISection {
    title: string;
    places: any[]
}

const Section:React.FC<ISection> = ({ title, places }) => {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4 w-full">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <a href="#" className="text-blue-600">See All</a>
      </div>
      <div className="flex gap-4 w-full overflow-auto no-scrollbar">
        {places.map((place, index) => (
          <PlaceCard key={index} {...place} />
        ))}
      </div>
    </div>
  );
};

export default Section;