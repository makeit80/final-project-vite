import {number} from 'prop-types';
import {supabase} from './supabase';

//아티스트 조회
export const getArtist = async () => {
  try {
    const {data: chart, error} = await supabase.from('testTable').select('*');

    if (error) {
      console.error('조회 실패', error);
      return null;
    }
    return chart;
  } catch (error) {
    console.log('조회 에러', error);
  }
};
// 좋아요 버튼 클릭 전의 좋아요 수를 가져오는 api
export const getInitialLikes = async (postId: number) => {
  try {
    // postId에 해당하는 아티스트의 데이터를 가져옴
    const artistData = await getArtist();

    // 해당 아티스트 데이터가 있다면
    if (artistData) {
      // postId에 해당하는 아티스트의 데이터를 찾음
      const artist = artistData.find(item => item.id === postId);

      // 해당 아티스트가 있다면 좋아요 수를 반환
      if (artist) {
        return artist.artist_fw_count;
      }
    }

    // 해당 아티스트가 없거나 에러가 발생한 경우 기본값인 0 반환
    return 0;
  } catch (error) {
    console.error('좋아요 초기값 가져오기 실패', error);
    return 0; // 에러 발생 시 기본값인 0 반환
  }
};

// 좋아요 추가 API
export const addLikeartist = async (postId: number) => {
  try {
    // 로그인된 사용자 정보 확인
    const user = await supabase.auth.getUser();
    console.log(user);

    // 좋아요 증가 요청
    const initialLikes = await getInitialLikes(postId);

    // 존재하는 데이터 인지 확인
    const checkData = await supabase.from('testTable').select('*').eq('id', postId);

    if (checkData.data && checkData.data.length > 0) {
      const existingData = checkData.data[0];
      const userLikes = existingData.user_likes || [];

      // 이미 존재하는 경우, 해당 데이터를 업데이트
      if (userLikes.some(likedUser => likedUser.id === user.id)) {
        // 좋아요 취소
        const updatedLikes = initialLikes - 1 < 0 ? 0 : initialLikes - 1;
        const updatedUserLikes = userLikes.filter(likedUser => likedUser.id !== user.id);

        const {data, error} = await supabase
          .from('testTable')
          .update({like: updatedLikes, user_likes: updatedUserLikes})
          .eq('id', postId);

        if (error) {
          console.error('좋아요 취소 실패', error);
        } else {
          console.log('좋아요 취소 완료');
        }
      } else {
        // 중복된 데이터가 없는 경우에만 좋아요 추가
        const {data, error} = await supabase
          .from('testTable')
          .update({like: initialLikes + 1, user_likes: [...userLikes, user]})
          .eq('id', postId);

        if (error) {
          console.error('좋아요 추가 실패', error);
        } else {
          console.log('좋아요 추가 완료');
        }
      }
    } else {
      console.log('존재하지 않는 데이터');
    }
  } catch (error) {
    console.log('좋아요 처리 실패', error);
  }
};

//팔로우 버튼클릭시 수파베이스 테이블에 해당 타입의 데이터가 삽입됨
export const artistFollowList = async (targetData: any) => {
  try {
    // 로그인 된 사용자 정보 확인
    const user = await supabase.auth.getUser();
    console.log(targetData);
    // userinfo에서 현재 유저의 팔로우 리스트 가져오기
    const {data: userinfoData} = await supabase.from('userinfo').select('artist_follow').eq('id', user.data.user.id);

    const userinfoArtistFollow = userinfoData[0]?.artist_follow || [];

    // targetData가 이미 팔로우 목록에 있는지 확인
    const isFollowing = userinfoArtistFollow.some(artist => artist.artist === targetData.artist);

    // isFollowing이 true이면 언팔로우, false이면 팔로우
    const updatedArtistFollow = isFollowing
      ? userinfoArtistFollow.filter(artist => artist.artist !== targetData.artist)
      : [...userinfoArtistFollow, targetData];

    // userinfo에 아티스트 추가 또는 제거
    await supabase.from('userinfo').update({artist_follow: updatedArtistFollow}).eq('id', user.data.user.id);
  } catch (error) {
    console.error('artistFollowList 함수에서 에러 발생:', error);
  }
};
//팔로우 유뮤 확인을 위해 유저 데이터를 가져옴
export const getUsers = async (postId: string) => {
  try {
    const {data} = await supabase.from('userinfo').select('*').eq('id', postId);
    return data[0];
  } catch (error) {
    console.log('error', error);
  }
};
