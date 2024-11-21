type ProductImagesProps = {
  images: string[]; // Danh sách ảnh nhỏ
  onImageSelect: (image: string) => void; // Hàm gọi khi chọn ảnh
};

const ProductImages = ({ images, onImageSelect }: ProductImagesProps) => {
  return (
    <div className="flex flex-col gap-2">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`product-thumbnail-${index}`}
          className="w-20 h-20 object-cover cursor-pointer border rounded-md"
          onClick={() => onImageSelect(image)} // Gọi hàm khi người dùng click vào ảnh
        />
      ))}
    </div>
  );
};

export default ProductImages;
