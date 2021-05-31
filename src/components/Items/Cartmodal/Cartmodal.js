import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ItemPaper from '../ItemPaper/ItemPaper'
import Typography from '@material-ui/core/Typography'
export default class Cartmodal extends Component {
    // state = {
    //     open: false
    // }
    // handleClickOpen = () => {
    //     console.log("hand open")
    //     this.setState({ open: true })
    // };
    content; accept; divShow = false;total=0;
    handleClose = () => {
        this.props.close()

        //     this.setState({ open: false })

    };
    shouldComponentUpdate(nextProps) {
        if (this.props.show !== nextProps.show || (this.props.show && (this.props.ucart.length !== nextProps.ucart.length))) {
            return true;
        }
        else
            return false
    }
    render() {
        this.total=0;
        if (this.props.login) {
            if (this.props.ucart.length > 0) {
                this.content = this.props.ucart.map((itm, id) => {
                    this.total=this.total+itm.qty*itm.price;
                    return (
                        <ItemPaper name={itm.name} src={(itm.hasOwnProperty('src'))?itm.src:"https://i.ibb.co/XjHQxL2/image.png"} qty={itm.qty} price={itm.price} key={id} ind={id} rmv={(id) => { this.props.removeItem(id) }} />
                    )
                })
                this.accept = "Checkout";
                this.divShow = true;
            }
            else {
                this.content = (<Typography>Your Cart is empty</Typography>)
                this.accept = 'OK'
                this.divShow = false;
            }
        }
        else {
            this.content = (<Typography>Please login to add items to cart.</Typography>)
            this.accept = "OK"
            this.divShow = false;
        }
        return (
            <div>
                <Dialog
                    open={this.props.show}
                    scroll={'paper'}
                    fullWidth={!this.divShow}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="dialog-title">{"Cart"}</DialogTitle>
                    <DialogContent dividers={this.divShow}>
                        {this.content}
                        {(this.divShow) ? (
                        <div style={{textAlign:'right'}}>
                            <Typography variant='h5' style={{ display: 'inline' }}>Total Price : </Typography>
                            <Typography variant='h5' style={{ display: 'inline', fontWeight: 'bold' }}>₹{this.total}</Typography>
                        </div>) : null}
                    </DialogContent >
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary" variant="contained">
                            {this.accept}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}