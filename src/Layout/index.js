import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";

import DeckList from "../components/DeckList";
import ViewDeck from "../components/ViewDeck";
import Study from "../components/Study";
import AddCard from "../components/AddCard";
import EditDeck from "../components/EditDeck";
import CreateDeck from "../components/CreateDeck";
import EditCard from "../components/EditCard";

import { updateCard as updateCardApi } from "../utils/api";
import { deleteCard as deleteCardApi } from "../utils/api";
import { deleteDeck as deleteDeckAPI } from "../utils/api";
import { listDecks } from "../utils/api";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    
    async function loadDecks() {
      try {
        const loadedDecks = await listDecks(abortController.signal);
        setDecks(loadedDecks);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch was aborted");
        } else {
          console.error("Failed to load decks", error);
        }
      }
    }

    loadDecks();

    return () => {
      abortController.abort();
    };
  }, []);

  const updateDeckWithNewCard = (deckId, newCard) => {
    setDecks((prevDecks) => {
      const updatedDecks = prevDecks.map((deck) => {
        if(deck.id === Number(deckId)) {
          const updatedCards = Array.isArray(deck.cards) ? [...deck.cards, newCard] : [newCard];
          return {...deck, cards: updatedCards};
        }
        return deck;
      });
      return updatedDecks;
    });
  }

  const addNewDeck = (newDeck) => {
    setDecks((prevDecks) => [...prevDecks, newDeck]);
  }

  const deleteCard = async (deckId, cardId) => {
    try {
        await deleteCardApi(cardId);

        setDecks((prevDecks) => {
          return prevDecks.map((deck) => {
            if (deck.id === deckId) {
              const updatedCards = deck.cards.filter((card) => card.id !== cardId);
              return { ...deck, cards: updatedCards };
            }
            return deck;
          });
        });
    } catch (error) {
      console.error("Failed to delete card", error);
    }
  };

  const updateDeck = (updatedDeck) => {
    setDecks((prevDecks) => {
      return prevDecks.map((deck) => {
        if (deck.id === updatedDeck.id) {
          return updatedDeck;
        }
        return deck;
      });
    });
  };

  const deleteDeck = async (deckId) => {
    try {
      await deleteDeckAPI(deckId);
  
      setDecks((prevDecks) => {
        return prevDecks.filter((deck) => deck.id !== deckId);
      });
  
    } catch (error) {
      console.error("Failed to delete deck", error);
    }
  };

  const updateCard = async (updatedCard) => {
    try {
      const returnedCard = await updateCardApi(updatedCard);

      setDecks((prevDecks) => {
        return prevDecks.map((deck) => {
          if (deck.id === updatedCard.deckId) {
            const updatedCards = deck.cards.map((card) => {
              if (card.id === updatedCard.id) {
                return returnedCard;
              }
              return card;
            });
            return { ...deck, cards: updatedCards };
          }
          return deck;
        });
      });
    } catch (error) {
      console.error("Failed to update card", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <DeckList decks={decks} deleteDeck={deleteDeck}/>
          </Route>
          <Route exact={true} path="/decks/new" >
            <CreateDeck addNewDeck={addNewDeck}/>
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <ViewDeck decks={decks} deleteCard={deleteCard} deleteDeck={deleteDeck}/>
          </Route>
          <Route exact={true} path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/new">
            <AddCard decks={decks} updateDeckWithNewCard={updateDeckWithNewCard}/>
          </Route>
          <Route exact={true} path="/decks/:deckId/edit">
            <EditDeck updateDeck={updateDeck}/>
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
            <EditCard updateCard={updateCard}/>
          </Route>
          <Route>
          <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
