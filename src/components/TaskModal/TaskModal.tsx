import { useState } from "react";
import {
  Backdrop,
  Button,
  Input,
  ModalContainer,
  TaskModalTitle,
} from "./styles";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
};

export const TaskModal = ({ isOpen, onClose, onSubmit }: TaskModalProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <TaskModalTitle>Nova Tarefa</TaskModalTitle>
        <Input
          autoFocus
          placeholder="Digite o nome da tarefa"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={handleSubmit}>Adicionar</Button>
      </ModalContainer>
    </Backdrop>
  );
};
