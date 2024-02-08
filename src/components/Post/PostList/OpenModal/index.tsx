import React, {useState} from 'react';
import St from './style';
import CloseImg from '../../../../assets/images/close.png';
import ProfileImg from '../../../../assets/images/profile-white.png';
import CommentImg from '../../../../assets/images/comment-white.png';
import ModalLike from './ModalLIke';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {getTargetUserInfo} from '../../../../api/currentUser';
import dayjs from 'dayjs';
import ModalImage from './Image';
import {addComment} from '../../../../api/postComment';
import CommentList from './CommentList';

const PostOpenModal = ({handleModal, currentUser, modalData}: any) => {
  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');

  const {data: userInfo} = useQuery({
    queryKey: ['userInfo'],
    queryFn: getTargetUserInfo,
  });

  const postNameFilterHandler = id => {
    const target = userInfo?.find(e => e.id === id);
    return target?.username;
  };

  // add comment
  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['postComments']});
    },
  });

  const handleChangeAddComment: React.ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleSubmitAddComment: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const newComment = {
      postid: modalData.id,
      userid: currentUser?.id,
      comment: comment,
    };

    addMutation.mutate(newComment);
    setComment('');
  };

  return (
    <St.ModalContainer onClick={handleModal}>
      <St.ModalBox
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <St.ModalContent>
          <St.ModalHeaderDiv>
            <St.ModalTitleP>게시된 글</St.ModalTitleP>
            <St.ModalCloseImg src={CloseImg} alt="close" onClick={handleModal} />
          </St.ModalHeaderDiv>
          <St.ModalContentDiv>
            <St.ModalContentHeaderDiv>
              <St.UserInfoDiv>
                <St.UserImg src={ProfileImg} alt="user profile" />
                <St.UsernameP>{postNameFilterHandler(modalData.userid)}</St.UsernameP>
              </St.UserInfoDiv>
              <St.TimeDateDiv>
                <St.TimeP>{dayjs(modalData.created_at).format('HH:mm')}</St.TimeP>
                <St.DateP>{dayjs(modalData.created_at).format('YYYY.MM.DD')}</St.DateP>
              </St.TimeDateDiv>
            </St.ModalContentHeaderDiv>
            <St.ContentP>{modalData.content}</St.ContentP>
            {modalData.photo_url?.length ? <ModalImage modalData={modalData} /> : null}
            <St.ContentImgsDiv>
              <ModalLike queryClient={queryClient} modalData={modalData} currentUser={currentUser} />
              <St.CommentImg src={CommentImg} alt="comment" />
            </St.ContentImgsDiv>
          </St.ModalContentDiv>

          {/* comment */}
          {modalData.photo_url.length ? (
            <St.CommentImageUl>
              <CommentList
                userInfo={userInfo}
                queryClient={queryClient}
                modalData={modalData}
                ProfileImg={ProfileImg}
                currentUser={currentUser}
              />
            </St.CommentImageUl>
          ) : (
            <St.CommentUl>
              <CommentList
                userInfo={userInfo}
                queryClient={queryClient}
                modalData={modalData}
                ProfileImg={ProfileImg}
                currentUser={currentUser}
              />
            </St.CommentUl>
          )}
        </St.ModalContent>

        {/* add comment */}
        <St.AddCommentForm onSubmit={handleSubmitAddComment}>
          <St.AddCommentUserImg src={ProfileImg} alt="user" />
          <St.AddCommentInput
            type="text"
            value={comment}
            placeholder="댓글을 입력해주세요. 최대 60글자까지 입력 가능합니다."
            maxlength="60"
            onChange={handleChangeAddComment}
          />
          <St.AddCommentBtn disabled={!comment}>게시</St.AddCommentBtn>
        </St.AddCommentForm>
      </St.ModalBox>
    </St.ModalContainer>
  );
};

export default PostOpenModal;
