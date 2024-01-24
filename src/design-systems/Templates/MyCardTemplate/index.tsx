'use client'
import { GetCartDataRes } from 'api-services/interfaces/cart'
import { Button } from 'design-systems/Atoms/Button'
import { AddCard } from 'design-systems/Molecules/AddCard'
import { useGetCart } from 'hooks/apis/useGetCart'
import { useRouter } from 'next/navigation'

const MyCardTemplate: React.FC = () => {
  const storedEmail = typeof window !== 'undefined' ? window.localStorage?.getItem('Email') : null
  const email = storedEmail !== null ? storedEmail : ''
  const router = useRouter()
  const { isLoadingAllCart, cart } = useGetCart(email)
  return (
    <div className="container">
      <strong className="mt-10 text-[36px]"> Cart ({cart ? cart.length : 0}) </strong>
      {cart && cart?.length > 0 ? (
        <div className="mt-10">
          <AddCard isLoading={isLoadingAllCart} data={cart as GetCartDataRes[]} />
        </div>
      ) : (
        <>
          <div className="mt-[50px] flex items-center justify-center text-[36px]">Data Not Found</div>
          <div className="flex items-center justify-center">
            {' '}
            <Button
              className={'mt-5 w-[175px]'}
              hover={true}
              outlineBorder={false}
              text={'Add To Cart'}
              onClick={() => router.push('/store')}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default MyCardTemplate
