import Image from 'next/image'

import { HomeCardProps } from './interface'

import { IMG } from 'assets/images'
import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { useRouter } from 'next/navigation'

export const HomeCard = ({ buttonText }: HomeCardProps) => {
  const router = useRouter()
  return (
    <div className="relative grid h-[600px] content-center">
      <div className="lightpapayawhip  dark:darkpapayawhip mt-[50px] grid gap-y-4 rounded-[42px] p-11 md:mt-0 md:grid-cols-3 lg:grid-cols-2">
        <div className="">
          {/*md:w-[40%] lg:w-[50%] xlg:w-[60%] */}
          <Typography className={`Rubik text-left text-3xl font-bold uppercase leading-[65px] lg:text-5xl`}>
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography className="font-Rubik text-lg font-normal text-[#00000099] dark:text-black255 ">
            By loremipsum
          </Typography>
          <div className="mt-3 flex justify-center md:justify-start">
            <Button
              className={'w-[126.45px]'}
              hover={false}
              outlineBorder={false}
              text={buttonText}
              onClick={() => router.push(`/exclusive`)}
            />
          </div>
        </div>
        <div className="hidden h-[100%] md:flex"></div>
        <div className="hidden h-[100%] md:hidden  lg:flex"></div>
        <div className=" right-[60px] mt-10 flex justify-center md:hidden">
          <Image
            alt="IMG"
            className="h-[450px] justify-self-end rounded-[42px] xs:h-[223px] sm:h-[300px] xsm:h-[310px]"
            src={IMG.girl}
          />
        </div>
      </div>
      <div className="absolute right-[60px] hidden sm:hidden md:top-[50px] md:grid md:grid-cols-2 lg:top-[60px]">
        <div className="h-[500px] "></div>
        <div>
          <Image
            alt="IMG"
            className=" shadowHomeCard w-[450px] justify-self-end rounded-[42px] md:h-[500px] md:w-[500px] lg:h-[480px]"
            loading="lazy"
            src={IMG.girl}
          />
        </div>
      </div>
    </div>
  )
}
