import {React, useState} from 'react';
import { func , object} from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme();

  /*
    custom MUI styles
  */ 
const useStyles = makeStyles((theme) => ({
  btn_row: {
    'padding-top': theme.spacing(2),
    '& > button': {
      'margin-right': theme.spacing(4)
    },
  },
  snackbar_error : {
    '& > div': {
      background:'#f44336'
    }
  }
}));


function LoginForm({setUserDetails,goToHome, UserService}) {

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
      username: '',
      password: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = formData;

  const cssClasses = useStyles();
  
  /*
    update form data in relevant state object
  */ 
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }
  

  /*
    handle submit of login form
  */ 
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!username || !password){
      setSubmitted(true);  
      return;
    }
    setSubmitted(true);
    setShowError(false);
    UserService.login(username,password)
    .then(response => {
      if(response.status === 200){
        setUserDetails(setUserDetails(username,response.data.fullname)).then(()=>{
          goToHome({
            message:`You have succesfuly logged in ${response.data.fullname}`
          })
        });
      }else if(response.status === 401){
        let errorMsg = `${response.data.status} - ${response.data.message}`;
        setErrorMessage(errorMsg);
        setShowError(true);

      }
    })
  };

  /*
    method to reset snackbar display false
  */ 
  const handleCloseSnackbar = () =>{
    setShowError(false)
  }

  /*
    method to reset form data
  */ 
  const resetForm = () => {
    setFormData({username:'',password:''});
    setSubmitted(false);
    setShowError(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border:'2px solid #999',
            padding: theme.spacing(4),
            'border-radius':'5px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Please log in below
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              autoComplete="username"
              variant="outlined"
              error={submitted && !username}
              helperText={submitted && username === "" ? 'Enter username!' : ''}
              onChange={handleChange}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              autoComplete="current-password"
              error={submitted && !password}
              onChange={handleChange}
              helperText={submitted && password === "" ? 'Enter password!' : ''}
              variant="outlined" 
              
            />

            <div className={cssClasses.btn_row}>
              <Button
                variant="contained" 
                color="primary"
                type="submit"
                id="signup-btn"
              >
                Sign In
              </Button>

              <Button
                type="button"
                variant="contained" 
                color="secondary"
                id="reset-btn"
                sx={{ ml:4 }}
                className={cssClasses.btn_spaces}
                onClick={resetForm}
              >
                Reset
              </Button>
            </div>
            
            <Snackbar open={showError} 
              autoHideDuration={9000} 
              onClose={handleCloseSnackbar}  
              message={errorMessage} 
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              id="login-form-snackbar"
              severity="error" 
              classes = {{ root: cssClasses.snackbar_error}}
            />

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

LoginForm.propTypes = {
  setUserDetails: func.isRequired,
  goToHome: func.isRequired,
  UserService: object.isRequired
};

export default LoginForm;