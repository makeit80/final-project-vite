import {supabase} from './supabase';

export const findUserByEmail = async (email: string) => {
  try {
    const {data: users, error} = await supabase.from('users').select('*').eq('email', email);
    if (error) {
      return null;
    }

    if (users.length > 0) {
      // 여러 사용자 중에서 첫 번째 사용자를 선택
      return users[0];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const findUsersByEmailList = async emailList => {
  try {
    const {data: users, error} = await supabase.from('users').select('*').in('email', emailList);

    if (error) {
      return [];
    }

    return users;
  } catch (error) {
    return [];
  }
};
