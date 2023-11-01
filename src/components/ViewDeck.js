import { useParams, Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Card from "../components/Card"
import { readDeck } from "../utils/api";

function ViewDeck({ decks, deleteCard, deleteDeck }) {
    const { deckId } = useParams();
    const [cards, setCards] = useState([]);
    const [deckName, setDeckName] = useState('');
    const [deckDescription, setDeckDescription] = useState('');
    const history = useHistory();

    useEffect(() => {
        async function loadDeck() {
          try {
            const loadedDeck = await readDeck(deckId);
            if (loadedDeck) {
              setDeckName(loadedDeck.name);
              setDeckDescription(loadedDeck.description);
              setCards(loadedDeck.cards || []);
            }
          } catch (error) {
            console.error("Failed to load deck", error);
          }
        }
      
        loadDeck();
      }, [deckId]);

    useEffect(() => {
        // Find the deck based on deckId
        const deck = decks.find((d) => d.id === Number(deckId));
        // If deck is found, set the cards in state
        if (deck) {
          setCards(deck.cards || []);
        }
      }, [deckId, decks]);

      const handleDeleteCard = async (cardId) => {
        // deleteCard function will handle the confirmation and deletion when prompt is confirmed.
        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
        await deleteCard(Number(deckId), cardId);
        }
      };

      const handleDeleteDeck = async () => {
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
          await deleteDeck(Number(deckId));
          history.push("/"); // Redirect to Home screen
        }
      };

    return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item active" aria-current="page">{deckName}</li>
        </ol>
      </nav>
      <h2>{deckName}</h2>
      <p>{deckDescription}</p>
      <div className="mb-3">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">Edit</Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">Study</Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Card</Link>
        <button onClick={handleDeleteDeck} className="btn btn-danger float-right">Delete</button>
      </div>
      <div>
        {cards.map((card, index) => (
            <Card key={index} id={card.id} front={card.front} back={card.back} handleDelete={handleDeleteCard} />
        ))}
      </div>
    </div>
)}

export default ViewDeck;