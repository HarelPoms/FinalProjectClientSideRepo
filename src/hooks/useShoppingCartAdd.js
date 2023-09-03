import { useDispatch } from "react-redux";
import { shoppingCartActions } from "../store/shoppingCart";

const useShoppingCartAdd = () => {
    const dispatch = useDispatch();
    return (item) => {
        dispatch(shoppingCartActions.insertItemToCart(item));
    };
};

export default useShoppingCartAdd;