import { Column } from "./components/Column/Column";
import { DragDropContext } from "@hello-pangea/dnd";
import { useApp } from "./hooks/useApp";
import { AppContainer } from "./App.styles";

function App() {
  const { columns, addTask, updateTask, deleteTask, onDragEnd } = useApp();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AppContainer>
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        ))}
      </AppContainer>
    </DragDropContext>
  );
}

export default App;
