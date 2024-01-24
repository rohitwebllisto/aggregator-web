import { Typography } from '../Typography'

interface CountDownProps {
  clock: string
  Expire: number
}

export const CountDown = ({ clock, Expire }: CountDownProps) => {
  return (
    <div className="min-w-[30px] gap-x-7 rounded-sm  bg-gray05 p-2 text-center text-[17px] text-black5 dark:bg-black225_05 dark:text-White255_60 sm:h-[72px] lg:p-4">
      <Typography className="">{Expire}</Typography>
      <strong>{clock}</strong>
    </div>
  )
}
