import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { fetchPlatAction } from '../action/PlatAction';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import PlatCard from '../components/PlatCard';

const Accueil = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const plat = useSelector((state) => state.plat);
  useEffect(() => {
    dispatch(fetchPlatAction());
  }, [dispatch]);
  console.log(plat);

    return (
      <div>
          <h2>Menu du jour</h2>
          <Container className="d-flex flex-wrap justify-content-center">
              {loading ? (
                  <Loading />
              ) : error ? (
                  <h2>{error}</h2>
              ) : plats.length > 0 ? (
                  <PlatCard plats={plats} />
              ) : (
                  <p>No menu available</p>
              )}
          </Container>
      </div>
  );
};

export default Accueil;
