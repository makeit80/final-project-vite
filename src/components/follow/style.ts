import styled from 'styled-components';

export const StFollowNumDiv = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;
  @media screen and (max-width: 768px) {
    gap: 4px;
    font-size: 12px;
  }
`;

export const StDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
`;

export const StButton = styled.button`
  width: 120px;
  height: 42px;
  border: 1px solid #aeaeb2;
  border-radius: 5px;
  &:hover {
    border: 2px solid #aeaeb2;
  }
  &.following {
    color: #9747ff;
    border: 1px solid #9747ff;
  }
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 32px;
  }
`;

export const StBtnDiv = styled.div`
  width: 120px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding-right: 15px;
  gap: 10px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 32px;
    gap: 5px;
  }
`;

export const StFollowingP = styled.p`
  color: #9747ff;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const StFollowP = styled.p`
  font-size: 16px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
