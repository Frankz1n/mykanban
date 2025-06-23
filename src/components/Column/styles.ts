import styled from "styled-components";

export const ColumnContainer = styled.div`
  background-color: #f4f5f7;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  margin-right: 16px;
`;

export const ColumnTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

export const AddTaskForm = styled.form`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 6px 12px;
  background-color: #0079bf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
