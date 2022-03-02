export const CategoryCard = ({ categoryInfo }) => {

  const { imageUrl, category } = categoryInfo;

  return (
    <div
      className="cursor-pointer p-5 rounded border-2 min-w-min w-48 border-gray-300 text-center h-60 relative bg-cover bg-center"
      style={{
        backgroundImage: `url("${imageUrl}")`
      }}
    >
      <label className="absolute top-2 left-2 font-medium text-lg">{category}</label>
    </div>
  )
}
