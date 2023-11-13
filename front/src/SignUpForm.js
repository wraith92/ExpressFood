import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`First Name: ${firstName}, Last Name: ${lastName}, Address: ${address}, Phone: ${phone}, Email: ${email}, Password: ${password}`);
    // You can add your own logic here to submit the form data to a server or perform other actions
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Prénom</Form.Label>
          <Form.Control type="text" placeholder="Entrez votre prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Nom de famille</Form.Label>
          <Form.Control type="text" placeholder="Entrez votre nom de famille" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Adresse</Form.Label>
          <Form.Control type="text" placeholder="Entrez votre adresse" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Numéro de téléphone</Form.Label>
          <Form.Control type="tel" placeholder="Entrez votre numéro de téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Adresse e-mail</Form.Label>
          <Form.Control type="email" placeholder="Entrez votre adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          S'inscrire
        </Button>
      </Form>
    </div>
  );
}

export default SignUpForm;
