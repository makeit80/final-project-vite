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
  height: 650px;
  color: white;

  @media screen and (max-width: 1000px) {
    width: 700px;
  }

  @media screen and (max-width: 700px) {
    width: 320px;
    height: 494px;
  }
`;
const ModalContent = styled.form`
  background-color: #2a2a2a;
`;
const ModalHeaderBodyDiv = styled.div`
  background-color: #2a2a2a;
  height: 503px;

  @media screen and (max-width: 700px) {
    height: 362px;
  }
`;
const ModalHeader = styled.div`
  background-color: #2a2a2a;
  display: flex;

  @media screen and (max-width: 700px) {
    border-bottom: 1px solid #636366;
  }
`;
const CloseBtn = styled.img`
  background-color: #2a2a2a;
  text-align: center;
  width: 46px;
  height: 46px;
  margin: 20px 40px 20px 0;
  cursor: pointer;

  @media screen and (max-width: 700px) {
    width: 24px;
    height: 24px;
    margin: 30px 20px 30px 0;
  }
`;
const ModalTitleDiv = styled.div`
  background-color: #2a2a2a;
`;
const ModalTitle = styled.p`
  background-color: #2a2a2a;
  text-align: center;
  font-size: 20px;
  line-height: 24px;
  width: 300px;
  margin: 20px 240px 0 326px;

  @media screen and (max-width: 1000px) {
    margin: 20px 114px 0 200px;
  }

  @media screen and (max-width: 700px) {
    margin: 20px 51px 0 95px;
    width: 130px;
    font-size: 16px;
  }
`;
const ModalArtistName = styled.p`
  background-color: #2a2a2a;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  width: 300px;
  margin: 3px 240px 20px 326px;

  @media screen and (max-width: 1000px) {
    margin: 6px 114px 20px 200px;
  }

  @media screen and (max-width: 700px) {
    margin: 6px 51px 20px 95px;
    width: 130px;
    font-size: 14px;
  }
`;
const ModalContentInput = styled.textarea`
  background-color: #2a2a2a;
  border: none;
  resize: none;

  width: 100%;
  height: 303px;
  padding: 0 40px 20px 40px;

  @media screen and (max-width: 700px) {
    padding: 20px;
    height: 235px;
  }
`;
const SelectImgDiv = styled.div`
  background-color: #2a2a2a;
  margin-bottom: 60px;
  margin-left: 40px;
  display: flex;

  @media screen and (max-width: 700px) {
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
  }
`;
const imgMapDiv = styled.div`
  background-color: #2a2a2a;
`;
const SelectImg = styled.img`
  position: relative;
  height: 90px;
  width: 90px;
  margin-right: 20px;
  border-radius: 5%;
  object-fit: contain;

  @media screen and (max-width: 700px) {
    height: 40px;
    width: 40px;
  }
`;
const SelectImgDeleteBtn = styled.p`
  position: relative;
  background-color: #2a2a2a;
  border-radius: 10%;
  font-size: 16px;
  width: 16px;
  height: 16px;
  margin-left: 40px;

  cursor: pointer;

  @media screen and (max-width: 700px) {
    width: 13px;
    height: 13px;
    font-size: 13px;
    margin-left: 15px;
  }
`;
const ModalBtnDiv = styled.div`
  background-color: #2a2a2a;
  display: flex;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 60px;

  @media screen and (max-width: 700px) {
    padding: 20px;
    border-top: 1px solid #636366;
  }
`;
const ModalAddBtnLabel = styled.label`
  background-color: #2a2a2a;
  cursor: pointer;
`;
const ModalAddImg = styled.img`
  background-color: #2a2a2a;
  height: 44px;
  width: 50px;

  @media screen and (max-width: 700px) {
    height: 24px;
    width: 24px;
    margin-top: 4px;
  }
`;
const ModalAddPostBtn = styled.button`
  background-color: #7d37df;
  border: none;
  border-radius: 5px;
  width: 120px;
  height: 42px;
  cursor: pointer;

  &:disabled {
    background-color: #636366;
  }

  @media screen and (max-width: 700px) {
    height: 32px;
    width: 45px;
    font-size: 12px;
  }
`;

export default {
  ModalContainer,
  ModalBox,
  ModalContent,
  ModalHeaderBodyDiv,
  ModalHeader,
  ModalTitleDiv,
  ModalTitle,
  CloseBtn,
  ModalArtistName,
  ModalContentInput,
  SelectImgDiv,
  imgMapDiv,
  SelectImg,
  SelectImgDeleteBtn,
  ModalAddImg,
  ModalBtnDiv,
  ModalAddBtnLabel,
  ModalAddPostBtn,
};
