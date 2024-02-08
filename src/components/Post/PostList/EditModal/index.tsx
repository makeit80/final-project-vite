import React, {useState} from 'react';
import St from './style';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updatePost} from '../../../../api/post';
import {useParams} from 'react-router-dom';
import closeImg from '../../../../assets/images/close.png';
import postPhotoImg from '../../../../assets/images/post-photo.png';
import {supabase} from '../../../../api/supabase';

const EditPostModal = ({handleModal, modalData, setOpenEditModal}) => {
  // upload image
  // 이미지 파일을 담을 수 있는 배열 만들기
  const [uploadFileUrl, setUploadFileUrl]: any = useState(modalData.photo_url);
  const [files, setFiles] = useState<File[]>([]);

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

      const {data, error} = await supabase.storage.from('upload_posts').upload(newFileName, file);

      if (error) {
        // console.log('파일이 업로드 되지 않습니다.', error);
        return;
      }

      const res = supabase.storage.from('upload_posts').getPublicUrl(data.path);
      setFiles(prevFiles => [file, ...prevFiles]);
      setUploadFileUrl((prev: any) => [res.data.publicUrl, ...prev]);
    } catch (error) {
      // console.log('알 수 없는 문제가 발생했습니다. 다시 시도해주세요', error);
    }
  };

  const image_url = uploadFileUrl;

  // 업로드된 파일이 4개 넘으면 그 뒤에 들어오는 파일은 없앰
  if (uploadFileUrl.length > 4 && files.length > 4) uploadFileUrl.pop() && files.pop();

  // x 누르면 이미지 삭제
  const deleteImage = (id: any) => {
    setUploadFileUrl(uploadFileUrl.filter((_, index: any) => index !== id));
    setFiles(files.filter((_, index: any) => index !== id));
  };

  // edit content
  const param = useParams();
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['postList']});
    },
  });

  const [editInputState, setEditInputState] = useState(modalData.content); // TODO : Modal로 리팩토링

  const handleChangeEditPost: React.ChangeEventHandler<HTMLInputElement> = e => {
    setEditInputState(e.target.value);
  };

  const handleSubmitEditedPost: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {id: modalData.id, content: editInputState, photo_url: image_url};
    editMutation.mutate(params);
    setOpenEditModal(false);
  };

  const handleClickEditCancelPost = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditInputState(modalData.content);
    setOpenEditModal(false);
  };

  return (
    <>
      <St.EditPostModalContainer onClick={handleModal}>
        <St.EditPostModalBox
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <St.EditPostModalContent
            onSubmit={e => {
              handleSubmitEditedPost(e);
            }}
          >
            <St.EditModalHeaderBody>
              <St.EditPostModalHeader>
                <St.EditPostModalTitleDiv>
                  <St.EditPostModalTitle>post 수정하기</St.EditPostModalTitle>
                  <St.EditPosModalArtistName>{param.artistName}</St.EditPosModalArtistName>
                </St.EditPostModalTitleDiv>
                <St.EditPostModalCloseBtn src={closeImg} onClick={handleModal} />
              </St.EditPostModalHeader>
              <St.EditPostModalInput
                type="text"
                value={editInputState}
                name="editingPosts"
                placeholder="수정할 내용을 입력해주세요"
                onChange={handleChangeEditPost}
              />
              <St.EditModalSelectedImgDiv>
                {uploadFileUrl &&
                  uploadFileUrl?.map((img: string, idx: number) => (
                    <St.SelectedImgMap id={img} key={idx}>
                      <St.SelectedImg src={img} id={img} alt={`${img}-${idx}`} />
                      <St.SelectedImgDeleteBtn onClick={() => deleteImage(idx)}>x</St.SelectedImgDeleteBtn>
                    </St.SelectedImgMap>
                  ))}
              </St.EditModalSelectedImgDiv>
            </St.EditModalHeaderBody>
            <St.EditPostLegsDiv>
              <St.EditModalImgBtnLabel htmlFor="file">
                <St.EditModalImg src={postPhotoImg} />
                <input type="file" name="file" id="file" multiple hidden onChange={handleuploadFiles} />
              </St.EditModalImgBtnLabel>
              <St.EditPostModalBtnDiv>
                <St.EditPostModalBtn onClick={e => handleClickEditCancelPost(e)}>취소</St.EditPostModalBtn>
                <St.EditPostModalBtn type="submit">저장</St.EditPostModalBtn>
              </St.EditPostModalBtnDiv>
            </St.EditPostLegsDiv>
          </St.EditPostModalContent>
        </St.EditPostModalBox>
      </St.EditPostModalContainer>
    </>
  );
};

export default EditPostModal;
