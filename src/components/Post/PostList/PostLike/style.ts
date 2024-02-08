import styled from 'styled-components';

const LikeBtnDiv = styled.div`
  background-color: transparent;
  display: flex;
`;
const LikeBtnImg = styled.img`
  background-color: transparent;
  height: 28px;

  cursor: pointer;

  @media screen and (max-width: 700px) {
    width: 20px;
    height: 20px;
  }
`;
const LikeCountP = styled.p`
  width: 30px;
  height: 18px;
  font-size: 14px;
  text-align: center;
  padding-top: 2px;
  margin: 5px 0 5px 4px;

  @media screen and (max-width: 700px) {
    width: 13px;
    height: 14px;
    font-size: 12px;
    margin: 2px 0 2px 4px;
  }
`;

export default {LikeBtnImg, LikeBtnDiv, LikeCountP};
