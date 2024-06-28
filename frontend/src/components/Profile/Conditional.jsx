

const Conditional = ({ condition, value, onChange, placeholder }) => {
    return condition ? (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="ml-2 p-2 border border-gray-300 rounded-md"
      />
    ) : null;
  };
  
  export default Conditional;
  