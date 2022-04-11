import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import LoginForm from '../components/LoginForm';
import { setUserDetails } from '../actions/session';

import UserService from '../services/user-service';


function Login({ setUserDetails, push }) {
  const goToHome = (params) => {
    push({
        pathName:'/',
        state:{
            showSnackbarMsg:true,
            message:params.message
        }
    })
  };

  return (
    <LoginForm
      setUserDetails={setUserDetails}
      goToHome={goToHome}
      UserService={UserService}
    />
  );
}

Login.propTypes = {
    setUserDetails : func.isRequired,
    push: func.isRequired
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => {
  return {
    setUserDetails: (username,fullname) => { 
        return new Promise((resolve, reject) => {
            dispatch(setUserDetails(username,fullname));
            resolve()
        });
    },
    push: (params) => dispatch(push({
        pathname: params.pathName,
        state: params.state
    }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
