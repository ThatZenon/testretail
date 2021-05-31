import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { NavLink } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import NavDrawer from '../Items/NavDrawer/NavDrawer'
import {connect} from 'react-redux'
const useStyles = makeStyles(() => ({
    root: {
        //flexGrow: 1,
    },
     grow: {
        width:"100%",
     },
     appBar:{
        flexWrap:"wrap",
     },
    menubtn:{
        marginRight:5
    }
}));
function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


const Header = (props) => {
    const classes = useStyles();
    const [menu,setMenu] =  React.useState(false)
    const navMenuHandler = show =>{
        setMenu(show)
    }
    let logbutton;
    if (window.location.pathname==="/login") {
        logbutton = (<Button component={NavLink} to={'/'} color="inherit" >Marketplace</Button>)
    }
    else if(window.location.pathname==="/" && !props.loginState){
        logbutton = (<Button component={NavLink} to={'/login'} color="inherit">Login</Button>);
    }
    else{
        logbutton = (<Button component={NavLink} to={'/'} color="inherit" onClick={props.loginToggle(false)}>Login</Button>);
    }
    
    return (
        <div className={classes.root}>
            <HideOnScroll {...props}>
                <AppBar color={(props.darkMode)?'default':'primary'} className={classes.appBar} >
                    <Toolbar>
                        <IconButton color="inherit" className={classes.menubtn} onClick={()=>navMenuHandler(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.grow}>
                            Website
                        </Typography>
                        <IconButton color="inherit" onClick={props.toggleDark}>
                            <Brightness4Icon />
                        </IconButton>
                        <IconButton color="inherit" onClick={props.cartclick}>
                            <Badge badgeContent={props.badgeVal} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                            {logbutton}
                       
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <NavDrawer show={menu} close={()=>navMenuHandler(false)}/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loginState:state.login,
        darkMode:state.darkMode
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        toggleDark: () => {
            dispatch ({type:"TOGGLE_DARK"})
        }
    }
}
export default connect(mapStateToProps  ,mapDispatchToProps)(React.memo(Header));