import { Image } from 'antd';

type ProductImagesProps = {
  images?: string[] | null; // Danh sách ảnh nhỏ
  onImageSelect: (image: string) => void; // Hàm gọi khi chọn ảnh
  selectedImage: string | null; // Trạng thái ảnh đã chọn
};

const ProductImages = ({ images, onImageSelect, selectedImage }: ProductImagesProps) => {
  return (
    <div className="flex md:flex-row gap-8 overflow-x-auto md:overflow-x-visible">
      {images?.map((image, index) => (
        <div
          key={index}
          className={`relative ${selectedImage === image ? 'border border-black' : ''}`}
        >
          <Image
            src={image}
            alt={`product-thumbnail-${index}`}
            className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out"
            width={100}
            height={100}
            preview={false} // Disable Ant Design preview for small thumbnails
            onClick={() => onImageSelect(image)} // Gọi hàm khi click vào ảnh
          />
          {/* Hiển thị viền hoặc hiệu ứng active cho ảnh đã chọn */}
        </div>
      ))}
    </div>
  );
};

export default ProductImages;
