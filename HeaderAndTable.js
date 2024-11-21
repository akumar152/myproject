export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll; /* Enable scrolling */
  padding: 20px;
  box-sizing: border-box;

  /* Hide scrollbar for Webkit browsers (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none; /* Hides scrollbar */
  -ms-overflow-style: none; /* Hides scrollbar in older IE/Edge */

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
