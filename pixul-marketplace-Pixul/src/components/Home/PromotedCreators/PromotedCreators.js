import "./promoted.css";

export const PromotedCreators = ({ promotedCreatorInfo }) => {
  const { creatorName, services, image } = promotedCreatorInfo;

  return (
    <div className="promoted">
      <h1>Promoted Creators</h1>
      <div className="flex flex-col-reverse border-2 items-stretch justify-stretch border-gray-800 rounded-xl md:flex-row">
        <div
          className="bg-center bg-cover w-full h-80 mb-5 border-gray-800 border-b-2 rounded-tl-xl rounded-tr-xl md:flex-1 md:h-auto md:rounded-tl-none md:border-b-0 md:border-l-2 md:rounded-br-xl md:mb-0"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        />
        <div className="flex-1 p-5">
          <h1 className="font-bold text-xl">{creatorName}</h1>
          {services.map(service => (
            <p key={service} className="ml-2 font-medium my-1">
              {service}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
