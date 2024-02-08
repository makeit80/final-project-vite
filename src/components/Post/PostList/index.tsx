import {useInfiniteQuery} from '@tanstack/react-query';
import St from './style';
import {useParams} from 'react-router-dom';
import Spinner from '../../Common/Spinner';
import {morePosts} from '../../../api/scrollerapi';
import PostItem from './PostItem';

const PostList = () => {
  const param = useParams();

  // 스크롤 기능
  const handleScroll = () => {
    const {scrollY} = window; // 현재 스크롤 높이
    const {clientHeight} = document.documentElement; // 현재 화면 높이
    const {scrollHeight} = document.documentElement; // 전체 높이
    // hasNextPage 이거 왜 계속 ture 나옴?
    if (Math.ceil(scrollY) + clientHeight === scrollHeight && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      // if (isBottom) {
      //   toast.error('마지막 페이지입니다.');
      // }
    }
  };
  window.addEventListener('scroll', handleScroll);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // post list
  const {
    data: morePostList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['postList'],
    queryFn: ({pageParam = 0}) => morePosts(pageParam, param.artistName),
    initialPageParam: {start: 0, end: 5},
    getNextPageParam: lastPage =>
      lastPage.nextCursor ? {start: lastPage.nextCursor, end: lastPage.nextCursor + 4} : null,
  });
  const currentArtistPost = morePostList?.pages.map(e => e.data).flat();

  if (!hasNextPage) {
    window.removeEventListener('scroll', handleScroll);
  }

  if (isFetchingNextPage) {
    return <Spinner />;
  }

  return (
    <St.PostDiv>
      <St.PostUl>
        {currentArtistPost?.map(post => {
          return (
            <div key={post.id}>
              <PostItem
                id={post.id}
                userid={post.userid}
                content={post.content}
                photo_url={post.photo_url}
                created_at={post.created_at}
              />
            </div>
          );
        })}
      </St.PostUl>
    </St.PostDiv>
  );
};

export default PostList;
