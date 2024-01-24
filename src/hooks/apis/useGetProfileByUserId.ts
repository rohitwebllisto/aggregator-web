import { useQuery } from 'react-query'

import { QUERIES } from 'utils/api-integration'
import ProfileServices from 'api-services/ProfileServices'
export const useGetProfileByUserId = (email: string) => {
  const { isLoading: isLoadingProfileID, data: profileID } = useQuery(
    [QUERIES.PRIVATE.PROFILE, email],
    () => ProfileServices.getProfileById(email),
    {
      select: res => res,
      refetchOnWindowFocus: false,
    }
  )
  return {
    isLoadingProfileID,
    profileID,
  }
}
