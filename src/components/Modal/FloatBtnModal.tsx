import React from 'react';
import {StCancelBtn, StDiv, StInfo, StLoginBtn, StModalDiv, StTitle, StWholeDiv} from './style';
import {useNavigate} from 'react-router-dom';

const FloatBtnModal = ({setIsModalOpen}: {setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const navigate = useNavigate();

  return (
    <StWholeDiv>
      <StModalDiv>
        <StDiv>
          <StTitle>알림</StTitle>
          <StInfo>로그인 이후 알림을 설정하실 수 있습니다.</StInfo>
          <StInfo>로그인을 하시겠습니까?</StInfo>
          <StCancelBtn onClick={() => setIsModalOpen(false)}>취소</StCancelBtn>
          <StLoginBtn onClick={() => navigate('/login')}>로그인</StLoginBtn>
        </StDiv>
      </StModalDiv>
    </StWholeDiv>
  );
};

export default FloatBtnModal;
