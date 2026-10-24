type OrderHeaderProps = {
  orderId: string;
  date: Date;
  payStatus: 'pending' | 'paid' | 'failed';
  total: number;
};

const OrderHeader = ({ orderId, date, payStatus, total }: OrderHeaderProps) => {
  return (
    <ul className='inset-ring inset-ring-gray-300 rounded-lg *:p-3 lg:flex lg:gap-10'>
      <li className='border-b border-b-gray-300 pb-2 *:mb-1'>
        <p className='text-gray-600'>Order ID:</p>
        <p>{orderId}</p>
      </li>
      <li className='border-b border-b-gray-300 py-2'>
        <div className='w-4/5 inline-grid grid-cols-2 lg:flex lg:gap-10 lg:w-full'>
          <div className='*:mb-1'>
            <p className='text-gray-600'>Date:</p>
            <p>{date.toLocaleString('sr-RS')}</p>
          </div>
          <div className='*:mb-1'>
            <p className='text-gray-600'>Payment status:</p>
            <div>
              <span className='box-border bg-green-200 rounded-md px-1 py-0.5 inline-grid place-content-center'>
                <span className='text-green-800 text-sm'>{payStatus}</span>
              </span>
            </div>
          </div>
        </div>
      </li>
      <li className='pt-2 *:mb-1'>
        <p className='text-gray-600'>Total:</p>
        <p className='font-medium'>${total.toFixed(2)}</p>
      </li>
    </ul>
  );
};

export default OrderHeader;
