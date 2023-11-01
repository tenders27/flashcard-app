import React from 'react';
import Deck from './Deck';
import './Deck.css'; 
import { Link } from 'react-router-dom';

function DeckList({ decks, deleteDeck }) {

  const listOfDecks = decks.map((deck) => (
    <Deck key={deck.id} {...deck} deleteDeck={deleteDeck}/>
  ));

  return (<>
    <Link to="/decks/new" className="btn btn-secondary mb-2">Create Deck</Link>
    <div>{listOfDecks}</div>
    </>
  );
}

export default DeckList;
