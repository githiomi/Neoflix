import { SEX } from "../data/Sex";
import User from "../data/User";
import { FormEvent, useEffect, useRef, useState } from "react";

interface ProfileProps {
   user: User
}
const Profile = ({ user }: ProfileProps) => {

   const genders = Object.keys(SEX);
   const [firstName, setFirstname] = useState(user.first_name);
   const [lastName, setLastName] = useState(user.last_name);
   const [username, setUsername] = useState(user.username);
   const gender = useRef<HTMLSelectElement>();
   const emailAddress = useRef<HTMLInputElement>();
   const password = useRef<HTMLInputElement>();

   useEffect(() => {

      // Check length
      if (firstName.length < 3 || lastName.length < 3) {
         setUsername(("Not Enough Characters").toUpperCase());
         return;
      }

      const newUsername = firstName.substring(0, 3).toUpperCase() + lastName.substring(0, 3).toUpperCase();
      setUsername(newUsername)

   }, [firstName, lastName]);

   const submitForm = (e: FormEvent<HTMLFormElement>) => {

      e.preventDefault();

      const newUser: User = {
         profile_image_url: user.profile_image_url,
         first_name: firstName,
         last_name: lastName,
         username,
         gender: gender.current?.value as SEX,
         email_address: emailAddress.current?.value as string,
         password: password.current?.value as string
      }

      console.log("User", newUser);

      alert("Form submitted successfully")

   }

   return (
      <section id="profile" className="min-h-[80vh] mt-8 flex flex-col">

         <p className="text-3xl text-white uppercase font-bold text-center">View <span className="text-gradient">Profile</span> Details</p>

         <section className="profile-details flex flex-row items-center justify-center gap-8 p-10 grow">

            <div className="w-[30%] flex justify-center">
               <div className="profile-picture">
                  <div className="overlay"></div>
                  <img src={user.profile_image_url} alt="Profile picture" />
               </div>
            </div>

            <div className="grow">

               <form className="profile-form" onSubmit={submitForm}>

                  <div className="flex flex-row justify-start gap-10">

                     <div className="first-name flex-1 flex flex-col">
                        <label htmlFor="first_name">First Name:</label>
                        <input type="text" id="first_name" name="first_name" required placeholder="Enter First Name..." value={firstName} onChange={(e) => setFirstname(e.target.value)} />
                     </div>

                     <div className="last-name flex-1 flex flex-col">
                        <label htmlFor="last_name">Last Name:</label>
                        <input type="text" id="last_name" name="flast_name" required placeholder="Enter Last Name..." value={lastName} onChange={(e) => setLastName(e.target.value)} />
                     </div>

                  </div>

                  <div className="flex flex-row justify-start gap-10">

                     <div className="username flex-1 flex flex-col">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" placeholder="Username will appear here" disabled value={username} />
                     </div>

                     <div className="gender flex-1 flex flex-col">
                        <label htmlFor="gender">Gender:</label>
                        <select ref={gender} value={user.gender}>
                           {
                              genders.map((gender, index) => (
                                 <option key={index} value={gender}>{gender}</option>
                              ))
                           }
                        </select>
                     </div>

                  </div>

                  <div className="flex flex-row justify-start gap-10">

                     <div className="email-address flex-1 flex flex-col">
                        <label htmlFor="email_address">Email Address:</label>
                        <input type="email" id="email_address" name="email_address" required placeholder="Enter Email Address..." value={user.email_address} ref={emailAddress} />
                     </div>

                     <div className="password flex-1 flex flex-col">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required placeholder="Enter Password..." value={user.password} ref={password} />
                     </div>

                  </div>

                  <div>
                     <button type="submit" className="submit-btn" value="submit">{user ? 'Update' : 'Submit'}</button>
                  </div>

               </form>

            </div>

         </section>

      </section>
   )

}

export default Profile