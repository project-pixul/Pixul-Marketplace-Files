export const PromotedCreators = ({ promotedCreatorInfo }) => {

  const { creatorName, description, services, image } = promotedCreatorInfo;

  return (
    <div className="w-11/12 m-auto lg:w-10/12 xl:w-8/12">
      <h1 className="font-bold text-3xl mb-5">Promoted Creators</h1>
      <div className="flex flex-col-reverse border-2 items-stretch justify-stretch border-gray-800 rounded-xl md:flex-row">
        <div className="flex-1 p-5">
          <h1 className="font-bold text-xl">{creatorName}</h1>
          <p className="ml-2 mt-2 font-medium">{description}</p>
          <h1 className="font-bold text-xl mt-5">Services</h1>
          {
            services.map((service) => (
              <p
                key={service}
                className="ml-2 font-medium my-1"
              >
                {service}
              </p>
            ))
          }
        </div>
        <div
          className="bg-center bg-cover w-full h-80 mb-5 border-gray-800 border-b-2 rounded-tl-xl rounded-tr-xl md:flex-1 md:h-auto md:rounded-tl-none md:border-b-0 md:border-l-2 md:rounded-br-xl md:mb-0"
          style={{
            backgroundImage: `url("${image}")`
          }}
        />
      </div>
    </div>
  )
}
