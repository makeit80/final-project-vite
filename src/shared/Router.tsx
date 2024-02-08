import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from '../components/Common/Layout';
import ScrollToTop from '../components/Common/ScrollToTop';
import ProtectedRoute from '../components/Common/ProtectedRoute';
import {Suspense, lazy} from 'react';
import Spinner from '../components/Common/Spinner';
import {Helmet} from 'react-helmet-async';

const Home = lazy(() => import('../pages/Home'));
const Artist = lazy(() => import('../pages/Artist'));
const Community = lazy(() => import('../pages/Community'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Mypage = lazy(() => import('../pages/Mypage'));

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/community/:artistName" element={<Community />} />
              <Route path="/mypage" element={<Mypage />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/artist/:artistName" element={<Artist />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
