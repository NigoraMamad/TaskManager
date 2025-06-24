import React from 'react';
import { Column } from './Column';
import { type ColumnType } from '../types';
import '../Board.css';

const boardData: ColumnType[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      {
        id: '1',
        title: 'Requirement Analysis',
        description: 'Thoroughly analyze the user stories...',
        dueDate: 'May 21, 2024',
        priority: 'Low',
      },
      {
        id: '2',
        title: 'Visual Design',
        description: 'Establish a design system...',
        dueDate: 'May 21, 2024',
        priority: 'Medium',
      },
    ],
  },
  {
    id: 'inProgress',
    title: 'In Progress',
    cards: [
      {
        id: '3',
        title: 'Wireframing',
        description: 'Create low-fidelity sketches...',
        dueDate: 'May 21, 2024',
        priority: 'Low',
      },
      {
        id: '4',
        title: 'Development Handoff',
        description: 'Prepare detailed dev specs...',
        dueDate: 'May 21, 2024',
        priority: 'Medium',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [
      {
        id: '5',
        title: 'Research',
        description: 'Conduct research to understand the target audience...',
        dueDate: 'May 21, 2024',
        priority: 'Top',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [],
  },
];

export const Board: React.FC = () => {
  return (
    <div className="board">
      {boardData.map(col => (
        <Column key={col.id} title={col.title} cards={col.cards} />
      ))}
    </div>
  );
};
