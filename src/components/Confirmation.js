export default function Confirmation() {
    return (
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h2 className="mt-4 text-lg font-medium text-gray-900">Order confirmed</h2>
        <p className="mt-2 text-sm text-gray-500">
          Thank you for your purchase. Your order has been processed and will be shipped soon.
        </p>
        <a
          href="/"
          className="mt-8 inline-block bg-green-600 border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-green-700"
        >
          Continue
        </a>
      </div>
    )
  }
  
  