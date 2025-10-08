import React from 'react';
import Link from 'next/link';

const GameCard = ({ game }) => {
  const { slug, name, icon, description, type } = game;
  
  return (
    <div className="block cursor-pointer rounded-lg bg-[#0c73ad] p-2 shadow-md md:p-3 hover:scale-105 transition-transform duration-300">
      <Link href={`/game/${slug}`} className="block">
        <div className="block md:flex">
          <div className="relative w-full overflow-hidden rounded-lg md:w-[100px]">
            <img 
              src={icon} 
              alt={name}
              width="100" 
              height="100" 
              className="aspect-square w-full transform rounded-lg object-cover transition duration-300 ease-in-out hover:scale-110"
            />
          </div>
          
          <div className="game-name mt-1 h-14 w-full overflow-hidden pl-0 text-left text-lg md:pl-2">
            <p className="md:text-md text-[13px] text-[#fff] md:text-[17px]">
              {name}
            </p>
            <p className="text-sm text-[#cfcfcf]">
              {type === 'AUTO' ? 'TỰ ĐỘNG' : 'THỦ CÔNG'}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;