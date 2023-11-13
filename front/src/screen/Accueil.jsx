import React, { useState } from 'react';

const Accueil = () => {
  // Exemple de données pour les plats et desserts du jour
  const menuItems = [
    { id: 1, name: 'Plat 1', description: 'Description du plat 1' },
    { id: 2, name: 'Plat 2', description: 'Description du plat 2' },
    { id: 3, name: 'Dessert 1', description: 'Description du dessert 1' },
    { id: 4, name: 'Dessert 2', description: 'Description du dessert 2' },
  ];

  // État pour stocker les articles sélectionnés
  const [selectedItems, setSelectedItems] = useState([]);

  // Fonction pour ajouter un article au panier
  const addToCart = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <div>
      <h2>Menu du jour</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <button onClick={() => addToCart(item)}>Ajouter au panier</button>
          </li>
        ))}
      </ul>

      <div>
        <h2>Panier</h2>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accueil;
