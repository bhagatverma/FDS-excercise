import {React, useState, useEffect} from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

import { logout } from '../actions/session';


import AppToolbar from '../components/AppToolbar';

const cssClasses = makeStyles({
  root: {
    '& > div': {
      background:'#4caf50'
    }
  }
});

function Main({ isLoggedIn, logout, push , location }) {
  const [showSnackBar, setShowSnackbar] = useState(false);
  const [showSnackbarMsg, setShowSnackbarMsg] = useState('');
  const styles = cssClasses();


  const handleLogin = () => {
    push('/login');
  };

  useEffect(()=>{
    if(location.state && location.state.showSnackbarMsg){
      setShowSnackbar(true);
      setShowSnackbarMsg(location.state.message)
    }
  },[])

  
  const handleCloseSnackbar = () => {
    setShowSnackbar(false)
  }

  return (
    <div>
      <AppToolbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={logout}
      />
      
      <Snackbar open={showSnackBar} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}  
          message={showSnackbarMsg} 
          severity="success" 
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          classes = {{ root: styles.root}}
        />
    </div>
  );
}

Main.propTypes = {
  isLoggedIn: bool.isRequired,
  logout: func.isRequired,
  push: func.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.getIn(['session', 'username'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    push: path => dispatch(push(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
