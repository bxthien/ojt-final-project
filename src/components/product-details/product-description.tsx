const ProductDescription = ({
  name,
  price,
  // description,
}: {
  name: string;
  price: string | number;
  // description?: string;
}) => {
  return (
    <div>
      {/* Tên sản phẩm */}
      {/* <h1 className="text-[30px] font-semibold">{name}</h1> */}

      {/* Giá sản phẩm */}
      {/* <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-base text-[#56B280]">{price} $</span>
      </div> */}

      <h2 className="text-3xl font-bold mb-2">{name}</h2>
      <div className="mb-4">
        <span className="text-2xl font-bold mr-2 text-[#56B280]">{price} $</span>
        {/* <span className="text-gray-500 line-through">$399.99</span> */}
      </div>

      {/* Mô tả sản phẩm */}
      {/* {description && (
        <p className="text-base text-gray-600 mt-2">
          <strong>Description:</strong> {description}
        </p>
      )} */}
    </div>
  );
};

export default ProductDescription;
