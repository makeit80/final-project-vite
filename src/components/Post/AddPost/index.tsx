import React, {useState, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import profileImg from '../../../assets/images/profile-white.png';
import St from './style';
import PortalModal from '../../Common/portalModal';
import AddPostModal from './AddModal';
import {getCurrentUser, getTargetUserInfo} from '../../../api/currentUser';
import {supabase} from '../../../api/supabase';

const AddPost = () => {
  // modal
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const {data: currentUser} = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser,
  });

  // 유저 프로필 서버에서 불러오기
  const [profileImage, setProfileImage] = useState(profileImg);

  const fetchImageData = async () => {
    try {
      const {data, error} = await supabase.from('userinfo').select('profile_image').eq('id', currentUser?.id).single();

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

  useEffect(() => {
    fetchImageData();
  }, []);

  return (
    <St.AddPostDiv>
      <St.AddPostUerImg src={profileImage} />
      <St.AddPostMovdBox onClick={handleModal}>당신의 이야기를 공유해주세요</St.AddPostMovdBox>
      <PortalModal>{openModal && <AddPostModal handleModal={handleModal} setOpenModal={setOpenModal} />}</PortalModal>
    </St.AddPostDiv>
  );
};

export default AddPost;
