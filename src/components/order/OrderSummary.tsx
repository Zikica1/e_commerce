const OrderSummary = ({ total }: { total: number }) => {
  return (
    <section className='p-4 ring ring-gray-300 rounded-md'>
      <h3 className='text-xl font-medium my-5'>Order Summary</h3>
      <div className='mb-2 *:text-black/80  flex justify-between'>
        <p>Subtotal</p>
        <p>${total.toFixed(2)}</p>
      </div>
      <div className='*:text-black/80 flex justify-between'>
        <p>Shipping</p>
        <p>Free</p>
      </div>

      <div className='w-full h-px bg-gray-300 my-4'></div>

      <div className='mb-2 flex items-center justify-between'>
        <p className='text-lg font-medium'>Total</p>
        <p className='text-xl font-medium'>${total.toFixed(2)}</p>
      </div>
      <p className='text-black/80'>VAT included</p>
    </section>
  );
};

export default OrderSummary;
