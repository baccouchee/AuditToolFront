export default function ConsolidationType({ consolidationType, setConsolidationType }) {
  console.log('consolidationType', consolidationType)
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-main focus:outline-none focus:ring-1 focus:ring-main ${
          consolidationType === 'year' && 'bg-main text-white'
        }`}
        onClick={() => setConsolidationType('year')}
      >
        Years
      </button>
      <button
        type="button"
        className={`relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-main focus:outline-none focus:ring-1 focus:ring-main ${
          consolidationType === 'month' && 'bg-main text-white'
        }`}
        onClick={() => setConsolidationType('month')}
      >
        Months
      </button>
      <button
        type="button"
        className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-main focus:outline-none focus:ring-1 focus:ring-main ${
          consolidationType === 'Days' && 'bg-main text-white'
        }`}
        onClick={() => setConsolidationType('Days')}
      >
        Days
      </button>
    </span>
  )
}
