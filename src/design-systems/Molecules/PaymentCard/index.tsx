import { PaymentCardProps } from './interface'

export const PaymentCard = ({ text, number }: PaymentCardProps) => {
  return (
    <div className="mt-9 border-[1px] border-grayE1 p-5 pb-3 pt-3">
      <div className="text-[16px] text-black5">{text}</div>
      <div className="flex justify-between">
        <strong className="text-[28px]">{number}</strong>
        <div className="flex items-center justify-between">
          <select className="bg-[#ffffff00]" id="cars" name="cars">
            <option value="Popular">INR</option>
            <option value="saab">USD</option>
            <option value="opel">USR</option>
          </select>
        </div>
      </div>
    </div>
  )
}
