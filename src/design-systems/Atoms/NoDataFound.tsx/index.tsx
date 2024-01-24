import { useTheme } from 'next-themes'

import { DarkNoDataFound } from '../Icons'

export const NoDataFound = () => {
  const { theme } = useTheme()
  return (
    <div>
      <div>
        {theme === 'dark' ? (
          <div>
            <DarkNoDataFound />
          </div>
        ) : (
          <div>
            <NoDataFound />
          </div>
        )}
      </div>
    </div>
  )
}
