import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function SpecificBrand() {
const [specific, setspecific] = useState(null)
  let {id} = useParams();

  function getDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setspecific(res.data.data)
      })
      .catch((res) => {
        console.log("error");
      });
  }


    useEffect(() => {
      getDetails()
      return () => {
        
      }
    }, [])
    
  return (
    <>
    <div className='flex flex-col items-center justify-center'>
        <img src={specific?.image} alt={specific?.slug} className='w-1/4' />
        <h4 className='font-bold font-mono border-y-4 w-auto mt-4 text-center border-slate-400'>{specific?.name}</h4>
    </div>
    </>
  )
}
