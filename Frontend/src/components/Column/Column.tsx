import React from 'react';
import { type CardItem } from '../../types';
import { Card } from '../Card/Card';
import './Column.css';

interface Props {
  title: string;
  cards: CardItem[];
  onAddCard: () => void;
}

export const Column: React.FC<Props> = ({ title, cards, onAddCard }) => {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <button className="add-btn" onClick={onAddCard}>+</button>
      </div>
      {cards.map(card => (
        <Card key={card.id} card={card} />
      ))}
      <button className="add-link" onClick={onAddCard}>+ Add a card</button>
    </div>
  );
};