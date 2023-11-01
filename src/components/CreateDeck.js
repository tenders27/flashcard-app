import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { createDeck } from '../utils/api';
import DeckForm from './DeckForm';

function CreateDeck({ addNewDeck }) {
    const history = useHistory();
    const [newDeck, setNewDeck] = useState({ name: '', description: '' });

    const handleChange = ({ target }) => {
        setNewDeck({
          ...newDeck,
          [target.name]: target.value,
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
    
        try {
          const savedDeck = await createDeck(newDeck, abortController.signal);
          addNewDeck(savedDeck);
          history.push(`/decks/${savedDeck.id}`);
        } catch (error) {
          console.error('Failed to create deck', error);
        }
    
        return () => {
          abortController.abort();
        };
      };
    
      const handleCancel = () => {
        history.push('/');
      };
    
    return (
        <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
        </nav>
          <h3>Create Deck</h3>
          <DeckForm
            deck={newDeck}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        </div>
      );
}

export default CreateDeck;