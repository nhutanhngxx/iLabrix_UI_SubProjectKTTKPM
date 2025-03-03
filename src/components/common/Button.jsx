import PropTypes from "prop-types";

const Button = ({ onClick, children, backgroundColor, textColor, disable }) => {
  const buttonStyle = {
    backgroundColor: backgroundColor || "#4285F4",
    color: textColor || "white",
    padding: "5px",
    border: `1px solid ${textColor}`,
    borderRadius: "55px",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "500",
    width: "150px",
  };
  return (
    <button style={buttonStyle} onClick={onClick} disabled={disable}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
  disable: PropTypes.bool,
};

export default Button;
