import { Task } from "../Task/Task";
import type { ColumnType } from "../../types/kanban";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { AddTaskForm, Button, ColumnContainer, ColumnTitle } from "./styles";
import { useColumn } from "../../hooks/useColumn";
import { TaskModal } from "../TaskModal/TaskModal";

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
    handleEditTask,
    handleDeleteTask,
    openModal,
    closeModal,
    handleAddTask,
    isModalOpen,
  } = useColumn(column, onAddTask, onUpdateTask, onDeleteTask);
  return (
    <ColumnContainer>
      <AddTaskForm>
        <ColumnTitle>{column.title}</ColumnTitle>
        <Button onClick={openModal}>+</Button>
      </AddTaskForm>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              flexGrow: 1,
              minHeight: "100%",
              gap: "8px",
              display: "flex",
              flexDirection: "column",
            }}
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
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddTask}
      />
    </ColumnContainer>
  );
};
