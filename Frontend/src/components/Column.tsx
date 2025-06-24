import React from 'react';
import { type CardItem } from '../types';
import { Card } from './Card';
import './Column.css';

interface Props {
  title: string;
  cards: CardItem[];
}

export const Column: React.FC<Props> = ({ title, cards }) => {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <button className="add-btn">+</button>
      </div>
      {cards.map(card => (
        <Card key={card.id} card={card} />
      ))}
      <button className="add-link">+ Add a card</button>
    </div>
  );
};
