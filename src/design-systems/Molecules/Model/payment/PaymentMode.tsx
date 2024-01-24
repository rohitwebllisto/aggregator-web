import { CancelIcon, CancelIconDark, GrapPayIcon, IMPSIcons, PaycardIcon, UPIcon } from 'design-systems/Atoms/Icons'

interface PaymentProps {
  theme: string | undefined
  pay: boolean
  setPay: (value: boolean) => void
}

export const PaymentMode: React.FC<PaymentProps> = ({ setPay, pay, theme }) => {
  const paymentModeData = [
    { key: 0, name: 'Credit Card', icon: <PaycardIcon /> },
    { key: 1, name: 'UPI', icon: <UPIcon /> },
    { key: 2, name: 'IMPS', icon: <IMPSIcons /> },
    { key: 3, name: 'GrabPay', icon: <GrapPayIcon /> },
  ]

  return (
    <div
      className="absolute bottom-0 left-0 w-full bg-white p-9 text-black transition duration-500 ease-in-out
      "
      style={{ boxShadow: '0px 14px 84px 30px rgba(0, 0, 0, 0.08)' }}
    >
      <div className="flex w-full justify-between">
        <div></div>
        <strong className="text-[18px]">Choose Payment Mode</strong>
        <div className="flex justify-end">
          <div className="flex cursor-pointer  items-center" onClick={() => setPay(false)}>
            {theme === 'dark' ? <CancelIconDark /> : <CancelIcon />}
          </div>
        </div>
      </div>
      <div className=" mt-14 grid gap-y-9">
        {paymentModeData.map((item, key) => {
          return (
            <div className="flex cursor-pointer gap-x-4 text-[16px]" key={key}>
              <div>{item.icon}</div>
              <div>{item.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
