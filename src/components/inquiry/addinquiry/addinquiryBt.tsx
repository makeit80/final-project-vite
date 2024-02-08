import {SetStateAction, useEffect, useState} from 'react';
import PortalModal from '../../Common/portalModal';
import st from '../../inquiry/style';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addInquiry} from '../../../api/inquiryapi';
import {supabase} from '../../../api/supabase';

const AddInquiry = (username: string) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState('카테고리 입력');
  const [inputTitle, setInputTitle] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string>('');
  const queryClient = useQueryClient();
  const currentTime = new Date().toISOString();
  const date = new Date(currentTime);

  // 현재 유저 아이디를 가져옴
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await supabase.auth.getUser();
      setCurrentUser(user.data.user.id);
    };
    fetchCurrentUser();
  }, []);

  //글쓴 시각
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }).format(date);

  const onUsername = username.username.username;

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const SelectTag = (event: {target: {value: SetStateAction<string>}}) => {
    setSelectCategory(event.target.value);
  };

  const {mutate} = useMutation({
    mutationFn: async ({title, content, category, onUsername, formattedDate, currentUser}) => {
      await addInquiry({title, content, category, onUsername, formattedDate, currentUser});
    },
    onSuccess: () => {
      // 성공 시에 쿼리를 다시 불러오기
      queryClient.invalidateQueries({queryKey: ['postinquiry']});
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['postinquiry']});
    },
  });
  const handleAddInquiry = async () => {
    // 제목, 내용, 카테고리가 모두 입력되었을 때에만 mutation 호출
    if (inputTitle && inputText && selectCategory !== '카테고리 입력') {
      mutate({title: inputTitle, content: inputText, category: selectCategory, onUsername, formattedDate, currentUser});
      setInputTitle('');
      setInputText('');
      setSelectCategory('카테고리 입력');
      setModalOpen(false); // 모달 닫기
    } else {
      // 모든 필드가 입력되지 않은 경우에 대한 처리
      alert('제목, 내용, 카테고리를 모두 입력하세요.');
    }
  };
  return (
    <>
      <st.writeBt onClick={handleButtonClick}>글쓰기</st.writeBt>
      {modalOpen && (
        <PortalModal>
          <st.modalContainer>
            <st.closeButton onClick={handleCloseModal}>Close</st.closeButton>
            <p>제목 </p>
            <st.modalTitle
              value={inputTitle}
              onChange={e => setInputTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
            />
            <p>내용 </p>
            <st.modaltextarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="건의 하고싶은 내용을 입력해주세요"
            />
            <p>카테고리 </p>
            <select value={selectCategory} onChange={SelectTag}>
              <option value="카테고리 입력">카테고리 입력</option>
              <option value="아티스트 추가">아티스트 추가</option>
              <option value="클레임">신고</option>
              <option value="기타">기타</option>
            </select>
            <st.checkinquiry onClick={handleAddInquiry}>문의하기</st.checkinquiry>
          </st.modalContainer>
        </PortalModal>
      )}
    </>
  );
};

export default AddInquiry;
