import styled from "styled-components";
import { Task } from "../Task/Task";
import type { ColumnType } from "../../types/kanban";
import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

type ColumnProps = {
  column: ColumnType;
  onAddTask: (columnId: string, content: string) => void;
};

const ColumnContainer = styled.div`
  background-color: #f4f5f7;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  margin-right: 16px;
`;

const ColumnTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

const AddTaskForm = styled.form`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 6px 12px;
  background-color: #0079bf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Column = ({ column, onAddTask }: ColumnProps) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAddTask(column.id, newTask.trim());
    setNewTask("");
  };

  return (
    <ColumnContainer>
      <ColumnTitle>{column.title}</ColumnTitle>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ flexGrow: 1, minHeight: "20px" }}
          >
            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddTaskForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button type="submit">+</Button>
      </AddTaskForm>
    </ColumnContainer>
  );
};
