import { useContext, useState } from "react";
import { UserCheckerContext } from "../../App";
import { NavLink } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
   const { user } = useContext(UserCheckerContext);
   const [showPassword, setShowPassword] = useState();
   return (
      <div className=" bg-violet-900 rounded-lg w-full sm:w-1/2 md:w-1/3 mt-5 mx-auto">
         <form className="card-body">
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Email</span>
               </label>
               <input name="email" type="email" placeholder="Your Email" className="input input-bordered" required />
            </div>
            <div className="form-control">

               <label className="label">
                  <span className="label-text">Password</span>
               </label>
               <div className="join">
                  <input name="password" type={showPassword ? "text" : "password"} placeholder="password" className="w-full join-item input input-bordered" required />
                  <button onClick={() => setShowPassword(!showPassword)} className="join-item px-2 text-lg bg-base-100"> {showPassword ? <IoEye /> : <IoMdEyeOff />} </button>
               </div>
               <div className="flex items-center justify-between space-x-4">
                  <div className='flex'>
                     <input type="checkbox" name='terms' id='terms' />
                     <label className='ms-1 sm:text-sm' htmlFor="terms">Remember me</label>
                  </div>
                  <div>
                     <label className="label">
                        <a href="#" className="label-text-alt text-sm link link-hover">Forgot password? </a>
                     </label>
                  </div>
               </div>
            </div>
            <div className="form-control mt-6">
               <button className="btn btn-primary">{user ? "Sign Out" : "Sign In"}</button>
            </div>
            <p className="text-md">Don't have an Account? <NavLink to={'/registration'} className="text-blue-200 ms-1">Sign Up</NavLink> </p>
         </form>
      </div>
   );
};

export default Login;