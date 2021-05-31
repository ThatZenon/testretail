import React from 'react';
import Layout from './components/Layout/Layout'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import {connect} from 'react-redux'
const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2',},
    secondary: { main: '#d50000' },
  },
});
const darkTheme = createMuiTheme({
  palette: {
    type:'dark',
    primary: { main: '#6ab7ff',},
    secondary: { main: '#ff6f60' },
  },
});
function App(props) {
  return (
    <ThemeProvider theme={(props.darkMode)?darkTheme:theme}>
      <CssBaseline />
        <Layout />
     </ThemeProvider>
  );
}
const mapStateToProps = state => {
  return {
      darkMode:state.darkMode
  }
}

export default connect(mapStateToProps)(App);
