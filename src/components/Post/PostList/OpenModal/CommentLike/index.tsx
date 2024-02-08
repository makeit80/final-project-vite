import React from 'react';
import St from './style';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {addCommentLikes, getCommentLikes, updateCommentLikes} from '../../../../../api/like';
import heartImgPurple from '../../../../../assets/images/heart-purple.png';
import heartImgWhite from '../../../../../assets/images/heart-white.png';

const CommentLike = ({commentId, currentUser}: any) => {
  const queryClient = useQueryClient();

  const {data: commentLike} = useQuery({
    queryKey: ['commentLike'],
    queryFn: getCommentLikes,
  });

  const addLikeMutation = useMutation({
    mutationFn: addCommentLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['commentLike']});
    },
  });

  const likeMutation = useMutation({
    mutationFn: updateCommentLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['commentLike']});
    },
  });

  const targetComment = commentLike?.find(e => e.commentid === commentId);
  const userInfo = {id: currentUser.id};
  const target = targetComment?.userid?.filter(e => e.id === currentUser.id);

  const onClickLikeHandler = () => {
    if (targetComment === undefined) {
      const param = {commentid: commentId, userid: [userInfo]};
      addLikeMutation.mutate(param);
    } else if (target?.length) {
      const likeCounter = targetComment.like - 1;
      const commentInfoData = targetComment.userid.filter(e => e.id !== userInfo.id);
      const param = {commentid: commentId, userid: commentInfoData, likeCount: likeCounter};
      likeMutation.mutate(param);
    } else {
      const likeCounter = targetComment.like + 1;
      targetComment.userid.push(userInfo);
      const param = {commentid: commentId, userid: targetComment.userid, likeCount: likeCounter};
      likeMutation.mutate(param);
    }
  };
  return (
    <>
      <St.OnlyTextHeartImgDiv>
        <St.OnlyTextHeartImg src={target?.length ? heartImgPurple : heartImgWhite} onClick={onClickLikeHandler} />
        <St.OnlyTextHeartCountP>{targetComment?.like}</St.OnlyTextHeartCountP>
      </St.OnlyTextHeartImgDiv>
    </>
  );
};

export default CommentLike;
