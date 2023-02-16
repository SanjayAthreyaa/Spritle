import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Tooltip,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import logo from './images/logo.svg';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';

const Register = () => {

  const [turn , setTurn] = useState(0)
  const [user , setUser] = useState({})

  // State for the password viewing functionality
  const [showPassword, setShowPassword] = useState(false);

  // Function to show the passowrd on (click or mousedown)
  const handleClickShowPassword = () => setShowPassword(!showPassword);
 
  // Alert state for the alert box
  const [isAlert, setIsAlert] = useState(false);

  // Alert content
  const [alertContent, setAlertContent] = useState('');

  const navigate = useNavigate();

  var link = <Link style={{ textDecoration: 'none' }}>Conditions of Use</Link>;
  var linkk = <Link style={{ textDecoration: 'none' }}>Privacy Notice</Link>;
  var linkkk = (
    <Link
      onClick={() => navigate('/signin')}
      style={{ textDecoration: 'none', cursor: 'pointer' }}
    >
      Sign-in
    </Link>
  );

  const addTask = yup.object({
    name: yup.string().required('name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    mobilenumber: yup
      .string()
      .length(10, 'Provide a valid phone number')
      .required('Phone number is required'),
  });

  const taskFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      mobilenumber: '',
    },
    validationSchema: addTask,
    onSubmit: (values) => {
    
      setUser({
        fullName: values.name,
        email: values.email,
        password: values.password,
        mobile: values.mobilenumber,
      })
      setTurn(1)
      // handleRegister(userObj);
    },
  });

  // Sends request to server and registers the new user
  const addstudent = () => {
    const response = fetch(
      'http://localhost:3004/student',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.json())
    .then((res)=>{
      
      for (var x = 0; x < res.length; x++) {
   
        if(res[x].mobile === user.mobile){
          setTurn(0)
          setAlertContent(`Mobile number is already in use !`);
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 3000);
        }
        else if (res[x].email === user.email) {
          setTurn(0)
          setAlertContent(`Email is already in use !`);
          setIsAlert(true);
          setTimeout(() => {
            setIsAlert(false);
          }, 3000);
        } else {
          fetch('http://localhost:3004/student', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
          navigate('/signin');
          break;
        }
      }
    })
  
  }

  const addteacher = () => {
  
     
        const response = fetch(
          'http://localhost:3004/teacher',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        ).then((res) => res.json())
        .then((res)=>{
         
          for (var x = 0; x < res.length; x++) {
        
            if(res[x].mobile === user.mobile){
              setTurn(0)
              setAlertContent(`Mobile number is already in use !`);
            setIsAlert(true);
            setTimeout(() => {
              setIsAlert(false);
            }, 3000);
            }
            else if (res[x].email === user.email) {
              setTurn(0)
              setAlertContent(`Email is already in use !`);
              setIsAlert(true);
              setTimeout(() => {
                setIsAlert(false);
              }, 3000);
            } else {
              fetch('http://localhost:3004/teacher', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
              })
              navigate('/signin');
              break;
            }
          }
        })
      
       
    
  }


if(turn == 0){
  return (
    <Container
      component="main"
      maxWidth={'xs'}
      onSubmit={taskFormik.handleSubmit}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Tooltip title={'click to go home'}>
          <div
            style={{ cursor: 'pointer', margin: '2em' }}
            onClick={() => navigate('/')}
          >
    <img className='img-thumbnail' src={logo} alt="logo" style={{height:"50px"}}/>
          </div>
        </Tooltip>

        <div className="design" style={{ padding: '2em', marginBottom: '2em' }}>
          <Typography component="h1" variant="h5" className='d-flex justify-content-center'>
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              required
              fullWidth
              id="name"
              label="Your name"
              name="name"
              autoComplete="username"
              autoFocus
              value={taskFormik.values.name}
              onChange={taskFormik.handleChange}
              error={taskFormik.touched.name && Boolean(taskFormik.errors.name)}
              helperText={taskFormik.touched.name && taskFormik.errors.name}
              style={{ marginTop: '1em' }}
            />
            <TextField
              required
              fullWidth
              name="email"
              label="Enter your email"
              type="email"
              id="email"
              autoComplete="email"
              value={taskFormik.values.email}
              onChange={taskFormik.handleChange}
              error={
                taskFormik.touched.email && Boolean(taskFormik.errors.email)
              }
              helperText={taskFormik.touched.email && taskFormik.errors.email}
              style={{ marginTop: '1em' }}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Enter the password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={taskFormik.values.password}
              onChange={taskFormik.handleChange}
              error={
                taskFormik.touched.password &&
                Boolean(taskFormik.errors.password)
              }
              helperText={
                taskFormik.touched.password && taskFormik.errors.password
              }
              style={{ marginTop: '1em' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm password"
              type={showPassword ? 'text' : 'password'}
              id="confirmpassword"
              autoComplete="current-password"
              value={taskFormik.values.confirmpassword}
              onChange={taskFormik.handleChange}
              error={
                taskFormik.touched.confirmpassword &&
                Boolean(taskFormik.errors.confirmpassword)
              }
              helperText={
                taskFormik.touched.confirmpassword &&
                taskFormik.errors.confirmpassword
              }
              style={{ marginTop: '1em' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="mobilenumber"
              label="Your phone number"
              type="number"
              id="mobilenumber"
              value={taskFormik.values.mobilenumber}
              onChange={taskFormik.handleChange}
              error={
                taskFormik.touched.mobilenumber &&
                Boolean(taskFormik.errors.mobilenumber)
              }
              helperText={
                taskFormik.touched.mobilenumber &&
                taskFormik.errors.mobilenumber
              }
              style={{ marginTop: '1em' }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                label="Show password"
                control={
                  <Checkbox onChange={() => handleClickShowPassword()} />
                }
              />
            </div>
            {isAlert && (
              <Alert style={{ marginTop: '0.5em' }} severity="error">
                {alertContent}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Create your Spritle account
            </Button>

            <Grid container>
              <Typography>
                By signing in you are agreeing to our {link} and {linkk}
              </Typography>
              <Grid item>
                <div>Already have an account? {linkkk}</div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
      <hr />
      <p style={{ textAlign: 'center' }}>©️ 2022 Spritle.in</p>
    </Container>
  );
}
else{
  return(
    <div >
<h1 className='d-flex justify-content-center pt-5'>You are a ?</h1>

<div className="container-fluid d-flex justify-content-center pt-5">
<button type="button" className="btn btn-primary btn-lg" onClick={()=> addteacher()}>Teacher</button>
</div>

<div className="container-fluid d-flex justify-content-center pt-3">
<button type="button" className="btn btn-primary btn-lg" onClick={()=> addstudent()}>Student</button>
</div>
    </div>
  )
}
 
};

export default Register;