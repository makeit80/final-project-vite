import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 이메일로그인상태확인
export const loginState = atom({
  key: "loginState",
  default: null, //인증되지 않았을 때
  effects_UNSTABLE: [persistAtom],
});
