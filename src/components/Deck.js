import React from 'react';
import './Deck.css';
import { Link } from 'react-router-dom';

function Deck({ id, name, description, cards, deleteDeck}) {
    const buttons = [
        {
            label: "View",
            path: `/decks/${id}`
        },
        {
            label: "Study",
            path: `/decks/${id}/study`
        }
    ];

    const handleDelete = () => {
      if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
          deleteDeck(id);
      }
  };

  return (
    <div className="deck" key={id}>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{(cards && cards.length) ? cards.length : 0} cards</p>
      <div className="buttonContainer">
        {buttons.map((button, index) => (
          <Link key={index} to={button.path} className="button-link">
            <button>{button.label}</button>
          </Link>
          
        ))}
        <button onClick={handleDelete} className="btn btn-danger float-right">Delete</button>
      </div>
    </div>
  );
}

export default Deck;
