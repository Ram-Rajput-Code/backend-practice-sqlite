import React from "react";
import HomeCardsDisplay from "./HomeCardsDisplay";
import HomeImageSlider from "./HomeImageSlider";

const HomePage = () => {
  return (
    <div>
      <HomeImageSlider/>
      <HomeCardsDisplay />
    </div>
  );
};

export default HomePage;
