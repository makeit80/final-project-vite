import St from './style';
import {getCurrentUser} from '../../api/currentUser';
import {useQuery} from '@tanstack/react-query';
import {getArtistDetail} from '../../api/artistapi';
import {useNavigate} from 'react-router-dom';
import Spinner from '../Common/Spinner';
import {getTargetUserInfo} from '../../api/currentUser';

const Info = ({param}: string) => {
  const navigate = useNavigate();

  // current user info
  const {data: currentUser} = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser,
  });
  const {data: userInfo} = useQuery({
    queryKey: ['userInfo'],
    queryFn: getTargetUserInfo,
  });
  const targetUser = userInfo?.find(e => e.id === currentUser?.id);

  // artist name
  const {data: artistDetail, isLoading} = useQuery({
    queryKey: [''],
    queryFn: getArtistDetail,
  });
  const detailTargetData = artistDetail?.find(el => el.artist === param);

  const onClickNavigateHandler = () => {
    navigate(`/artist/${param}`);
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <St.BannerDiv>
        <St.BannerImg src={detailTargetData?.community_banner} />
      </St.BannerDiv>
      <St.InfoDiv>
        <St.InfoNameFollowDiv>
          <St.InfoNameDiv>
            <St.InfoNameP>{targetUser?.username}</St.InfoNameP>
          </St.InfoNameDiv>
          <St.InfoFollowerDiv>
            <St.InfoFollowP>109</St.InfoFollowP>
            <St.FollowP>팔로워</St.FollowP>
          </St.InfoFollowerDiv>
          <St.InfoFollowingDiv>
            <St.InfoFollowP>20</St.InfoFollowP>
            <St.FollowP>팔로잉</St.FollowP>
          </St.InfoFollowingDiv>
        </St.InfoNameFollowDiv>
        <St.InfoArtistDiv onClick={onClickNavigateHandler} url={detailTargetData?.community_button}>
          {/* <StInfoArtistImg src={toArtistTestImg}/> */}
          <St.InfoArtistP>아티스트 보러가기</St.InfoArtistP>
        </St.InfoArtistDiv>
      </St.InfoDiv>
    </>
  );
};

export default Info;
