import {supabase} from './supabase';

//아티스트 조회
export const getArtist = async () => {
  try {
    const {data: chart, error} = await supabase.from('artists').select('*');

    if (error) {
      return null;
    }
    return chart;
  } catch (error) {
    // console.log('조회 에러', error);
  }
};

// 팔로우 버튼 클릭 전의 팔로우 수를 가져오는 api
export const getInitialLikes = async (postId: number) => {
  try {
    // postId에 해당하는 아티스트의 데이터를 가져옴
    const artistData = await getArtist();
    // 해당 아티스트 데이터가 있다면

    if (artistData) {
      // postId에 해당하는 아티스트의 데이터를 찾음
      const artist = artistData.find(item => item.artist === postId.artistId.artist);

      // 해당 아티스트가 있다면 팔로우 수를 반환
      if (artist) {
        return artist.artist_fw_count;
      }
    }
  } catch (error) {
    return 0; // 에러 발생 시 기본값인 0 반환
  }
};

//팔로우 버튼클릭시 수파베이스 테이블에 해당 타입의 데이터가 삽입됨
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const artistFollowList = async (targetData: any) => {
  try {
    // 로그인 된 사용자 정보 확인
    const user = await supabase.auth.getUser();

    const initialLikes = await getInitialLikes(targetData);

    // userinfo에서 현재 유저의 팔로우 리스트 가져오기
    const {data: userinfoData} = await supabase.from('userinfo').select('artist_follow').eq('id', user.data.user.id);

    const userinfoArtistFollow = userinfoData[0]?.artist_follow || [];
    // targetData가 이미 팔로우 목록에 있는지 확인
    const isFollowing = userinfoArtistFollow.some(artist => artist.artistId.id === targetData.artistId.id);

    // isFollowing이 true이면 언팔로우, false이면 팔로우
    let updatedArtistFollow;

    if (isFollowing) {
      // 이미 팔로우 중이면 언팔로우 처리
      updatedArtistFollow = userinfoArtistFollow.filter(artist => artist.artistId.id !== targetData.artistId.id);
    } else {
      // 새로운 아티스트를 팔로우 목록에 추가 (INSERT)
      updatedArtistFollow = [
        ...userinfoArtistFollow.filter(artist => artist.artistId.id !== targetData.artistId.id),
        targetData,
      ];
    }

    // userinfo에 아티스트 추가 또는 제거
    await supabase.from('userinfo').update({artist_follow: updatedArtistFollow}).eq('id', user.data.user.id);
    // testTable 의 artist_fw_count 행  팔로우 수 추가 또는 감소

    await supabase
      .from('artists')
      .update({
        artist_fw_count: isFollowing ? initialLikes - 1 : initialLikes + 1,
      })
      .eq('artist', targetData.artistId.artist);
  } catch (error) {
    // console.error('artistFollowList 함수에서 에러 발생:', error);
  }
};

//팔로우 유뮤 확인을 위해 유저 데이터를 가져옴
export const getUsers = async (postId: string) => {
  try {
    const {data} = await supabase.from('userinfo').select('*').eq('id', postId);
    return data[0];
  } catch (error) {
    // console.log('error', error);
  }
};
