import { useState } from "react";
import type { ColumnType } from "../types/kanban";

export function useColumn(
  column: ColumnType,
  onAddTask: (columnId: string, content: string) => void,
  onUpdateTask: (columnId: string, taskId: string, newContent: string) => void,
  onDeleteTask: (columnId: string, taskId: string) => void
) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditTask = (taskId: string, newContent: string) => {
    onUpdateTask(column.id, taskId, newContent);
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(column.id, taskId);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddTask = (content: string) => {
    onAddTask(column.id, content);
  };

  return {
    handleEditTask,
    handleDeleteTask,
    openModal,
    closeModal,
    handleAddTask,
    isModalOpen,
  };
}
