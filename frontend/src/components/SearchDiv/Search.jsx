import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";


const Search = () => {
  return (
    <div className='search grid gp-10 bg-greyIsh rounded-[10px] p-[3rem] '>
      <form action="">
        <div className='firstDiv flex justify-between items-center rounded-[8px] gap-10px bg-white p-5 shadow-lg shadow-greyIsh-700'>
          <div className='flex gap-2 items-center'>
            <IoSearchSharp className='text-[25px] icon' />
            <select className='bg-transparent text-blue-500 focus:outline-none w-[100%] rounded-[5px] p-2'>
              <option value="">Search by...</option>
              <option value="jobDescription">Job Description</option>
              
              <option value="location">Location</option>
              <option value="companyName">Company Name</option>
            </select>
           {/* <IoClose className='text-[30px] text-[#545757] hover:text-textColor icon' /> */}
          </div>
           <div className='secdiv flex items-center gap-10 justify-center'>
            <div className='singlesearch flex items-center gap-2'>
              <lable htmlFor="relevance" className='text-[#808070] font-semibold'>Sort by:</lable>
              <select name="" id="relevance" className='bg-white rounded-[3px] px-4 py-1'>
                <option value="">Relevance</option>
                <option value="">Inclusive</option>
                <option value="">starts with</option>
                <option value="">Contains</option>
              </select>
            </div>

            </div>
           <div className='secdiv flex items-center gap-10 justify-center'>
            <div className='singlesearch flex items-center gap-2'>
              <lable htmlFor="type" className='text-[#808070] font-semibold'>Type:</lable>
              <select name="" id="type" className='bg-white rounded-[3px] px-4 py-1'>
                <option value="">FullTime</option>
                <option value="">Remote</option>
                <option value="">Contract</option>
                <option value="">Part-time</option>
              </select>
            </div>
            </div>


           <div className='secdiv flex items-center gap-10 justify-center'>
            <div className='singlesearch flex items-center gap-2'>
              <lable htmlFor="level" className='text-[#808070] font-semibold'>Level:</lable>
              <select name="" id="level" className='bg-white rounded-[3px] px-4 py-1'>
                <option value="">Senior </option>
                <option value="">Beginner</option>
                <option value="">Intermediate</option>
                <option value="">Advanced</option>
              </select>
            </div>
           </div>
           <span className='text-[#a1a1a1]'>Clear</span>
        </div>
      </form>
    </div>
  )
}

export default Search
