import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import St from './style';
import {addPostLikes, getPostLikes, updatePostLikes} from '../../../../api/like';
import heartImgWhite from '../../../../assets/images/heart-white.png';
import heartImgPurple from '../../../../assets/images/heart-purple.png';

const PostLike = ({postId, currentUser}: any) => {
  const queryClient = useQueryClient();

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
  const targetPost = postLike?.find(e => e.postid === postId);
  const userInfo = {id: currentUser.id};
  const target = targetPost?.userid?.filter(e => e.id === currentUser.id);

  const onClickLikeHandler = () => {
    if (targetPost === undefined) {
      const param = {postid: postId, userid: [userInfo]};
      addLikeMutation.mutate(param);
    } else if (target?.length) {
      const likeCounter = targetPost.like - 1;
      const postInfoData = targetPost.userid.filter(e => e.id !== userInfo.id);
      const param = {postid: postId, userid: postInfoData, likeCount: likeCounter};
      likeMutation.mutate(param);
    } else {
      const likeCounter = targetPost.like + 1;
      targetPost.userid.push(userInfo);
      const param = {postid: postId, userid: targetPost.userid, likeCount: likeCounter};
      likeMutation.mutate(param);
    }
  };

  return (
    <St.LikeBtnDiv>
      <St.LikeBtnImg src={target?.length ? heartImgPurple : heartImgWhite} onClick={onClickLikeHandler} />
      <St.LikeCountP>{targetPost?.like}</St.LikeCountP>
    </St.LikeBtnDiv>
  );
};

export default PostLike;
