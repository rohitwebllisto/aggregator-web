import Image from 'next/image'

import { HomeCardProps } from '../HomeCard/interface'

import { IMG } from 'assets/images'
import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'

export const LeftHomeCard = ({ buttonText }: HomeCardProps) => {
  return (
    <div className="relative grid h-[600px] content-center xsm:!mt-24">
      <div className="absolute left-[60px] hidden  md:top-[50px] md:grid md:grid-cols-2 lg:top-[60px]">
        <div>
          <Image
            alt="IMG"
            className=" shadowHomeCard w-[450px] justify-self-start rounded-[42px] md:h-[500px] md:w-[500px] lg:h-[485px]"
            src={IMG.girl}
          />
        </div>
        <div className="h-[500px"></div>
      </div>
      {/* <div className='grid grid-cols-3 lightpapayawhip dark:darkpapayawhip'>
        <div className="hidden h-[100%] bg-danger-500 md:flex"></div>
        <div className="hidden h-[100%] bg-secondary-500 md:hidden lg:flex"></div>
        <div className="">
          <Typography className={`Rubik text-3xl font-bold uppercase lg:text-5xl `}>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography className="font-Rubik text-lg font-normal text-[#00000099] dark:text-black255">
            By loremipsum
          </Typography>
          <div className="mt-3 flex justify-center md:justify-start">
            <Button className={'w-[126.45px]'} hover={false} outlineBorder={false} text={buttonText} />
          </div>
        </div>
      </div> */}
      <div className="lightpapayawhip dark:darkpapayawhip grid gap-y-4 rounded-[42px] p-11 md:grid-cols-3 lg:grid-cols-3">
        <div className="hidden h-[100%]  md:flex"></div>
        <div className="hidden h-[100%] sm:hidden md:flex"></div>

        <div className=" left-[60px] flex justify-center md:hidden">
          <Image
            alt="IMG"
            className=" max-h-[223px] w-[450px] justify-self-end rounded-[42px] sm:h-[450px]"
            src={IMG.girl}
          />
        </div>
        <div className="">
          <Typography className={`Rubik text-3xl font-bold uppercase leading-[65.28px] lg:text-5xl`}>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography className="font-Rubik text-lg font-normal text-[#00000099] dark:text-black255">
            By loremipsum
          </Typography>
          <div className="mt-3 flex justify-center md:justify-start">
            <Button className={'w-[126.45px] font-Rubik'} hover={false} outlineBorder={false} text={buttonText} />
          </div>
        </div>
      </div>
    </div>
  )
}
