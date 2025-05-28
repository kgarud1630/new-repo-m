import React from 'react';
import { CreditCard, Zap, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$4.99',
      period: 'month',
      description: 'Perfect for casual readers',
      icon: <CreditCard className="w-6 h-6" />,
      features: [
        'Access to basic manga library',
        'Standard quality streaming',
        'Ad-supported experience',
        '2 devices simultaneously'
      ]
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      description: 'Most popular choice',
      icon: <Zap className="w-6 h-6" />,
      features: [
        'Full manga & anime library',
        'HD quality streaming',
        'Ad-free experience',
        '4 devices simultaneously',
        'Offline downloads'
      ],
      popular: true
    },
    {
      name: 'Ultimate',
      price: '$14.99',
      period: 'month',
      description: 'For the biggest fans',
      icon: <Star className="w-6 h-6" />,
      features: [
        'Everything in Premium',
        '4K quality streaming',
        'Early access to new releases',
        'Unlimited devices',
        'Exclusive merchandise discounts',
        'Priority customer support'
      ]
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Perfect Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get unlimited access to manga and anime with our flexible pricing options
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl shadow-xl overflow-hidden ${
                plan.popular
                  ? 'border-2 border-indigo-500 scale-105 z-10 bg-white'
                  : 'border border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                  </div>
                  <div className="ml-4">{plan.icon}</div>
                </div>

                <div className="mt-6">
                  <p className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      /{plan.period}
                    </span>
                  </p>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    type="button"
                    className={`w-full px-6 py-3 text-base font-medium rounded-md text-white ${
                      plan.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700'
                        : 'bg-gray-800 hover:bg-gray-900'
                    } transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      plan.popular ? 'focus:ring-indigo-500' : 'focus:ring-gray-500'
                    }`}
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
