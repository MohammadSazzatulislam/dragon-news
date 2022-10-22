import React, { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user.displayName); // this way to get input value
  const photoURLRef = useRef(user?.photoURL); // this way to get input value

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, photoURLRef.current.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          defaultValue={user?.email}
          readOnly
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={handleNameChange}
          defaultValue={user?.displayName}
          type="text"
          placeholder="name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>photURL</Form.Label>
        <Form.Control
          ref={photoURLRef}
          defaultValue={user?.photoURL}
          type="text"
          placeholder="photoURL"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        update
      </Button>
    </Form>
  );
};

export default Profile;
