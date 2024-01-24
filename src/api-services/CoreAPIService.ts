import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import applyCaseMiddleware, { ApplyCaseMiddlewareOptions } from 'axios-case-converter'

const options: ApplyCaseMiddlewareOptions = {
  caseMiddleware: {
    requestTransformer: (config: any) => config,
  },
}

const axios = applyCaseMiddleware(
  Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  }),
  options
)
const responseData = <T extends AxiosResponse<any>>(response: T) => response.data

const handleError = (error: AxiosError) => {
  const status = error.response!.status

  throw error
}
class CoreAPIService {
  get = async <R>(url: string, params: AnyObject = {}) => {
    const token = typeof window !== 'undefined' ? localStorage?.getItem('Token') : undefined

    return axios
      .request<R>({
        method: 'get',
        url,
        params,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? token : '',
        },
      })
      .then<R>(responseData)
      .catch(handleError)
  }
  post = async <R>(url: string, data: AnyObject = {}, { ...config }: AxiosRequestConfig = {}) => {
    const token = typeof window !== 'undefined' ? localStorage?.getItem('Token') : undefined

    return axios
      .request<R>({
        method: 'post',
        url,
        data,
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token || '',
        },
      })
      .then<R>(responseData)
      .catch(handleError)
  }
  put = async <R>(url: string, data: AnyObject, { ...config }: AxiosRequestConfig = {}) => {
    const token = typeof window !== 'undefined' ? localStorage?.getItem('Token') : undefined

    return axios
      .request<R>({
        method: 'put',
        url,
        data,
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token || '',
        },
      })
      .then<R>(responseData)
      .catch(handleError)
  }
  patch = async <R>(url: string, data: AnyObject = {}, { ...config }: AxiosRequestConfig = {}) => {
    const token = typeof window !== 'undefined' ? localStorage?.getItem('Token') : undefined

    return axios
      .request<R>({
        method: 'patch',
        url: `${url}`,
        data,
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token || '',
        },
      })
      .then<R>(responseData)
      .catch(handleError)
  }
  delete = async <R>(url: string, data: AnyObject = {}) => {
    const token = typeof window !== 'undefined' ? localStorage?.getItem('Token') : undefined

    return axios
      .request<R>({
        method: 'delete',
        url: `${url}`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token || '',
        },
      })
      .then<R>(responseData)
      .catch(handleError)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CoreAPIService()
