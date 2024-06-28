const TextInput = (props) => {
    const changeHandler = (e) => {
      props.onValueChange(e);
    };
  
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">
          {props.label}
        </label>
        <input
          type="text"
          name={props.name}
          value={props.value}
          onChange={changeHandler}
          placeholder={props.placeholder}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    );
  };
  export default TextInput;
  