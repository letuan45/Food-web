import { useSelector } from "react-redux";

//Hàm này nhận input 1 array product, trả về 1 array với item có isLiked
const useWishlistTransform = (productItems) => {
  const wishList = useSelector((state) => state.wishList.items);
  if (!wishList || wishList.length === 0) return [...productItems];
  const productsTransform = productItems.map((item) => {
    //Tìm item trong wishlist
    const indexInWishList = wishList.findIndex(
      (wishListItem) => wishListItem["id_item"] === item["id_item"]
    );
    return { ...item, isLiked: indexInWishList >= 0 };
  });

  return [...productsTransform];
};

export default useWishlistTransform;
