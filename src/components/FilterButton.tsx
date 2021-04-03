import React from "react";
import Button from "./Button";

// Button that controls Filter Form

/*
    Props:
    showFilterBar - boolean value thats sets the colour and text of button
    onFilter - method passes when buitton is clicked
*/

const FilterButton = ({ showFilterBar, onFilter }: any) => {
  return (
    <div className="filter">
      <Button
        colour={showFilterBar ? "LightCoral" : "ForestGreen"}
        text={showFilterBar ? "Close Filter" : "Filter Results"}
        onClick={onFilter}
      />
    </div>
  );
};

export default FilterButton;
