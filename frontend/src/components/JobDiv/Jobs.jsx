import React from 'react'
import { BiTimeFive } from "react-icons/bi";


const Data = [
  {
    id: 1,
    title: 'Web Developer',
    time: 'Now',
    location: 'Canada',
    desc: "Looking for a talented web developer to join our remote team. Build user-centric experiences and collaborate with a fun and supportive team.",
    company: 'Business Sols Co.',
  },
  {
    id: 1,
  
    title: 'Web Developer',
    time: 'Now',
    location: 'Canada',
    desc: "Looking for a talented web developer to join our remote team. Build user-centric experiences and collaborate with a fun and supportive team.",
    company: 'Business Sols Co.',
  },
  {
    id: 1,
  
    title: 'Web Developer',
    time: 'Now',
    location: 'Canada',
    desc: "Looking for a talented web developer to join our remote team. Build user-centric experiences and collaborate with a fun and supportive team.",
    company: 'Business Sols Co.',
  },
  {
    id: 1,
  
    title: 'Web Developer',
    time: 'Now',
    location: 'Canada',
    desc: "Looking for a talented web developer to join our remote team. Build user-centric experiences and collaborate with a fun and supportive team.",
    company: 'Business Sols Co.',
  },
  {
    id: 1,
  
    title: 'Web Developer',
    time: 'Now',
    location: 'Canada',
    desc: "Looking for a talented web developer to join our remote team. Build user-centric experiences and collaborate with a fun and supportive team.",
    company: 'Business Sols Co.',
  },
  {
    id: 1,
  
    title: 'Web Developer',
    time: 'Now',
    location: 'Canada',
    desc: "Looking for a talented web developer to join our remote team. Build user-centric experiences and collaborate with a fun and supportive team.",
    company: 'Business Sols Co.',
  },
  {
    id: 1,
  
    title: 'Web Developer',
    time: 'Now',
    location: 'Canada',
    desc: "Looking for a talented web developer to join our remote team. Build user-centric experiences and collaborate with a fun and supportive team.",
    company: 'Business Sols Co.',
  },
  {
    id: 1,
  
    title: 'Web Developer',
    time: 'Now',
    location: 'Canada',
    desc: "Looking for a talented web developer to join our remote team. Build user-centric experiences and collaborate with a fun and supportive team.",
    company: 'Business Sols Co.',
  }
  
];

const Jobs = () => {
  return (
    <div>
      <div className="jobcontainer flex gap-10 justify-center flex-wrap items-center py-10">
        {Data.map(({ id,title, time, location, desc, company }) => (
          <div key={id} className="group group/item singleJob w-[250px] p-[20px] bg-white rounded [10px] hover:bg-blue-700 shadow-lg shadow-greyIsh-400/700 hover:shadow-lg">
            <span className='flex justify-between items-center gap-4' style={{ alignItems: 'center' }}>
              <h1 className='text-[16px] font-semibold text-textColor group-hover:text-white'>{title}</h1>
              
                <span className='flex items-center'> {/* Modified line */}
  <BiTimeFive /> {/* Time icon */}
  <span className='text-[13px] font-semibold ml-2'>{time}</span> {/* Added "Now" text */}


              </span>
            </span>
            <h6 className='text-[#ccc]'>{location}</h6>
            <p className='text-[13px] text-[#95959] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white'> {desc}</p>
            <div className='company flex items-center gap-2'>
              <img src="https://www.designhill.com/resize_img.php?atyp=page_file&pth=ft_ca_ct||117||contestfile_1&flp=1554116576-13511971185ca1efe0bcd5a0-26602492.jpg" alt="logo" className='w-[20%]' />
              <span className='text-[14px] py-[1rem] block group-hover:text-white'>{company}</span>
            </div>
            <button className='border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold text-textColor hover:bg-white group-hover/item:text-textColor group-hover:text-white'>Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
