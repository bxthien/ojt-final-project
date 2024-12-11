import { Image } from 'antd';

type Props = {
  url?: string | null;
};

const ProductMainImage = ({ url }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={
          url
            ? url
            : 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
        }
        alt="Main Product"
        className="w-full h-auto rounded-lg shadow-md mb-4"
        width="60%"
        height="60%"
        preview={true}
      />
    </div>
  );
};

export default ProductMainImage;
