import {supabase} from './supabase';

// 유저 정보 가져오기
const getCurrentUser = async () => {
  const {
    data: {user},
  } = await supabase.auth.getUser();
  return user;
};

const getTargetUserInfo = async () => {
  try {
    const {data: idData} = await supabase.from('userinfo').select('id,username');
    return idData;
  } catch (error) {}
};

export {getCurrentUser, getTargetUserInfo};
