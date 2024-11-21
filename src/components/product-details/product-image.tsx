import { Image } from 'antd';
type ProductImagesProps = {
  images: string[]; // Danh sách ảnh nhỏ
  onImageSelect: (image: string) => void; // Hàm gọi khi chọn ảnh
};

const ProductImages = ({ images, onImageSelect }: ProductImagesProps) => {
  return (
    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-visible">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`product-thumbnail-${index}`}
          className="w-full h-full object-cover rounded-lg"
          width={90}
          height={90}
          preview={false} // Disable Ant Design preview for small thumbnails
          onClick={() => onImageSelect(image)} // Call the handler when an image is clicked
        />
      ))}
    </div>
  );
};

export default ProductImages;
