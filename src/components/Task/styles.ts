import styled from "styled-components";

export const TaskContainer = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.span`
  flex: 1;
  color: #333;
  margin-right: 8px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 4px;
  margin-right: 8px;
`;

export const EditButton = styled.button`
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0f7;
  }
`;

export const DeleteButton = styled.button`
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f04;
  }
`;
