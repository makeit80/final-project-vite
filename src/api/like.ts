import {supabase} from './supabase';

// post
const getPostLikes = async () => {
  try {
    const {data, error} = await supabase.from('postLike').select('*');
    return data;
  } catch (error) {
    // console.log("Error", error)
  }
};

const addPostLikes = async ({postid, userid}: any) => {
  try {
    const {error} = await supabase.from('postLike').insert({postid: postid, like: 1, userid: userid});
  } catch (error) {
    // console.log("Error", error)
  }
};

const updatePostLikes = async ({postid, userid, likeCount}: any) => {
  try {
    const {error} = await supabase
      .from('postLike')
      .update({postid: postid, like: likeCount, userid: userid})
      .eq('postid', postid);
  } catch (error) {
    // console.log('Error', error);
  }
};

// comment
const getCommentLikes = async () => {
  try {
    const {data, error} = await supabase.from('commentLike').select('*');
    return data;
  } catch (error) {
    // console.log('list 가져오기 error', error);
  }
};

const addCommentLikes = async ({commentid, userid}: any) => {
  try {
    const {error} = await supabase.from('commentLike').insert({commentid: commentid, like: 1, userid: userid});
  } catch (error) {
    // console.log('좋아요 더하기 error', error);
  }
};

const updateCommentLikes = async ({commentid, likeCount, userid}: any) => {
  try {
    const {error} = await supabase
      .from('commentLike')
      .update({commentid: commentid, like: likeCount, userid: userid})
      .eq('commentid', commentid);
  } catch (error) {
    // console.log('좋아요 업데이트 error', error);
  }
};
export {getPostLikes, addPostLikes, updatePostLikes, getCommentLikes, addCommentLikes, updateCommentLikes};
