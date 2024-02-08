import st from '../../inquiry/style';
import {getInquiry} from '../../../api/inquiryapi';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import DetailInquiry from '../modalinquiry/detailInquiry';
import PortalModal from '../../Common/portalModal';
import {supabase} from '../../../api/supabase';

interface InquiryItem {
  id: number;
  inquiryTitle: string;
  user_name: string;
  times: string;
}

const InquiryList = ({pageSize = 10}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>();
  const [currentUser, setCurrentUser] = useState(null);
  const {data: inquiryList} = useQuery({
    queryKey: ['postinquiry', {page: currentPage, pageSize}],
    queryFn: () => getInquiry({page: currentPage, pageSize}),
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await supabase.auth.getUser();
      setCurrentUser(user.data.user.id);
    };

    fetchCurrentUser();
  }, []);

  const openModal = (selectedItem: InquiryItem) => {
    setSelectedInquiry(selectedItem);
  };

  const handleCloseModal = () => {
    setSelectedInquiry(null);
  };

  const handleNextPage = () => {
    if (inquiryList.length >= 10) {
      setCurrentPage(prev => prev + 1);
    } else {
      alert('마지막 페이지입니다.');
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <>
      <st.listdiv>
        {inquiryList?.reverse().map((item, index) => (
          <st.listContainer key={index} onClick={() => openModal(item)}>
            <p>{item.id}</p>
            <p>{item.inquiryTitle}</p>
            <p>{item.user_name}</p>
            <p>{item.times}</p>
          </st.listContainer>
        ))}
      </st.listdiv>
      <div>
        <st.prevPageBt onClick={handlePrevPage} disabled={currentPage === 1}>
          이전 페이지
        </st.prevPageBt>
        <st.nextPageBt onClick={handleNextPage}>다음 페이지</st.nextPageBt>
      </div>
      {selectedInquiry && (
        <PortalModal>
          <DetailInquiry selectedInquiry={selectedInquiry} onClose={handleCloseModal} />
        </PortalModal>
      )}
    </>
  );
};

export default InquiryList;
