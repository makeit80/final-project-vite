import styled from 'styled-components';

const ScheduleWrapper = styled.div`
  overflow: auto;
  margin-bottom: 20px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    background-color: #232323;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #84898c3a;
    border-radius: 30px;
  }
  @media screen and (max-width: 768px) {
    width: auto;
    overflow: auto;
    margin-bottom: 20px;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      background-color: #232323;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #84898c3a;
      border-radius: 30px;
    }
  }
`;

const ScheduleDiv = styled.div`
  width: 1420px;
  /* height: 300px; */
  margin-bottom: 100px;
  @media screen and (max-width: 768px) {
    margin-bottom: 30px;
  }
`;
const ScheduleUl = styled.ul`
  display: flex;
  justify-content: space-around;
  height: inherit;
  margin-top: 40px;
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;
const ScheduleLi = styled.li`
  text-align: left;
  width: 150px;
  height: inherit;
`;
const ScheduleDayP = styled.p`
  font-size: 15px;
  border-bottom: 2px solid gray;
  height: 25px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ScheduleListDiv = styled.div`
  height: 110px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #3a3a3a;
  margin-top: 10px;
`;
const ScheduleListSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  width: 130px;
`;
const ScheduleListTimeP = styled.p`
  color: gray;
  font-size: 12px;
`;
const ScheduleListTitleP = styled.p`
  color: white;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const ScheduleListImg = styled.img`
  width: 15px;
  height: 15px;
  object-fit: cover;
  background-size: cover;
  cursor: pointer;
`;
export default {
  ScheduleWrapper,
  ScheduleDiv,
  ScheduleUl,
  ScheduleLi,
  ScheduleDayP,
  ScheduleListDiv,
  ScheduleListSection,
  ScheduleListTimeP,
  ScheduleListTitleP,
  ScheduleListImg,
};
