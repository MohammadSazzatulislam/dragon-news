import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Register = () => {
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);

  const navigate = useNavigate();
  const { createNewUser, userProfileUpdate, verifyEmail } =
    useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const photo = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        form.reset();
        setError("");
        handleUpdateProfile(name, photo);
        handleVerifyEmail()
        if (user?.emailVerified) {
          toast.success("successfully created");
          navigate(from, { replace: true });
        } else {
          toast.error('Please verify your email')
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const handleUpdateProfile = (name, photo) => {
    const profile = { displayName: name, photoURL: photo };
    userProfileUpdate(profile)
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  

  const handleAccepted = (event) => {
    setAccepted(event.target.checked);
  };


  const handleVerifyEmail = () => {
    verifyEmail().then(() => {
      // Email verification sent!
      // ...
    });

  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhotoURL">
        <Form.Label>Photo URL </Form.Label>
        <Form.Control
          name="photoURL"
          type="text"
          placeholder="Enter Photo URL"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          onClick={handleAccepted}
          label={
            <>
              Accept <Link to="/terms"> all terms and condition</Link>
            </>
          }
        />
      </Form.Group>

      <Button disabled={!accepted} variant="primary" type="submit">
        Register
      </Button>
      <br />

      <Form.Text className="text-danger">{error}</Form.Text>
    </Form>
  );
};

export default Register;
