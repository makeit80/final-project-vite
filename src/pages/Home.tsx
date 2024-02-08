import styled from 'styled-components';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import bannerImg from '../assets/images/bannerImg.webp';
import {getArtistList} from '../api/artistapi';
import {useQuery} from '@tanstack/react-query';
import Spinner from '../components/Common/Spinner';
import {supabase} from '../api/supabase';
import {loginState} from '../shared/recoil/authAtom';
import {useRecoilState} from 'recoil';

const Home = () => {
  const navigate = useNavigate();
  const {state: searchInput} = useLocation();
  const [searchedResults, setSearchedResults] = useState<string[]>([]);
  const [followAt, setFollowAt] = useState([]);
  const [login, setLogin] = useRecoilState(loginState);
  const {data: artistList, isLoading: artistLoading} = useQuery({
    queryKey: ['artist'],
    queryFn: getArtistList,
  });

  //로그인 하면 팔로우된 유저 정보를 불러온다.
  const fetchFollowArtist = async () => {
    try {
      //로그인 된 사용자 정보 확인
      const user = await supabase.auth.getUser();
      const {data: userinfoData} = await supabase.from('userinfo').select('artist_follow').eq('id', user.data.user.id);
      setFollowAt(userinfoData[0]?.artist_follow);
    } catch (error) {
      // console.log('팔로우된 아티스트 불러오기 실패', error);
    }
  };

  useEffect(() => {
    if (searchInput) {
      const filteredArtists = artistList?.filter(item => item.artist.includes(searchInput));
      setSearchedResults(filteredArtists);
    }
    fetchFollowArtist();
  }, []);

  const artistNavigateHandler = (artistName: string) => {
    navigate(`artist/${artistName}`);
  };

  if (artistLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <StMainWrapper>
        {/* // Banner */}
        <StBannerDiv>
          <StBannerImg src={bannerImg} alt="bannerimg"></StBannerImg>
        </StBannerDiv>

        {searchInput && searchInput.length > 0 ? (
          <StListWrapper>
            <StSpan>검색결과</StSpan>
            <StListDiv>
              {artistList?.filter(ele => ele.artist.includes(searchInput)).length === 0 ? (
                <StInfoP>검색결과가 없습니다.</StInfoP>
              ) : (
                artistList
                  ?.filter(el => el.artist.includes(searchInput))
                  .map(el => {
                    return (
                      <StListTargetDiv
                        key={el.id}
                        onClick={() => {
                          artistNavigateHandler(el.artist);
                        }}
                      >
                        <StArtistTargetImg src={el.photo_url} alt="targetartistimg" />
                        <StListTargetP>{el.artist}</StListTargetP>
                      </StListTargetDiv>
                    );
                  })
              )}
            </StListDiv>
          </StListWrapper>
        ) : (
          <>
            {/* // My Artist */}
            <StSideWrapper>
              {login ? (
                <StDiv>
                  <StSpan>나의 아티스트</StSpan>
                  <StArtistDiv>
                    {followAt?.length > 0 ? (
                      followAt?.map(followAt => {
                        return (
                          <StListTargetDiv
                            key={followAt.artistId.id}
                            onClick={() => artistNavigateHandler(followAt.artistId.artist)}
                          >
                            <div>
                              <StArtistTargetImg src={followAt.artistId.photo_url} alt="targetartistimg" />
                            </div>
                            <StListTargetP>{followAt.artistId.artist}</StListTargetP>
                          </StListTargetDiv>
                        );
                      })
                    ) : (
                      <StInfoP>팔로우한 아티스트가 없습니다.</StInfoP>
                    )}
                  </StArtistDiv>
                </StDiv>
              ) : null}

              {/* // Artist List */}
              <StDiv>
                <StSpan>아티스트 만나보기</StSpan>
                <StListDiv>
                  {artistList?.map(el => {
                    return (
                      <StListTargetDiv
                        key={el.id}
                        onClick={() => {
                          artistNavigateHandler(el.artist);
                        }}
                      >
                        <div>
                          <StArtistTargetImg src={el.photo_url} alt="targetartistimg" />
                        </div>

                        <StListTargetP>{el.artist}</StListTargetP>
                      </StListTargetDiv>
                    );
                  })}
                </StListDiv>
              </StDiv>
              <StP>더 많은 아티스트 준비 중</StP>
            </StSideWrapper>
          </>
        )}
      </StMainWrapper>
    </>
  );
};

// Wrapper
const StMainWrapper = styled.div`
  background-color: black;
  padding-bottom: 100px;
  @media screen and (max-width: 1279px) {
    padding-bottom: 70px;
  }
  @media screen and (max-width: 768px) {
    padding-bottom: 50px;
  }
`;

const StSideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  @media screen and (max-width: 1279px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;

// Common
const StP = styled.p`
  margin-top: 50px;
  color: white;
  @media screen and (max-width: 1279px) {
    font-size: 14px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 30px;
    font-size: 12px;
  }
`;

const StSpan = styled.span`
  color: white;
  font-size: 24px;
  @media screen and (max-width: 1279px) {
    font-size: 20px;
  }
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

// Banner
const StBannerDiv = styled.div`
  width: 100vw;
  height: 400px;
  background-color: #9747ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  @media screen and (max-width: 1279px) {
    height: 300px;
  }
  @media screen and (max-width: 768px) {
    height: 180px;
    margin-top: 64px;
  }
`;

const StBannerImg = styled.img`
  width: 1000px;
  height: 400px;
  background-size: cover;
  background-color: transparent;
  object-fit: cover;
  @media screen and (max-width: 1279px) {
    height: 300px;
  }
  @media screen and (max-width: 768px) {
    height: 180px;
  }
`;

// My Artist
const StDiv = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 60px;
  padding-left: 12.5%;
  padding-right: 12.5%;
  justify-content: center;

  @media screen and (max-width: 1279px) {
    padding-left: 8%;
    padding-right: 8%;
    margin-top: 25px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 20px;
    margin-bottom: 24px;
  }
`;

const StArtistDiv = styled.div`
  margin-top: 50px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, 18%);
  /* justify-content: center; */
  grid-auto-rows: auto;
  @media screen and (max-width: 1279px) {
    margin-top: 35px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 190px));
    gap: 18px;
    grid-template-rows: repeat(4, auto);
  }

  @media screen and (max-width: 1024px) {
    grid-template-rows: repeat(3, auto);
  }

  @media screen and (max-width: 768px) {
    margin-top: 20px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
    grid-auto-rows: 172px;
    grid-template-rows: repeat(3, auto);

    & > * {
      transition: transform 1s ease;
    }
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 150px));
    grid-template-rows: repeat(2, auto);
  }
`;

const StArtistTargetImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

// Artist List
const StListWrapper = styled.div`
  width: 100%;
  padding-left: 12.5%;
  padding-right: 12.5%;
  margin-top: 50px;
  @media screen and (max-width: 1279px) {
    padding-left: 8%;
    padding-right: 8%;
    margin-top: 30px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 24px;
  }
`;

const StListDiv = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 18%));
  gap: 20px;
  grid-row-gap: 35px;
  /* justify-content: center; */
  & > * {
    transition: transform 1s ease;
  }
  @media screen and (max-width: 1279px) {
    margin-top: 35px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 190px));
    gap: 18px;
    grid-template-rows: repeat(4, auto);

    & > * {
      transition: transform 0.5s ease;
    }
  }

  @media screen and (max-width: 1024px) {
    grid-template-rows: repeat(4, auto);
  }

  @media screen and (max-width: 768px) {
    margin-top: 20px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
    grid-auto-rows: 225px;
    grid-template-rows: repeat(3, auto);

    & > * {
      transition: transform 1s ease;
    }
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 150px));
    grid-template-rows: repeat(2, auto);
  }
`;
const StListTargetDiv = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 1s;
  }
`;

const StListTargetP = styled.p`
  color: white;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  @media screen and (max-width: 1279px) {
    margin-top: 12px;
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 5px;
    font-size: 14px;
  }
`;

const StInfoP = styled.p`
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

export default Home;
