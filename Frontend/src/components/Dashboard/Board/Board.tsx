import React, { useState } from "react";
import { Column } from "../Column/Column";
import { TaskModal } from "../../UI/TaskModal/TaskModal";
import type { ColumnType, CardItem, Status } from "../../../types";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import "./Board.css";
import { Card } from "../Card/Card";

interface BoardProps {
  columns: ColumnType[];
  onAddCard: (columnId: string) => void;
  onEditCard: (card: CardItem, columnId: string) => void;
  onSave: (card: CardItem) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onColumnsChange: (newColumns: ColumnType[]) => void;
}

const Board: React.FC<BoardProps> = ({
  columns,
  onAddCard,
  onEditCard,
  onSave,
  onDelete,
  onColumnsChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [activeCard, setActiveCard] = useState<CardItem | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const handleAddCard = (columnId: string) => {
    setActiveColumnId(columnId);
    setActiveCard(null);
    setShowModal(true);
    onAddCard(columnId);
  };

  const handleEditCard = (card: CardItem, columnId: string) => {
    setActiveColumnId(columnId);
    setActiveCard(card);
    setShowModal(true);
    onEditCard(card, columnId);
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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return; // Бросили вне дропзоны

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return; // Позиция не изменилась
    }

    // Глубокое копирование колонок и карточек для корректного обновления
    const newColumns: ColumnType[] = columns.map(col => ({
      ...col,
      cards: [...col.cards],
    }));

    const sourceColumnIndex = newColumns.findIndex(col => col.id === source.droppableId);
    const destColumnIndex = newColumns.findIndex(col => col.id === destination.droppableId);

    if (sourceColumnIndex === -1 || destColumnIndex === -1) return;

    const sourceColumn = newColumns[sourceColumnIndex];
    const destColumn = newColumns[destColumnIndex];

    const draggedCardIndex = sourceColumn.cards.findIndex(card => String(card.id) === draggableId);
    if (draggedCardIndex === -1) return;

    const draggedCard = sourceColumn.cards[draggedCardIndex];

    // Удаляем карточку из исходной колонки
    sourceColumn.cards.splice(draggedCardIndex, 1);

    // Обновляем статус, если карточка переместилась в другую колонку
    if (sourceColumn.id !== destColumn.id) {
      draggedCard.status = destColumn.id as Status;
      onSave(draggedCard);
    }

    // Вставляем карточку в новую позицию
    destColumn.cards.splice(destination.index, 0, draggedCard);

    // Передаем обновленные колонки наверх
    onColumnsChange(newColumns);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {columns.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{col.title}</h2>
                  <button className="add-btn" onClick={() => handleAddCard(col.id)}>+</button>

                  <div className="card-list">
                    {col.cards.map((card, index) => (
                      <Draggable draggableId={String(card.id)} index={index} key={card.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleEditCard(card, col.id)}
                          >
                            <Card card={card} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

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
