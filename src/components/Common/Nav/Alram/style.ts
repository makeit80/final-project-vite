import styled from 'styled-components';

const AlarmListDiv = styled.div`
  position: absolute;
  top: 0%;
  left: 60%;

  width: 400px;
  height: 500px;
  cursor: default;
  margin-top: 90px;
  background-color: #121212;

  border-radius: 10px;

  &.On {
    display: inline-block;
  }
  &.OFF {
    display: none;
  }

  @media screen and (max-width: 1016px) {
    left: 50%;
  }

  @media screen and (max-width: 900px) {
    left: 43%;
  }

  @media screen and (max-width: 768px) {
    width: 280px;
    height: 200px;
    margin-top: 70px;
    left: 40%;
  }

  @media screen and (max-width: 480px) {
    width: 280px;
    height: 200px;
    margin-top: 70px;
    left: 30%;
  }

  @media screen and (max-width: 400px) {
    width: 280px;
    height: 200px;
    margin-top: 70px;
    left: 15%;
  }
`;
const AlarmDiv = styled.div`
  width: inherit;
  height: 70px;

  display: flex;
  justify-content: start;
  align-items: center;

  border-radius: 10px 10px 0px 0px;
  border-bottom: 1px solid #2c2c2c;
`;
const AlarmP = styled.p`
  margin-left: 25px;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1.5px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin: 10px;
  }
`;
const InfoP = styled.p`
  font-size: 12px;
  margin-left: 10px;

  @media screen and (max-width: 768px) {
    font-size: 10px;
    margin-left: 0px;
  }
`;
const AlarmListUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 110px;
  row-gap: 5px;

  background-color: inherit;
  border-radius: inherit;

  overflow: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    background-color: #00000012;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #36363668;
    border-radius: 30px;
  }
`;
const AlarmListLi = styled.li`
  border-radius: 10px;

  background-color: transparent;

  position: relative;
  border-bottom: 1px solid #222222;
  margin: 5px;
`;
const AlarmContentsDiv = styled.div`
  background-color: transparent;

  margin-top: 18px;
  margin-left: 20px;

  @media screen and (max-width: 768px) {
    margin-top: 12px;
    margin-left: 14px;
  }
`;
const AlarmTitleP = styled.p`
  font-size: 15px;
  color: white;
  background-color: inherit;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;
const AlarmListP = styled.p`
  font-size: 13px;
  color: white;
  background-color: inherit;
  margin-top: 15px;

  @media screen and (max-width: 768px) {
    margin-top: 12px;
    font-size: 10px;
  }
`;
const AlarmTimeP = styled.p`
  position: absolute;
  bottom: 10%;
  left: 5%;

  background-color: inherit;
  font-size: 12px;
  color: #d6d6d6;

  background-color: inherit;
  font-size: 12px;
  color: #d6d6d6;
  @media screen and (max-width: 768px) {
    font-size: 9px;
  }
`;
const AlarmDeleteBtn = styled.button`
  position: absolute;
  top: 14%;
  right: 2%;
  background-color: inherit;
  border: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    top: 5%;
    right: 0%;
  }
`;
const DeleteImg = styled.img`
  width: 35px;
  background-color: transparent;

  @media screen and (max-width: 768px) {
    width: 25px;
  }
`;

export default {
  AlarmListDiv,
  AlarmDiv,
  AlarmP,
  InfoP,
  AlarmListUl,
  AlarmListLi,
  AlarmContentsDiv,
  AlarmTitleP,
  AlarmListP,
  AlarmTimeP,
  AlarmDeleteBtn,
  DeleteImg,
};
