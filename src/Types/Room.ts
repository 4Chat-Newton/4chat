import { Message } from "./Message";
import { Report } from "./Report";
import { User } from "./User";

export class Room{
    private _name: string;
    
    private _bannedUsers?: Array<User>;
    
    private _users: Array<User>;


    private _moderators?: Array<User>;
    
    private _creator: User;
    
    private _log?: Array<Message>;

    private _reports?: Array<Report>;

    constructor(
        name: string,
        users: Array<User>,
        creator: User,
    ){
        this._name = name,
        this._users = users
        this._creator = creator
    }



    //------------ Accessors -------------

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public set bannedUsers(value: Array<User>) {
        this._bannedUsers = value;
    }
    public get users(): Array<User> {
        return this._users;
    }
    public set users(value: Array<User>) {
        this._users = value;
    }

    public set moderators(value: Array<User>) {
        this._moderators = value;
    }
    public get creator(): User {
        return this._creator;
    }
    public set creator(value: User) {
        this._creator = value;
    }

    public set log(value: Array<Message>) {
        this._log = value;
    }

    public set reports(value: Array<Report>) {
        this._reports = value;
    }
    //TODO Implement to constructor when they will be used!

    // public get moderators(): Array<User> {
    //     return this._moderators;
    // }
    //
    // public get bannedUsers(): Array<User> {
    //     return this._bannedUsers;
    // }
    //
    // public get log(): Array<Message> {
    //     return this._log;
    // }
    //
    // public get reports(): Array<Report> {
    //     return this._reports;
    // }
}