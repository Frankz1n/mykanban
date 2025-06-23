import { useState } from "react";
import type { TaskType } from "../types/kanban";

export function useTask(
  task: TaskType,
  onEdit: (taskId: string, newContent: string) => void
) {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(task.content);

  const handleEdit = () => {
    if (editing && newContent.trim()) {
      onEdit(task.id, newContent.trim());
    }
    setEditing(!editing);
  };

  return { editing, newContent, handleEdit, setNewContent };
}
