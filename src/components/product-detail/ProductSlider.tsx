import { Carousel } from "../Carousel";
import { Image } from "../Image";

const ImageSlider = (images: string[]) => {
  return images.map((img, idx) => (
    <Image
      src={img}
      alt={"slide_thumbnail_" + idx}
      ariaLabel={"thumbnail_" + idx}
      key={"thumbnail_" + idx}
    />
  ));
};
export const ProductSlider = ({ product }: { product: ProductDetail }) => {
  return (
    <div className="product-detail-img">
      <div className="product-detail-img-slider">
        <Carousel items={ImageSlider(product.images)} smooth={3} pagination />
      </div>
    </div>
  );
};
