import { reactive } from 'vue'

import { logIn, TLogIn } from './log-in'
import { userEmotionUpload, TUserEmotionUpload } from './user-emotion-upload'
import { userInfo, TUserInfo } from './user-info'
import { userEmotionHistory, TUserEmotionHistory } from './user-emotion-history'
import { userEmotionAdd, TUserEmotionAdd } from './user-emotion-add'
import { tarotList, TTarotList } from './tarot-list'
import { userInvitations, TUserInvitations } from './user-invitations'
import { userEmotionParse, TUserEmotionParse } from './user-emotion-parse'
import { userDailyTask, TUserDailyTask } from './user-daily-task'
import { userReportTelegram, TUserReportTelegram } from './user-report-telegram'
import { userTwitterAuthUrl, TUserTwitterAuthUrl } from './user-twitter-auth-url'

import { presale1uLeaderboard, TPresale1uLeaderboard } from './presale1u/leaderboard'
import { presale1uPaid, TPresale1uPaid } from './presale1u/paid'
import { presale1uRepoInvite, TPresale1uRepoInvite } from './presale1u/repo-invite'

export type TReq = {}
  & TLogIn & TUserInfo & TUserDailyTask & TUserReportTelegram
  & TUserTwitterAuthUrl
  & TUserEmotionHistory & TUserEmotionAdd
  & TUserEmotionUpload
  & TTarotList
  & TUserInvitations & TUserEmotionParse
  & TPresale1uLeaderboard & TPresale1uPaid & TPresale1uRepoInvite

export const req: TReq = reactive({
  ...logIn, ...userInfo, ...userDailyTask, ...userReportTelegram,
  ...userTwitterAuthUrl, 
  ...userEmotionHistory, ...userEmotionAdd,
  ...userEmotionUpload,
  ...tarotList,
  ...userInvitations, ...userEmotionParse,
  ...presale1uLeaderboard, ...presale1uPaid, ...presale1uRepoInvite
})




