import { Image } from 'antd';
// import { Product } from '../../constants/fetchProducts';

type ProductMainImageProps = {
  photos: string[];
  url: string;
  // product: Product;
};

const ProductMainImage = ({ url }: ProductMainImageProps) => {
  // const { url } = product;
  return (
    <div className="flex flex-col items-center lg:flex-row">
      <Image
        src={
          url
            ? url
            : 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
        }
        alt="Main Product"
        className="rounded-sm"
        width="70%"
        height="70%"
        preview={true}
      />
      <div></div>
    </div>
  );
};

export default ProductMainImage;
