import {BeatLoader} from 'react-spinners';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <BeatLoader color="#9747FF" margin={5} size={15} />
    </SpinnerWrapper>
  );
};

export default Spinner;

const SpinnerWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
