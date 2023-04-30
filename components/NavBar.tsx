import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex items-center justify-between py-6'>
        <Link href = {'/'}>
            <div className='flex items-center cursor-pointer'>
                <Image src = "/logo.png" height={35} width={40} alt ="" />
                <span className='font-bold ml-2 text-primary'>
                    Coder&rsquo;s blog
                </span>
            </div>
        </Link>

        <ul className='flex items-center'>
            <li className='mr-6 font-medium text-gray-600'>
                <a href="https://my-store-da4c5e.creator-spring.com/listing/death-star-2023?fbclid=IwAR0W66rE1qtEnc3_bKCtzYNYR-jVWDga3ANlJkMhh04q4lsHi94K0zjyYBM">Products</a>    
            </li>
            <li className='mr-6 font-medium text-gray-600'>
                <a href="#">Pricing</a>    
            </li>
            <li className='mr-6 font-medium text-gray-600'>
                <a href="#">Docs</a>    
            </li>
            <li className='mr-6 font-medium text-gray-600'>
                <a href="#">Company</a>    
            </li>
        </ul>

        <ul className='flex items-center'>
            <li className=' font-medium text-gray-600'>
                <a href="#" className='hover:text-gray-400 py-2 px-4'>Log In</a>
            </li>
            <li className='mr-6 font-medium text-gray-600'>
                <a href="#" className='bg-primary py-2 px-4 rounded-sm text-white hover:bg-primary-dark transition-all'>Sign Up</a>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar