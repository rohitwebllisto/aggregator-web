'use client'

import { useSubscribe } from 'hooks/apis/useSubscribe'
import { useState } from 'react'
import { toast } from 'react-toastify'
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const Footer: React.FC = () => {
  const { postSubscribe } = useSubscribe()
  const [subscribeEmail, setsubscribeEmail] = useState('')
  const handleSubmit = async () => {
    if (subscribeEmail !== '') {
      const isValidEmail = emailRegex.test(subscribeEmail)

      if (isValidEmail) {
        const data = await postSubscribe(subscribeEmail)
        if (data) {
          setsubscribeEmail('')
        }
      } else {
        toast.error('Please enter valid email')
      }
    } else {
      toast.warning('Please enter the email')
    }
  }
  return (
    <footer>
      <div className=" sm: container mt-20 grid min-h-[408px] gap-y-4 bg-grayE3 p-10 dark:bg-black27 lg:grid-cols-2 lg:!gap-10">
        <div className="block gap-y-4 justify-self-center">
          <div className="text-4xl font-semibold leading-[44px]">Sign up for our newsletter</div>
          <div className="mt-5 text-sm font-normal leading-[16.59px]">
            Be the first to know about our special offers, news, and updates.
          </div>
          <div className=" mt-7 flex h-[55px] justify-between rounded-lg  bg-grayDA	dark:bg-black2E">
            <input
              className="placeholder-leading-[16.59px] w-[100%] rounded-sm bg-grayDA p-3 dark:bg-black2E"
              placeholder="Email Address"
              value={subscribeEmail}
              onChange={e => setsubscribeEmail(e.target.value)}
            />
            <div className="yellow-gradiant p5 flex w-[105.734px] content-center justify-center rounded-sm p-0.5">
              <button
                className="flex w-[100%] items-center  justify-center rounded-sm bg-grayDA font-Rubik font-semibold leading-[18.96px] text-black dark:bg-black2E dark:text-white"
                onClick={handleSubmit}
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <table className="h-[250px] w-[100%] ">
            <thead>
              <tr className="opacity-50 sm:text-center lg:text-start">
                {[0, 1, 2].map((item, key) => (
                  <th className="sm:text-center lg:text-start" key={key}>
                    Lorem Ipsum
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4].map((item, key) => (
                <tr className="opacity-50 sm:text-center lg:text-start" key={key}>
                  {[0, 1, 2].map((item, key) => (
                    <td className="xs:text-center sm:text-center lg:text-start" key={key}>
                      Lorem
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex h-[61px] items-center justify-center bg-black text-center font-semibold uppercase text-white dark:bg-black244">
        © VYGA 2024 @copyright reserved
      </div>
    </footer>
  )
}
