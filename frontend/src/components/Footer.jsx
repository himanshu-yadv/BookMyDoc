import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

      <div>
  <img className='mb-5 w-40' src={assets.logo} alt="" />
  <p className='w-full md:w-2/3 text-gray-600 leading-6'>
    BookMyDoc helps you book appointments with trusted doctors quickly and easily. Access quality healthcare, manage your visits, and stay on top of your health—all in one place.
  </p>
</div>


        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 8840488260</li>
            <li>himanshu_yadav.1306@outlook.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ BookMyDoc.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
