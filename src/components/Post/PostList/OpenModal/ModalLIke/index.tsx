import React from 'react';
import St from './style';
import WhiteLikeImg from '../../../../../assets/images/heart-white.png';
import PurpleLikeImg from '../../../../../assets/images/heart-purple.png';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addPostLikes, getPostLikes, updatePostLikes} from '../../../../../api/like';

const ModalLike = ({queryClient, modalData, currentUser}: any) => {
  const {data: postLike} = useQuery({
    queryKey: ['postLike'],
    queryFn: getPostLikes,
  });

  const addLikeMutation = useMutation({
    mutationFn: addPostLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['postLike']});
    },
  });

  const likeMutation = useMutation({
    mutationFn: updatePostLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['postLike']});
    },
  });

  const targetPost = postLike?.find(e => e.postid === modalData.id);
  const target = targetPost?.userid?.filter(e => e.id === currentUser.id);

  const onClickLikeHandler = () => {
    if (targetPost === undefined) {
      const param = {postid: modalData.id, userid: [{id: currentUser.id}]};
      addLikeMutation.mutate(param);
    } else if (target?.length) {
      const likeCounter = targetPost.like - 1;
      const postInfoData = targetPost.userid.filter(e => e.id !== currentUser.id);
      const param = {postid: modalData.id, userid: postInfoData, likeCount: likeCounter};
      likeMutation.mutate(param);
    } else {
      const likeCounter = targetPost.like + 1;
      targetPost.userid.push({id: currentUser.id});
      const param = {postid: modalData.id, userid: targetPost.userid, likeCount: likeCounter};
      likeMutation.mutate(param);
    }
  };
  return (
    <St.LikeDiv>
      <St.LikeImg src={target?.length ? PurpleLikeImg : WhiteLikeImg} onClick={onClickLikeHandler} alt="like" />
      <St.LikeCountP>{targetPost?.like}</St.LikeCountP>
    </St.LikeDiv>
  );
};

export default ModalLike;
