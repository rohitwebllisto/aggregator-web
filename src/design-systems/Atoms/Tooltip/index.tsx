import React from 'react'

interface TooltipProps {
  text?: string
  children: React.ReactNode
  array?: any[]
}

const Tooltip = ({ text, children, array }: TooltipProps) => {
  return (
    <div className="group relative">
      {children}
      {text && (
        <div className="bg-gray-800 pointer-events-none absolute z-10 mt-2  w-full rounded-sm border-[1px] border-black bg-white bg-gradient-to-r from-[#FEB331] to-[#FF8548] p-2 text-sm text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {text}
        </div>
      )}
      {array && array.length > 0 && (
        <div className="bg-gray-800 pointer-events-none absolute z-10 mt-2 w-full rounded-sm border-[1px] border-black  bg-gradient-to-r from-[#FEB331] to-[#FF8548] p-2 text-sm text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {array.map((item: any, key: number) => (
            <div key={key}>{item.categoryName}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tooltip
