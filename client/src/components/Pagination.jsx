import React from 'react'

const Pagination = ({totalPosts,postsPerPage,setcurrentPage}) => {
    let pages=[];

    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i);
    }
  return (
    <div>
        {pages.map((page,index)=>{
            return <button className='w-9 text-white ml-3 bg-primary fill rounded-md focus:border-green-400 border-2 border-solid' key={index} onClick={()=>setcurrentPage(page)}>{page}</button>
        })}
    </div>
  )
}

export default Pagination