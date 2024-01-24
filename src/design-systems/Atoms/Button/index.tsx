import { ButtonProps } from './interface'

export const Button = ({ text, className, onClick, hover, outlineBorder, disabled }: ButtonProps) => {
  return (
    <button
      className={`${className} bg-black from-oragneFE to-orangeFF  p-2 font-semibold text-white  duration-500 ease-in-out hover:transform active:translate-y-1  active:scale-95 active:duration-300 dark:bg-white dark:text-black ${
        hover && 'hover:bg-gradient-to-r hover:text-black'
      } ${outlineBorder && '!border-2 !border-black !bg-white font-black !text-black dark:!border-white'}
      ${disabled && 'opacity-40 hover:bg-none hover:text-white '}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
