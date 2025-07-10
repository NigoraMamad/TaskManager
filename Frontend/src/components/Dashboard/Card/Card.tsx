import React from 'react';
import { type CardItem } from '../../../types';
import './Card.css';

interface Props {
  card: CardItem;
  onClick?: () => void;
}

const formatDueDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const Card: React.FC<Props> = ({ card, onClick }) => {
  const priorityClass = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  }[card.priority] ?? 'low';

  return (
    <div
      className="card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <h3>{card.title}</h3>
      <p>{card.content}</p>

      <div className="card-footer">
        <span className={`priority ${priorityClass}`}>
          {card.priority} priority
        </span>
        {card.dueDate && (
          <span className="due-date">Due: {formatDueDate(card.dueDate)}</span>
        )}
      </div>
    </div>
  );
};
