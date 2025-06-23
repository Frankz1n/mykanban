import { useTask } from "../../hooks/useTask";
import type { TaskType } from "../../types/kanban";
import { Button, Content, Input, TaskContainer } from "./styles";

type TaskProps = {
  task: TaskType;
  onEdit: (taskId: string, newContent: string) => void;
  onDelete: (taskId: string) => void;
};

export const Task = ({ task, onEdit, onDelete }: TaskProps) => {
  const { editing, newContent, handleEdit, setNewContent } = useTask(
    task,
    onEdit
  );

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
