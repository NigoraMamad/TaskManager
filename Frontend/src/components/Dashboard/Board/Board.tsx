// import { Column } from '../Column/Column';
// import { type ColumnType} from '../../types';
// import { type CardItem } from '../../types';
// import {TaskModal} from '../UI/TaskModal/TaskModal';
import { Column } from '../Column/Column';
import { type ColumnType } from '../../../types';
import {type CardItem } from '../../../types';
import { TaskModal } from '../../UI/TaskModal/TaskModal';
import './Board.css';
import { useState } from 'react';

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

const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>(boardData);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddCard = (columnId: string) => {
    setActiveColumnId(columnId);
    setShowModal(true);
  };

  const handleSave = (newCard: CardItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.id === activeColumnId
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    );
    setShowModal(false);
  };

  return (
    <>
      <div className="board">
        {columns.map(col => (
          <Column
            key={col.id}
            title={col.title}
            cards={col.cards}
            onAddCard={() => handleAddCard(col.id)}
          />
        ))}
      </div>

      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default Board;