import { Button } from "@mui/material";
import { Grid, Typography, Divider } from "@mui/material";
import "../../stylesheets/shoppingCartStyle.css";

const ShoppingCartItem = ({ item, addToCart, removeFromCart }) => {
    
    return (
        <div>
            <div>
                <h3 className="alignTextToCenter">{item.name}</h3>
                <div className="alignTextToCenter">
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
                </div>
                <img src={item.image.url} alt={item.image.alt} className="previewImg" />
                <Grid container spacing={1} align="center" direction="row">
                    <Grid item xs={5}>
                        <Button
                            size="small"
                            disableElevation
                            variant="contained"
                            onClick={() => removeFromCart(item)}
                        >
                            -
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{item.amount}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Button
                            size="small"
                            disableElevation
                            variant="contained"
                            onClick={() => addToCart(item)}
                        >
                            +
                        </Button>
                    </Grid>
                    
                </Grid>
            </div>
            <Divider sx={{mt:1, bgcolor: "secondary.light"}} />
        </div>
    );
};

export default ShoppingCartItem;