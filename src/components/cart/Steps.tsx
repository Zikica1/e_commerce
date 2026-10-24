const steps = [
  {
    id: 1,
    title: 'Shopping Cart',
  },
  {
    id: 2,
    title: 'Shopping Address',
  },
  {
    id: 3,
    title: 'Payment Method',
  },
];

const Steps = ({ activeStep }: { activeStep: number }) => {
  return (
    <ul className='flex flex-col items-center gap-8 lg:gap-16 lg:flex-row'>
      {steps.map((step) => (
        <li
          key={step.id}
          className={`flex items-center gap-2 border-b-2 ${activeStep === step.id ? 'border-gray-800' : 'border-gray-200'} pb-4 cursor-pointer`}
        >
          <div
            className={`w-8 h-8 rounded-full text-white ${activeStep === step.id ? 'bg-gray-800' : 'bg-gray-400'} grid place-content-center`}
          >
            {step.id}
          </div>
          <span
            className={`font-medium text-sm
              ${activeStep === step.id ? 'text-gray-800' : 'text-gray-400'}`}
          >
            {step.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Steps;
