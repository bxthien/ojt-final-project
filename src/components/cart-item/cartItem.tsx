import { CardProduct } from '../carts/Cart';

export const CartItem = (item: CardProduct) => {
  return (
    <>
      <div className="flex flex-c">
        <div className="bg-slate-400 rounded">
          {item.quantity} || {item.price}
        </div>
        <div>{item.product?.name}</div>
      </div>
    </>
  );
};
