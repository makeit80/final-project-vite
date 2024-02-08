import st from '../inquiry/style';
import InquiryList from '../inquiry/inquiryList/index';
import AddInquiry from './addinquiry/addinquiryBt';

const Inquiry = (username: string) => {
  return (
    <>
      <div>
        <st.container>
          <st.titlenum>번호</st.titlenum>
          <st.title>제목</st.title>
          <st.currentUser>작성자</st.currentUser>
          <st.titleTM>시간</st.titleTM>
        </st.container>
        <div>
          <InquiryList pageSize={10} />
        </div>
        <AddInquiry username={username} />
      </div>
      <div></div>
    </>
  );
};

export default Inquiry;
