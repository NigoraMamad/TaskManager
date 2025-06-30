import { useState } from 'react';
import { Column } from '../Column/Column';
import { TaskModal } from '../../UI/TaskModal/TaskModal';
import { type ColumnType, type CardItem } from '../../../types';
import './Board.css';

const boardData: ColumnType[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      {
        id: '1',
        title: 'Requirement Analysis',
        description: 'Thoroughly analyze the user stories...',
        dueDate: '2024-05-21',
        priority: 'Low',
        status: 'To do',
        createdAt: '2024-05-01',
      },
      {
        id: '2',
        title: 'Visual Design',
        description: 'Establish a design system...',
        dueDate: '2024-05-21',
        priority: 'Medium',
        status: 'To do',
        createdAt: '2024-05-01',
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
        dueDate: '2024-05-21',
        priority: 'Low',
        status: 'In progress',
        createdAt: '2024-05-02',
      },
      {
        id: '4',
        title: 'Development Handoff',
        description: 'Prepare detailed dev specs...',
        dueDate: '2024-05-21',
        priority: 'Medium',
        status: 'In progress',
        createdAt: '2024-05-02',
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
        dueDate: '2024-05-21',
        priority: 'Top',
        status: 'Review',
        createdAt: '2024-05-03',
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
  const [showModal, setShowModal] = useState(false);
  const [activeCard, setActiveCard] = useState<CardItem | null>(null);
  const [/*activeColumnId*/, setActiveColumnId] = useState<string | null>(null);

  const handleAddCard = (columnId: string) => {
    setActiveColumnId(columnId);
    setActiveCard(null); // новое задание
    setShowModal(true);
  };

  const handleEditCard = (card: CardItem, columnId: string) => {
    setActiveColumnId(columnId);
    setActiveCard(card);
    setShowModal(true);
  };

  const handleSave = (newCard: CardItem) => {
    setColumns(prev =>
      prev.map(col =>
        col.id === newCard.status?.toLowerCase().replace(' ', '')
          ? {
              ...col,
              cards: col.cards.some(c => c.id === newCard.id)
                ? col.cards.map(c => (c.id === newCard.id ? newCard : c))
                : [...col.cards, newCard],
            }
          : {
              ...col,
              cards: col.cards.filter(c => c.id !== newCard.id),
            }
      )
    );
    setShowModal(false);
    setActiveCard(null);
    setActiveColumnId(null);
  };

  const handleDelete = (id: string) => {
    setColumns(prev =>
      prev.map(col => ({
        ...col,
        cards: col.cards.filter(c => c.id !== id),
      }))
    );
    setShowModal(false);
    setActiveCard(null);
    setActiveColumnId(null);
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
            onCardClick={(card) => handleEditCard(card, col.id)}
          />
        ))}
      </div>

      {showModal && (
        <TaskModal
          card={activeCard ?? undefined}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Board;