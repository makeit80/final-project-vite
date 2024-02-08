import Router from './shared/Router';
import {GlobalStyle} from './GlobalStyle';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RecoilRoot} from 'recoil';
import 'react-toastify/dist/ReactToastify.css';
import {StToastContainer} from './toast/style';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <StToastContainer />
          <GlobalStyle />
          <Router />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export default App;
