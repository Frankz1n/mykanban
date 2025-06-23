import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 300px;
`;

export const TaskModalTitle = styled.h2`
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background: #0079bf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
