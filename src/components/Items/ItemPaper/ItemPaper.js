import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: '0',
        marginBottom:'15px',
        boxShadow: "none",
        width: '100',
        border: "1px solid #bdbdbd"
    },
    details: {
        width: 120, whiteSpace: 'nowrap',
        [theme.breakpoints.up('md')]:{width: 200}
    },
    content: {
        display: 'flex',
        flex: '4 0 auto',
        alignItems: 'center'
    },
    name: {
        fontFamily: "Roboto",
        fontSize: "1.2rem",
        [theme.breakpoints.up('md')]: { fontSize: '1.5rem' },
    },
    cover: {
        width: 100,
        flex: '1 0 auto'
    },
    price: {
        fontWeight: 'bold',
    }
}));


const ItemPaper = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} >
            <CardMedia
                className={classes.cover}
                image={props.src}
                title="Live from space album cover"
            />
            <CardContent className={classes.content}>
                
                    <div className={classes.details}>
                        <Box component="div" textOverflow="ellipsis" overflow="hidden" className={classes.name}>
                            {props.name}
                        </Box>
                        <Typography variant="subtitle1" color="textPrimary" style={{ fontSize: 12 }}>
                            Quantity : {props.qty}
                        </Typography>
                    </div>

                    <Typography variant="h5" className={classes.price}>
                        ₹{props.price * props.qty}
                    </Typography>
                    <IconButton aria-label="next" className={classes.ico} onClick={() => props.rmv(props.ind)}>
                        <DeleteIcon />
                    </IconButton>
            </CardContent >
        </Card >
    );
}

export default ItemPaper