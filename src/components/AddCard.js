import { useParams, useHistory, Link } from "react-router-dom";
import { createCard } from "../utils/api";
import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard({ updateDeckWithNewCard }) {
    const { deckId } = useParams();
    const history = useHistory();
    const [deckToAddTo, setDeckToAddTo] = useState({});
    const [cardToAdd, setCardToAdd] = useState({ front: "", back: "" });
  
    useEffect(() => {
      const abortController = new AbortController();
  
      async function loadDeck() {
        try {
          const loadedDeck = await readDeck(deckId, abortController.signal);
          setDeckToAddTo(loadedDeck);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Fetch was aborted");
          } else {
            console.error("Failed to load deck", error);
          }
        }
      }
  
      loadDeck();
  
      return () => {
        abortController.abort();
      };
    }, [deckId]);

    const handleChange = ({ target }) => {
      setCardToAdd({
          ...cardToAdd,
          [target.name]: target.value,
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
    
        try {
          const createdCard = await createCard(deckId, cardToAdd, abortController.signal);
          updateDeckWithNewCard(deckId, createdCard);
          setCardToAdd({ front: "", back: "" });
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Fetch was aborted");
          } else {
            console.error("Failed to create card", error);
          }
        }
      };
    
      const handleDone = () => {
        history.push(`/decks/${deckId}`);
      };

    return (
      <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckToAddTo.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
        </nav>
      <h2>{deckToAddTo.name}: Add Card</h2>
        <CardForm
          card={cardToAdd}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleDone}
          buttonText1="Done"
          buttonText2="Save"
        />
      </div>
);
}

export default AddCard;