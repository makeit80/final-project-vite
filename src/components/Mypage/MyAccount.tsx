import React, {ChangeEvent, useState, useEffect} from 'react';
import {supabase} from '../../api/supabase';
import styled from 'styled-components';
import nomalimage from '../../assets/images/normalimage.jpg';
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
      <div>
        <StMyAccountName>
          <p>나의 정보 {'>'} 계정 설정 </p>
        </StMyAccountName>
        <h1>{displayNickname || editNickname} 님, 안녕하세요!</h1>
        <StMyAccount>
          <StProfileImage src={profileImage} alt="아바타 이미지" />
        </StMyAccount>
        <StProfileSettingContainer>
          <input id="profileImg" type="file" accept="image/*" style={{display: 'none'}} onChange={handleImageChange} />
          {/* 요 라벨 프로필이미지위에 아이콘처리,,! */}
          <label htmlFor="profileImg">프로필 수정하기</label>
        </StProfileSettingContainer>
        <StNickName></StNickName>
        {user.provider !== 'google' && (
          <StUpdateContainer>
            <p>닉네임</p>
            <StNicknameInput
              type="text"
              defaultValue={displayNickname}
              placeholder="변경할 닉네임 입력"
              onChange={handleNicknameChange}
            />
            {/* 요 피태그 회원가입 오류메시지 뜨는것처럼 작게 빨간색,,! */}
            <p>{nicknameError}</p>

            <StcheckButton onClick={handleValidateNickname}>중복확인</StcheckButton>
            <div>
              <button
                disabled={isValid ? false : true}
                onClick={handleCompleteSettings}
                style={{background: isValid ? 'linear-gradient(45deg, #cc51d6, #5a68e8)' : '#aeaeb2'}}
              >
                저장
              </button>
            </div>
          </StUpdateContainer>
        )}
      </div>
    </>
  );
};
const StMyAccountName = styled.div`
  margin-bottom: 20px;
`;

const StNickName = styled.div`
  margin-right: 65%;

  h1 {
    margin-top: 20px;
  }
  h2 {
    margin-top: 40px;
  }
`;
const StMyAccount = styled.div`
  width: 1000px;
  display: flex; /* 가로 정렬을 위한 flex 설정 추가 */
  align-items: center; /* 수직 가운데 정렬을 위한 설정 (선택적으로 사용) */
  justify-content: space-between; /* 자식 요소들을 가로로 정렬 */
  h1 {
    font-size: 25px;
  }
  h2 {
    font-size: 15px;
  }
`;

const StProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
  margin-top: 50px;
`;
const StUpdateContainer = styled.div`
  margin-top: 15px;

  button {
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
    height: 25px;
  }
  p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  h1 {
    font-size: 13px;
    margin-top: 20px;
  }
  h2 {
    margin-top: 25px;
    margin-bottom: 10px;
  }
`;
const StcheckButton = styled.button`
  margin-bottom: 50px;
`;

const StNicknameInput = styled.input`
  border: none;
  border-bottom: 1px solid #636366;
`;
const StProfileSettingContainer = styled.div`
  margin-bottom: 30px;
  margin-top: 30px;
  label {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default MyAccount;
