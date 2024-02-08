import styled from 'styled-components';

export const StFormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
`;

export const StForm = styled.form`
  background-color: #2a2a2a;
  width: 400px;
  height: 500px;
  border-radius: 10px;
  @media screen and (max-width: 768px) {
    width: 320px;
    height: 420px;
  }
`;

export const StFormDiv = styled.div`
  width: 300px;
  height: 400px;
  margin: 35px auto;
  text-align: left;
  background-color: transparent;
  @media screen and (max-width: 768px) {
    width: 260px;
    height: 360px;
    margin: 30px auto;
  }
`;

export const StTitleP = styled.p`
  height: 40px;
  font-size: x-large;
  background-color: transparent;
  user-select: none;
  @media screen and (max-width: 768px) {
    height: 30px;
    font-size: 22px;
  }
`;

export const StInfoP = styled.p`
  height: 30px;
  font-size: small;
  background-color: transparent;
  @media screen and (max-width: 768px) {
    height: 22px;
    font-size: 12px;
    margin-bottom: 3px;
  }
`;

export const StInputDiv = styled.div`
  width: 300px;
  height: 50px;
  background-color: transparent;
  position: relative;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    width: 260px;
    height: 35px;
    margin-bottom: 8px;
  }
`;

export const StInputButton = styled.button`
  width: 70px;
  height: 25px;
  background-color: black;
  border: none;
  border-radius: 5px;

  position: absolute;
  top: 25%;
  right: 0;
  cursor: pointer;

  font-size: 12px;
  letter-spacing: 1.1px;

  &.success {
    background-color: gray;
    transition: 0.5s;
  }
  &.failed {
    background-color: #5a68e8;
    transition: 0.5s;
  }
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 22px;
    font-size: 11px;
    top: 12%;
  }
`;

export const StInput = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  border-width: 0 0 1px;
  background-color: transparent;
  @media screen and (max-width: 768px) {
    width: 260px;
    height: 36px;
    margin-bottom: 8px;
    font-size: 12px;
  }
`;

export const StErrorMessage = styled.span`
  color: red;
  background-color: transparent;
  font-size: x-small;
`;

export const StSigninBtn = styled.button`
  width: 300px;
  height: 40px;
  font-size: small;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  @media screen and (max-width: 768px) {
    width: 260px;
    height: 35px;
  }
`;

export const StSignupBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: transparent;
  font-size: x-small;
  gap: 5px;
  margin-top: 15px;
  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const StSpan = styled.span`
  background-color: transparent;
  color: #aeaeb2;
`;

export const StCreateAccountSpan = styled.span`
  text-decoration: underline;
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;
export const StDivisionDiv = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: #aeaeb2;
  font-size: x-small;
  margin: 25px 0px;
  background-color: transparent;
  user-select: none;
  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    background: #636366;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 7px;
  }
  @media screen and (max-width: 768px) {
    margin: 22px 0px;
  }
`;

export const StGoogleLoginBtn = styled.button`
  width: 300px;
  height: 40px;
  font-size: small;
  background-color: white;
  color: black;
  border: none;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 260px;
    height: 35px;
  }
`;

export const StGoogleIcon = styled.img`
  height: 18px;
  background-color: transparent;
  @media screen and (max-width: 768px) {
    height: 15px;
  }
`;

export const StGoogleDiv = styled.div`
  background-color: transparent;
  margin-left: 10px;
  width: 170px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 160px;
    height: 32px;
  }
`;

export const StGoogleP = styled.p`
  background-color: transparent;
  color: black;
`;

export const StKakaoImg = styled.img`
  width: 300px;
  height: 40px;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 260px;
    height: 36px;
  }
`;

export const StSignupBtn = styled.button`
  width: 300px;
  height: 40px;
  font-size: small;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  @media screen and (max-width: 768px) {
    width: 260px;
    height: 35px;
    margin-top: 30px;
  }
`;
