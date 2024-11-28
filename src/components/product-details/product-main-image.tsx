import { Image } from 'antd';
// import { Product } from '../../constants/fetchProducts';

type ProductMainImageProps = {
  photos: string[];
  url: string;
};

const ProductMainImage = ({ url }: ProductMainImageProps) => {
  return (
    <div className="flex flex-col items-center lg:flex-row gap-4 lg:gap-8">
      <Image
        src={
          url
            ? url
            : 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
        }
        alt="Main Product"
        className="rounded-lg shadow-lg"
        width="100%"
        height={350}
        preview={true}
      />
      <div></div>
    </div>
  );
};

export default ProductMainImage;
