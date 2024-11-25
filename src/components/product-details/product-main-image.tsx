import { Image } from 'antd';

type ProductMainImageProps = {
  image: string; // Prop nhận ảnh lớn
};

const ProductMainImage = ({ image }: ProductMainImageProps) => {
  return (
    <div className="flex flex-col items-center lg:flex-row gap-4 lg:gap-8">
      <Image
        src={image}
        alt="Main Product"
        className="rounded-lg shadow-lg"
        width="100%"
        height={350}
        style={{ objectFit: 'cover' }}
        preview={true}
      />
    </div>
  );
};

export default ProductMainImage;
