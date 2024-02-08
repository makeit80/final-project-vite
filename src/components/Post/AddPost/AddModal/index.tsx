import React, {useState} from 'react';
import St from './style';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getCurrentUser, getTargetUserInfo} from '../../../../api/currentUser';
import {addPost} from '../../../../api/post';
import postPhotoImg from '../../../../assets/images/post-photo.png';
import closeImg from '../../../../assets/images/close.png';
import {useParams} from 'react-router-dom';
import {supabase} from '../../../../api/supabase';

const AddPostModal = ({handleModal, setOpenModal}) => {
  const queryClient = useQueryClient();
  const param = useParams();
  const [content, setContent] = useState('');

  // 이미지 파일을 담을 수 있는 배열 만들기
  const [uploadFileUrl, setUploadFileUrl]: any = useState([]);
  const [files, setFiles] = useState<File[]>([]);

  const {data: currentUser} = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser,
  });
  const {data: userInfo} = useQuery({
    queryKey: ['userInfo'],
    queryFn: getTargetUserInfo,
  });

  const targetUser = userInfo?.find(user => user.id === currentUser?.id);

  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['postList']});
    },
  });

  const handleChangeAddPost: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    setContent(e.target.value);
  };

  // 웹페이지에 파일을 올려주는 함수
  const handleuploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      const filesArray = Array.from(fileList);
      filesArray.forEach(file => {
        handleAddImages(file);
      });
    }
  };

  const handleAddImages = async (file: File) => {
    try {
      const newFileName = `upload_posts/${Date.now()}_${Math.floor(Math.random() * 1000)}.png`;

      const {data} = await supabase.storage.from('upload_posts').upload(newFileName, file);

      const res = supabase.storage.from('upload_posts').getPublicUrl(data.path);
      setFiles(prevFiles => [file, ...prevFiles]);
      setUploadFileUrl((prev: any) => [res.data.publicUrl, ...prev]);
    } catch (error) {
      // console.log('알 수 없는 문제가 발생했습니다. 다시 시도해주세요', error);
    }
  };

  // 업로드된 파일이 4개 넘으면 그 뒤에 들어오는 파일은 없앰
  if (uploadFileUrl.length > 4 && files.length > 4) uploadFileUrl.pop() && files.pop();

  // x 누르면 이미지 삭제
  const deleteImage = (id: any) => {
    setUploadFileUrl(uploadFileUrl.filter((_, index: any) => index !== id));
    setFiles(files.filter((_, index: any) => index !== id));
  };

  // 게시글 추가
  const handleSubmitAddPost: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const image_url = uploadFileUrl;

    const newPost = {
      userid: currentUser?.id,
      username: targetUser?.username,
      photo_url: image_url,
      content: content,
      artist: param.artistName,
    };

    addMutation.mutate(newPost);
    setContent('');
    setOpenModal(false);
  };

  return (
    <>
      <St.ModalContainer onClick={handleModal}>
        <St.ModalBox
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <St.ModalContent onSubmit={handleSubmitAddPost}>
            <St.ModalHeaderBodyDiv>
              <St.ModalHeader>
                <St.ModalTitleDiv>
                  <St.ModalTitle>포스트 쓰기</St.ModalTitle>
                  <St.ModalArtistName>{param.artistName}</St.ModalArtistName>
                </St.ModalTitleDiv>
                <St.CloseBtn src={closeImg} onClick={handleModal} />
              </St.ModalHeader>
              <St.ModalContentInput
                type="text"
                placeholder="당신의 이야기를 공유해주세요. 최대 250글자까지 입력 가능합니다."
                value={content}
                name="content"
                maxlength="250"
                onChange={handleChangeAddPost}
              />
              <St.SelectImgDiv>
                {uploadFileUrl &&
                  uploadFileUrl?.map((img: string, idx: number) => (
                    <St.imgMapDiv id={img} key={idx}>
                      <St.SelectImg src={img} id={img} alt={`${img}-${idx}`} />
                      <St.SelectImgDeleteBtn onClick={() => deleteImage(idx)}>x</St.SelectImgDeleteBtn>
                    </St.imgMapDiv>
                  ))}
              </St.SelectImgDiv>
            </St.ModalHeaderBodyDiv>
            <St.ModalBtnDiv>
              <St.ModalAddBtnLabel htmlFor="file">
                <St.ModalAddImg src={postPhotoImg} />
                <input type="file" name="file" id="file" multiple hidden onChange={handleuploadFiles} />
              </St.ModalAddBtnLabel>
              <St.ModalAddPostBtn disabled={!content}>등록</St.ModalAddPostBtn>
            </St.ModalBtnDiv>
          </St.ModalContent>
        </St.ModalBox>
      </St.ModalContainer>
    </>
  );
};

export default AddPostModal;
