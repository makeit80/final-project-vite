import Join from '../components/Auth/Join';
import {useRecoilState} from 'recoil';
import {loginState} from '../shared/recoil/authAtom';
import {Navigate} from 'react-router-dom';
const Signup = () => {
  const [login] = useRecoilState(loginState);
  if (login) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <Join />
    </div>
  );
};
export default Signup;
