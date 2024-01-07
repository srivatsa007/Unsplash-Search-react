const Card = ({ result, handleClick, handleSwitch }) => {
  const clickHandler = () => {
    handleClick(result.id);
    handleSwitch();
  };
  return (
    <div
      onClick={clickHandler}
      key={result.id}
      className="relative overflow-hidden duration-300 rounded-md cursor-pointer hyphens-auto hover:scale-105"
    >
      <div className="absolute p-[16px] top-3">
        <h2 className="text-[20px] font-semibold text-white capitalize">
          {result.user.name}
        </h2>
        <p className="text-[16px] font-thin text-white first-letter:capitalize">
          {result.alt_description}
        </p>
        <p className="text-[16px] font-thin text-white">{result.user.updated_at}</p>
      </div>
      <div className="flex-shrink-0 w-auto">
        <img
          className="my-4 border border-black rounded-md "
          src={result.urls.small}
          alt={result.alt_description || "Unsplash Image"}
        />
      </div>
    </div>
  );
};

export default Card;
