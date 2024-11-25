const ProductDetails = ({
  name,
  price,
  description,
}: {
  name: string;
  price: string;
  description?: string; // Cho phép mô tả tùy chọn
}) => {
  return (
    <div>
      {/* Tên sản phẩm */}
      <h1 className="text-[30px] font-semibold">{name}</h1>

      {/* Giá sản phẩm */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-base text-[#56B280]">{price} $</span>
      </div>

      {/* Mô tả sản phẩm */}
      {description && (
        <p className="text-base text-gray-600 mt-2">
          <strong>Description:</strong> {description}
        </p>
      )}
    </div>
  );
};

export default ProductDetails;
