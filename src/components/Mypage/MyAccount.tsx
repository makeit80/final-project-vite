import React, {ChangeEvent, useState, useEffect} from 'react';
import {supabase} from '../../api/supabase';
import styled from 'styled-components';
import nomalimage from '../../assets/images/normalimage.jpg';
import editProfileImg from '../../assets/images/compose.png';
import {toast} from 'react-toastify';

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
  onCompleteSettings: () => void;
}

const MyAccount = ({user, onUpdateNickname, onCompleteSettings}: AccountSettingProps) => {
  const [editNickname, setEditNickname] = useState<string>('');
  const [displayNickname, setDisplayNickname] = useState('');
  const [profileImage, setProfileImage] = useState(nomalimage);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  //에러
  const [nicknameError, setNicknameError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isCheckedNickname, setIsCheckedNickname] = useState<boolean>(false);

  //유저 닉네임 수파베이스에서 불러오기
  const fetchData = async () => {
    const {data, error} = await supabase.from('userinfo').select('username').eq('id', user.id).single();

    // 값을 업데이트할 변수 설정
    let updatedNickname = '';

    if (data?.username) {
      updatedNickname = data.username;
    }

    // 최종적으로 상태 업데이트
    setEditNickname('');
    setDisplayNickname(updatedNickname);
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

  const handleNicknameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNickname(() => {
      const newNickname = e.target.value;
      if (!newNickname) {
        setNicknameError('변경할 닉네임을 입력해주세요.');
        setIsCheckedNickname(false);
      } else if (newNickname.length < 2) {
        setNicknameError('닉네임은 2자 이상이어야 합니다.');
        setIsCheckedNickname(false);
      } else if (newNickname) {
        setIsCheckedNickname(false);
        setNicknameError('');
      }
      return newNickname;
    });
  };

  const handleValidateNickname = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {data} = await supabase.from('userinfo').select().eq('username', editNickname);
    if (data?.length !== 0) {
      toast.error('이미 사용중인 닉네임입니다.');
      setIsValid(false);
      setIsCheckedNickname(false);
    } else {
      toast.success('사용 가능한 닉네임입니다.');
      setIsValid(true);
      setIsCheckedNickname(true);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      // 이미지 선택 후 프로필 이미지 상태 업데이트
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setIsValid(true);
    }
  };

  const handleCompleteSettings = async () => {
    // 프로필 업로드 로직
    if (selectedImage) {
      const uniqueKey = `profile-image/${Date.now()}_${Math.floor(Math.random() * 1000)}.png`;
      const {data: uploadData, error: uploadError} = await supabase.storage
        .from('profile-images')
        .upload(uniqueKey, selectedImage, {contentType: 'image/png'});

      if (uploadError) {
        return;
      }

      const supabaseUrl = 'https://dmfvylsldcremnnbzjuo.supabase.co';
      const bucketName = 'profile-images';

      const {data: profileData, error: profileUpdateError} = await supabase
        .from('userinfo')
        .update({profile_image: uniqueKey})
        .eq('id', user.id)
        .select();

      if (profileUpdateError) {
        // console.error('프로필 업데이트 실패', profileUpdateError);
      } else {
        const uploadUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${uniqueKey}`;
        setProfileImage(uploadUrl);
        // toast.success('프로필 수정되었습니다. ');
      }
    }

    // 닉네임 업데이트 로직
    if (editNickname) {
      const {data: nicknameData, error: nicknameUpdateError} = await supabase
        .from('userinfo')
        .update({username: editNickname})
        .eq('id', user.id)
        .select();

      if (nicknameUpdateError) {
        // console.error('닉네임 업데이트 실패', nicknameUpdateError);
      } else {
        onUpdateNickname(editNickname);
        toast.success('프로필이 수정되었습니다.');
        setDisplayNickname(editNickname);
        setEditNickname('');
      }
    }

    onCompleteSettings();
  };

  useEffect(() => {
    // 구글로 로그인한 경우 name이 있으면 nickname으로 사용
    if (user.provider === 'google' && user.user_metadata?.name) {
      setEditNickname(user.user_metadata.name);
      setDisplayNickname(editNickname);
    } else {
      fetchData();
      fetchImageData();
    }
  }, [user]);

  return (
    <>
      <StSettingDiv>
        <StMyAccountName>나의 정보 {'>'} 프로필 편집</StMyAccountName>
        <StMyAccountDiv>
          <StMyAccount>
            <StProfileImage src={profileImage} alt="아바타 이미지" />
            <StProfileSettingContainer>
              <StEditProfileLabel htmlFor="profileImg">
                <StEditProfileImg src={editProfileImg} />
                <input
                  id="profileImg"
                  name="profileImg"
                  type="file"
                  accept="image/*"
                  style={{display: 'none'}}
                  onChange={handleImageChange}
                  hidden
                />
              </StEditProfileLabel>
            </StProfileSettingContainer>
          </StMyAccount>
        </StMyAccountDiv>
        {user.provider !== 'google' && (
          <StUpdateContainer>
            <StUpdateTitle>닉네임</StUpdateTitle>
            <StUpdateNicknameDiv>
              <StNicknameInput
                type="text"
                defaultValue={displayNickname}
                placeholder="변경할 닉네임 입력"
                onChange={handleNicknameChange}
                minLength={2}
                maxLength={8}
              />
              <StcheckButton onClick={handleValidateNickname}>중복확인</StcheckButton>
            </StUpdateNicknameDiv>
            <StErrorP>{nicknameError}</StErrorP>
            <StProfileSaveBtnDiv>
              <StProfileSaveBtn
                disabled={isValid ? false : true}
                onClick={handleCompleteSettings}
                style={{background: isValid ? 'linear-gradient(45deg, #c477b2, #7d37df)' : '#636366'}}
              >
                저장
              </StProfileSaveBtn>
            </StProfileSaveBtnDiv>
          </StUpdateContainer>
        )}
      </StSettingDiv>
    </>
  );
};

const StSettingDiv = styled.div`
  background-color: #121212;

  @media screen and (max-width: 1267px) {
    width: 590px;
  }

  @media screen and (max-width: 768px) {
    width: 360px;
  }
`;

const StMyAccountName = styled.div`
  background-color: #121212;
  font-size: 20px;
  margin-bottom: 76px;

  @media screen and (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 40px;
    margin-left: 3px;
  }
`;
const StMyAccountDiv = styled.div`
  background-color: #121212;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const StMyAccount = styled.div`
  background-color: #121212;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 360px;
  }
`;

const StProfileImage = styled.img`
  background-color: #121212;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 82px;
    height: 82px;
  }
`;
const StUpdateContainer = styled.div`
  background-color: #121212;
  margin-top: 60px;
`;

const StUpdateTitle = styled.p`
  background-color: #121212;
  color: #aeaeb2;
  font-size: 16px;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const StUpdateNicknameDiv = styled.div`
  background-color: #121212;
  display: flex;
  justify-content: space-between;
`;
const StErrorP = styled.p`
  background-color: #121212;
  margin-top: 10px;
  font-size: 14px;
  color: red;
`;
const StcheckButton = styled.button`
  background-color: #121212;
  color: #aeaeb2;
  border: none;

  &:hover {
    color: #9747ff;
    cursor: pointer;
  }

  @media screen and (max-width: 1267px) {
    width: 60px;
    margin-right: 30px;
  }

  @media screen and (max-width: 768px) {
    width: 65px;
    font-size: 13px;
    margin-right: 15px;
  }
`;
const StProfileSaveBtnDiv = styled.div`
  background-color: #121212;
  display: flex;
  flex-direction: row-reverse;
`;
const StProfileSaveBtn = styled.button`
  margin-top: 200px;
  margin-bottom: 30px;
  width: 120px;
  height: 40px;
  font-size: 16px;
  border: none;
  border-radius: 5px;

  @media screen and (max-width: 841px) {
    margin-top: 200px;
    margin-bottom: 50px;
    margin-right: 20px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 160px;
    margin-bottom: 50px;
    width: 80px;
  }
`;
const StNicknameInput = styled.input`
  background-color: #121212;
  font-size: 14px;
  font-weight: bold;
  width: 840px;
  height: 34px;
  border: none;
  border-bottom: 1px solid #636366;

  @media screen and (max-width: 1267px) {
    width: 500px;
  }

  @media screen and (max-width: 768px) {
    width: 270px;
  }
`;
const StProfileSettingContainer = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 81%;
  left: 64%;

  @media screen and (max-width: 768px) {
    top: 60%;
    left: 54%;
  }
`;
const StEditProfileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9747ff;
  height: 24px;
  width: 24px;
  border-radius: 50%;
`;
const StEditProfileImg = styled.img`
  width: 17px;
  border-radius: 50%;
  background-color: #9747ff;
`;

export default MyAccount;
