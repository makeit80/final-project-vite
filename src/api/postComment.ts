import {supabase} from './supabase';

type COMMENT = {
  postid?: string;
  commentid?: string;
  username?: string;
  comment?: string;
  created_at?: string;
};

type newComment = Omit<COMMENT, 'id' | 'createdAt'>;

//등록된 댓글 목록 가져오기
const getComments = async () => {
  try {
    const {data} = await supabase.from('postComments').select('*');
    return data;
  } catch (error) {
    // console.log('가져오기Error', error);
  }
};

// 댓글 등록
const addComment = async (newComment: newComment) => {
  try {
    const {error} = await supabase.from('postComments').insert(newComment);
  } catch (error) {
    // console.log('등록하기Error', error);
  }
};

// 댓글 삭제
const deleteComment = async (commentid: string) => {
  try {
    await supabase.from('postComments').delete().eq('commentid', commentid);
  } catch (error) {
    // console.log('삭제하기Error', error);
  }
};

export {getComments, addComment, deleteComment};
