import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader/AppHeader';
import UserInfo from '../../components/UserInfo/UserInfo';
import Board from '../../components/Dashboard/Board/Board';
import TableView from '../../components/Dashboard/Tableview/Tableview';
import Loader from '../../components/Loader/Loader';
import type { ColumnType, CardItem, Status } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MainPage: React.FC = () => {
  const { token, userInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'board'>('board');
  const [columns, setColumns] = useState<ColumnType[]>([
    { id: 'TODO', title: 'To Do', cards: [] },
    { id: 'IN_PROGRESS', title: 'In Progress', cards: [] },
    { id: 'REVIEW', title: 'Review', cards: [] },
    { id: 'DONE', title: 'Done', cards: [] },
  ]);

  if (!token) return <Navigate to="/login" replace />;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/task', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const tasks: CardItem[] = await response.json();

        const columnsMap: ColumnType[] = [
          { id: 'TODO', title: 'To Do', cards: [] },
          { id: 'IN_PROGRESS', title: 'In Progress', cards: [] },
          { id: 'REVIEW', title: 'Review', cards: [] },
          { id: 'DONE', title: 'Done', cards: [] },
        ];

        tasks.forEach((task) => {
          // Безопасное приведение статуса к верхнему регистру и типу Status
          const status = (task.status || 'TODO').toUpperCase() as Status;
          const col = columnsMap.find((c) => c.id === status);
          if (col) col.cards.push(task);
        });

        setColumns(columnsMap);
      } catch (err) {
        console.error('Error loading tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleSave = async (card: CardItem) => {
    try {
      const isNew = !card.id || card.id.length < 8;
      const now = Date.now();
      const defaultDueDate = now + 24 * 60 * 60 * 1000; // +1 день

      const dueDate =
        card.dueDate && card.dueDate > now ? card.dueDate : defaultDueDate;

      const body: any = {
        title: card.title.trim(),
        content: card.content || '',
        status: card.status?.toUpperCase() || 'TODO',
        priority: card.priority?.toUpperCase() || 'LOW',
        userId: userInfo?.id || 0,
        createdDate: card.createdDate || now,
        dueDate,
      };

      if (!isNew) {
        body.id = card.id;
      }

      const url = isNew
        ? 'http://localhost:8080/task'
        : `http://localhost:8080/task/${card.id}`;

      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

        if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Error response from server:', errorData);
    throw new Error(errorData.error || 'Failed to save task');
  }

  const savedTask: CardItem = await response.json();

  setColumns((prev) =>
    prev.map((col) => {
      const colId = col.id.toUpperCase();
      const taskStatus = savedTask.status?.toUpperCase();

      if (colId === taskStatus) {
        const exists = col.cards.some((c) => c.id === savedTask.id);
        return {
          ...col,
          cards: exists
            ? col.cards.map((c) => (c.id === savedTask.id ? savedTask : c))
            : [...col.cards, savedTask],
        };
      } else {
        return {
          ...col,
          cards: col.cards.filter((c) => c.id !== savedTask.id),
        };
      }
    })
  );
  toast.success(isNew ? 'Card was successfully created' : 'Card was successfully updated');

    } catch (err) {
      console.error('Error saving task:', err);
      toast.error('Failed to save task');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/task/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to delete task');

      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          cards: col.cards.filter((c) => c.id !== id),
        }))
      );
      toast.success('Card was successfully deleted');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task');
    }
  };

  // Обработка drag-and-drop изменений колонок
  const handleColumnsChange = (newColumns: ColumnType[]) => {
    setColumns(newColumns);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <AppHeader />
      <UserInfo
        username={userInfo?.fullName || 'User'}
        phoneNumber={userInfo?.phoneNumber || ''}
        userRole={userInfo?.role || 'User'}
        id={userInfo?.id || 0}
      />
      <main>
        <div style={{ padding: '22px calc(5.63vw - 1.12px)' }}>
          <div
            style={{
              padding: '16px',
              borderBottom: '1px solid #ccc',
              display: 'flex',
              gap: '20px',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                color: viewMode === 'table' ? '#5f5fc4' : '#222',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
              onClick={() => setViewMode('table')}
            >
              Table view
            </h2>
            <h2
              style={{
                fontSize: '24px',
                color: viewMode === 'board' ? '#5f5fc4' : '#222',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
              onClick={() => setViewMode('board')}
            >
              Board view
            </h2>
          </div>

          {viewMode === 'board' ? (
            <Board
              columns={columns}
              onAddCard={(id) => console.log('Add card in:', id)}
              onEditCard={(card, id) => console.log('Edit card', card, id)}
              onSave={handleSave}
              onDelete={handleDelete}
              onColumnsChange={handleColumnsChange}
            />
          ) : (
            <TableView
              columns={columns}
              onAddCard={() => {}}
              onEditCard={(card) => console.log('Edit card from TableView', card)}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default MainPage;
