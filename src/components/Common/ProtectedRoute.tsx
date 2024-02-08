import {useRecoilState} from 'recoil';
import {loginState} from '../../shared/recoil/authAtom';
import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = () => {
  const [login] = useRecoilState(loginState);
  if (!login) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
