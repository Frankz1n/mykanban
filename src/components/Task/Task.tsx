import styled from "styled-components";
import { useState } from "react";
import type { TaskType } from "../../types/kanban";

type TaskProps = {
  task: TaskType;
  onEdit: (taskId: string, newContent: string) => void;
  onDelete: (taskId: string) => void;
};

const TaskContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.span`
  flex: 1;
  margin-right: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 4px;
  margin-right: 8px;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 4px;
`;

export const Task = ({ task, onEdit, onDelete }: TaskProps) => {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(task.content);

  const handleEdit = () => {
    if (editing && newContent.trim()) {
      onEdit(task.id, newContent.trim());
    }
    setEditing(!editing);
  };

  return (
    <TaskContainer>
      {editing ? (
        <Input
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      ) : (
        <Content>{task.content}</Content>
      )}

      <Button onClick={handleEdit}>{editing ? "💾" : "✏️"}</Button>
      <Button onClick={() => onDelete(task.id)}>🗑️</Button>
    </TaskContainer>
  );
};
