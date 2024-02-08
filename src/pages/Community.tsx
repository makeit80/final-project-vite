import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import PostList from '../components/Post/PostList';
import AddPost from '../components/Post/AddPost';
import Info from '../components/artistInfo';

const Community = () => {
  const param = useParams();

  return (
    <StWrapper>
      <Info param={param.artistName} />
      <AddPost />
      <PostList />
    </StWrapper>
  );
};
const StWrapper = styled.div`
  width: 100vw;
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Community;
