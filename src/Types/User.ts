import { any, number, string } from "prop-types";
import { Report } from "./Report";
import { Room } from "./Room";

 export class User {
     private username: string;
     private password: number;
     private email: string;
     private friends: Array<User>;
     private createdRooms: Array<Room>;
     private  moderatedRooms: Array<Room>;
     private reports: Array<Report>;
     private blockedUsers: Array<User>;    
     constructor(
         username: string, 
         password: number, 
         email: string, 
         friends: Array<User>, 
         createdRooms: Array<Room>, 
         moderatedRooms: Array<Room>, 
         reports: Array<Report>,
         blockedUsers: Array<User>
         ){
         this.username = username;
         this.password= password;
         this.email= email;
         this.friends = friends;
         this.createdRooms = createdRooms;
         this.moderatedRooms = moderatedRooms;
         this.reports= reports;
         this.blockedUsers= blockedUsers;
     }


 }