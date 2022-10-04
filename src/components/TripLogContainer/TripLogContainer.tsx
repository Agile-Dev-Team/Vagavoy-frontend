import Typography from '@mui/material/Typography'
import { FC, memo, useState } from 'react'
import { TripLogElement } from 'src/components'
import { ITripLog } from 'src/types'

export interface ITripLogContainerProps {
  /**
   * Trip Log Container Image Source
   */
  tripLogContainerFlagImageSource: string
  /**
   * Trip Logs
   */
  tripLogs: ITripLog[]
}

export const TripLogContainer: FC<ITripLogContainerProps> = memo(
  ({
    tripLogContainerFlagImageSource = '',
    tripLogs = []
  }: ITripLogContainerProps) => {
    const [showAllLogs, setShowAllLogs] = useState(false)

    return (
      <div className="flex flex-col border-b border-b-green-100 sm:pt-8 pt-4 sm:pl-8 pl-5 showBottomBorder last:border-none relative">
        <img
          src={tripLogContainerFlagImageSource}
          className="absolute sm:w-[64px] sm:h-[44px] w-[44px] h-[31px] sm:left-0 sm:top-8 z-10 left-0 top-[14px]"
        />
        <div>
          {tripLogs
            .slice(0, showAllLogs ? undefined : 1)
            .map((tripLog, index) => (
              <TripLogElement
                key={index}
                tripDescription={tripLog.tripDescription}
                tripPeriod={tripLog.tripPeriod}
                tripLocation={tripLog.tripLocation}
              />
            ))}
        </div>
        {!showAllLogs && tripLogs.length > 1 && (
          <div className="cursor-pointer sm:pl-[46px] pl-9" onClick={() => setShowAllLogs(true)}>
            <Typography className="text-lg font-bold leading-6 text-green-700">
              See all Charlie's Stops In Egypt...
            </Typography>
          </div>
        )}
      </div>
    )
  }
)

TripLogContainer.displayName = 'TripLogContainer'

export default TripLogContainer