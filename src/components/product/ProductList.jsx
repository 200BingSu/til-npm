import { useRecoilValue } from "recoil";
import { productAtom } from "../../atoms/productAtom";
import ProductItem from "./ProductItem";

function ProductList() {
  const productList = useRecoilValue(productAtom);
  return (
    <div>
      <h1>제품 리스트</h1>
      <div>
        {productList.map(item => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
export default ProductList;
