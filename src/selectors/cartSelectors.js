import { selector } from "recoil";
import { cartAtom } from "../atoms/cartAtom";
import { productAtom } from "../atoms/productAtom";

// 총금액
export const cartTatalPriceSelector = selector({
  key: "cartTatalPrice",
  get: ({ get }) => {
    const cart = get(cartAtom);
    const products = get(productAtom);
    return cart.reduce((acc, item) => {
      const product = products.find(pro => item.id === pro.id);
      // 전체 합산이 필요하다.
      // 현재까지 금액 + (제품 가격)*장바구니 수량
      return acc + product.price * item.qty;
    }, 0);
  },
});

// 장바구니 수량
export const cartTatalCountSelector = selector({
  key: "cartTatalCount",
  get: ({ get }) => {
    const cart = get(cartAtom);
    return cart.reduce((total, item) => {
      return total + item.qty;
    }, 0);
  },
});
