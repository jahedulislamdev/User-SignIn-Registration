import React from 'react';
import { useNavigate } from 'react-router-dom';
const Terms = () => {
   const conditions = <ul className='list-disc'>
      <li className='py-3'>Withdraw and cancel services, and make financial transactions.</li>
      <li className='py-3'>Manage customer expectations, such as liability for information errors or website downtime.</li>
      <li className='py-3'> Disable user accounts.</li>
      <li className='py-3'>Explain your copyright rules, such as attribution, adaptation, commercial or non-commercial use, etc.</li>
      <li className='py-3'>Set rules for user behavior, like forbidding unlawful behavior, hate speech, bullying, promotions, spam, etc.</li>
      <li className='py-3'> Write down any other terms or conditions that protect you or your audience.</li>
   </ul>
   const navigate = useNavigate()
   return (
      <>
         <button onClick={() => navigate(-1)} className='mt-10 ms-10 flex btn bg-stone-800'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg> Go Back
         </button>
         <div className='lg:w-1/2 mx-auto'>
            <p className='text-center text-2xl mb-4'>Terms and Conditions</p>
            <div className='border-red-500 border p-7 rounded'>
               {conditions}
            </div>
         </div>
      </>
   );
};

export default Terms;