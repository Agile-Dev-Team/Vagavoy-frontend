import { Typography, useTheme } from '@mui/material'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Button, Logo, MainInfo } from 'src/components'
import MainContainer from 'src/components/MainContainer'
import { About, BannerImage, TravelLog } from 'src/components/UserProfilePage'
import { RootState } from 'src/store/store'

export const UserProfile = memo(() => {
  const theme = useTheme()
  const currentUser = true

  const profileImage = useSelector(
    (state: RootState) => state.account.profileImage
  )

  return (
    <div className="w-full">
      <BannerImage currentUser={currentUser} />
      <MainContainer className="">
        <Avatar
          src={profileImage}
          currentUser={currentUser}
          className="w-[94px] h-[94px] sm:w-[132px] sm:h-[132px] xl:w-[260px] xl:h-[260px] border-[4px] xl:border-[8px] -mt-[46px] sm:-mt-[62px] xl:-mt-[180px]"
        />
        <div className="px-1 xl:px-3 pt-3 sm:pt-8">
          <MainInfo currentUser={currentUser} />
        </div>
        <div className="flex flex-col">
          <About currentUser={currentUser} />
          <TravelLog currentUser={currentUser} />
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
