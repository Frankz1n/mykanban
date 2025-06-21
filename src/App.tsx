import styled from "styled-components";
import type { ColumnType } from "./types/kanban";
import { Column } from "./components/Column/Column";
import { useEffect, useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

const AppContainer = styled.div`
  display: flex;
  padding: 32px;
  box-sizing: border-box;
  background-color: #191b44;
  width: 100%;
  height: 100vh;
  justify-content: space-around;
`;

function App() {
  const [columns, setColumns] = useState<ColumnType[]>(() => {
    const saved = localStorage.getItem("kanban-columns");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "1",
            title: "Backlog",
            tasks: [
              { id: "t1", content: "Estudar React" },
              { id: "t2", content: "Ler sobre TypeScript" },
            ],
          },
          {
            id: "2",
            title: "To Do",
            tasks: [{ id: "t3", content: "Construir App Kanban" }],
          },
          {
            id: "3",
            title: "In Progress",
            tasks: [],
          },
          {
            id: "4",
            title: "Blocked",
            tasks: [],
          },
          {
            id: "5",
            title: "Done",
            tasks: [],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("kanban-columns", JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId: string, content: string) => {
    setColumns((prev: ColumnType[]) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  id: `t${Date.now()}`,
                  content,
                },
              ],
            }
          : col
      )
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColIndex = columns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColIndex = columns.findIndex(
      (col) => col.id === destination.droppableId
    );

    if (sourceColIndex === -1 || destColIndex === -1) return;

    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const [movedTask] = sourceCol.tasks.splice(source.index, 1);

    const updatedSourceCol = {
      ...sourceCol,
      tasks: [...sourceCol.tasks],
    };

    const updatedDestCol = {
      ...destCol,
      tasks: [...destCol.tasks],
    };

    updatedDestCol.tasks.splice(destination.index, 0, movedTask);

    const newCols = [...columns];
    newCols[sourceColIndex] = updatedSourceCol;
    newCols[destColIndex] = updatedDestCol;

    setColumns(newCols);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AppContainer>
        {columns.map((col) => (
          <Column key={col.id} column={col} onAddTask={addTask} />
        ))}
      </AppContainer>
    </DragDropContext>
  );
}

export default App;
