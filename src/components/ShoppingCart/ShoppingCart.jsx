import ShoppingCartItem from "./ShoppingCartItem";

const ShoppingCart = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.amount * item.price, 0);
    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map((item) => (
                <ShoppingCartItem
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </div>
    );
};

export default ShoppingCart;