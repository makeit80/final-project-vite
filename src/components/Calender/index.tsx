import {useQuery} from '@tanstack/react-query';
import {getUserSchedule} from '../../api/artistapi';
import {getCurrentUser} from '../../api/currentUser';
import Spinner from '../Common/Spinner';
import {
  StDayColumnLi,
  StDayColumnUl,
  StDayP,
  StDayUl,
  StDayli,
  StMonthDiv,
  StScheduleArtistP,
  StScheduleContentP,
  StScheduleDiv,
  StWrapper,
} from './style';

const Calender = () => {
  const {data: currentUser} = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser,
  });
  const {data: userSchdule, isLoading} = useQuery({
    queryKey: ['userSchedule'],
    queryFn: getUserSchedule,
  });
  const targetUserSchedule = userSchdule?.filter(el => el.userid === currentUser.id);

  const dayList: any[] = [];
  const dayChecker = [
    {checker: 0, dayString: 'Sun'},
    {checker: 1, dayString: 'Mon'},
    {checker: 2, dayString: 'Tue'},
    {checker: 3, dayString: 'Wed'},
    {checker: 4, dayString: 'Thu'},
    {checker: 5, dayString: 'Fri'},
    {checker: 6, dayString: 'Sat'},
  ];

  // 금일
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const dayMonth = today.getMonth();
  const day = today.getDate();
  const monthString = `${year}.${('0' + month).slice(-2)}`;

  // 말일
  const lastDay = new Date(year, month, 0);
  const dayLast = lastDay.getDate();

  // 첫일 요일
  const firstDay = new Date(year, dayMonth, 1).getDay();

  // 지난달 말일
  const lastMonth = new Date(year, month, 0);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  // 다음달
  const nextMonth = new Date(year, month, 1);
  // nextMonth.setMonth(nextMonth.getMonth() + 1);

  // this month
  for (let i = 1; i <= +dayLast; i++) {
    // last month
    if (i === 1) {
      for (let j = 0; j < firstDay; j++) {
        const lastDay = lastMonth.getDate() - j;
        dayList.push(`${('0' + (lastMonth.getMonth() + 1)).slice(-2)}-${('0' + lastDay).slice(-2)}`);
      }
      dayList.sort((a, b) => a - b);
    }
    dayList.push(`${('0' + month).slice(-2)}-${('0' + i).slice(-2)}`);
  }
  // next month
  if (dayList.length < 35) {
    const maxLength = 35 - dayList.length;
    for (let l = 1; l <= maxLength; l++) {
      dayList.push(`${('0' + (nextMonth.getMonth() + 1)).slice(-2)}-${('0' + l).slice(-2)}`);
    }
  } else {
    const maxLength = 42 - dayList.length;
    for (let l = 1; l <= maxLength; l++) {
      dayList.push(`${('0' + nextMonth.getMonth()).slice(-2)}-${('0' + l).slice(-2)}`);
    }
  }

  const textLengthHandler = (text: string) => {
    const maxLength = 13;
    if (text.length > maxLength) {
      const result = text.slice(0, maxLength) + '···';
      return result;
    }
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <StWrapper>
      <StMonthDiv>{monthString}</StMonthDiv>
      <StDayColumnUl>
        {dayChecker.map(el => {
          return <StDayColumnLi>{el.dayString}</StDayColumnLi>;
        })}
      </StDayColumnUl>
      <StDayUl>
        {dayList.map(e => {
          return (
            <StDayli>
              <StDayP className={+e.slice(-2) === day ? 'today' : ''}>{+e.slice(-2)}</StDayP>
              {targetUserSchedule
                ?.filter(el => el.date.slice(-5) == e)
                .map(ele => {
                  return (
                    <StScheduleDiv>
                      <StScheduleArtistP>{ele.artist}</StScheduleArtistP>
                      <StScheduleContentP>{textLengthHandler(ele.title)}</StScheduleContentP>
                    </StScheduleDiv>
                  );
                })}
            </StDayli>
          );
        })}
      </StDayUl>
    </StWrapper>
  );
};

export default Calender;
