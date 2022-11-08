/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar } from '@mui/material'
import { AxiosError } from 'axios'
import { memo, useEffect, useState } from 'react'
import TextTruncate from 'react-text-truncate'
import MainContainer from 'src/components/MainContainer'
import { useAuth, useToast } from 'src/hooks'
import { axiosInstance } from 'src/services/jwtService'
import { IProfile, ITripLog } from 'src/types'

const profile: IProfile = {
  profileImage:
    'https://vagavoybucket.s3-us-east-2.amazonaws.com/avatar/1n5SqZ7H8vvj8uhfCxD58W.webp',
  mainInfo: {
    name: 'Charlie Hummel',
    location: 'Utila, Honduras'
  }
}

export const News = memo(() => {
  const [results, setResults] = useState<IProfile[]>([])
  const { user } = useAuth()
  const [tripLogs, setTripLogs] = useState<ITripLog[]>([])
  const [popularTripLogs, setPopularTripLogs] = useState<ITripLog[]>([])
  const { showToast } = useToast()

  useEffect(() => {
    /** Fetch News & Popular News Feed Here. */
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/travel/636aa9daa6a1e866ffaf6b72`)
      .then((res) => {
        const logs: ITripLog[] = []
        setTripLogs(logs.concat(res.data))
        setPopularTripLogs(logs.concat(res.data))
      })
      .catch((err: AxiosError) => {
        showToast({
          type: 'error',
          message: err.response?.data
        })
      })
  }, [])

  return (
    <MainContainer className="w-full min-h-[calc(100vh-80px)]">
      <div className="flex flex-row xl:gap-x-4 mt-8 xl:px-6 justify-center">
        <div className="xl:w-2/3 flex flex-col items-start w-full max-w-[800px]">
          <span className="font-semibold text-[28px] leading-6 mb-8">
            Newsfeed
          </span>
          {tripLogs.length > 0 ? (
            tripLogs.map((tripLog, index) => (
              <div
                key={tripLog.tripLogId || index}
                className="flex flex-col gap-y-4 border-b border-b-green-100 pb-6 mb-6">
                {tripLog.tripGallery && tripLog.tripGallery?.length > 0 ? (
                  <img
                    src={tripLog.tripGallery[0].src}
                    alt={tripLog.tripGallery[0].backgroundInfo}
                    loading="lazy"
                    className="w-full max-w-[800px] sm:max-h-[586px] max-h-[250px]"
                  />
                ) : (
                  <></>
                )}
                <div className="w-full flex flex-row gap-x-4">
                  <Avatar
                    src={profile.profileImage}
                    className="w-[44px] h-[44px]"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg leading-6 text-green-700 text-left">
                      {profile.mainInfo?.name}
                    </span>
                    <span className="font text[14px] leading-[21px] text-green-500 text-left mb-1">
                      {profile.mainInfo?.location}
                    </span>
                    <span className="text-[14px] leading-[21px] text-green-700 text-left">
                      {tripLog.tripDescription}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-8">
              No News
            </span>
          )}
        </div>
        <div className="w-1/3 flex-col items-start xl:flex hidden">
          <span className="font-semibold text-[28px] leading-6 mb-8">
            Popular
          </span>
          {tripLogs.length > 0 ? (
            tripLogs.map((tripLog, index) => (
              <div
                key={tripLog.tripLogId || index}
                className="flex flex-row gap-x-4 mb-4">
                {tripLog.tripGallery && tripLog.tripGallery?.length > 0 ? (
                  <img
                    src={tripLog.tripGallery[0].src}
                    alt={tripLog.tripGallery[0].backgroundInfo}
                    loading="lazy"
                    className="w-[144px] h-[104px]"
                  />
                ) : (
                  <></>
                )}
                <div className="w-full flex flex-row gap-x-[14px]">
                  <Avatar
                    src={profile.profileImage}
                    className="w-[44px] h-[44px]"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg leading-6 text-green-700 text-left">
                      {profile.mainInfo?.name}
                    </span>
                    <span className="font text[14px] leading-[21px] text-green-500 text-left mb-1">
                      {profile.mainInfo?.location}
                    </span>
                    <div className='text-left'>
                      <TextTruncate
                        line={2}
                        element="span"
                        truncateText="..."
                        text={tripLog.tripDescription}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="text-4xl font-semibold leading-6 text-green-700 text-center mt-8">
              No Popular Trips
            </span>
          )}
        </div>
      </div>
    </MainContainer>
  )
})

News.displayName = 'News'

export default News