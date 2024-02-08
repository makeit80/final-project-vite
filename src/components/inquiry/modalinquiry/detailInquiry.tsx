import st from '../../inquiry/style';

interface InquiryItem {
  id: number;
  inquiryTitle: string;
  inquiryPost: string;
  user_name: string;
  times: string;
}

interface DetailInquiryProps {
  selectedInquiry: InquiryItem;
  onClose: () => void;
}
const DetailInquiry = ({selectedInquiry, onClose}: DetailInquiryProps) => {
  return (
    <>
      <st.modalContainer>
        <p>{selectedInquiry.inquiryTitle}</p>
        <p>{selectedInquiry.inquiryPost}</p>
        <st.closeButton onClick={onClose}>닫기</st.closeButton>
      </st.modalContainer>
    </>
  );
};

export default DetailInquiry;
