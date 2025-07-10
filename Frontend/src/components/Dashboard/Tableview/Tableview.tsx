import React from 'react';
import { type ColumnType } from '../../../types';
import './TableView.css';

interface Props {
  columns: ColumnType[];
  onAddCard: (columnId: string) => void;
}

const TableView: React.FC<Props> = ({ columns, onAddCard }) => {
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
            <th>Task</th>
            <th>Description</th>
            <th>Created</th>
            <th>Due</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allCards.map(card => {
            const cssPriority = card.priority.toLowerCase();
            const cssStatus = card.status.toLowerCase().replace(/_/g, '-');
            return (
              <tr key={card.id}>
                <td>{card.title}</td>
                <td>{card.content}</td>
                <td>{formatDate(card.createdDate)}</td>
                <td>{formatDate(card.dueDate)}</td>
                <td>
                  <span className={`tag ${cssPriority}`}>
                    {card.priority}
                  </span>
                </td>
                <td>
                  <span className={`status-tag ${cssStatus}`}>
                    {card.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Кнопки для добавления карточки в каждую колонку */}
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
