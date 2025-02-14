import PropTypes from 'prop-types';

const InputField = ({label, type, placeholder}) => {
  return (
    <div className="mt-4 mb-4">
    <div className="text-xl font-bold">{label}</div>
    <input
      type={type}
      className="border rounded-3xl p-3 pl-5 w-full mt-2"
      placeholder={placeholder}
    />
  </div>
  )
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  };

export default InputField
