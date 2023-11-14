import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { fetchPlatAction } from '../action/PlatAction';
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

    useEffect(() => {
        dispatch(fetchPlatAction());
    }, [dispatch]);

    const addToCart = (plat) => {
        const updatedCart = [...cart, plat];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const openCartModal = () => setShowCartModal(true);
    const closeCartModal = () => setShowCartModal(false);

    return (
      <div style={{ position: 'relative' }}>
          <h2>Menu du jour</h2>
          <Container className="d-flex flex-wrap justify-content-center">
              {/* Ajout du bouton panier */}
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

            {/* Modal du panier */}
            <Modal show={showCartModal} onHide={closeCartModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Votre panier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart.map((item, index) => (
                        <div key={index}>{/* Render cart items here */}</div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCartModal}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Accueil;
