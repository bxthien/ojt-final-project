const ProductDetails = ({ name, price }: { name: string; price: string }) => {
  return (
    <div>
      <h1 className="text-[30px] font-semibold">{name}</h1>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-4xl font-bold text-[#56B280]">{price}</span>
      </div>
    </div>
  );
};

export default ProductDetails;
