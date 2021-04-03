import React from "react";
import PropTypes from "prop-types";

// Reusable Button Component
/*
    Props:
    colour - sets the background colour of the button
    text - sets the text of the button
    onClick - passes a method when button is clicked
*/

const Button = ({ colour, text, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: colour }}
      className="btn"
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  colour: "steel blue",
};

Button.propTypes = {
  text: PropTypes.string,
  colour: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
