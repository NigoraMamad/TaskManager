import React from 'react';
import { type ColumnType, type CardItem } from '../../../types';
import './TableView.css';

interface Props {
  columns: ColumnType[];
  onAddCard: (columnId: string) => void;
  onEditCard: (card: CardItem) => void;
}

const TableView: React.FC<Props> = ({ columns, onAddCard, onEditCard }) => {
  const allCards = columns.flatMap(col => col.cards);

  const formatDate = (timestamp?: number): string => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="table-view">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th><th>Description</th><th>Created</th>
            <th>Due</th><th>Priority</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allCards.map(card => {
            const cssPriority = card.priority.toLowerCase();
            const cssStatus = card.status.toLowerCase().replace(/_/g, '-');
            return (
              <tr key={card.id}>
                <td data-label="Task">{card.title}</td>
                <td data-label="Description">{card.content}</td>
                <td data-label="Created">{formatDate(card.createdDate)}</td>
                <td data-label="Due">{formatDate(card.dueDate)}</td>
                <td data-label="Priority">
                  <span className={`tag ${cssPriority}`}>{card.priority}</span>
                </td>
                <td data-label="Status">
                  <span className={`status-tag ${cssStatus}`}>{card.status}</span>
                </td>
                <td data-label="Actions">
                  <button
                    onClick={() => onEditCard(card)}
                    style={{ cursor: 'pointer', padding: '4px 8px' }}
                    aria-label={`Edit task ${card.title}`}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: 20 }}>
        {columns.map(col => (
          <button
            key={col.id}
            className="add-link"
            onClick={() => onAddCard(col.id)}
            aria-label={`Add a new card to ${col.title}`}
            style={{ marginRight: 8, marginBottom: 8 }}
          >
            + Add a card to {col.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableView;
