import {Json} from '../types/supabase';
import {supabase} from './supabase';

type POST = {
  id?: string;
  userid?: string;
  username?: string;
  content?: string;
  photo_url?: Json;
  isEditing?: boolean;
  created_at?: string;
  artist?: string;
};

type newPost = Omit<POST, 'id' | 'createdAt'>;

//등록된 게시글 목록 가져오기
const getPosts = async () => {
  try {
    const {data, error} = await supabase.from('posts').select('*');
    return data;
  } catch (error) {
    // console.log('Error', error);
  }
};

// 새 게시글 등록
const addPost = async (newPost: newPost) => {
  try {
    const {error} = await supabase.from('posts').insert(newPost);
  } catch (error) {
    // console.log('Error', error);
  }
};

// 게시글 수정
const updatePost = async ({id, content, photo_url}: POST) => {
  try {
    const {error} = await supabase.from('posts').update({content: content, photo_url: photo_url}).eq('id', id);
  } catch (error) {
    // console.log('Error', error);
  }
};

// 게시글 삭제
const deletePost = async (id: string) => {
  try {
    await supabase.from('posts').delete().eq('id', id);
  } catch (error) {
    // console.log('Error', error);
  }
};

// storage에 이미지 업로드
const uploadStorage = async ({uniqueKey, selectedImage}) => {
  try {
    const {data, error} = await supabase.storage.from('upload_posts').upload(uniqueKey, selectedImage, {
      cacheControl: '3600',
      upsert: false,
    });
  } catch (error) {
    // console.log('Error', error);
  }
};

// storage에서 파일 다운로드
const downloadStorage = async uniqueKey => {
  try {
    const {data, error} = await supabase.storage.from('upload_posts').download(uniqueKey);
  } catch (error) {
    // console.log('Error', error);
  }
};

// posts table에 파일 업로드
const uploadPostsTable = async uniqueKey => {
  try {
    const {error} = await supabase.from('posts').update(uniqueKey).eq('id', id);
  } catch (error) {
    // console.log('Error', error);
  }
};

export {getPosts, addPost, updatePost, deletePost, uploadStorage, downloadStorage, uploadPostsTable};
