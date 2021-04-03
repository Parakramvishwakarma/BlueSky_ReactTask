import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

// Header Component including button to open add Task Form

/*
    Props:
    title - sets the text of the header
    onAdd - method passed to button when clicked
    showAdd - boolean value that sets text and colour of button
*/

const Header = ({ title, onAdd, showAdd }: any) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        colour={showAdd ? "LightCoral" : "ForestGreen"}
        text={showAdd ? "Cancel New Task" : "Add New Task"}
        onClick={onAdd}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "BlueSky Task Tracker",
};

Header.proTypes = {
  title: PropTypes.string,
};

export default Header;
