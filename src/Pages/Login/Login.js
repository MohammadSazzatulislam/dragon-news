import React, { useContext, useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


const Login = () => {

  const [error, setError] = useState('')

    const navigate = useNavigate()
  const {user, signInUser, setLoading } = useContext(AuthContext);
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

     const handleSubmit = (event) => {
       event.preventDefault();

       const form = event.target;
       const email = form.email.value;
       const password = form.password.value;

       signInUser(email, password)
         .then((result) => {
           const user = result.user;
           form.reset();
           setError("");
           if (user?.emailVerified) {
             navigate(from, { replace: true });
           } else {
             toast.error(
               "your email not verified.Please verified your email address!!"
             );
           }
         })
         .catch((error) => {
           console.error(error);
           setError(error.message);
         })
         .finally(() => {
           setLoading(false);
         })  
 
     };



    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Log In
        </Button>
        <br />
        <Form.Text className="text-danger">{error}</Form.Text>
      </Form>
    );
};

export default Login;