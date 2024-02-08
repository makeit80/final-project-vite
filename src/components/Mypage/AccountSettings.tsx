import React, {useState, useEffect, useRef} from 'react';
import {supabase} from '../../api/supabase';
import styled from 'styled-components';
import nomalimage from '../../assets/images/normalimage.jpg';
import MyAccount from './MyAccount';
import {useNavigate} from 'react-router';

interface AccountSettingProps {
  user: {
    id: string;
    user_metadata?: {
      nickname?: string;
      name?: string;
    };
    provider: string;
  };
  onUpdateNickname: (newNickname: string) => void;
}

const AccountSettings = ({user, onUpdateNickname}: AccountSettingProps) => {
  const [editNickname, setEditNickname] = useState('');
  const [displayNickname, setDisplayNickname] = useState('');
  const [profileImage, setProfileImage] = useState(nomalimage);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [followAt, setFollowAt] = useState([]);
  const navigate = useNavigate();
  const artistNavigateHandler = (artistName: string) => {
    navigate(`/artist/${artistName}`);
  };
  useEffect(() => {
    // 구글로 로그인한 경우 name이 있으면 nickname으로 사용
    if (user.provider === 'google' && user.user_metadata?.name) {
      setEditNickname(user.user_metadata.name);
      setDisplayNickname(editNickname);
    } else {
      fetchData();
      fetchImageData();
      fetchFollowArtist();
    }
  }, [user]);

  //마우스 드래그시  초과된 팔로우 아티스트 리스트 보임
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft + walk;
  };

  const handleShowMyAccount = () => {
    setShowMyAccount(true);
  };
  //유저 닉네임 수파베이스에서 불러오기
  const fetchData = async () => {
    const {data, error} = await supabase.from('userinfo').select('username').eq('id', user.id).single();
    if (error) {
      // console.error('유저 정보 가져오기 실패', error);
    } else {
      // 값을 업데이트할 변수 설정
      let updatedNickname = '';

      if (data?.username) {
        updatedNickname = data.username;
      }

      // 최종적으로 상태 업데이트
      setEditNickname('');
      setDisplayNickname(updatedNickname);
    }
  };
  // 유저 프로필 서버에서 불러오기
  const fetchImageData = async () => {
    try {
      const {data, error} = await supabase.from('userinfo').select('profile_image').eq('id', user.id).single();

      if (data?.profile_image) {
        // 이미지 파일명이나 경로를 가져옴
        const imageFileName = data.profile_image;

        // Supabase 스토리지에서 직접 이미지를 가져오기
        const {data: imageData, error: imageError} = await supabase.storage
          .from('profile-images') // 스토리지 버킷 이름
          .download(imageFileName);

        // 다운로드된 이미지를 Blob URL로 변환
        const imageUrl = URL.createObjectURL(imageData);

        // 상태 업데이트
        setProfileImage(imageUrl);
      }
    } catch (error) {
      // console.error('프로필 이미지 가져오기 오류', error);
    }
  };
  const handleCompleteSettings = () => {
    // Handle completion logic here
    // AccountSettings 컴포넌트가 보이도록 하는 상태 변경
    setShowMyAccount(false);
    fetchImageData();
  };
  const fetchFollowArtist = async () => {
    try {
      const {data} = await supabase.from('userinfo').select('artist_follow').eq('id', user.id);
      setFollowAt(data[0]?.artist_follow || []);
    } catch (error) {
      // console.log('팔로우된 아티스트 불러오기 실패', error);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <StWrapper>
      {showMyAccount ? (
        <MyAccount user={user} onUpdateNickname={onUpdateNickname} onCompleteSettings={handleCompleteSettings} />
      ) : (
        <>
          <StMyAccount>
            <StMyAccountUser>
              <StProfileImage src={profileImage} alt="아바타 이미지" />
              <StNickName>
                <h1>{displayNickname || editNickname}</h1>
                <h2>{user.email}</h2>
              </StNickName>
            </StMyAccountUser>
            <StSettingButton onClick={handleShowMyAccount}>설정</StSettingButton>
          </StMyAccount>
          <StLine></StLine>
          <StMyFollowContainer>
            <StFollowP>내가 팔로우한 아티스트</StFollowP>
            <StFollowArtistList
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {followAt.length > 0 ? (
                followAt.map((followAt, index) => {
                  return (
                    <StFwAtistContainer
                      key={followAt.artistId.id}
                      onClick={() => artistNavigateHandler(followAt.artistId.artist)}
                    >
                      <img src={followAt.artistId.photo_url} />

                      <p>{followAt.artistId.artist}</p>
                    </StFwAtistContainer>
                  );
                })
              ) : (
                <p>팔로우한 아티스트가 없습니다.</p>
              )}
            </StFollowArtistList>
          </StMyFollowContainer>
        </>
      )}
    </StWrapper>
  );
};
const StWrapper = styled.div`
  background-color: #121212;
  width: 100%;
`;
const StMyAccount = styled.div`
  background-color: #121212;
  width: 905px;
  height: 75px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1267px) {
    width: 585px;
  }

  @media screen and (max-width: 820px) {
    width: 540px;
  }

  @media screen and (max-width: 768px) {
    width: 360px;
    padding: 0 20px;
  }
`;
const StMyAccountUser = styled.div`
  background-color: #121212;
  display: flex;

  @media screen and (max-width: 768px) {
  }
`;
const StNickName = styled.div`
  background-color: #121212;
  margin-left: 20px;
  h1 {
    background-color: #121212;
    margin-top: 6px;
    font-size: 20px;
  }
  h2 {
    background-color: #121212;
    margin-top: 10px;
    font-size: 16px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 10px;
    h1 {
      margin-top: 3px;
      font-size: 16px;
    }
    h2 {
      margin-top: 5px;
      font-size: 12px;
    }
  }
`;
const StSettingButton = styled.button`
  background-color: #121212;
  display: inline-block;
  width: 98px;
  height: 36px;
  font-size: 16px;
  margin-top: 6px;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 50px;
    height: 32px;
    font-size: 12px;
    border-radius: 6px;
  }
`;
const StLine = styled.div`
  background-color: #121212;
  width: 905px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  border-bottom: 1px solid #636366;
  padding-bottom: 20px;

  @media screen and (max-width: 1267px) {
    width: 585px;
  }

  @media screen and (max-width: 820px) {
    width: 540px;
  }

  @media screen and (max-width: 768px) {
    width: 360px;
    padding: 0 20px;
    margin-top: 10px;
  }
`;

const StProfileImage = styled.img`
  background-color: #121212;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    width: 42px;
    height: 42px;
  }
`;
const StMyFollowContainer = styled.div`
  background-color: #121212;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    margin-top: 12px;
  }
`;

const StFollowP = styled.p`
  background-color: #121212;
  font-size: 18px;
  font-weight: bold;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    margin-left: 8px;
  }
`;

const StFollowArtistList = styled.div`
  background-color: #121212;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    margin-top: 16px;
  }
`;

const StFwAtistContainer = styled.div`
  background-color: #121212;
  margin-right: 24px;
  margin-bottom: 24px;
  cursor: pointer;
  img {
    background-color: #121212;
    width: 204px;
    height: 180px;
    border-radius: 10px;
    object-fit: cover;
    transition: filter 0.3s ease;

    &:hover {
      filter: brightness(80%);
    }
  }
  p {
    background-color: #121212;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 12px;
  }

  &:hover::after {
    position: absolute;
    padding: 10px;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  @media screen and (max-width: 1267px) {
    img {
      width: 176px;
      height: 150px;
    }
  }

  @media screen and (max-width: 820px) {
    img {
      width: 161px;
      height: 135px;
    }
  }

  @media screen and (max-width: 768px) {
    margin-left: 8px;
    margin-right: 8px;
    p {
      margin-left: 10px;
      font-size: 13px;
    }
    img {
      width: 152px;
      height: 114px;
    }
  }
`;

export default AccountSettings;
