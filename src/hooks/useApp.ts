import { useEffect, useState } from "react";
import type { ColumnType } from "../types/kanban";
import { tasksMock } from "../mocks/tasksMock";
import type { DropResult } from "@hello-pangea/dnd";

export function useApp() {
  const [columns, setColumns] = useState<ColumnType[]>(() => {
    const saved = localStorage.getItem("kanban-columns");
    return saved ? JSON.parse(saved) : tasksMock;
  });

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

  const updateTask = (columnId: string, taskId: string, newContent: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((t) =>
                t.id === taskId ? { ...t, content: newContent } : t
              ),
            }
          : col
      )
    );
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("kanban-columns", JSON.stringify(columns));
  }, [columns]);

  return { columns, setColumns, onDragEnd, addTask, updateTask, deleteTask };
}
