import styled from 'styled-components';

const Nav = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000080;
  z-index: 100;

  @media screen and (max-width: 768px) {
    height: 65px;
  }
`;
const NavContainer = styled.div`
  background-color: transparent;
`;
const LogNImgsDiv = styled.div`
  background-color: transparent;
  display: flex;
`;
const LogoImg = styled.img`
  background-color: transparent;
  width: 105px;
  margin-right: 700px;
  cursor: pointer;

  @media screen and (max-width: 1267px) {
    margin-right: 400px;
  }

  @media screen and (max-width: 995px) {
    margin-right: 300px;
  }

  @media screen and (max-width: 850px) {
    margin-right: 230px;
  }

  @media screen and (max-width: 768px) {
    margin-right: 108px;
  }

  @media screen and (max-width: 470px) {
    margin-right: 48px;
  }

  @media screen and (max-width: 400px) {
    margin-right: 18px;
  }
`;

const NavImgsDiv = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
`;
const AlramDiv = styled.div`
  background-color: transparent;
  position: relative;
  width: 36px;
  height: 36px;
  margin-right: 60px;

  @media screen and (max-width: 768px) {
    width: 24px;
    height: 24px;
    margin-right: 24px;
  }
`;
const AlramCounterDiv = styled.div`
  background-color: transparent;
`;
const AlramImg = styled.img`
  background-color: transparent;
  width: 36px;
  height: 36px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;
const StAlarmCounterP = styled.p`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #9747ff;
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;

  z-index: 1000;

  @media screen and (max-width: 768px) {
    width: 12px;
    height: 12px;
    font-size: 10px;
  }
`;
const MypageImg = styled.img`
  background-color: transparent;
  width: 36px;
  height: 36px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;
const SigninBtn = styled.button`
  background-color: #9747ff;
  border: none;
  width: 110px;
  height: 36px;
  border-radius: 5px;
  cursor: pointer;

  font-size: 16px;
  text-align: center;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    width: 70px;
    font-size: 12px;
  }
`;

export default {
  Nav,
  NavContainer,
  LogNImgsDiv,
  LogoImg,
  NavImgsDiv,
  AlramCounterDiv,
  AlramDiv,
  AlramImg,
  StAlarmCounterP,
  MypageImg,
  SigninBtn,
};
