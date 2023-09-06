import ShoppingCartItem from "./ShoppingCartItem";
import "../../stylesheets/shoppingCartStyle.css";
import { Divider } from "@mui/material";

const ShoppingCart = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items) =>
        items.reduce((acc, item) => acc + item.amount * item.price, 0);
        
    return (
        <div>
            <h2 className="alignTextToCenter">Your Cart</h2>
            <Divider sx={{mt:1, bgcolor: "secondary.light"}} />
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map((item) => (
                <ShoppingCartItem
                key={item._id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                />
            ))}
            <h2 className="alignTextToCenter">Total: {String.fromCharCode(0x20aa)}{calculateTotal(cartItems).toFixed(2)}</h2>
        </div>
    );
};

export default ShoppingCart;