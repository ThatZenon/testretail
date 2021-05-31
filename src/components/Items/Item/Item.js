import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import UserCart from '../../../context/user-cart'


const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 200,
    },
    dbox: {
        width: "100%",
        height: "100%"
    },
    price:{
        fontWeight:"bold"
    }
});

const Item = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} raised>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={(props.itm.hasOwnProperty('src'))?props.itm.src:"https://i.ibb.co/XjHQxL2/image.png"}
                    title={props.itm.name}
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h5" component="h6"  display="block" align="left" noWrap>
                                {props.itm.name}
                            </Typography></Grid>
                        <Grid item xs={6}>
                            <Typography className={classes.price} variant="h5"  component="h6" display="block" align="right">
                            ₹{props.itm.price}
                            </Typography></Grid>                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <UserCart.Consumer>{context => {
                    const clickHandler = ()=>{ 
                        context.addItem(props.itm.name, props.itm.price);
                        props.added(props.itm);
                    }
                    return (<Grid container spacing={2}>

                        <Grid item xs={6}>
                            <TextField type='number' label='Quantity' size='small' variant='outlined'
                                className={classes.dbox} defaultValue={1} id={(props.itm.id + "q")} inputProps={{min:1,max:20}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size="small" color="primary" variant="outlined" className={classes.dbox} 
                            onClick={clickHandler}>
                                ADD TO CART
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button size="medium" color="primary" variant="contained" className={classes.dbox} 
                            onClick={()=>props.buy(props.itm.name,props.itm.price)}>
                                BUY
                            </Button>
                        </Grid>

                    </Grid>)
                }}

                </UserCart.Consumer>
            </CardActions>
        </Card>
    );
}

export default Item;
    