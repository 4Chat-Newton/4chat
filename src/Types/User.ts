import { any, number, string } from "prop-types";
import { Report } from "./Report";
import { Room } from "./Room";

export class User {
    private _username: string;
    private _password: number;

    private _email: string;

    private _friends: Array<User>;

    private _createdRooms: Array<Room>;

    private _moderatedRooms: Array<Room>;

    private _reports: Array<Report>;
    private _blockedUsers: Array<User>;

    constructor(
        username: string,
        password: number,
        email: string,
        friends: Array<User>,
        createdRooms: Array<Room>,
        moderatedRooms: Array<Room>,
        reports: Array<Report>,
        blockedUsers: Array<User>
    ) {
        this._username = username;
        this._password = password;
        this._email = email;
        this._friends = friends;
        this._createdRooms = createdRooms;
        this._moderatedRooms = moderatedRooms;
        this._reports = reports;
        this._blockedUsers = blockedUsers;
    }
    //------------ Methods ---------------

    // AddFriend:void = (friendId:number)=>{
    //     //? DB logik
    //     let friend:User = findUser(friendId)
    //     this._friends.push(friend)
    // }
    // FindUser:User = (userId:number)=>{
    //     return User where id matches the number
    // }
    // CreateRoom:void = new Room(
    //     //här ska det komma userinput
    // );

    //------------ Accessors -------------

    public get username(): string {
        return this.username;
    }
    public set username(value: string) {
        this.username = value;
    }

    public get password(): number {
        return this._password;
    }
    public set password(value: number) {
        this._password = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get friends(): Array<User> {
        return this._friends;
    }
    public set friends(value: Array<User>) {
        this._friends = value;
    }

    public get createdRooms(): Array<Room> {
        return this._createdRooms;
    }
    public set createdRooms(value: Array<Room>) {
        this._createdRooms = value;
    }

    public get moderatedRooms(): Array<Room> {
        return this._moderatedRooms;
    }
    public set moderatedRooms(value: Array<Room>) {
        this._moderatedRooms = value;
    }

    public get reports(): Array<Report> {
        return this._reports;
    }
    public set reports(value: Array<Report>) {
        this._reports = value;
    }

    public get blockedUsers(): Array<User> {
        return this._blockedUsers;
    }
    public set blockedUsers(value: Array<User>) {
        this._blockedUsers = value;
    }
}
