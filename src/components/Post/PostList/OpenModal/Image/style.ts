import styled from 'styled-components';

const SliderImg = styled.img`
  width: 871px;
  height: 400px;
  object-fit: contain;

  @media screen and (max-width: 1000px) {
    width: 605px;
  }

  @media screen and (max-width: 700px) {
    width: 265px;
    height: 310px;
  }
`;
const OneImageDiv = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 871px;
  height: 400px;

  @media screen and (max-width: 1000px) {
    width: 605px;
  }

  @media screen and (max-width: 700px) {
    width: 265px;
    height: 310px;
  }
`;
const OneImage = styled.img`
  width: 871px;
  height: 400px;
  object-fit: contain;

  @media screen and (max-width: 1000px) {
    width: 605px;
  }

  @media screen and (max-width: 700px) {
    width: 265px;
    height: 310px;
  }
`;

export default {SliderImg, OneImageDiv, OneImage};
