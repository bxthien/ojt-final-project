import { Image } from 'antd';

type ProductMainImageProps = {
  photos: string;
};

const ProductMainImage = ({ photos }: ProductMainImageProps) => {
  return (
    <div className="flex flex-col items-center lg:flex-row gap-4 lg:gap-8">
      <Image
        src={
          photos
            ? photos
            : 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
        }
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
