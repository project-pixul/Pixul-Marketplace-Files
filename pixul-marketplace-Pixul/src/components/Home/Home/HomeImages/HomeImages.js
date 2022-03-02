import React from 'react'

export const HomeImages = ({ items }) => {
  return (
    <div className="w-full bg-gray-200 my-10 py-5">
      <div className="flex justify-evenly gap-5 m-auto w-full md:w-9/12 lg:w-10/12">
        {
          items.map(({ id, url }) => (
            <div
              key={id}
              style={{
                backgroundImage: `url("${url}")`
              }}
              className="h-20 w-20 bg-center bg-cover rounded"
            />
          ))
        }
      </div>
    </div>
  )
}
