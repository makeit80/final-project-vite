import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import PostList from '../components/Post/PostList'
import AddPost from '../components/Post/AddPost'
import Info from '../components/Info'

const Community = () => {
  const param = useParams();
  
  return (
    <StWrapper>
      <Info />
      <AddPost />
      <PostList />
    </StWrapper>
  )
}
const StWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default Community