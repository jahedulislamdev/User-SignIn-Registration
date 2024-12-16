import { useContext, useRef, useState } from "react";
import { UserCheckerContext } from "../../App";
import { NavLink } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../../firebase_config";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
   const auth = getAuth(app); // Firebase Auth
   const { user, setUser, signInUser } = useContext(UserCheckerContext);
   const [showPassword, setShowPassword] = useState(false);

   const handleSignIn = (e) => {
      e.preventDefault();

      // Clear any existing errors
      toast.dismiss();

      // Retrieve form inputs
      const email = e.target.email.value;
      const password = e.target.password.value;

      signInUser(auth, email, password)
         .then((res) => {
            if (res.user.emailVerified) {
               toast.success("Login successful!");
               setUser(res.user);

               // Clear form fields
               e.target.reset();
            } else {
               toast.error("Please verify your email.");
            }
         })
         .catch((error) => {
            toast.error(error.message);
         });
   };
   // sign out user
   const handleSignOut = () => {
      signOut(auth)
         .then(() => {
            toast.success("Signed out successfully!");
            setUser(null);
         })
         .catch(() => toast.error("Failed to sign out. Please try again."));
   };
   // reset passwrod with autherized email
   const EmailRef = useRef()
   const handleForgateEmail = () => {
      console.log("btn clicked")
      const ValidEmail = EmailRef.current.value;
      if (!ValidEmail) {
         toast.error("Please provide an email.");
         return;
      }
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(ValidEmail)) {
         toast.error("Invalid email format.");
         return;
      }

      sendPasswordResetEmail(auth, ValidEmail)
         .then(() => toast.success("Verification email sent. Check your inbox."))
         .catch((err) => toast.error(err.message));
   };
   return (
      <div className="bg-violet-900 rounded-lg w-full sm:w-1/2 lg:w-1/3 mt-5 mx-auto">
         <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Email</span>
               </label>
               <input ref={EmailRef} name="email" type="email" placeholder="Your Email" className="input input-bordered" required />
            </div>
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Password</span>
               </label>
               <div className="join">
                  <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" className="w-full join-item input input-bordered" required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="join-item px-2 text-lg bg-base-100"
                  >
                     {showPassword ? <IoEye /> : <IoMdEyeOff />}
                  </button>
               </div>
               <a role="button" onClick={handleForgateEmail} className="text-right text-sm">Forget passwrod</a>
            </div>
            <div className="form-control mt-6">
               {user ? (
                  <button type="button" onClick={handleSignOut} className="btn btn-primary">
                     Sign Out
                  </button>
               ) : (
                  <button type="submit" className="btn btn-primary">
                     Sign In
                  </button>
               )}
            </div>
            <p className="text-md">
               Don't have an Account? <NavLink to="/registration" className="text-blue-200 ms-1">Sign Up</NavLink>
            </p>
         </form>
         <Toaster position="top-right" reverseOrder={true} />
      </div>
   );
};


export default Login;
