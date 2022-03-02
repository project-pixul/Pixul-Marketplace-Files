export const CategoriesImages = ({ creators }) => {
  const creatorsCopy = [...creators];
  const topCreator = (
    <div
      className="h-40 md:h-full rounded-xl w-full relative bg-cover  bg-center"
      style={{
        backgroundImage: `linear-gradient( rgba(0,0,0,.3), rgba(0,0,0,.3)), url("${creatorsCopy[0].profilePicture}")`,
      }}
    >
      <h5 className="absolute font-bold bottom-3 left-3 text-white">
        {creatorsCopy[0].name}
      </h5>
    </div>
  );
  creatorsCopy.shift();

  return (
    <div className="md:pr-20">
      <h1 className="text-xl font-bold mb-3">Categories</h1>
      <div className="md:h-72 gap-10 flex flex-col items-center md:flex-row">
        {topCreator}
        <div className="flex gap-10 flex-col md:h-full w-full md:w-1/2">
          {creatorsCopy.map((creator, index) => (
            <div
              key={index}
              className="h-40 md:h-full rounded-xl w-full relative bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient( rgba(0,0,0,.3), rgba(0,0,0,.3)), url("${creator.profilePicture}")`,
              }}
            >
              <h5 className="absolute font-bold bottom-3 left-3 text-white">
                {creator.name}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
