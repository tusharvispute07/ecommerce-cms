
import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'

export default function Home(){
  const {data: session} = useSession()

  
  return <Layout>
      <div className='text-blue-900 flex justify-between'>
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className='flex bg-gray-300 g-1 text-black rounded-lg overflow-hidden'>
          <img src={session?.user?.image} className='w-6 h-6' alt="" />
          <span className='px-2'>
          {session?.user?.name}
          </span>
        </div>
      </div>

      <div>
        <h1 className='mt-8'>Orders</h1>
        <div className='flex flex-row max-w-3xl justify-between '>
          <div className='flex flex-col text-center px-10 py-5 bg-gray-50 rounded-md shadow-md'>
            <p className='font-bold text-gray-500 mb-1'>TODAY</p>
            <p className='font-bold text-3xl text-blue-900'>3</p>
            <p className='text-gray-500 text-sm'>3 orders today</p>
          </div>

          <div className='flex flex-col text-center px-10 py-5 bg-gray-50 rounded-md shadow-md'>
            <p className='font-bold text-gray-500 mb-1'>THIS WEEK</p>
            <p className='font-bold text-3xl text-blue-900'>10</p>
            <p className='text-gray-500 text-sm'>12 orders this week</p>
          </div>

          <div className='flex flex-col text-center px-10 py-5 bg-gray-50 rounded-md shadow-md'>
            <p className='font-bold text-gray-500 mb-1'>THIS MONTH</p>
            <p className='font-bold text-3xl text-blue-900'>28</p>
            <p className='text-gray-500 text-sm'>28 orders this month</p>
          </div>
        </div>
        
      </div>

      <h1 className='mt-8'>Revenue</h1>
        <div className='flex flex-row max-w-3xl justify-between '>
          <div className='flex flex-col text-center px-10 py-5 bg-gray-50 rounded-md shadow-md'>
            <p className='font-bold text-gray-500 mb-1'>TODAY</p>
            <p className='font-bold text-3xl text-blue-900'>₹ 12300</p>
            <p className='text-gray-500 text-sm'>3 orders today</p>
          </div>

          <div className='flex flex-col text-center px-10 py-5 bg-gray-50 rounded-md shadow-md'>
            <p className='font-bold text-gray-500 mb-1'>THIS WEEK</p>
            <p className='font-bold text-3xl text-blue-900'>₹ 35400</p>
            <p className='text-gray-500 text-sm'>12 orders this week</p>
          </div>

          <div className='flex flex-col text-center px-10 py-5 bg-gray-50 rounded-md shadow-md'>
            <p className='font-bold text-gray-500 mb-1'>THIS MONTH</p>
            <p className='font-bold text-3xl text-blue-900'>₹ 84560</p>
            <p className='text-gray-500 text-sm'>28 orders this month</p>
          </div>
        </div>
    </Layout>
  
}

