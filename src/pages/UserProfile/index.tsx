import { Typography, useTheme } from '@mui/material'
import { memo } from 'react'
import {
  Avatar,
  Button,
  Logo,
  MainInfo,
  TripLogContainer
} from 'src/components'
import MainContainer from 'src/components/MainContainer'
import { About, BannerImage } from 'src/components/UserProfilePage'

const tripLogs1 = [
  {
    tripLocation: 'Utila, Honduras',
    tripPeriod: 'Mar 20-27, 2022',
    tripDescription:
      'I learned to scuba dive in high school and did my open water certification dive at an old rock quarry in the middle of Missouri. Although I wanted to,     I hadn’t been scuba diving again since. But finally, six years later I got to go again – but this time in Utila, in one of the biggest reefs in the world!'
  }
]

const tripLogs2 = [
  {
    tripLocation: 'Egypt',
    tripPeriod: 'Jan 14-Apr 14,2021',
    tripDescription:
      'Went backpacking in Egypt with a friend for three months after I graduated and before starting work. It was during at the height of COVID and all the hotels were all nearly empty. We went north-south-east and west in the country and did it all for <$25 / day everything included!'
  },
  {
    tripLocation: 'Dahab, Egypt',
    tripPeriod: 'Jan 14-Apr 14,2021',
    tripDescription:
      'Went backpacking in Egypt with a friend for three months after I graduated and before starting work. It was during at the height of COVID and all the hotels were all nearly empty. We went north-south-east and west in the country and did it all for <$25 / day everything included!'
  },
  {
    tripLocation: 'Western Desert, Egypt',
    tripPeriod: 'Jan 14-Apr 14,2021',
    tripDescription:
      'Went backpacking in Egypt with a friend for three months after I graduated and before starting work. It was during at the height of COVID and all the hotels were all nearly empty. We went north-south-east and west in the country and did it all for <$25 / day everything included!'
  }
]

export const UserProfile = memo(() => {
  const theme = useTheme()
  const currentUser = true

  return (
    <div className="w-full">
      <BannerImage currentUser={currentUser} />
      <MainContainer className="">
        <Avatar
          // src="https://mui.com/static/images/avatar/2.jpg"
          currentUser={currentUser}
          className="w-[94px] h-[94px] sm:w-[132px] sm:h-[132px] xl:w-[260px] xl:h-[260px] border-[4px] xl:border-[8px] -mt-[46px] sm:-mt-[62px] xl:-mt-[180px]"
        />
        <div className="px-1 xl:px-3 pt-3 sm:pt-8">
          <MainInfo currentUser={currentUser} />
        </div>
        <div className="flex flex-col">
          <About currentUser={currentUser} />
          <div className="flex flex-col mt-4 sm:mt-8 sm:mb-16 mb-12 text-left py-4 sm:py-[42px] px-4 sm:px-8 rounded-[16px] border-[1px]">
            <span className="sm:text-[28px] text-[24px] text-black font-bold font-700 sm:font-600">
              Travel Log
            </span>
            <TripLogContainer
              tripLogContainerFlagImageSource="/images/Honduras.jpg"
              tripLogs={tripLogs1}
            />
            <TripLogContainer
              tripLogContainerFlagImageSource="/images/egypt.png"
              tripLogs={tripLogs2}
            />
          </div>
        </div>
      </MainContainer>
      <div className="bg-white">
        <div className="w-full relative">
          <img
            src="/images/footerbanner.png"
            className="w-full h-[374px] object-cover object-[50%_100%]"
          />
          <div className="flex flex-col gap-y-8 items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Typography variant="h3" sx={{ color: 'white' }}>
              Discover, Explore, Record.
            </Typography>
            <Button
              sx={{ width: 132 }}
              variant="contained"
              buttonLabel="Join Now"
              buttonFontBold={true}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-[106px] mt-2 relative">
          <Logo sx={{ position: 'absolute', top: '-27px' }} />
          <Typography
            sx={{
              fontSize: 12,
              color: theme.palette.green.middle,
              fontFamily: 'sans_pro'
            }}>
            © 2022 All rights reserved
          </Typography>
        </div>
      </div>
    </div>
  )
})

UserProfile.displayName = 'UserProfile'

export default UserProfile
