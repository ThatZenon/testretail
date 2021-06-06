import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import {NavLink} from 'react-router-dom'
class NavDrawer extends Component {
    state = {
        open: this.props.show
    }
    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.show) {
            return {
                open: props.show
            }
        }
        return null
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.show !== nextProps.show) {
            return true;
        }
        else
            return false;
    }
    toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.props.close()
    }
    render() {
        return (
            <Drawer anchor='left' open={this.state.open} onClose={this.toggleDrawer(false)}>
                 <List style={{
                    width: 260,
                }}>
                    <ListItem style={{paddingTop:0}}>
                        <ListItemAvatar>
                            <IconButton onClick={this.toggleDrawer(false)}>
                                <ArrowBackIcon />
                            </IconButton>
                        </ListItemAvatar>
                        <ListItemText>
                            Navigation
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    
                    <ListItem button component={NavLink} to={'/login'}>
                        <ListItemText>Login</ListItemText>
                    </ListItem>
                    <ListItem button component={NavLink} to={'/register'}>
                        <ListItemText>Register</ListItemText>
                    </ListItem>
                    <ListItem button component={NavLink} to={'/'}>
                        <ListItemText>Marketplace</ListItemText>
                    </ListItem>
            
                </List>
            </Drawer>
        )
    }
}

export default NavDrawer
