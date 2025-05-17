const priceDiscountCalc = (price, discount, lang) => {
  let newPrice = 0;
  if (lang === "fa") {
    newPrice = Math.round((price * (1 - discount / 100)) / 1000) * 1000;
  } else {
    newPrice = (price * (1 - discount / 100)).toFixed(2);
  }

  return newPrice;
};

export default priceDiscountCalc;
