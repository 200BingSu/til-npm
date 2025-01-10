import { useRecoilValue } from "recoil";
import {
  cartTatalCountSelector,
  cartTatalPriceSelector,
} from "../../selectors/cartSelectors";

function CartSummary() {
  const total = useRecoilValue(cartTatalPriceSelector);
  const count = useRecoilValue(cartTatalCountSelector);
  return (
    <div>
      <p>총 상품 수: {count}</p>
      <p>총 금액: {total.toLocaleString()} 원</p>
    </div>
  );
}
export default CartSummary;
