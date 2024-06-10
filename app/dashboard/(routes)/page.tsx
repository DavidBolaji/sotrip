import React from 'react'
import { FaHospital, FaChurch, FaTrain, FaShoppingCart, FaUtensils } from 'react-icons/fa';
import CategoryButton from '../components/category-btn';
import Section from '../components/section-component';
import { IMAGES } from '@/constants';

const categories = [
  { label: 'Hospital', icon: FaHospital, active: true },
  { label: 'Church', icon: FaChurch, active: false },
  { label: 'Train Station', icon: FaTrain, active: false },
  { label: 'Supermarket', icon: FaShoppingCart, active: false },
  { label: 'Restaurant', icon: FaUtensils, active: false },
  { label: 'Supermarket2', icon: FaShoppingCart, active: false },
  { label: 'Restaurant3', icon: FaUtensils, active: false },
];

const recommendedPlaces = [
  { imageSrc: IMAGES.RoadMap, name: 'Saint-Louis Hospital', rating: 4.8 },
  { imageSrc: IMAGES.River, name: 'Lariboisière Hospital AP-HP', rating: 4.9 },
  { imageSrc: IMAGES.RoadMap, name: 'Hospital Saint-Antoine Ap-Hp', rating: 4.6 },
];

const recentlyVisitedPlaces = [
  { imageSrc: IMAGES.River, name: 'Gare Montparnasse Station', rating: 4.8 },
  { imageSrc: IMAGES.RoadMap, name: 'Coles Supermarket', rating: 4.9 },
  { imageSrc: IMAGES.River, name: 'Université Paris Cité', rating: 4.6 },
];

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-4">
    <div className="flex gap-2 pb-3 overflow-auto w-full no-scrollbar">
      {categories.map((category, index) => (
        <CategoryButton key={index} {...category} />
      ))}
    </div>
    <Section title="Recommended" places={recommendedPlaces} />
    <Section title="Recently Visited" places={recentlyVisitedPlaces} />
  </div>
  )
}

export default DashboardPage