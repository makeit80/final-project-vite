import {useEffect, useState} from 'react';
import {supabase} from '../api/supabase';
import {getArtistDetail} from '../api/artistapi';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import {useNavigate, useParams} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {loginState} from '../shared/recoil/authAtom';
import Checker from '../components/Schedule/Checker';
import {useQuery} from '@tanstack/react-query';
import FollowArtistBt from '../components/follow/FollowArtistBt';
import Spinner from '../components/Common/Spinner';
import PortalModal from '../components/Common/portalModal';
import FloatBtnModal from '../components/Modal/FloatBtnModal';
import MetaTag from '../shared/seohelmet/metaTag';

const Artist = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [currentuser, setCurrentuser] = useState('');
  const [login] = useRecoilState(loginState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const {data: artistDetail, isLoading: artistDetailLoading} = useQuery({
    queryKey: [''],
    queryFn: getArtistDetail,
  });
  const detailTargetData = artistDetail?.find(el => el.artist === param.artistName);
  useEffect(() => {
    const userInfo = async () => {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      setCurrentuser(user);
    };
    userInfo();
  }, []);

  const albumVaildationHandler = (title: string) => {
    const maxLength = 23;
    if (title.length > maxLength) {
      const result = title.slice(0, maxLength) + '···';
      return result;
    } else {
      return title;
    }
  };

  const handleModalClose = () => {
    setIsPhotoModalOpen(false);
  };

  const handleFloatBtn = () => {
    login ? navigate(`/community/${param.artistName}`) : setIsModalOpen(true);
  };

  if (artistDetailLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <meta name="google-site-verification" content="7Mb9db4L5eHnUORCsjuV5zKMR7mjYaY_-8-iVpbvI9A" />
      <MetaTag
        title={detailTargetData.artist}
        description={`해당 아티스트는  ${detailTargetData.artist} 입니다.`}
        image={detailTargetData.profile[0].memberImg}
        url={`https:/aidol.life/artist/${param.artistName}`}
      />

      <StBannerImgDiv url={detailTargetData?.cover}>
        <StNameSpan>{param.artistName}</StNameSpan>
        <FollowArtistBt
          postId={login ? currentuser.id : null}
          artistId={param.artistName}
          // fwcount={targetData.artist_fw_count}
        ></FollowArtistBt>
      </StBannerImgDiv>

      <StContentsWrapper>
        <StWrapper>
          <StTitle>프로필</StTitle>
          <StProfileDiv>
            {detailTargetData?.profile?.map(e => {
              return (
                <StPfWrapper>
                  <StPfMemberDiv>
                    <StPfMemberImg src={e.memberImg}></StPfMemberImg>
                    {detailTargetData?.info
                      ?.filter((el: {name: string}) => el.name === e.memberName)
                      ?.map(ele => {
                        return (
                          <StPfDetailDiv>
                            <StPfDetailP>{`본명 : ${ele.realName}`}</StPfDetailP>
                            <StPfDetailP>{`생년월일 : ${ele.birthday}`}</StPfDetailP>
                            <StPfDetailP>{`데뷔일 : ${ele.debutDate}`}</StPfDetailP>
                            <StPfDetailP>{`데뷔곡 : ${ele.debutSong}`}</StPfDetailP>
                          </StPfDetailDiv>
                        );
                      })}
                  </StPfMemberDiv>
                  <StPfSpan>{e.memberName}</StPfSpan>
                </StPfWrapper>
              );
            })}
          </StProfileDiv>
        </StWrapper>

        <StWrapper>
          <StTitle>앨범</StTitle>
          <StAlbumsDiv>
            {detailTargetData?.album?.map(el => {
              return (
                <StAbWrapper>
                  <StAbImgDiv>
                    <StAbImg src={el.albumImg}></StAbImg>
                  </StAbImgDiv>
                  <StAbContentsSectiion>
                    <StAbTitleP>{albumVaildationHandler(el.title)}</StAbTitleP>
                    <StAbdateP>{el.date}</StAbdateP>
                  </StAbContentsSectiion>
                </StAbWrapper>
              );
            })}
          </StAlbumsDiv>
        </StWrapper>

        <StWrapper>
          <StTitle>뮤직비디오</StTitle>
          <StVideoDiv>
            <ReactPlayer
              url={detailTargetData?.musicVideo}
              width="inherit"
              height="inherit"
              playing={true}
              muted={true}
              controls={true}
              loop={true}
            />
          </StVideoDiv>
        </StWrapper>

        <StWrapper>
          <StTitle>사진</StTitle>
          <StPhotoDiv>
            {detailTargetData?.photo?.map(el => (
              <StPhotoImgDiv
                key={el.imgUrl}
                onClick={() => {
                  setSelectedPhoto(el.imgUrl);
                  setIsPhotoModalOpen(true);
                }}
              >
                <StPhotoImg src={el.imgUrl.replace('/melon/', '/melon/resize/440/')} />
              </StPhotoImgDiv>
            ))}
            {isPhotoModalOpen && (
              <StModalContainer onClick={handleModalClose}>
                <StModalContent src={selectedPhoto} />
              </StModalContainer>
            )}
          </StPhotoDiv>
        </StWrapper>
        <StWrapper>
          <StTitle>스케줄</StTitle>
          <Checker param={param.artistName} />
        </StWrapper>
      </StContentsWrapper>
      <StFloatBtn onClick={handleFloatBtn}>커뮤니티 가기 ➜</StFloatBtn>
      <PortalModal>{isModalOpen && <FloatBtnModal setIsModalOpen={setIsModalOpen} />}</PortalModal>
    </>
  );
};

// Wrapper
const StWrapper = styled.div`
  width: 100%;
  padding-left: 12.5%;
  padding-right: 12.5%;
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    /* padding-left: 20px; */
  }
`;
const StContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;

// Common
const StTitle = styled.p`
  margin-top: 80px;
  margin-bottom: 15px;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 18px;
  }
`;

// Banner
const StBannerImgDiv = styled.div<{url: string}>`
  width: 100vw;
  height: 700px;

  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: column;

  background: linear-gradient(0deg, black, transparent), url(${props => props.url}) center center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
  margin-bottom: 30px;
  @media screen and (max-width: 768px) {
    height: 320px;
  }
`;

// Name
const StNameSpan = styled.span`
  font-size: 50px;
  font-weight: 800;
  letter-spacing: 5px;
  background-color: transparent;
  @media screen and (max-width: 768px) {
    font-size: 35px;
    letter-spacing: 0px;
  }
`;

// Profile
const StProfileDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 250px);
  grid-auto-rows: 266px;
  /* justify-content: center;
  align-items: center; */
  row-gap: 30px;
  @media screen and (max-width: 1279px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 49%));
    grid-template-rows: repeat(2, auto);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(2, 169px);
    grid-auto-rows: 210px;
    row-gap: 0px;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 432px) {
    width: 100%;
    grid-template-columns: repeat(2, 125px);
    grid-auto-rows: 170px;
    row-gap: 0px;
    justify-content: center;
    align-items: center;
  }
`;
const StPfWrapper = styled.div`
  width: 220px;
  height: 266px;
  @media screen and (max-width: 768px) {
    width: 152px;
    height: 210px;
  }
`;
const StPfMemberDiv = styled.div`
  width: 220px;
  height: 220px;
  margin-bottom: 10px;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 142px;
    height: 142px;
    margin-bottom: 5px;
  }
  @media screen and (max-width: 432px) {
    width: 112px;
    height: 112px;
    margin-bottom: 5px;
  }
`;
const StPfMemberImg = styled.img`
  width: inherit;
  height: inherit;
  background-size: cover;
  object-fit: cover;
  border-radius: 15px;
`;
const StPfSpan = styled.span`
  letter-spacing: 2px;
  margin-left: 5px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    letter-spacing: 1px;
  }
`;
const StPfDetailP = styled.p`
  background-color: transparent;
  color: transparent;
  margin-top: 15px;
  font-size: 14px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const StPfDetailDiv = styled.div`
  width: 228px;
  height: 225px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    background-color: #000000aa;
    transition: 0.5s;
  }
  &:hover ${StPfDetailP} {
    transition: 0.5s;
    color: #ececec;
  }
  @media screen and (max-width: 768px) {
    width: 152px;
    height: 152px;
  }
`;

// Album
const StAlbumsDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 250px);
  grid-auto-rows: 266px;
  grid-gap: 20px;
  /* justify-content: center; */
  @media screen and (max-width: 1709px) {
    grid-template-rows: repeat(4, auto);
    grid-template-columns: repeat(auto-fit, minmax(100px, 20%));
  }

  @media screen and (max-width: 1279px) {
    grid-template-rows: repeat(5, auto);
    grid-template-columns: repeat(auto-fit, minmax(100px, 45%));
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(5, minmax(184px, 45%));
    overflow: auto;
    overflow-x: auto;
    grid-auto-rows: 210px;
    grid-gap: 0px;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      background-color: #232323;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #84898c3a;
      border-radius: 30px;
    }
    width: 100%; /* Change to 100% */
    margin: 0 auto; /* Add this line for centering */
  }
`;
const StAbWrapper = styled.div`
  width: 220px;
  height: 286px;

  @media screen and (max-width: 768px) {
    width: 152px;
    height: 210px;
    justify-content: center;
    align-items: center;
  }
`;
const StAbImgDiv = styled.div`
  width: 220px;
  height: 220px;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    width: 152px;
    height: 152px;
    margin-bottom: 7px;
  }
`;
const StAbImg = styled.img`
  width: inherit;
  height: inherit;
  background-size: cover;
  object-fit: cover;
  border-radius: 15px;
`;

const StAbContentsSectiion = styled.section`
  margin-left: 5px;
`;
const StAbTitleP = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
const StAbdateP = styled.p`
  font-size: 13px;
  color: gray;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

// Music Video
const StVideoDiv = styled.div`
  width: 1440px;
  height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1278px) {
    width: 900px;
    height: 480px;
  }
  @media screen and (max-width: 768px) {
    width: 550px;
    height: 240px;
  }
  @media screen and (max-width: 432px) {
    width: 272px;
    height: 182px;
  }
`;

// Photo
const StPhotoDiv = styled.div`
  width: 100%;
  height: 640px;

  display: grid;
  grid-template-columns: repeat(6, 15%);
  grid-auto-rows: 220px;
  gap: 20px;

  overflow: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    background-color: #232323;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #84898c3a;
    border-radius: 30px;
  }
  @media screen and (max-width: 1827px) {
    width: auto;
    grid-template-columns: repeat(5, 20%);
    overflow-y: auto;
    overflow-x: auto;
  }

  @media screen and (max-width: 1279px) {
    width: auto;
    grid-template-columns: repeat(3, 40%);
    overflow-y: auto;
  }

  @media screen and (max-width: 768px) {
    width: auto;
    height: 350px;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 5px;
    overflow-x: auto;
  }
`;
const StPhotoImgDiv = styled.div`
  width: 220px;
  height: 220px;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
    transition: all 1s;
  }
  @media screen and (max-width: 1279px) {
    width: 202px;
    height: 202px;
  }

  @media screen and (max-width: 768px) {
    width: 152px;
    height: 152px;
  }
`;
const StPhotoImg = styled.img`
  border-radius: 15px;
  width: 100%;
  height: 100%;
  background-size: cover;
  object-fit: cover;
`;

// Floating Button
const StFloatBtn = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;

  width: 200px;
  height: 50px;

  border: none;
  background-image: linear-gradient(45deg, #d651d6, #5a68e8, #e1b1ff);
  border-radius: 5px;

  margin-bottom: 30px;
  margin-right: 30px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: 0.7s;
  }
  @media screen and (max-width: 768px) {
    width: 160px;
    height: 46px;
  }
`;
const StModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StModalContent = styled.img`
  max-width: 80%;
  max-height: 80%;
  border-radius: 8px;
`;
export default Artist;
