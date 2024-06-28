const ButtonInput = ({ onClick, text, colorClass }) => {
    let bgColorClass, hoverBgColorClass, textColorClass;
  
    // Determine classes based on colorClass prop
    switch (colorClass) {
      case "blue":
        bgColorClass = "bg-blue-500";
        hoverBgColorClass = "hover:bg-blue-600";
        textColorClass = "text-white";
        break;
      case "red":
        bgColorClass = "bg-red-500";
        hoverBgColorClass = "hover:bg-red-600";
        textColorClass = "text-white";
        break;
      default:
        bgColorClass = "bg-gray-500";
        hoverBgColorClass = "hover:bg-gray-600";
        textColorClass = "text-white";
        break;
    }
  
    return (
      <button
        onClick={onClick}
        className={`py-2 px-4 rounded-md ${bgColorClass} ${hoverBgColorClass} ${textColorClass}`}
      >
        {text}
      </button>
    );
  };
  
  export default ButtonInput;
  