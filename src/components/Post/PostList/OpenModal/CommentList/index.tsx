import {useMutation, useQuery} from '@tanstack/react-query';
import React from 'react';
import St from '../style';
import {deleteComment, getComments} from '../../../../../api/postComment';
import dayjs from 'dayjs';
import CommentLike from '../CommentLike';

const CommentList = ({userInfo, queryClient, modalData, ProfileImg, currentUser}: any) => {
  const commentNameFilterHandler = id => {
    const target = userInfo?.find(e => e.id === id);
    return target?.username;
  };

  // comments list
  const {data: comments} = useQuery({
    queryKey: ['postComments'],
    queryFn: getComments,
  });

  // delete comment
  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['postComments']});
    },
  });
  return (
    <>
      {comments
        ?.filter(e => e.postid === modalData.id)
        ?.sort((a, b) => {
          const aDate: any = new Date(a.created_at);
          const bDate: any = new Date(b.created_at);
          return bDate - aDate;
        })
        .map(item => {
          return (
            <St.CommentLi key={item.id}>
              <St.CommentHeaderDiv>
                <St.UserInfoDiv>
                  <St.UserImg src={ProfileImg} alt="user profile" />
                  <St.UsernameP>{commentNameFilterHandler(item.userid)}</St.UsernameP>
                </St.UserInfoDiv>
                <St.TimeDateDiv>
                  <St.TimeP>{dayjs(item.created_at).format('HH:mm')}</St.TimeP>
                  <St.DateP>{dayjs(item.created_at).format('YYYY.MM.DD')}</St.DateP>
                </St.TimeDateDiv>
              </St.CommentHeaderDiv>
              <St.CommentP>{item.comment}</St.CommentP>
              <St.CommentBtnsDiv>
                <CommentLike commentId={item.commentid} currentUser={currentUser} />
                {item.userid === currentUser.id && (
                  <St.CommentDeleteBtn
                    onClick={() => {
                      deleteMutation.mutate(item.commentid);
                    }}
                  >
                    삭제
                  </St.CommentDeleteBtn>
                )}
              </St.CommentBtnsDiv>
            </St.CommentLi>
          );
        })}
    </>
  );
};

export default CommentList;
