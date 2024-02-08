import Signin from '../components/Auth/Signin';
import {useRecoilState} from 'recoil';
import {loginState} from '../shared/recoil/authAtom';
import {Navigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
const Login = () => {
  const [login] = useRecoilState(loginState);

  if (login) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <Helmet>
        <meta property="og:site_name" content="Aidol" />
        <meta property="og:title" content="Home" />
        <meta property="og:url" content="https://aidol.life/" />
        <meta property="og:description" content="아이돌 관련 커뮤니티 " />
      </Helmet>
      <Signin />
    </div>
  );
};
export default Login;
