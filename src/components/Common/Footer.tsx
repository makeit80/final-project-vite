import styled from 'styled-components';

const Footer = () => {
  return (
    <StWrapper>
      {/* Policy */}
      <StDiv>
        <StUl>
          <StLi>이용약관</StLi>
          <StLi>서비스운영정책</StLi>
          <StLi>청소년 보호 정책</StLi>
          <StLi>개인정보처리방침</StLi>
          <StLi>쿠키정책</StLi>
          <StLi>쿠키 설정</StLi>
        </StUl>
      </StDiv>
      <StInfoWrap>
        <StInfoDiv>
          <StInfoP>상호 AIDOL COMPANY Inc.</StInfoP>
        </StInfoDiv>
        <StInfoDiv>
          <StInfoP>대표자 천민정</StInfoP>
        </StInfoDiv>
        <StInfoDiv>
          <StInfoP>전화번호 02{')'}0000-0000</StInfoP>
        </StInfoDiv>
        <StInfoDiv>
          <StInfoP>FAX +{')'}82-0-0000-0000</StInfoP>
        </StInfoDiv>
        <StInfoDiv>
          <StInfoP>주소 서울특별시 강남구</StInfoP>
        </StInfoDiv>
        <StInfoDiv>
          <StInfoP>개인정보관리책임자 천민정, 권영준, 윤유빈</StInfoP>
        </StInfoDiv>
        <StInfoDiv>
          <StInfoP>사업자등록번호 000-00-00000</StInfoP>
        </StInfoDiv>
      </StInfoWrap>
      <StCompanyNameP>©AIdol COMPANY Inc.Ver.1.0.0</StCompanyNameP>
      {/* Info */}
    </StWrapper>
  );
};

const StWrapper = styled.div`
  width: 100vw;
  height: 250px;
  padding: 0 12%;
  background-color: black;
  color: #aeaeb2;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 768px) {
  }
`;
// Policy
const StDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const StUl = styled.ul`
  width: 100%;

  border-top: 2px solid gray;
  border-bottom: 1px solid #aeaeb2;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
  }
`;
const StLi = styled.li`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 65px;

  color: #aeaeb2;

  @media screen and (max-width: 1267px) {
    font-size: 14px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 50px;
    font-size: 12px;
  }

  @media screen and (max-width: 410px) {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 50px;
  }
`;
// Info
const StInfoWrap = styled.div`
  width: 895px;
  margin-top: 20px;
  margin-bottom: 40px;

  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1268px) {
    margin-bottom: 25px;
  }

  @media screen and (max-width: 1000px) {
    width: 650px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    width: 550px;
  }

  @media screen and (max-width: 678px) {
    width: 500px;
  }

  @media screen and (max-width: 540px) {
    width: 400px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 490px) {
    width: 300px;
  }
`;
const StInfoDiv = styled.div`
  display: flex;
  margin-right: 17px;
  margin-bottom: 8px;
`;
const StInfoP = styled.p`
  font-size: 13px;
  color: #aeaeb2;

  @media screen and (max-width: 540px) {
    font-size: 12px;
  }
`;

const StCompanyNameP = styled.p`
  color: #aeaeb2;

  @media screen and (max-width: 678px) {
    font-size: 15px;
  }

  @media screen and (max-width: 540px) {
    font-size: 13px;
  }
`;

export default Footer;
