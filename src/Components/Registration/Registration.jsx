import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, signOut, TwitterAuthProvider } from "firebase/auth";
import app from './../../firebase_config';
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserCheckerContext } from "../../App";
import { NavLink } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const Registration = () => {
   const { user, setUser } = useContext(UserCheckerContext);
   const [showPassword, setShowPassword] = useState()
   const auth = getAuth(app)
   const handleSubmit = (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const tarms = e.target.tarms.checked;
   }
   //signUp with google 
   const SignUpWithGoogle = () => {
      const GoogleProvider = new GoogleAuthProvider();
      signInWithPopup(auth, GoogleProvider)
         .then((result) => {
            setUser(result.user)
            toast.success("SignUp with Google successfull")
         })
         .catch(err => toast.error("Login Faild! Please try again"))
   }
   //SignUp with twitter
   const SignUpWithTwitter = () => {
      const TwitterProvider = new TwitterAuthProvider();
      signInWithPopup(auth, TwitterProvider)
         .then((result) => {
            setUser(result.user)
            toast.success("SignUp with Twitter successfull")
         })
         .catch(err => toast.error("Sign Up Faild! Please try again"))
   }
   //signUp with facebook 
   const SignUpWithFacebook = () => {
      const FacebookProvider = new FacebookAuthProvider();
      signInWithPopup(auth, FacebookProvider)
         .then(result => toast.success("Sign Up with facebook successfull"))
         .catch(err => toast.error("Sign Up Faild! Please try again"))
   }
   //handle Signout
   const handleSignOut = () => {
      signOut(auth)
         .then(() => {
            setUser(null)
            toast.success("Sign Out Successfull")
         })
         .catch(err => toast.error("Sign Out Faild! Please try again"))
   }
   return (
      <div className=" bg-violet-900 rounded-lg w-full sm:w-1/2 md:w-1/3 mt-5 mx-auto">
         <form className="card-body" onSubmit={handleSubmit}>
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
               </div>               <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password? </a>
               </label>
            </div>
            <div className='flex'>
               <input type="checkbox" name='terms' id='terms' />
               <label className='ms-1 sm:text-sm ' htmlFor="terms">Accept our <a href="#">Terms and conditions</a></label>
            </div>
            <div className="form-control mt-3">
               {user ? <button onClick={handleSignOut} className="btn btn-primary">Sign Out</button> :
                  <button className="btn btn-primary">Sign Up</button>}
            </div>
            {/* or divider  */}
            <div class="flex items-center">
               <div class="border-t flex-grow border-gray-300"></div>
               <span class="mx-4 text-sm text-white">OR</span>
               <div class="border-t flex-grow border-gray-300"></div>
            </div>
            <div className="p-2 flex justify-center">
               <button className=" shadow-sm px-8 md:text-lg py-2 rounded-full mx-4 bg-violet-800 text-white" onClick={SignUpWithGoogle}><FaGoogle /></button>
               <button className=" shadow-sm px-8 md:text-lg py-2 rounded-full mx-4 bg-violet-800 text-white" onClick={SignUpWithTwitter} ><FaTwitter /></button>
               <button className=" shadow-sm px-8 md:text-lg py-2 rounded-full mx-4 bg-violet-800 text-white" onClick={SignUpWithFacebook} ><FaFacebook /></button>
            </div>
            <p className="text-md">Already have an Account? <NavLink to={'/login'} className="text-blue-200 ms-1">Sign In</NavLink> </p>
            <Toaster position="top-right" reverseOrder={true} />
         </form>
      </div>
   );
};

export default Registration;