import React, { useState } from "react";
import { Column } from "../Column/Column";
import { TaskModal } from "../../UI/TaskModal/TaskModal";
import type { ColumnType, CardItem } from "../../../types";
import "./Board.css";

interface BoardProps {
  columns: ColumnType[];
  onAddCard: (columnId: string) => void;
  onEditCard: (card: CardItem, columnId: string) => void;
  onSave: (card: CardItem) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const Board: React.FC<BoardProps> = ({ columns, onAddCard, onEditCard, onSave, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeCard, setActiveCard] = useState<CardItem | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const handleAddCard = (columnId: string) => {
    setActiveColumnId(columnId);
    setActiveCard(null);
    setShowModal(true);
    onAddCard(columnId); // если нужна дополнительная логика из MainPage
  };

  const handleEditCard = (card: CardItem, columnId: string) => {
    setActiveColumnId(columnId);
    setActiveCard(card);
    setShowModal(true);
    onEditCard(card, columnId); // если нужна дополнительная логика из MainPage
  };

  const handleSaveModal = async (card: CardItem) => {
    await onSave(card);
    setShowModal(false);
    setActiveCard(null);
    setActiveColumnId(null);
  };

  const handleDeleteModal = async (id: string) => {
    await onDelete(id);
    setShowModal(false);
    setActiveCard(null);
    setActiveColumnId(null);
  };

  return (
    <>
      <div className="board">
        {columns.map((col) => (
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
          onSave={handleSaveModal}
          onDelete={handleDeleteModal}
        />
      )}
    </>
  );
};

export default Board;
