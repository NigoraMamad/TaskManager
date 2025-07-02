import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import UserInfo from "../../components/UserInfo/UserInfo";
import Board from "../../components/Dashboard/Board/Board";
import TableView from "../../components/Dashboard/Tableview/Tableview"; // добавь компонент
import Loader from "../../components/Loader/Loader";
import { type ColumnType } from "../../types"; // чтобы типизировать boardData

const boardData: ColumnType[] = [
  // данные можно будет вынести отдельно, пока оставим здесь
  {
    id: "todo",
    title: "To Do",
    cards: [
      {
        id: "1",
        title: "Requirement Analysis",
        description: "Thoroughly analyze the user stories...",
        dueDate: "2024-05-21",
        priority: "Low",
        status: "To do",
        createdAt: "2024-05-01",
      },
      {
        id: "2",
        title: "Visual Design",
        description: "Establish a design system...",
        dueDate: "2024-05-21",
        priority: "Medium",
        status: "To do",
        createdAt: "2024-05-01",
      },
    ],
  },
  {
    id: "inProgress",
    title: "In Progress",
    cards: [
      {
        id: "3",
        title: "Wireframing",
        description: "Create low-fidelity sketches...",
        dueDate: "2024-05-21",
        priority: "Low",
        status: "In progress",
        createdAt: "2024-05-02",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    cards: [
      {
        id: "4",
        title: "Research",
        description: "Research target audience...",
        dueDate: "2024-05-21",
        priority: "Top",
        status: "Review",
        createdAt: "2024-05-03",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [],
  },
];

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"table" | "board">("board");
  const [columns, setColumns] = useState<ColumnType[]>(boardData);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleAddCard = () => {
    // Переиспользуй openModal здесь, если хочешь
    console.log("Add card clicked");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AppHeader />
      <UserInfo />
      <main>
        <div style={{ padding: "22px calc(5.63vw - 1.12px)" }}>
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              gap: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                color: viewMode === "table" ? "#5f5fc4" : "#222",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
              onClick={() => setViewMode("table")}
            >
              Table view
            </h2>
            <h2
              style={{
                fontSize: "24px",
                color: viewMode === "board" ? "#5f5fc4" : "#222",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
              onClick={() => setViewMode("board")}
            >
              Board view
            </h2>
          </div>

          {viewMode === "board" ? (
            <Board />
          ) : (
            <TableView columns={columns} onAddCard={handleAddCard} />
          )}
        </div>
      </main>
    </>
  );
};

export default MainPage;
