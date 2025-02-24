import PropTypes from "prop-types";

const InputField = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="mt-4 mb-4">
      <div className="text-xl font-bold">{label}</div>
      <input
        type={type}
        className="border rounded-3xl p-3 pl-5 w-full mt-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputField;
