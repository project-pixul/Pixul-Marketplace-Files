export const Banner = ({ src }) => {
  return (
    <div
      className="mt-4 w-11/12 mx-auto h-60 bg-cover bg-center rounded lg:w-10/12 xl:w-8/12 "
      style={{
        backgroundImage: `url("${src}")`
      }}
    />
  )
}
