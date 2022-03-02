export const AcceptedCryptos = ({ acceptedCryptos }) => {
  return (
    <>
      <h1 className="font-bold mb-2">ACCEPTED CRYPTOCURRENCIES</h1>
      <div className="grid grid-cols-4 gap-0.5 w-40">
        {
          acceptedCryptos.map(({ id, image }) => (
            <div
              key={id}
              style={{
                backgroundImage: `url("${image}")`,
              }}
              className="bg-center bg-cover w-8 h-8"
            />
          ))
        }
      </div>
    </>
  )
}
