import React from "react";

function CardForm({ card, handleChange, handleSubmit, handleCancel, buttonText1, buttonText2 }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          value={card.front}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          value={card.back}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
      {handleCancel && <button type="button" className="btn btn-secondary" onClick={handleCancel}>{buttonText1}</button>}
      <button type="submit" className="btn btn-primary">{buttonText2}</button>
    </form>
  );
}

export default CardForm;
