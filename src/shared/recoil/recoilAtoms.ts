import { atom } from 'recoil'

export const followState = atom<string[]>({
  key: 'followState',
  default: [], // 팔로우하는 사용자의 ID를 저장하는 배열
})
