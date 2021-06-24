import styled from "styled-components"

const ButtonContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
`;

const Button = styled.button`
  border: none;
  text-align: center;
  border-radius: 0.25rem;
  font-weight: bold;
  color: #fdfdff;
  height: 1.7rem;
`;

const LeftButton = styled(Button)`
  margin-right: 0.25rem;
`

const RedButton = styled(Button)`
  background-color: #d43b3b;
`;

const YellowButton = styled(LeftButton)`
  background-color: #dcb532;
`;

const GreenButton = styled(LeftButton)`
  background-color: green;
`;

export {
  ButtonContainer,
  Button,
  LeftButton,
  RedButton,
  YellowButton,
  GreenButton,
};
