import React from 'react';
import { type CardItem } from '../../../types';
import { Card } from '../Card/Card';
import './Column.css';

interface Props {
  title: string;
  cards: CardItem[];
  onAddCard: () => void;
  onCardClick: (card: CardItem) => void;
}

export const Column: React.FC<Props> = ({ title, cards, onAddCard, onCardClick }) => {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <button className="add-btn" onClick={onAddCard} aria-label={`Add card to ${title}`}>
          +
        </button>
      </div>

      <div className="card-list">
        {cards.map(card => (
          <Card key={card.id} card={card} onClick={() => onCardClick(card)} />
        ))}
      </div>

      <button className="add-link" onClick={onAddCard}>
        + Add a card
      </button>
    </div>
  );
};
