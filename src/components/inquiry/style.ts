import styled from 'styled-components';

const container = styled.table`
  display: flex;
  justify-content: space-between;
  width: 900px;
  height: 20px;
  border: 2px solid red;
  text-align: center;
  margin-bottom: 10px;
`;

const titlenum = styled.p`
  flex: 1;
`;
const title = styled.p`
  flex: 1;
`;
const titleTM = styled.p`
  flex: 1;
`;
const currentUser = styled.p`
  flex: 1;
`;
const listdiv = styled.div`
  display: block;
`;

const listContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;
  height: 20px;
  border: 2px solid red;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
  p {
    flex: 1;
  }
`;

const modalContainer = styled.div`
  position: fixed;
  width: 600px;
  height: 500px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #2a2a2a;
  padding: 20px;

  border: 1px solid #ccc;
  p {
    background: #2a2a2a;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
const closeButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
`;
const modalTitle = styled.input`
  width: 400px;
`;
const modaltextarea = styled.textarea`
  width: 400px;
  height: 150px;
  resize: none;
  border: none;
`;
const checkinquiry = styled.button`
  position: absolute;
  right: 15px;
`;
const writeBt = styled.button`
  position: absolute;
  bottom: 38%;
  left: 25%;
`;
const nextPageBt = styled.button`
  position: absolute;
  bottom: 43%;
  left: 33%;
`;
const prevPageBt = styled.button`
  position: absolute;
  bottom: 43%;
  left: 27%;
`;
export default {
  titlenum,
  title,
  container,
  titleTM,
  currentUser,
  listContainer,
  listdiv,
  modalContainer,
  modaltextarea,
  modalTitle,
  closeButton,
  checkinquiry,
  writeBt,
  nextPageBt,
  prevPageBt,
};
