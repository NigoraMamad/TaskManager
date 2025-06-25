import React, { useState } from 'react';
import { type CardItem, type Priority, type Status } from '../../../types';
import './TaskModal.css';

interface Props {
  onClose: () => void;
  onSave: (card: CardItem) => void;
  card?: CardItem; // если редактируем
}

export const TaskModal: React.FC<Props> = ({ onClose, onSave, card }) => {
  const [title, setTitle] = useState(card?.title || '');
  const [status, setStatus] = useState<Status>(card?.status || 'To do');
  const [priority, setPriority] = useState<Priority>(card?.priority || 'Low');
  const [dueDate, setDueDate] = useState(card?.dueDate || '');
  const [description, setDescription] = useState(card?.description || '');
  const createdAt = card?.createdAt || new Date().toISOString().split('T')[0];

  const handleSave = () => {
    if (!title.trim()) return;

    const newCard: CardItem = {
      id: card?.id || Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      status,
      createdAt,
    };

    onSave(newCard);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <input
            className="title-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Name the Task"
          />
          <button className="close" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value as Status)}>
            <option value="To do">To Do</option>
            <option value="In progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>

          <label>Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Top">Top</option>
          </select>

          <label>Due date</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />

          <label>Creation date</label>
          <input type="text" value={createdAt} disabled />

          <label>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Please describe the Task"
          />
        </div>

        <div className="modal-footer">
          <button className="delete-btn">🗑 Delete</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};
