import { useState } from "react";
import type { ColumnType } from "../types/kanban";

export function useColumn(
  column: ColumnType,
  onAddTask: (columnId: string, content: string) => void,
  onUpdateTask: (columnId: string, taskId: string, newContent: string) => void,
  onDeleteTask: (columnId: string, taskId: string) => void
) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAddTask(column.id, newTask.trim());
    setNewTask("");
  };

  const handleEditTask = (taskId: string, newContent: string) => {
    onUpdateTask(column.id, taskId, newContent);
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(column.id, taskId);
  };

  return {
    newTask,
    setNewTask,
    handleSubmit,
    handleEditTask,
    handleDeleteTask,
  };
}
