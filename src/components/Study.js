import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams, useHistory, Link } from "react-router-dom";

function Study() {
    const { deckId } = useParams();
    const history = useHistory();
    const [currentDeck, setCurrentDeck] = useState(null);
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        
        async function loadDeck() {
          try {
            const loadedDeck = await readDeck(deckId, abortController.signal);
            setCurrentDeck(loadedDeck);
          } catch (error) {
            if (error.name === "AbortError") {
              console.log("Fetch was aborted");
            } else {
              console.error("Failed to load decks", error);
            }
          }
        }
    
        loadDeck();
    
        return () => {
          abortController.abort();
        };
    }, [deckId]);

    if (!currentDeck || !currentDeck.cards) {
        return <p>Loading...</p>;
    }
    
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    
    const handleNext = () => {
        if (currentCard < currentDeck.cards.length - 1) {
            setCurrentCard(currentCard + 1);
            setIsFlipped(false);
        } else {
            if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
                setCurrentCard(0);
                setIsFlipped(false);
            } else {
                history.push("/");
            }
        }
    };

    return (
        <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{currentDeck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
        </nav>
            <h2>{currentDeck.name}: Study</h2>
            {currentDeck.cards.length < 3 ? (
        <div>
            <h3>Not enough cards</h3>
          <p>
            You need at least 3 cards to study. There are{" "}
            {currentDeck.cards.length} cards in this deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {currentCard + 1} of {currentDeck.cards.length}
            </h5>
            <p className="card-text">
              {isFlipped
                ? currentDeck.cards[currentCard].back
                : currentDeck.cards[currentCard].front}
            </p>
          </div>
          <button onClick={handleFlip}>Flip</button>
          {isFlipped && <button onClick={handleNext}>Next</button>}
        </div>
      )}
    </div>
  );

    
}

export default Study;