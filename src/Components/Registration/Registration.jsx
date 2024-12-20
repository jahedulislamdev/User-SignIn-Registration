import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, signOut, TwitterAuthProvider, updateProfile } from "firebase/auth";
import app from './../../firebase_config';
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserCheckerContext } from "../../App";
import { Link, NavLink } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const Registration = () => {
   const { createUser, setUser } = useContext(UserCheckerContext); // handle the user identification in navigation bar
   const [showPassword, setShowPassword] = useState(); // for hide and show password
   const [Err, setError] = useState(); // for handle the error message
   const auth = getAuth(app) // firebase auth (always need this)
   const handleSubmit = (e) => {
      // enchance the default behaviour
      e.preventDefault();
      // Retrieve form inputs
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const acceptTerms = e.target.terms.checked;

      // password varification with reguler exprassion
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      setError("")
      if (!passwordRegex.test(password)) {
         setError("A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.")
         return;
      } else if (!acceptTerms) {
         setError("Please accept our terms and conditions")
         return;
      } else {
         setError("")
      }
      // Create account or signup with email and password
      createUser(email, password)
         .then(result => {
            // update your profle Accroding to your Data
            updateProfile(result.user, {
               displayName: name,
            })
            sendEmailVerification(result.user)
               .then(() => {
                  alert("please Check your Eamil and verify your account")
                  return;
               })
               .catch(err => console.error(err))
            toast.success("User Created successfully!")
         })
         .catch(err => {
            const errorCode = err.code;
            toast.error(errorCode)
         })
   }
   // Login with google,Facebook and twitter
   //signUp with google 
   const SignUpWithGoogle = () => {
      const GoogleProvider = new GoogleAuthProvider();
      signInWithPopup(auth, GoogleProvider)
         .then((result) => {
            setUser(result.user)
            toast.success("SignUp with Google successfull")
         })
         .catch(() => toast.error("Login Faild! Please try again"))
   }
   //SignUp with twitter
   const SignUpWithTwitter = () => {
      const TwitterProvider = new TwitterAuthProvider();
      signInWithPopup(auth, TwitterProvider)
         .then((result) => {
            setUser(result.user)
            toast.success("SignUp with Twitter successfull")
         })
         .catch(() => toast.error("Sign Up Faild! Please try again"))
   }
   //signUp with facebook 
   const SignUpWithFacebook = () => {
      const FacebookProvider = new FacebookAuthProvider();
      signInWithPopup(auth, FacebookProvider)
         .then(() => toast.success("Sign Up with facebook successfull"))
         .catch(() => toast.error("Sign Up Faild! Please try again"))
   }
   return (
      <div className=" bg-violet-900 rounded-lg w-full md:w-1/2 lg:w-1/3 mt-5 mx-auto">
         <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Name</span>
               </label>
               <input name="name" type="text" placeholder="Your Name" className="input input-bordered" required />
            </div>
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
               <p className="text-xs text-red-600 p-1 transition-all">{Err}</p>
            </div>
            <div className='flex px-2'>
               <input type="checkbox" name='terms' id='terms' />
               <label className='ms-1 sm:text-sm ' htmlFor="terms">Accept our <Link to={'/terms'} className="text-blue-500">Terms and conditions</Link></label>
            </div>
            <div className="form-control mt-3">
               <button className="btn btn-primary">Sign Up</button>
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