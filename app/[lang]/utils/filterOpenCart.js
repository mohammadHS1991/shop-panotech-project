import { User } from "../models";

const filterOpenCart = async (productId) => {
  const result = await User.updateMany(
    { "openCart.product": productId },
    { $pull: { openCart: { product: productId } } }
  );
  return result;
};

export default filterOpenCart;
