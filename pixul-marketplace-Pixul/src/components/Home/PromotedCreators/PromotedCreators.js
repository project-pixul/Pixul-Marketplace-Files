import "./promoted.css";

export const PromotedCreators = ({ promotedCreatorInfo }) => {
  const { creatorName, services, image } = promotedCreatorInfo;

  return (
    <div className="promoted">
      <h2>Promoted Creators</h2>
      <div>
        <div className="creator">
          <div>
            <h1>{creatorName}</h1>
            <h2>{services[0]}</h2>
          </div>
          <p>
            sagittis purus sit amet volutpat consequat mauris nunc congue nisi
            vitae suscipit tellus mauris a diam maecenas sed enim ut sem viverra
            aliquet eget sit amet tellus cras adipiscing enim eu turpis egestas
            pretium aenean pharetra magna ac placerat vestibulum lectus mauris
            ultrices eros in cursus turpis massa tincidunt dui
          </p>
          <button>View Profile</button>
        </div>
        <img src={image} alt="Promoted Creator" />
      </div>
    </div>
  );
};
