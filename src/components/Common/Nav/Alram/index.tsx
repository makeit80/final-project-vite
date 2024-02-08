import React, {useEffect, useRef} from 'react';
import St from './style';
import escape from '../../../../assets/images/escape.svg';
import {supabase} from '../../../../api/supabase';
import {useQuery} from '@tanstack/react-query';
import {getCurrentUser} from '../../../../api/currentUser';
import dayjs from 'dayjs';

const Alram = ({alarmToggle, setAlarmToggle, alarm, setAlarm}: any) => {
  const alarmBtRef = useRef(null);

  const {data: currentUser} = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    const handleClickOutside = e => {
      if (alarmBtRef.current && !alarmBtRef.current.contains(e.target)) {
        setAlarmToggle(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const taskListener = supabase
    .channel('schedule-changes')
    .on(
      'postgres_changes',
      {event: 'INSERT', schema: 'public', table: 'userSchedule', filter: `userid=in.(${currentUser?.id})`},
      payload => {
        const {id, artist, userid, created_at, title, date} = payload.new;
        const createdFormat = dayjs(created_at).format('YYYY.MM.DD HH:mm:ss');
        const alarmData = {
          id: id,
          artist: artist,
          userid: userid,
          created_at: createdFormat,
          title: title,
          date: date,
        };
        setAlarm([...alarm, alarmData]);

        // alarm 을 누르면 display 상태 바뀌기 (알람이 없을 경우 CSS 도 작업)
      },
    )
    .subscribe();

  const alarmDeleteHandler = id => {
    setAlarm(alarm.filter(e => e.id !== id));
  };

  return (
    <>
      <St.AlarmListDiv ref={alarmBtRef} className={alarmToggle ? 'On' : 'OFF'}>
        <St.AlarmDiv>
          <St.AlarmP>알림</St.AlarmP>
          <St.InfoP>추가한 스케줄은 마이페이지에서 확인 가능합니다.</St.InfoP>
        </St.AlarmDiv>
        <St.AlarmListUl>
          {alarm
            .sort((a, b) => {
              const aDate: any = new Date(a.created_at);
              const bDate: any = new Date(b.created_at);
              return bDate - aDate;
            })
            .map(e => {
              return (
                <St.AlarmListLi>
                  <St.AlarmContentsDiv>
                    <St.AlarmTitleP>{e.artist} 스케줄이 추가되었습니다.</St.AlarmTitleP>
                    <St.AlarmListP>
                      {e.title} / {e.date}
                    </St.AlarmListP>
                  </St.AlarmContentsDiv>
                  <St.AlarmTimeP>{e.created_at}</St.AlarmTimeP>
                  <St.AlarmDeleteBtn
                    onClick={() => {
                      alarmDeleteHandler(e.id);
                    }}
                  >
                    <St.DeleteImg src={escape} alt="profile icon" />
                  </St.AlarmDeleteBtn>
                </St.AlarmListLi>
              );
            })}
        </St.AlarmListUl>
      </St.AlarmListDiv>
    </>
  );
};

export default Alram;
