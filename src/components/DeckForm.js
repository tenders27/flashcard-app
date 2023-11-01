import React from 'react';

function DeckForm({ deck, handleChange, handleSubmit, handleCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          onChange={handleChange}
          value={deck.name}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          onChange={handleChange}
          value={deck.description}
          rows="3"
        />
      </div>
      <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default DeckForm;