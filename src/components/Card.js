import React from "react";
import { useHistory, useParams } from "react-router-dom";
import './Card.css';

function Card({ id, front, back, handleDelete }) {
    const history = useHistory();
    const { deckId } = useParams();

    const handleEdit = () => {
        history.push(`/decks/${deckId}/cards/${id}/edit`);
        };

  return (
    <div key={id} className="card">
      <div className="cardContent">
        <div className="cardSide">
          <p>{front}</p>
        </div>
        <div className="cardSide">
          <p>{back}</p>
        </div>
      </div>
      <div className="buttonContainer">
        <button onClick={handleEdit}>Edit</button>
        <button className="deleteButton" onClick={() => handleDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;