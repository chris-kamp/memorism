import styled from "styled-components"

const FlashSection = styled.section`
  width: 100%;
  border-radius: 0.25rem;
  padding: 0 1rem;
`;

const AlertSection = styled(FlashSection)`
  background-color: #b0d1e8;
`;

const ErrorSection = styled(FlashSection)`
  background-color: #d43b3b;
`;

const FlashHeading = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const FlashItem = styled.li`
  font-size: 1.25rem;
`;

export { FlashSection, AlertSection, ErrorSection, FlashHeading, FlashItem };
