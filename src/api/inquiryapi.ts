import {supabase} from './supabase';

type inquiryType = {
  title: string;
  content: string;
  category: string;
  onUsername: string;
  formattedDate: string;
  currentUser: string;
};
type pageType = {
  page: number;
  pageSize: number;
};
//inquiry open
export const getInquiry = async ({page, pageSize}: pageType) => {
  try {
    const {data: inquiryList} = await supabase
      .from('inquiry')
      .select('*')
      .range((page - 1) * pageSize, page * pageSize - 1);
    // console.log('inquiryList', inquiryList);

    return inquiryList;
  } catch (error) {
    // console.log('문의 리스트 가져오기 실패', error);
  }
};

//inquiry add
export const addInquiry = async ({
  title,
  content,
  category,
  onUsername,
  formattedDate,
  currentUser,
}: inquiryType): Promise<inquiryType | null> => {
  try {
    // Supabase에 데이터를 추가하는 부분
    const {data, error} = await supabase.from('inquiry').insert([
      {
        inquiryTitle: title,
        inquiryPost: content,
        category,
        user_name: onUsername,
        times: formattedDate,
        current_id: currentUser,
      },
    ]);

    if (error) {
      // 에러 처리
      // console.error('문의 내용 보내기 실패', error);
      return null;
    }

    // 성공한 경우 추가된 데이터를 반환
    return data;
  } catch (error) {
    // console.error('문의 내용 보내기 실패', error);
    return null;
  }
};

//inquiry delete
export const deleteInquiry = async (id: number) => {
  try {
    const {data} = await supabase.from('inquiry').delete().eq('id', id);
  } catch (error) {
    // console.log('문의 내용 삭제 실패', error);
  }
};

// //inquiry updates
// export const updateInquiry = async (inquiryindex: string) => {
//   try {
//     const {data} = await supabase.from('inquiry').update({inquirypost: inquiryindex}).eq('id', id);
//   } catch (error) {
//     console.log('문의 내용 업데이트 실패', error);
//   }
// };
