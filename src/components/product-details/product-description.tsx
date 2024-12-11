import useCurrencyFormatter from '../../redux/useCurrencyFormatter';

const ProductDescription = ({ name, price }: { name: string; price: number }) => {
  const { formatCurrency } = useCurrencyFormatter();

  const formattedPrice = formatCurrency(price);

  return (
    <div>
      {/* Tên sản phẩm */}
      <h2 className="text-3xl font-bold mb-2">{name}</h2>

      {/* Giá sản phẩm */}
      <div className="mb-4">
        <span className="text-2xl font-bold text-[#56B280]">{formattedPrice}</span>
      </div>
    </div>
  );
};

export default ProductDescription;
