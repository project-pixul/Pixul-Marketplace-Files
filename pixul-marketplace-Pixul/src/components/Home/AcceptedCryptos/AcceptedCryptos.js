import "./accepted.css";

export const AcceptedCryptos = ({ acceptedCryptos }) => {
  return (
    <>
      <h1 className="accepted">Accepted Cryptocurrencies</h1>
      <div>
        {acceptedCryptos.map(({ id, image }) => (
          <div
            key={id}
            style={{
              backgroundImage: `url("${image}")`,
            }}
          />
        ))}
      </div>
    </>
  );
};
