import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useTheme } from '@mui/material'
import { AxiosError } from 'axios'
import { memo, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ImageViewer from 'react-simple-image-viewer'
import { Avatar, Button, EditButton, Icon, PlusButton } from 'src/components'
import MainContainer from 'src/components/MainContainer'
import { useAuth, useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { IProfile, ITripImage, ITripLog } from 'src/types'

export const TripGallery = memo(() => {
  const { id } = useParams()
  const { tripLogId } = useParams()
  const theme = useTheme()
  const [tripLog, setTripLog] = useState<ITripLog>()
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  const [mode, setMode] = useState('tile')
  const { user } = useAuth()
  const currentUser = id === user.id
  const [userInfo, setUserInfo] = useState<IProfile>()
  const [imageSource, setImageSource] = useState([])
  const [currentImage, setCurrentImage] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/travel/${tripLogId}`)
      .then((res) => {
        setTripLog(res.data)
        if (res.data.tripGallery.length) {
          const newImageArray = res.data.tripGallery.map(
            (tripimage: ITripImage) => tripimage.src
          )
          setImageSource(newImageArray)
        }
      })
      .catch((err: AxiosError) => {
        showToast({
          type: 'error',
          message: err.message
        })
      })
  }, [tripLogId])

  useEffect(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
      .then((res) => {
        setUserInfo(res.data)
      })
      .catch((err: AxiosError) => {
        showToast({
          type: 'error',
          message: err.message
        })
      })
  }, [id])

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index)
    setIsViewerOpen(true)
  }, [])

  const closeImageViewer = () => {
    setCurrentImage(0)
    setIsViewerOpen(false)
  }

  return (
    <MainContainer className="w-full min-h-[calc(100vh-80px)]">
      <div className="flex flex-col gap-y-8 w-full mt-8 xl:px-6 items-center">
        {/* Header */}
        <div className="flex flex-col gap-y-4 sm:flex-row justify-between w-full">
          <div className="flex items-center justify-center w-fit">
            <Icon
              iconName="ArrowLeft"
              className="mr-4 cursor-pointer"
              onClick={() => navigate(`/profile/${id}`)}
            />
            <span className="text-[28px] font-semibold leading-6 text-green-700">
              {tripLog?.tripCountryCode
                ? `Trip Gallery - ${
                    tripLog?.tripLocation?.split(',')[0] +
                    ', ' +
                    regionNames.of(tripLog?.tripCountryCode)
                  }`
                : ''}
            </span>
          </div>
          <div className="flex flex-row gap-x-4 justify-center">
            <Icon
              iconName="Tile"
              iconColor={
                mode === 'tile'
                  ? theme.palette.green.dark
                  : theme.palette.green.light1
              }
              className="cursor-pointer"
              onClick={() => setMode('tile')}
            />
            <Icon
              iconName="List"
              iconColor={
                mode === 'list'
                  ? theme.palette.green.dark
                  : theme.palette.green.light1
              }
              className="cursor-pointer"
              onClick={() => setMode('list')}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center w-full">
          {userInfo?.profileImage ? (
            <Avatar
              src={userInfo?.profileImage}
              className="w-[124px] h-[124px]"
              borderWidth={4}
            />
          ) : (
            <AccountCircleOutlinedIcon className="text-green-700 w-[124px] h-[124px]" />
          )}

          <span className="font-semibold text-[28px] leading-6 text-green-700 mt-2 mb-4">
            {userInfo?.mainInfo?.name}
          </span>
          <div className="flex flex-row w-full gap-x-[18px] justify-center items-center relative">
            {currentUser ? (
              <div className="hidden sm:flex flex-row gap-x-4 absolute right-[44px]">
                <PlusButton />
                <EditButton />
              </div>
            ) : (
              <></>
            )}
            {currentUser ? <PlusButton className="block sm:hidden" /> : <></>}
            <Button
              buttonLabel="Share Profile"
              variant="outlined"
              buttonFontBold
              buttonRightIconName="Share"
              sx={{ width: 162 }}
            />
            {currentUser ? <EditButton className="block sm:hidden" /> : <></>}
          </div>
        </div>

        {/* Gallery */}
        {mode === 'tile' ? (
          <div className="grid md:grid-cols-4 grid-cols-3 gap-[6px]">
            {tripLog?.tripGallery && tripLog?.tripGallery?.length > 0 ? (
              tripLog?.tripGallery.map((tripImage, index) => (
                <img
                  key={tripImage.tripImageId || index}
                  src={tripImage.src}
                  alt={tripImage.backgroundInfo}
                  loading="lazy"
                  onClick={() => openImageViewer(index)}
                />
              ))
            ) : (
              <></>
            )}
            {isViewerOpen && (
              <ImageViewer
                src={imageSource}
                currentIndex={currentImage}
                onClose={closeImageViewer}
                disableScroll={false}
                backgroundStyle={{
                  backgroundColor: 'rgba(0,0,0,0.9)'
                }}
                closeOnClickOutside={true}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-y-6">
            {tripLog?.tripGallery && tripLog.tripGallery.length > 0 ? (
              tripLog.tripGallery.map((tripImage, index) => (
                <div
                  key={tripImage.tripImageId || index}
                  className="flex flex-col gap-y-6 pb-6 border-b border-b-green-100">
                  <img
                    src={tripImage.src}
                    alt={tripImage.backgroundInfo}
                    loading="lazy"
                    className="max-w-[800px] h-auto"
                  />
                  <span className="font-normal text-base leading-6 text-green-700 w-fit">
                    {tripImage.backgroundInfo}
                  </span>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </MainContainer>
  )
})

TripGallery.displayName = 'TripGallery'

export default TripGallery
