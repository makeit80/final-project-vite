import styled from 'styled-components';

const SearchForm = styled.form`
  width: 200px;
  height: 43px;
  background-color: #2d2d2d;
  border-radius: 50px;
  align-items: center;
  margin-right: 60px;

  @media screen and (max-width: 768px) {
    height: 30px;
    margin-right: 24px;
    width: 150px;
  }
`;
const SearchInput = styled.input`
  width: 200px;
  background: none;
  border: none;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 12px;

  @media screen and (max-width: 768px) {
    font-size: 13px;
    margin-left: 10px;
    margin-top: 7px;
    width: 150px;
  }

  @media screen and (max-width: 400px) {
    font-size: 12px;
    margin-left: 10px;
  }
`;

export default {SearchForm, SearchInput};
