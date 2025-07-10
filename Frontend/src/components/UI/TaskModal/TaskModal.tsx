import React, { useState, useEffect } from 'react';
import { type CardItem, type Priority, type Status } from '../../../types';
import './TaskModal.css';

interface Props {
  onClose: () => void;
  onSave: (card: CardItem) => void;
  onDelete?: (id: string) => void;
  card?: CardItem; // редактируемая карточка (если есть)
}

export const TaskModal: React.FC<Props> = ({ onClose, onSave, onDelete, card }) => {
  const [title, setTitle] = useState(card?.title || '');
  const [status, setStatus] = useState<Status>(card?.status || 'TODO');
  const [priority, setPriority] = useState<Priority>(card?.priority || 'LOW');

  // Для дат храним в состоянии строку в формате YYYY-MM-DD для <input type="date">
  const [dueDateStr, setDueDateStr] = useState<string>('');
  const [createdDateStr, setCreatedDateStr] = useState<string>('');

  const [content, setContent] = useState(card?.content || '');

  // Конвертация timestamp (ms) в строку 'YYYY-MM-DD'
  const timestampToDateInput = (ts: number | undefined): string => {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toISOString().split('T')[0];
  };

  // Конвертация строки 'YYYY-MM-DD' в timestamp (ms)
  const dateInputToTimestamp = (dateStr: string): number => {
    if (!dateStr) return 0;
    return new Date(dateStr).getTime();
  };

  useEffect(() => {
    if (card) {
      setDueDateStr(timestampToDateInput(card.dueDate));
      setCreatedDateStr(timestampToDateInput(card.createdDate));
    } else {
      setDueDateStr('');
      setCreatedDateStr(timestampToDateInput(Date.now()));
    }
  }, [card]);


  // Формируем объект карточки для сохранения
  const handleSave = () => {
    if (!title.trim()) return;

    const newCard: Omit<CardItem, 'id'> & Partial<Pick<CardItem, 'id'>> = {
      ...(card?.id ? { id: card.id } : {}), // только если редактируем
      title: title.trim(),
      content,
      dueDate: dateInputToTimestamp(dueDateStr),
      createdDate: card?.createdDate || Date.now(),
      priority,
      status,
      userId: card?.userId || 0,
    };

    onSave(newCard as CardItem); // кастуем
  };

  const handleDelete = () => {
    if (card?.id && onDelete) {
      onDelete(card.id);
    }
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
            autoFocus
          />
          <button className="close" onClick={onClose} aria-label="Close modal">×</button>
        </div>

        <div className="modal-content">
          <label htmlFor="status-select">Status</label>
          <select
            id="status-select"
            value={status}
            onChange={e => setStatus(e.target.value as Status)}
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="DONE">Done</option>
          </select>

          <label htmlFor="priority-select">Priority</label>
          <select
            id="priority-select"
            value={priority}
            onChange={e => setPriority(e.target.value as Priority)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>

          <label htmlFor="due-date-input">Due date</label>
          <input
            id="due-date-input"
            type="date"
            value={dueDateStr}
            onChange={e => setDueDateStr(e.target.value)}
          />

          <label htmlFor="created-date-input">Creation date</label>
          <input
            id="created-date-input"
            type="text"
            value={createdDateStr}
            disabled
          />

          <label htmlFor="description-textarea">Description</label>
          <textarea
            id="description-textarea"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Please describe the Task"
          />
        </div>

        <div className="modal-footer">
          {card && onDelete && (
            <button className="delete-btn" onClick={handleDelete} type="button">
              🗑 Delete
            </button>
          )}
          <button className="save-btn" onClick={handleSave} type="button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
