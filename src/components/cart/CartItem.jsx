import { useRecoilState, useRecoilValue } from "recoil";
import { productAtom } from "../../atoms/productAtom";
import { cartAtom } from "../../atoms/cartAtom";

/* eslint-disable react/prop-types */
function CartItem({ item }) {
  const [cartList, setCartList] = useRecoilState(cartAtom);
  const productList = useRecoilValue(productAtom);
  const product = productList.find(prd => prd.id === item.id);
  const removeCart = id => {
    setCartList([...cartList].filter(prd => prd.id !== id));
  };
  return (
    <div>
      <h3>제품 이름: {product.name}</h3>
      <p>수량: {item.qty}</p>
      <p>가격: {(product.price * item.qty).toLocaleString()} 원</p>
      <button
        type="button"
        onClick={() => {
          removeCart(item.id);
        }}
      >
        삭제
      </button>
    </div>
  );
}
export default CartItem;
