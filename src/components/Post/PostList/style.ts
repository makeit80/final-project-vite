import styled from 'styled-components';

// PostList
const PostDiv = styled.div`
  width: 952px;
  margin-top: 20px;
  margin-bottom: 80px;

  @media screen and (max-width: 1000px) {
    width: 700px;
  }

  @media screen and (max-width: 700px) {
    width: 320px;
  }
`;
const PostUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
`;

export default {
  PostDiv,
  PostUl,
};
