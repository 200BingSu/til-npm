import { useRecoilState } from "recoil";
import { cartAtom } from "../../atoms/cartAtom";

/* eslint-disable react/prop-types */
function ProductItem({ product }) {
  const [cart, setCart] = useRecoilState(cartAtom);
  const addCart = id => {
    // id를 전달받으면 cart에 제품 id와 qty 업데이트
    setCart(prevCart => {
      // 현재 카트에 있을 경우
      const existId = prevCart.find(item => item.id === id);
      if (existId) {
        return prevCart.map(item =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      // 없을 경우
      return [...prevCart, { id: id, qty: 1 }];
    });
  };
  return (
    <div style={{ display: "flex" }}>
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
      <button type="button" onClick={() => addCart(product.id)}>
        장바구니 담기
      </button>
    </div>
  );
}
export default ProductItem;
