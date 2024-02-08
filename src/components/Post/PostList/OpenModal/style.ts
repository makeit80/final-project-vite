import styled from 'styled-components';

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);

  z-index: 1000;
`;
const ModalBox = styled.div`
  background-color: #2a2a2a;
  width: 952px;
  height: 700px;
  color: white;
  overflow-y: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    background-color: #232323;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #84898c3a;
    border-radius: 30px;
  }

  @media screen and (max-width: 1000px) {
    width: 700px;
  }

  @media screen and (max-width: 700px) {
    width: 320px;
    height: 494px;
  }
`;
const ModalContent = styled.div`
  background-color: #2a2a2a;
`;
const ModalHeaderDiv = styled.div`
  background-color: #2a2a2a;
  display: flex;
`;
const ModalTitleP = styled.p`
  background-color: #2a2a2a;
  text-align: center;
  font-size: 24px;
  line-height: 24px;
  width: 300px;
  margin: 30px 240px 0 326px;

  @media screen and (max-width: 1000px) {
    margin: 30px 114px 0 200px;
  }

  @media screen and (max-width: 700px) {
    margin: 20px 51px 0 95px;
    width: 130px;
    font-size: 16px;
  }
`;
const ModalCloseImg = styled.img`
  background-color: #2a2a2a;
  text-align: center;
  width: 46px;
  height: 46px;
  margin: 15px 40px 15px 0;
  cursor: pointer;

  @media screen and (max-width: 700px) {
    width: 24px;
    height: 24px;
    margin: 14px 20px 14px 0;
  }
`;

const ModalContentDiv = styled.div`
  background-color: #2a2a2a;
  height: 180px;
  width: 100%;
  padding: 20px 40px 20px 40px;

  @media screen and (max-width: 700px) {
    padding: 20px;
  }
`;

const ModalContentHeaderDiv = styled.div`
  background-color: #2a2a2a;
  height: 28px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const UserInfoDiv = styled.div`
  background-color: #2a2a2a;
  display: flex;
`;
const UserImg = styled.img`
  background-color: #2a2a2a;
  height: 28px;
  margin-right: 10px;

  @media screen and (max-width: 700px) {
    width: 24px;
    height: 24px;
  }
`;
const UsernameP = styled.p`
  background-color: #2a2a2a;
  height: 16px;
  width: 300px;
  font-size: 13px;
  vertical-align: middle;
  margin-top: 8px;

  @media screen and (max-width: 700px) {
    font-size: 10px;
    width: 100px;
    margin-top: 6px;
  }
`;
const TimeDateDiv = styled.div`
  background-color: #2a2a2a;
  display: flex;
  margin-top: 8px;

  @media screen and (max-width: 700px) {
    margin-top: 4px;
  }
`;
const TimeP = styled.p`
  background-color: #2a2a2a;
  font-size: 13px;
  margin-right: 10px;
  height: 16px;

  @media screen and (max-width: 700px) {
    font-size: 10px;
  }
`;
const DateP = styled.p`
  background-color: #2a2a2a;
  font-size: 13px;
  height: 16px;

  @media screen and (max-width: 700px) {
    font-size: 10px;
  }
`;
const ContentP = styled.div`
  background-color: #2a2a2a;
  min-height: 20px;
  margin: 20px 0 20px 0;

  @media screen and (max-width: 700px) {
    font-size: 13px;
  }
`;
const ContentImgsDiv = styled.div`
  background-color: #2a2a2a;
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid rgba(99, 99, 102, 0.5);
`;
const CommentImg = styled.img`
  background-color: #2a2a2a;
  height: 20px;

  @media screen and (max-width: 700px) {
    height: 16px;
  }
`;

// comment
const CommentImageUl = styled.ul`
  background-color: #2a2a2a;
  height: 335px;
  width: 100%;
  margin-top: 389px;

  @media screen and (max-width: 700px) {
    margin-top: 299px;
  }
`;
const CommentUl = styled.ul`
  background-color: #2a2a2a;
  height: 335px;
  width: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    background-color: #232323;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #84898c3a;
    border-radius: 30px;
  }

  @media screen and (max-width: 1000px) {
    margin-top: 33px;
  }
`;
const CommentLi = styled.li`
  background-color: #2a2a2a;
  width: 100%;
  height: 140px;
  padding: 20px 40px;

  @media screen and (max-width: 700px) {
    padding: 10px 20px;
    height: 132px;
  }
`;
const CommentHeaderDiv = styled.div`
  background-color: #2a2a2a;
  height: 28px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const CommentP = styled.p`
  background-color: #2a2a2a;
  height: 15px;
  margin-top: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 700px) {
    font-size: 12px;
    height: 25px;
  }
`;
const CommentBtnsDiv = styled.div`
  background-color: #2a2a2a;
  display: flex;
  justify-content: space-between;
`;
const CommentDeleteBtn = styled.button`
  background-color: #636366;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    background-color: #7d37df;
  }
`;

// add comment
const AddCommentForm = styled.form`
  background-color: #2a2a2a;
  height: 68px;
  width: 952px;
  padding: 20px 40px;
  display: flex;
  position: fixed;
  bottom: 9%;

  @media screen and (max-width: 1204px) {
    width: 938px;
    bottom: 22%;
  }

  @media screen and (max-width: 1000px) {
    width: 700px;
    bottom: 9%;
  }

  @media screen and (max-width: 700px) {
    width: 320px;
    padding: 20px;
    bottom: 16.3%;
  }
`;
const AddCommentUserImg = styled.img`
  background-color: #2a2a2a;
  height: 24px;
  margin-right: 10px;

  @media screen and (max-width: 700px) {
    margin-top: 5px;
    height: 20px;
  }
`;
const AddCommentInput = styled.input`
  background-color: #2a2a2a;
  border: none;
  width: 770px;
  height: 28px;
  margin-right: 20px;

  @media screen and (max-width: 1000px) {
    width: 518px;
  }

  @media screen and (max-width: 700px) {
    width: 195px;
    font-size: 8.5px;
  }
`;
const AddCommentBtn = styled.button`
  background-color: #2a2a2a;
  border: none;
  height: 28px;
  width: 48px;
  font-size: 16px;
  font-weight: bold;
  color: #b746ec;
  &:disabled {
    color: white;
  }
  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 700px) {
    width: 35px;
    font-size: 13px;
  }
`;

export default {
  ModalContainer,
  ModalBox,
  ModalContent,
  ModalHeaderDiv,
  ModalTitleP,
  UserInfoDiv,
  ModalCloseImg,

  ModalContentDiv,
  ModalContentHeaderDiv,
  UserImg,
  UsernameP,
  TimeDateDiv,
  TimeP,
  DateP,
  ContentP,
  ContentImgsDiv,
  CommentImg,

  CommentImageUl,
  CommentUl,
  CommentLi,
  CommentHeaderDiv,
  CommentP,
  CommentBtnsDiv,
  CommentDeleteBtn,

  AddCommentForm,
  AddCommentUserImg,
  AddCommentInput,
  AddCommentBtn,
};
