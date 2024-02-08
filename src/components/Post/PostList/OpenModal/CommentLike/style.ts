import styled from 'styled-components';

const OnlyTextHeartImgDiv = styled.div`
  background-color: #2a2a2a;
  display: flex;
`;
const OnlyTextHeartImg = styled.img`
  background-color: #2a2a2a;
  height: 20px;

  @media screen and (max-width: 700px) {
    height: 16px;
  }
`;
const OnlyTextHeartCountP = styled.p`
  background-color: #2a2a2a;
  font-size: 14px;
  margin-top: 2px;
  margin-left: 4px;
  margin-right: 20px;

  @media screen and (max-width: 700px) {
    font-size: 12px;
    margin-top: 2px;
    margin-left: 4px;
    margin-right: 15px;
  }
`;

export default {
  OnlyTextHeartImgDiv,
  OnlyTextHeartImg,
  OnlyTextHeartCountP,
};
