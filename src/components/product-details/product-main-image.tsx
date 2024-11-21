type ProductMainImageProps = {
  image: string; // Prop nhận ảnh lớn
};

const ProductMainImage = ({ image }: ProductMainImageProps) => {
  return (
    <div className="w-full h-auto">
      <img
        src={image}
        alt="Main Product"
        className="w-full h-full object-cover rounded-lg shadow-md"
      />
    </div>
  );
};

export default ProductMainImage;
