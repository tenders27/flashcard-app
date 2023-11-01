import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck as updateDeckApi } from "../utils/api";
import DeckForm from "./DeckForm";

function EditDeck({ updateDeck }) {
    const { deckId } = useParams();
    const history = useHistory();
    const [deckToEdit, setDeckToEdit] = useState({ name: "", description: "" });
  
    useEffect(() => {
      const abortController = new AbortController();
  
      async function loadDeck() {
        try {
          const fetchedDeck = await readDeck(deckId, abortController.signal);
          setDeckToEdit(fetchedDeck);
        } catch (error) {
          if (error.name !== "AbortError") {
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
      setDeckToEdit({
        ...deckToEdit,
        [target.name]: target.value,
      });
    };

    const handleCancel = () => {
      history.goBack();
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedDeck = { ...deckToEdit, deckToEdit};
        await updateDeckApi(updatedDeck);
        updateDeck(updatedDeck);
        history.push(`/decks/${deckId}`);
      };
  
    return (
      <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckToEdit.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
        </nav>
        <h2>Edit Deck</h2>
        <DeckForm
          deck={deckToEdit}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </div>
    );
  }

export default EditDeck;