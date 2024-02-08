import styled from 'styled-components';

const PostLiAndToggleDiv = styled.div`
  display: inline-block;
`;

// PostList
const PostLi = styled.li`
  padding: 20px 0;
  min-height: 170px;
  max-height: 676px;
  width: 952px;
  position: relative;
  border-bottom: 1px solid gray;
  @media screen and (max-width: 1000px) {
    width: 700px;
  }

  @media screen and (max-width: 700px) {
    width: 320px;
    min-height: 107px;
    max-height: 435px;
    padding: 10px 0;
  }
`;
const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PostUserInfoDiv = styled.div`
  display: flex;
`;
const PostUserImg = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 40px;

  @media screen and (max-width: 700px) {
    width: 24px;
    height: 24px;
  }
`;
const PostNameP = styled.p`
  height: 18px;
  width: 300px;
  font-size: 14px;
  margin: 9px 0 9px 10px;

  @media screen and (max-width: 700px) {
    font-size: 12px;
    width: 90px;
    margin: 6px 0 6px 8px;
  }
`;
const PostTimeDiv = styled.div`
  display: flex;
`;
const PostTimeP = styled.p`
  font-size: 13px;
  color: #aeaeb2;
  margin-left: 10px;
  margin: 10px 0 10px 10px;

  @media screen and (max-width: 700px) {
    font-size: 12px;
    margin: 6px 0 6px 8px;
  }
`;
const PostClickOpenModal = styled.div`
  cursor: pointer;
`;
const PostContentsP = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 952px;
  height: 50px;

  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 20px;
  height: 39.5px;

  @media screen and (max-width: 1000px) {
    width: 700px;
  }

  @media screen and (max-width: 700px) {
    font-size: 14px;
    width: 320px;
    height: 40px;

    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

// post Img
const PostContentOneImg = styled.img`
  width: 952px;
  height: 476px;
  object-fit: cover;

  @media screen and (max-width: 1000px) {
    width: 700px;
    height: 380px;
  }

  @media screen and (max-width: 700px) {
    width: 320px;
    height: 240px;
  }
`;
const PostContentTwoImg = styled.img`
  width: 476px;
  height: 476px;
  object-fit: cover;

  @media screen and (max-width: 1000px) {
    width: 350px;
    height: 380px;
  }

  @media screen and (max-width: 700px) {
    width: 160px;
    height: 240px;
  }
`;
const PostContentFourImg = styled.img`
  width: 476px;
  height: 238px;
  object-fit: cover;

  @media screen and (max-width: 1000px) {
    width: 350px;
    height: 190px;
  }

  @media screen and (max-width: 700px) {
    width: 160px;
    height: 120px;
  }
`;
const PostContentThreeImgDiv = styled.div`
  width: 952px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'a b'
    'a c';

  @media screen and (max-width: 1000px) {
    width: 700px;
  }

  @media screen and (max-width: 700px) {
    width: 320px;
  }
`;
const PostContentThreeImgA = styled.img`
  width: 476px;
  height: 476px;
  grid-area: a;
  object-fit: cover;

  @media screen and (max-width: 1000px) {
    width: 350px;
    height: 380px;
  }

  @media screen and (max-width: 700px) {
    width: 160px;
    height: 240px;
  }
`;

const PostContentThreeImgB = styled.img`
  width: 476px;
  height: 238px;
  grid-area: b;
  object-fit: cover;

  @media screen and (max-width: 1000px) {
    width: 350px;
    height: 190px;
  }

  @media screen and (max-width: 700px) {
    width: 160px;
    height: 120px;
  }
`;
const PostContentThreeImgC = styled.img`
  width: 476px;
  height: 238px;
  grid-area: c;
  object-fit: cover;

  @media screen and (max-width: 1000px) {
    width: 350px;
    height: 190px;
  }

  @media screen and (max-width: 700px) {
    width: 160px;
    height: 120px;
  }
`;

//이모지
const PostLikeCommentMoreDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media screen and (max-width: 700px) {
    margin-top: 10px;
  }
`;
const PostLikeCommentDiv = styled.div`
  background-color: transparent;
  display: flex;
`;
const CommentImg = styled.img`
  background-color: transparent;
  width: 27px;
  height: 27px;
  margin-left: 40px;

  cursor: pointer;

  @media screen and (max-width: 700px) {
    width: 20px;
    height: 20px;
    margin-left: 15px;
  }
`;
const PostMoreImg = styled.img`
  background-color: transparent;
  width: 28px;

  cursor: pointer;

  @media screen and (max-width: 700px) {
    width: 20px;
    height: 20px;
  }
`;

const PostBtnsWrap = styled.div`
  width: 100%;
  height: 100%;
`;
const PostBtnsBox = styled.div`
  position: relative;
`;
const PostBtnDiv = styled.div`
  width: 200px;
  height: 92px;
  position: absolute;
  bottom: 20%;
  left: 75.5%;
  margin-bottom: 20px;

  @media screen and (max-width: 1000px) {
    left: 67%;
  }

  @media screen and (max-width: 700px) {
    width: 100px;
    height: 70px;
    left: 62%;
    margin-bottom: 13px;
  }
`;
const PostBtn = styled.button`
  width: 200px;
  height: 46px;
  font-size: 14px;
  color: white;
  border: 1px solid white;

  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }

  @media screen and (max-width: 700px) {
    width: 100px;
    height: 35px;
  }
`;

export default {
  PostLiAndToggleDiv,
  PostLi,
  PostHeader,
  PostUserInfoDiv,
  PostUserImg,
  PostNameP,
  PostTimeP,
  PostTimeDiv,

  PostClickOpenModal,
  PostContentsP,

  PostContentOneImg,
  PostContentTwoImg,
  PostContentThreeImgDiv,
  PostContentThreeImgA,
  PostContentThreeImgB,
  PostContentThreeImgC,
  PostContentFourImg,

  PostBtnsWrap,
  PostBtnsBox,
  PostBtnDiv,
  PostLikeCommentMoreDiv,
  PostLikeCommentDiv,
  PostBtn,
  PostMoreImg,
  CommentImg,
};
