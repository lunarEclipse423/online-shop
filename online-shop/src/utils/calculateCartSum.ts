export const calculateCartSum = (cart: any[]): number => {
  return cart.reduce((prev, curr) => {
    const precision = 100000000;
    const cartSumCalculated =
      Math.round((prev + curr.totalPrice + Number.EPSILON) * precision) / precision;
    return cartSumCalculated;
  }, 0);
};
