import { Typography } from '../Typography'

import { InputLabelProps } from './interface'

export const InputLabel = ({ label, className, onChange, inputType, value }: InputLabelProps) => {
  return (
    <div className="grid gap-y-3">
      {label && <Typography className="text-[18px] font-semibold">{label}</Typography>}
      {inputType !== 'textarea' ? (
        <input className={`${className} w-full bg-blackE3 p-4 `} type={inputType} value={value} onChange={onChange} />
      ) : (
        <textarea className={`${className} w-full bg-blackE3 p-4 `} value={value} onChange={onChange} />
      )}
    </div>
  )
}
