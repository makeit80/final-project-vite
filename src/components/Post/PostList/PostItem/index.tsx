import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {useState} from 'react';
import St from './style';
import {getCurrentUser, getTargetUserInfo} from '../../../../api/currentUser';
import {deletePost} from '../../../../api/post';
import PostLike from '../PostLike';
import dayjs from 'dayjs';
import commentImg from '../../../../assets/images/chat.svg';
import seeMoreImg from '../../../../assets/images/meatballs-v.svg';
import profileImg from '../../../../assets/images/profile-white.png';
import PortalModal from '../../../Common/portalModal';
import EditPostModal from '../EditModal';
import PostOpenModal from '../OpenModal';

const PostItem = ({id, userid, content, photo_url, created_at}: any) => {
  const queryClient = useQueryClient();

  // modal
  const [openEditModal, setOpenEditModal] = useState(false);
  const [modalEditData, setModalEditData] = useState('');

  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [modalCommentData, setModalCommentData] = useState('');

  const handlecommentModal = (id, userid, content, photo_url, created_at) => {
    setModalCommentData({id, userid, content, photo_url, created_at});
    setOpenCommentModal(!openCommentModal);
  };

  const handleEditModal = (id, content, photo_url) => {
    setModalEditData({id, content, photo_url});
    setOpenEditModal(!openEditModal);
  };
  // toggle
  const [openToggle, setOpenToggle] = useState(false);
  const handleToggle = () => {
    setOpenToggle(!openToggle);
  };

  // current UserInfo
  const {data: currentUser} = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser,
  });

  const {data: userInfo} = useQuery({
    queryKey: ['userInfo'],
    queryFn: getTargetUserInfo,
  });

  const nameFilterHandler = id => {
    const target = userInfo?.find(e => e.id === id);
    return target?.username;
  };
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['postList']});
    },
  });

  return (
    <St.PostLiAndToggleDiv>
      <St.PostLi key={id}>
        <St.PostHeader>
          <St.PostUserInfoDiv>
            <St.PostUserImg src={profileImg} />
            <St.PostNameP>{nameFilterHandler(userid)}</St.PostNameP>
          </St.PostUserInfoDiv>
          <St.PostTimeDiv>
            <St.PostTimeP>{dayjs(created_at).format('HH:mm')}</St.PostTimeP>
            <St.PostTimeP>{dayjs(created_at).format('YYYY.MM.DD')}</St.PostTimeP>
          </St.PostTimeDiv>
        </St.PostHeader>
        <St.PostClickOpenModal
          onClick={() => {
            handlecommentModal(id, userid, content, photo_url, created_at);
          }}
        >
          <St.PostContentsP>{content}</St.PostContentsP>
          {photo_url &&
            photo_url.map((url, index) => {
              if (photo_url.length === 1) {
                return <St.PostContentOneImg src={url} key={index} />;
              } else if (photo_url.length === 2) {
                return <St.PostContentTwoImg src={url} key={index} />;
              } else if (photo_url.length === 4) {
                return <St.PostContentFourImg src={url} key={index} />;
              }
            })}
          {photo_url && photo_url.length === 3 && (
            <St.PostContentThreeImgDiv>
              <St.PostContentThreeImgA src={photo_url[0]} />
              <St.PostContentThreeImgB src={photo_url[1]} />
              <St.PostContentThreeImgC src={photo_url[2]} />
            </St.PostContentThreeImgDiv>
          )}
        </St.PostClickOpenModal>
        <St.PostLikeCommentMoreDiv>
          <St.PostLikeCommentDiv>
            <PostLike postId={id} currentUser={currentUser} />
            <St.CommentImg
              src={commentImg}
              onClick={() => {
                handlecommentModal(id, userid, content, photo_url, created_at);
              }}
            />
          </St.PostLikeCommentDiv>
          <St.PostMoreImg src={seeMoreImg} onClick={handleToggle} />
        </St.PostLikeCommentMoreDiv>
      </St.PostLi>
      {openToggle && (
        <>
          {userid === currentUser?.id ? (
            <St.PostBtnsWrap>
              <St.PostBtnsBox>
                <St.PostBtnDiv>
                  <St.PostBtn
                    onClick={() => {
                      deleteMutation.mutate(id);
                      setOpenToggle(false);
                    }}
                  >
                    삭제하기
                  </St.PostBtn>
                  <St.PostBtn
                    onClick={() => {
                      handleEditModal(id, content, photo_url);
                      setOpenToggle(false);
                    }}
                  >
                    수정하기
                  </St.PostBtn>
                </St.PostBtnDiv>
              </St.PostBtnsBox>
            </St.PostBtnsWrap>
          ) : (
            <St.PostBtnsWrap>
              <St.PostBtnsBox>
                <St.PostBtnDiv>
                  <St.PostBtn>차단하기</St.PostBtn>
                  <St.PostBtn>신고하기</St.PostBtn>
                </St.PostBtnDiv>
              </St.PostBtnsBox>
            </St.PostBtnsWrap>
          )}
        </>
      )}
      <PortalModal>
        {openCommentModal && (
          <PostOpenModal handleModal={handlecommentModal} currentUser={currentUser} modalData={modalCommentData} />
        )}
      </PortalModal>
      <PortalModal>
        {openEditModal && (
          <EditPostModal handleModal={handleEditModal} modalData={modalEditData} setOpenEditModal={setOpenEditModal} />
        )}
      </PortalModal>
    </St.PostLiAndToggleDiv>
  );
};

export default PostItem;
