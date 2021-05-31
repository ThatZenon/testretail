import React from 'react';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    sbox: {
        
        position:'relative',
        marginTop: "5px",
        marginBottom: "20px",
        width:"100%"
    }

})


const Searchbox = (props) => {
    const classes = useStyles();
    return (
        <TextField id="item-search" 
        label="Search" 
        type="search" 
        variant="outlined" 
        className={classes.sbox} onChange={props.changed}/>
    )
}
export default Searchbox;