import React from 'react'
import Header from '../../components/Header/Header'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { TextField, Button } from '@material-ui/core';
import { useRef, useState } from 'react'
import { connect } from 'react-redux';
import { NavLink,Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
    purple: {
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main,
    }
}));

const LoginPage = (props) => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);
    const [isRedirect, setRedirect] = useState(false);
    const emailRef = useRef();
    const pwdRef = useRef();
    const loginHandler = () => {
        const emailVal = emailRef.current.value;
        const pwdVal = pwdRef.current.value;
        console.log(emailVal+pwdVal);
        setLoading(true);
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0ye3aNx-OzOvyoLU8_Rl3smRxKllwNdM',
            {
              method: 'POST',
              body: JSON.stringify({
                email: emailVal,
                password: pwdVal,
                returnSecureToken: true,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then((res) => {
            setLoading(false);
            if (res.ok) {
               return res.json();
            } else {
                return res.json().then((data) => {
                    alert("Some Error Occured");
                    throw new Error("Some Error Occured");
                });
            }
        })
        .then(data=>{
            props.toggleLogin(true,data.idToken);
            setRedirect(true);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <>
            {isRedirect && (<Redirect to='/'/>)}
            <Header loginState={true} />
            <Grid style={{ marginTop: 100 }}
                spacing={1}
                container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid item xs={12}>
                    <Avatar className={classes.purple} style={{ width: 50, height: 50 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h4'>Login</Typography>
                </Grid>
                <Grid item >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        style={{ width: 360 }}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={emailRef}
                    />
                </Grid>
                <Grid item >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        style={{ width: 360 }}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={pwdRef}
                    />
                </Grid>
                {isLoading ? (<Grid item  >
                    <CircularProgress />
                </Grid>) : (<>
                    <Grid item  >
                        <Button variant='contained' color='primary' onClick={loginHandler} style={{ width: 360, marginTop: 20 }}>Login</Button>
                    </Grid>
                    <Grid item  >
                        <Button variant='outlined' component={NavLink} to={'/register'} color='primary' style={{ width: 360, marginTop: 10 }}>Register</Button>
                    </Grid></>)}
            </Grid>
        </>
    )
}

const mapDispatchToProps = dispatch =>{
    return {
        toggleLogin: (login,token) => dispatch ({type:"TOGGLE_LOGIN",payload:{value:login, token:token}})
    }
}

export default connect(null,mapDispatchToProps) (LoginPage);
