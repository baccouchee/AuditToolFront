import React from 'react'

const Card = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 my-4">
      <dt className="truncate text-sm font-medium text-gray-500">Name</dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Stat</dd>
    </div>
  )
}

export default Card
