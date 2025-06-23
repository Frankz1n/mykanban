import { Task } from "../Task/Task";
import type { ColumnType } from "../../types/kanban";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  AddTaskForm,
  Button,
  ColumnContainer,
  ColumnTitle,
  Input,
} from "./styles";
import { useColumn } from "../../hooks/useColumn";

type ColumnProps = {
  column: ColumnType;
  onAddTask: (columnId: string, content: string) => void;
  onUpdateTask: (columnId: string, taskId: string, newContent: string) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
};

export const Column = ({
  column,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: ColumnProps) => {
  const {
    newTask,
    setNewTask,
    handleSubmit,
    handleEditTask,
    handleDeleteTask,
  } = useColumn(column, onAddTask, onUpdateTask, onDeleteTask);
  return (
    <ColumnContainer>
      <ColumnTitle>{column.title}</ColumnTitle>
      <AddTaskForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button type="submit">+</Button>
      </AddTaskForm>
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
                    <Task
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </ColumnContainer>
  );
};
