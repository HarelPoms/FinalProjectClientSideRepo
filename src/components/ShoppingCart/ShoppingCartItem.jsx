import { Button } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import "../../stylesheets/imgSizeLimit.css";

const ShoppingCartItem = ({ item, addToCart, removeFromCart }) => {
    
    return (
        <div>
            <div>
                <h3>{item.name}</h3>
                <div className="information">
                {/* <p>Price: ${item.price}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p> */}
                </div>
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
            <img src={item.image.url} alt={item.image.alt} className="previewImg" />
        </div>
    );
};

export default ShoppingCartItem;