import { Typography } from '@mui/material'
import { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import TextTruncate from 'react-text-truncate'
import { Button, EditButton, Icon } from 'src/components'
import { RootState } from 'src/store/store'

import AboutEditModal from './AboutEditModal'

export interface IAboutProps {
  /**
   * Current User
   */
  currentUser?: boolean
}

export const About: FC<IAboutProps> = memo(
  ({ currentUser = true }: IAboutProps) => {
    const [line, setLine] = useState(3)
    const [openEditModal, setOpenEditModal] = useState(false)
    const bio = useSelector((state: RootState) => state.account.about)

    return (
      <div
        className={
          'flex flex-col mt-4 sm:mt-6 w-full text-left sm:px-8 sm:py-[42px] p-4 bg-green-100 rounded-[16px] justify-center relative sm:gap-y-7 gap-y-4'
        }>
        <Typography className="sm:text-[28px] text-[18px] leading-6 text-black font-bold font-700 sm:font-600 ml-1">
          About
        </Typography>
        {bio?.length ? (
          <div className="sm:text-[16px] leading-[21px] text-green-700 text-sm">
            <TextTruncate
              line={line}
              element="span"
              truncateText=""
              text={bio}
              textTruncateChild={
                <button
                  onClick={() => {
                    setLine(9999999999)
                  }}
                  style={{
                    color: 'var(--var-green-middle)',
                    fontSize: '14px',
                    lineHeight: '24px'
                  }}>
                  ...See More
                </button>
              }
            />
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-y-4 justify-center items-center">
            <Icon iconName="User" className="sm:w-[44px] sm:h-[44px] w-6 h-6" />
            <Typography className="font-bold text-lg leading-6 text-green-700 text-center">
              Tell the world about yourself and your adventures
            </Typography>
            <Button
              variant="contained"
              buttonLabel="Add Info"
              onClick={() => setOpenEditModal(true)}
              sx={{ width: 124 }}
            />
          </div>
        )}
        {currentUser && bio?.length ? (
          <div className="flex-col items-center justify-center cursor-pointer absolute sm:top-8 sm:right-8 top-2 right-2">
            <EditButton
              onClick={() => setOpenEditModal(true)}
              className="sm:border border-none sm:bg-white bg-transparent"
            />
          </div>
        ) : (
          <></>
        )}
        <AboutEditModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
        />
      </div>
    )
  }
)

About.displayName = 'About'

export default About
