import Link from "next/link";
import { useRouter } from "next/router";

const tiers = [
  {
    name: 'Basic',
    id: 'tier-basic',
    href: '/checkout',
    priceMonthly: '₹499',
    description: 'Everything necessary for getting started.',
    features: ['1 Create App', 'Basic analytics', 'Email support'],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '/checkout',
    priceMonthly: '₹999',
    description: 'Everything in Basic, plus essential tools for growing your business.',
    features: ['10 Create App', 'Basic analytics', 'Email support'],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '/checkout',
    priceMonthly: '₹1299',
    description: 'Advanced features for scaling your business.',
    features: ['Unlimited Create App', 'Basic analytics', 'Email support'],
    mostPopular: false,
  },
];

const MembershipCards = () => {
  const router = useRouter();

  const handleCheckout = (tierId) => {
    router.push(`/checkout?name=${tierId.name}&price=${tierId.priceMonthly}`);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for&nbsp;you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose an affordable plan that's packed with the best features for engaging your audience,
          creating customer loyalty, and driving sales.
        </p>
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-3xl p-8 ring-1 ring-gray-200 ${tier.mostPopular ? 'bg-gray-900 text-white ring-gray-900' : 'bg-white'} xl:p-10`}
              >
                <h3 className={`text-lg font-semibold leading-8 ${tier.mostPopular ? 'text-white' : 'text-gray-900'}`}>
                  {tier.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight">{tier.priceMonthly}</span>
                  <span className="text-sm font-semibold leading-6">/month</span>
                </p>
                <button
                  onClick={() => handleCheckout(tier)}
                  className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${tier.mostPopular
                    ? 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                    }`}
                >
                  Choose plan
                </button>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCards;
