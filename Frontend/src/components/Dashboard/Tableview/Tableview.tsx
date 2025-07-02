import React from 'react';
import { type ColumnType } from '../../../types';
import './TableView.css';

interface Props {
  columns: ColumnType[];
  onAddCard: () => void;
}

const TableView: React.FC<Props> = ({ columns, onAddCard }) => {
  const allCards = columns.flatMap(col => col.cards);

  return (
    <div className="table-view">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allCards.map(card => (
            <tr key={card.id}>
              <td>{card.title}</td>
              <td>{card.description}</td>
              <td>{card.createdAt}</td>
              <td>{card.dueDate}</td>
              <td><span className={`tag ${card.priority.toLowerCase()}`}>{card.priority}</span></td>
              <td><span className={`status-tag ${card.status?.toLowerCase().replace(' ', '-')}`}>{card.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-link" onClick={onAddCard}>+ Add a card</button>
    </div>
  );
};

export default TableView;
