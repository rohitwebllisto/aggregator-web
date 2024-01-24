import CollectionService from 'api-services/CollectionService'
import { useMutation, useQuery } from 'react-query'
import { API_ENDPOINTS } from 'utils/api-integration'
export interface PostCollection {
  email: string
  reference_key: string
}
export const useCollection = (email: string, collectionRef?: boolean) => {
  const {
    isLoading: isLoadingAllCollection,
    data: collection,
    refetch: collectionRefetch,
  } = useQuery([API_ENDPOINTS.PUBLIC.GET_COLLECTION], () => CollectionService.getAllCollection(email), {
    select: res => res,
    refetchOnWindowFocus: false,
    enabled: (!!email && collectionRef) || collectionRef === undefined,
  })
  // let jsonRes: [] = []
  // const postCollectionMutation = useMutation((data: PostCollection) => {
  //   return CollectionService.postCollection(data)
  // })

  // const postCollection = async (data: any) => {
  //   try {
  //     const response: any = await postCollectionMutation.mutateAsync(data)
  //     jsonRes = response
  //     return response
  //   } catch (error) {
  //     throw error
  //   }
  // }
  return {
    collection,
    isLoadingAllCollection,
    collectionRefetch,
    // postCollection,
    // jsonRes,
  }
}
