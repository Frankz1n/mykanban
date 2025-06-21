import styled from "styled-components";
import type { TaskType } from "../../types/kanban";
type TaskProps = {
  task: TaskType;
};

const TaskContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Task = ({ task }: TaskProps) => {
  return <TaskContainer>{task.content}</TaskContainer>;
};
