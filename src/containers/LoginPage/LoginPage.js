import React from 'react'
import Header from '../../components/Header/Header'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { TextField,Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    purple: {
      color: theme.palette.getContrastText(theme.palette.secondary.main),
      backgroundColor: theme.palette.secondary.main,
    }
  }));

const LoginPage = (props) =>{
        const classes = useStyles();
        return (
            <>
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
                        />
                    </Grid>
                    <Grid item  >
                        <Button variant='contained' color='primary' style={{width:360,marginTop:20}}>Login</Button>
                    </Grid>
                </Grid>
            </>
        )
    }

export default LoginPage;