import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { fetchPlatJourAction } from '../action/PlatAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import PlatCard from '../components/PlatCard';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Accueil = () => {
  const dispatch = useDispatch();
  const { plats = [], loading, error } = useSelector((state) => state.plats.data || {});
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const navigate = useNavigate();
  const storageUserinfo = JSON.parse(localStorage.getItem('user'));



  useEffect(() => {
    dispatch(fetchPlatJourAction());
  }, [dispatch]);

  const addToCart = (plat) => {
    const existingItem = cart.find((item) => item._id === plat._id);

    if (existingItem) {
      // Check if the total quantity after adding exceeds the available stock
      if (existingItem.quantity + 1 > plat.stock) {
        alert('La quantité demandée dépasse la disponibilité en stock.');
        return; // Prevent updating the cart if the stock limit is exceeded
      }

      const updatedCart = cart.map((item) =>
        item._id === plat._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Check if the initial quantity exceeds the available stock
      if (plat.quantity > plat.stock) {
        alert('La quantité demandée dépasse la disponibilité en stock.');
        return; // Prevent adding to the cart if the stock limit is exceeded
      }

      const updatedCart = [...cart, { ...plat, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };


  const openCartModal = () => setShowCartModal(true);
  const closeCartModal = () => setShowCartModal(false);

  const handleQuantityChange = (item, newQuantity) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem._id === item._id ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.prix * item.quantity, 0);
  };

  const handleCommander = () => {
    // Implement the logic for handling the order (e.g., sending the order to the server)
    if (storageUserinfo) {
    alert('Commande passée avec succès!'); // Replace this with your actual logic
    setCart([]);

    closeCartModal();
    navigate('/commande');
    } else {
      alert('Veuillez vous connecter pour commander');
      navigate('/login');
    }

  };

  return (
    <div style={{ position: 'relative' }}>
      <h2>Menu du jour</h2>
      <Container className="d-flex flex-wrap justify-content-center">
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
          <button onClick={openCartModal} className="btn btn-primary">
            Panier ({cart.length})
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <h2>{error}</h2>
        ) : plats.length > 0 ? (
          <React.Fragment>
            <PlatCard plats={plats} addToCart={addToCart} />
          </React.Fragment>
        ) : (
          <p>Menu indisponible</p>
        )}
      </Container>

      <Modal show={showCartModal} onHide={closeCartModal}>
        <Modal.Header closeButton>
          <Modal.Title>Votre panier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.map((item, index) => (
            <div key={index}>
              <p>
                {item.nom} x{item.quantity} - Prix: {(item.prix * item.quantity).toFixed(2)} €
              </p>
              <div>
                <label>Quantité:</label>
                <input
                  type="number"
                  value={item.quantity}
                  max={item.quantite}
                  onChange={(e) => handleQuantityChange(item, parseInt(e.target.value, 10))}
                />
                <button onClick={() => handleRemoveFromCart(item)}>Retirer du panier</button>
              </div>
            </div>
          ))}
          <h4>Total: {getTotalPrice().toFixed(2)} €</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeCartModal}>
            Fermer
          </Button>
          <Button variant="danger" onClick={handleCommander}>
            Commander
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Accueil;
