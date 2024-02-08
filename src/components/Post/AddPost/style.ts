import styled from 'styled-components';

const AddPostDiv = styled.div`
  width: 954px;
  height: 62px;
  border-bottom: 2px solid gray;
  display: flex;

  margin-top: 40px;

  @media screen and (max-width: 1000px) {
    width: 700px;
    height: 57px;
  }

  @media screen and (max-width: 700px) {
    width: 320px;
    height: 40px;
  }
`;
const AddPostUerImg = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 50px;
  object-fit: cover;
  background-size: cover;

  @media screen and (max-width: 1000px) {
    width: 40px;
    height: 40px;
    margin-left: 1px;
  }

  @media screen and (max-width: 700px) {
    width: 32px;
    height: 32px;
    margin-left: 1px;
  }
`;
const AddPostMovdBox = styled.div`
  width: 735px;
  height: 50px;
  border: none;
  padding-top: 20px;
  padding-left: 10px;
  margin-left: 20px;
  color: gray;
  font-size: 16px;
  cursor: pointer;

  @media screen and (max-width: 1000px) {
    padding-top: 13px;
  }

  @media screen and (max-width: 700px) {
    width: 268px;
    height: 32px;
    font-size: 12px;
    padding-top: 12px;
    padding-left: 5px;
  }
`;

export default {AddPostDiv, AddPostUerImg, AddPostMovdBox};
