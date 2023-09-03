import { useDispatch } from "react-redux";
import { shoppingCartActions } from "../store/shoppingCart";

const useShoppingCartRemove = () => {
    const dispatch = useDispatch();
    return (item) => {
        dispatch(shoppingCartActions.removeItemFromCart(item));
    };
};

export default useShoppingCartRemove;