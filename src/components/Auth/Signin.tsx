import React, {useEffect, useState} from 'react';
import {supabase} from '../../api/supabase';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {loginState} from '../../shared/recoil/authAtom';
import {
  StCreateAccountSpan,
  StDivisionDiv,
  StErrorMessage,
  StForm,
  StFormDiv,
  StFormWrapper,
  StGoogleDiv,
  StGoogleIcon,
  StGoogleLoginBtn,
  StGoogleP,
  StInfoP,
  StInput,
  StKakaoImg,
  StSigninBtn,
  StSignupBtnDiv,
  StSpan,
  StTitleP,
} from './style';
import googleicon from '../../assets/images/googleicon.png';
import kakaologin from '../../assets/images/kakao_login_large_wide.png';
import {toast} from 'react-toastify';

const Signin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const navigate = useNavigate();

  //리코일로 로그인상태관리
  const setLogin = useSetRecoilState(loginState);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  // 유효성검사
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) setEmailError('이메일 아이디를 입력해주세요.');
    else if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');
  };

  const validatePassword = () => {
    if (!password) setPasswordError('비밀번호를 입력해주세요.');
    else if (password.length < 8) setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    else setPasswordError('');
  };

  // 이메일 로그인
  const handleLoginButtonClick = async () => {
    validateEmail();
    validatePassword();
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    // 리코일 깊은 복사
    setLogin(JSON.parse(JSON.stringify(data.user)));
    if (data.user !== null) {
      toast.success('로그인이 완료되었습니다.');
      navigate('/');
    }
    if (error) setPasswordError('이메일 혹은 비밀번호를 확인해주세요.');
  };

  // 모두 만족할 때 isValid true로
  useEffect(() => {
    // 모두 만족할때 isValid를 true로 만드는 조건
    if (!email.includes('@')) {
      setIsValid(false);
      return;
    }
    if (password.length < 8) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
  }, [email, password]);

  // google 로그인
  const googleLogin = async () => {
    const {data} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    setLogin(JSON.parse(JSON.stringify(data.provider)));
  };

  // kakao 로그인
  const kakaoLogin = async () => {
    const {data} = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    setLogin(JSON.parse(JSON.stringify(data.provider)));
  };

  return (
    <StFormWrapper>
      <StForm onSubmit={e => e.preventDefault()}>
        <StFormDiv>
          <StTitleP>AIdol inc.</StTitleP>
          <StInfoP>로그인 혹은 회원가입을 해주세요.</StInfoP>
          <StInput
            placeholder="이메일 주소"
            value={email}
            onChange={handleEmailInput}
            required
            onBlur={validateEmail}
          ></StInput>
          <StErrorMessage>{emailError}</StErrorMessage>
          <StInput
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordInput}
            required
            onBlur={validatePassword}
            minLength={8}
          ></StInput>
          <StErrorMessage>{passwordError}</StErrorMessage>
          <StSigninBtn
            type="submit"
            disabled={isValid ? false : true}
            style={{background: isValid ? 'linear-gradient(45deg, #cc51d6, #5a68e8)' : '#aeaeb2'}}
            onClick={handleLoginButtonClick}
          >
            로그인
          </StSigninBtn>
          <StSignupBtnDiv>
            <StSpan>아직 계정이 없다면?</StSpan>
            <StCreateAccountSpan onClick={() => navigate('/signup')}>이메일 주소로 가입하기</StCreateAccountSpan>
          </StSignupBtnDiv>
          <StDivisionDiv>Or</StDivisionDiv>
          <StGoogleLoginBtn onClick={googleLogin}>
            <StGoogleDiv>
              <StGoogleIcon src={googleicon} />
              <StGoogleP>구글 로그인</StGoogleP>
            </StGoogleDiv>
          </StGoogleLoginBtn>

          <StKakaoImg src={kakaologin} onClick={kakaoLogin} />
        </StFormDiv>
      </StForm>
    </StFormWrapper>
  );
};

export default Signin;
