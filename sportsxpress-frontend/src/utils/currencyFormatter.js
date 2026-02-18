export const formatINR = (price) => {
  return '₹' + price.toLocaleString('en-IN');
};

export const formatINRWithDecimal = (price) => {
  return '₹' + price.toFixed(2).toLocaleString('en-IN');
};