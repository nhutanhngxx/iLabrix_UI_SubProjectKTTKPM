import PropTypes from "prop-types";

const Button = ({onClick, children, backgroundColor, textColor }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor || "#4285F4",
    color: textColor || "white",
    padding: "5px",
    border: `1px solid ${textColor}`,
    borderRadius: "55px",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "500",
    width: "200px",
  };
  return <button style={buttonStyle} onClick={onClick}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
