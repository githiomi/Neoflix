import { SEX } from "./Sex";

export default interface User {
   profile_image_url: string;
   first_name: string;
   last_name: string;
   username: string;
   gender: SEX
   email_address: string;
   password: string;
}