import Image from 'next/image'

import { TopCategoryProps } from './interface'
import { Typography } from 'design-systems/Atoms/Typography'

export const TopCatogery = ({ heading, collection, image }: TopCategoryProps) => {
  return (
    <div className="flex gap-x-7 rounded-full bg-papayawhip dark:bg-black29">
      <Image
        alt="IMGcategory"
        className="rounded-full"
        src={image}
        style={{ height: '100px', width: '100px' }}
        width={100}
        height={100}
      />
      <div className="gap-y-4 self-center">
        <Typography className="Rubik font-Rubik text-2xl font-bold leading-[29px]">{heading}</Typography>
        <Typography className="font-Rubik text-base font-normal leading-[22px]">{collection}+ collections</Typography>
      </div>
    </div>
  )
}
