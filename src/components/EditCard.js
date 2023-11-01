import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { readDeck, readCard } from '../utils/api';
import CardForm from './CardForm';

function EditCard({ updateCard }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deckToEdit, setDeckToEdit] = useState({});
  const [cardToEdit, setCardToEdit] = useState({ front: '', back: '' });

  useEffect(() => {
    async function loadData() {
      try {
        const loadedDeck = await readDeck(deckId);
        const loadedCard = await readCard(cardId);
        setDeckToEdit(loadedDeck);
        setCardToEdit(loadedCard);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, [deckId, cardId]);

  const handleChange = ({ target }) => {
    setCardToEdit({ ...cardToEdit, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(cardToEdit);
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckToEdit.name}</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
      </ol>
      </nav>
      <h2>Edit Card</h2>
      <CardForm 
        card={cardToEdit}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        buttonText1="Cancel"
        buttonText2="Submit"
      />
    </div>
  );
}

export default EditCard;