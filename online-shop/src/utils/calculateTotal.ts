export const calculateTotal = (price: number, quantity: number): number => {
  const precision = 100000000;
  const totalPriceCalculated =
    Math.round((price * quantity + Number.EPSILON) * precision) / precision;
  return totalPriceCalculated;
};
