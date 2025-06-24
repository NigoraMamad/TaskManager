import React from 'react';
import { type CardItem } from '../../types';
import './Card.css';

interface Props {
  card: CardItem;
}

export const Card: React.FC<Props> = ({ card }) => {
  return (
    <div className="card">
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <div className="card-footer">
        <span className={`priority ${card.priority.toLowerCase()}`}>{card.priority} priority</span>
        <span className="due-date">Due in {card.dueDate}</span>
      </div>
    </div>
  );
};
