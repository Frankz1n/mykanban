import styled from "styled-components";

export const TaskContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.span`
  flex: 1;
  margin-right: 8px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 4px;
  margin-right: 8px;
`;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 4px;
`;
