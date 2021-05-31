import React, { Component } from 'react'
import Item from './Item/Item'
import Grid from '@material-ui/core/Grid'
import Searchbox from '../Searchbox/Searchbox'
import { withSnackbar } from 'notistack';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../Header/Header'
import Cartmodal from './Cartmodal/Cartmodal';
import Fab from '@material-ui/core/Fab';
import TuneRoundedIcon from '@material-ui/icons/TuneRounded';
import Typography from '@material-ui/core/Typography'
import FilterMenu from './FilterMenu/FilterMenu'
import Grow from '@material-ui/core/Grow'
import {connect} from 'react-redux'
class Items extends Component {
    state = {
        usercart: [],
        orders: 0,
        loaded: false,
        items: null,
        showmodal: false,
        searchRes: [],
        filterShow: false,
        filtersOn: false,
        displayRes: []
    }
    content; searchquery = '';
    modalToggleHandler = (value) => {
        this.setState({ showmodal: value })
    }
    loginHandler = () => {
        this.props.enqueueSnackbar("Logged in successfully", { variant: 'success' });
        this.setState({ login: true })
    }
    logoutHandler = () => {
        this.props.enqueueSnackbar("Logged out successfully", { variant: 'success' });
        this.setState({ login: false })
    }
    filterMenuHandler = show => {
        this.setState({ filterShow: show })
    }
    applyFilters = (min, max,sort) => {
        let samp = [];
        this.state.items.forEach((element) => {
            if (element.price >= min && element.price <= max) {
                samp.push(element);
            }
        });
        if(sort ===1)
        {
            samp.sort((a,b)=> a.price-b.price)
        }
        else if(sort ===2 )
        {
            samp.sort((a,b)=> b.price-a.price)
        }
        this.setState({ displayRes: samp, filtersOn: true });
    }
    removeFromCartHandler = id => {
        //const samp = [...this.props.usercart];
        this.props.enqueueSnackbar(this.props.usercart[id].name + " x" + this.props.usercart[id].qty + " was removed from cart", { variant: 'info' });
        this.props.rmvItem(id)
        //this.setState({ usercart: samp })
    }
    buyHandler = (name, price) => {
        if (this.props.loginState) {
            const qtyval = Number(document.getElementById(name + "q").value);
            const samp = [{ name: name, price: price, qty: qtyval }];
            this.setState({ usercart: samp, showmodal: true })
        }
        else {
            this.props.enqueueSnackbar("Please Login first to buy items", { variant: 'warning' });
        }
    }
    componentDidMount = () => {
        if (!this.state.loaded) {

            axios.get('https://web-item-database.firebaseio.com/items.json')
                .then(response => {
                    this.setState({ loaded: true, items: response.data, displayRes: response.data })
                })
        }
    }
    searchInputHandler = () => {
        console.log('updated')
        const query = document.getElementById('item-search').value.toLowerCase();
        this.searchquery = query;
        let resultsArray = [];
        this.state.displayRes.forEach(itm => {
            if (itm.name.toLowerCase().includes(query))
                resultsArray.push(itm)
        })
        if (resultsArray.length !== this.state.searchRes.length)
            this.setState({ searchRes: resultsArray })

    }
    displayGenerator = () => {
        let samp;
        if (this.searchquery.length > 0) {
            samp = this.state.searchRes
        }
        else if (this.state.filtersOn) {
            samp = this.state.displayRes
        }
        else {
            samp = this.state.items
        }
        let val = samp.map(itm => {
            return (
                <Grid item xs={12} sm={6} md={4} key={itm.id} >
                        <Item itm={itm}
                            added={() => this.addItemSnackbar(itm)}
                            buy={() => this.buyHandler(itm)} />
                </Grid>
            )
        })
        return val;
    }
    addItemSnackbar = (itm) => {
        const qtyval = Number(document.getElementById(itm.id + "q").value);
        let flag = -1;
        if (this.props.loginState) {
            if (qtyval > 0) {
                this.props.usercart.forEach((obj, id) => {
                    if (obj.id === itm.id)
                        flag = id;
                })
                this.props.enqueueSnackbar(itm.name + ' x' + qtyval + " was added to cart", { variant: 'success' });
                const samp = [...this.props.usercart];

                if (flag !== -1) {
                    samp[flag].qty = samp[flag].qty + qtyval
                    this.props.editItem(flag,samp[flag])
                }
                else {
                    itm.qty = qtyval
                    this.props.addItem(itm);
                    
                }
                //this.setState({ usercart: samp })
            }
            else {
                this.props.enqueueSnackbar("Invalid Quantity", { variant: 'error' });
            }
        }
        else {
            this.props.enqueueSnackbar("Please Login first to add items to cart", { variant: 'warning' });
        }
    };
    render() {
        if (this.state.loaded) {
            if ((this.state.searchRes.length > 0 && this.searchquery.length > 0) ||(this.state.filtersOn && this.state.displayRes.length>0 && this.searchquery.length ===0) ||(!this.state.filtersOn && this.searchquery.length===0)) {
                this.content = (
                    <>
                        <Grid item xs={12} >
                            <Searchbox changed={this.searchInputHandler} />
                        </Grid>
                        <Grid container spacing={4}>
                            {this.displayGenerator()}
                        </Grid>
                    </>
                )
            }
            else {
                this.content = (<>
                    <Grid item xs={12} >
                        <Searchbox changed={this.searchInputHandler} />
                    </Grid>
                    <Grid container >
                        <Typography style={{ margin: 'auto' }}>No results found</Typography>
                    </Grid>
                </>)
            }
        }
        else
            this.content = (<CircularProgress style={{ position: "fixed", top: "50%", left: "50%" }} />)
        return (
            <Grid direction='column' container>
                <Grid item xs={12}>
                    <Header badgeVal={this.props.usercart.length}
                        cartclick={() => this.modalToggleHandler(true)}
                        loginToggle={(val)=>this.props.toggleLogin(val)}
                     />
                    <Cartmodal show={this.state.showmodal}
                        close={() => this.modalToggleHandler(false)}
                        ucart={this.props.usercart}
                        login={this.props.loginState}
                        removeItem={(id) => { this.removeFromCartHandler(id) }} />
                </Grid>
                <Grid item xs={12} style={{position:'relative',top:70}}>
                    <div style={{ flexGrow: 1, margin: "15px" }}>
                        <Grid container justify='center' >
                            <Grid xs={false} md={2} item />
                            <Grid item xs={12} md={8}>
                                {this.content}
                                <Grow in={!this.state.filterShow} timeout={500}>
                                    <Fab color='secondary' variant='extended' style={{
                                        position: 'fixed',
                                        bottom: 35,
                                        right: 40,
                                    }}
                                        onClick={() => this.filterMenuHandler(true)}>
                                        <TuneRoundedIcon style={{ marginRight: 8 }} />
                                      FILTER
                                </Fab>
                                </Grow>
                            </Grid>
                            <Grid xs={false} md={2} item />
                        </Grid>
                    </div>
                </Grid>
                <FilterMenu show={this.state.filterShow}
                    close={() => this.filterMenuHandler(false)}
                    apply={this.applyFilters} />
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginState:state.login,
        usercart:state.usercart
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        toggleLogin: (login) => dispatch ({type:"TOGGLE_LOGIN",payload:{value:login}}),
        addItem: (itm) => dispatch ({type:"ADD_ITEM",payload:{itm:itm}}),
        rmvItem: (id) => dispatch ({type:"RMV_ITEM",payload:{id:id}}),
        editItem: (id,itm) => dispatch ({type:"EDIT_ITEM",payload:{itm:itm,id:id}})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withSnackbar(Items));