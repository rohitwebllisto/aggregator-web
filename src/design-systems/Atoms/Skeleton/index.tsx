import { skeletonProps } from './interface'

export const Skeleton = ({ SkeletonType, limit, className }: skeletonProps) => {
  const numbers = []
  if (limit != undefined) {
    for (let i = 1; i <= limit; i++) {
      numbers.push(i)
    }
  }
  return (
    <>
      {SkeletonType === 'card' && (
        <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {numbers?.map((item, key) => (
            <div
              className={`${className} mx-auto w-full rounded-sm p-4 shadow dark:border-[1px] dark:border-gray81`}
              key={key}
            >
              <div className="animate-pulse gap-y-4">
                <div className=" h-[315.82px] rounded-sm bg-grayDA"></div>
                <div className="flex-1 gap-y-3 ">
                  {/* <div className="h-2 rounded bg-grayDA gap-y-6 mt-3"></div> */}
                  <div className="grid gap-y-3">
                    <div className="mt-3 grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-grayDA"></div>
                      <div className="col-span-1 h-2 rounded bg-grayDA"></div>
                    </div>
                    <div className="grid gap-x-1 rounded " style={{ gridTemplateColumns: '55% auto auto' }}>
                      <div className="h-10 rounded-bl-sm bg-grayDA"></div>
                      <div className="h-10 bg-grayDA"></div>
                      <div className="h-10 rounded-br-sm bg-grayDA"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {SkeletonType === 'carousel' && (
        <div className="flex w-full flex-wrap justify-between gap-x-3">
          {numbers?.map((item, key) => (
            <div className=" mt-3 rounded-sm p-3 shadow dark:border-[1px] dark:border-gray81" key={key}>
              <div className="animate-pulse">
                <div className="h-[130px] min-w-[130px] rounded-full bg-grayDA"></div>
                <div className=" grid gap-y-3">
                  <div className="mt-3 grid grid-cols-3 gap-4">
                    <div className="col-span-2 h-2 rounded bg-grayDA"></div>
                    <div className="col-span-1 h-2 rounded bg-grayDA"></div>
                  </div>
                  <div className="col-span-1 h-2 rounded bg-grayDA"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {SkeletonType === 'line' && (
        <div className={className}>
          {numbers?.map((item, key) => (
            <div className="flex w-full gap-x-3" key={key}>
              <div className=" h-3 w-4 rounded bg-grayDA "></div>
              <div className=" h-3 w-full rounded bg-grayDA"></div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
