import { any, number, string } from "prop-types";

export class User {
    private username: string;
    private password: number;
    private email: string;
    private friends: Array<User>;
    private createdRooms: Array<Room>();
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
        this.username = "Hannes";
        this.password= number;
        this.email= string;
        this.friends = friends;
        this.createdRooms = createdRooms();
        this.moderatedRooms = moderatedRooms;
        this.reports= reports;
        this.blockedUsers= blockedUsers;
    }
}