import { Message } from "./Message";
import { Report } from "./Report";
import { User } from "./User";

export class Room{
    private _name: string;
    
    private _bannedUsers: Array<User>;
    
    private _users: Array<User>;
    

    private _moderators: Array<User>;
    
    private _creator: User;
    
    private _log: Array<Message>;
    
    private _reports: Array<Report>;
    

    constructor(
        name: string,
        bannedUsers: Array<User>,
        users: Array<User>,
        moderators: Array<User>,
        creator: User,
        log: Array<Message>,
        reports: Array<Report>
    ){
        this._name = name,
        this._bannedUsers = bannedUsers
        this._users = users
        this._moderators = moderators
        this._creator = creator
        this._log = log
        this._reports = reports
    }


    //------------ Accessors -------------

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get bannedUsers(): Array<User> {
        return this._bannedUsers;
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
    public get moderators(): Array<User> {
        return this._moderators;
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
    public get log(): Array<Message> {
        return this._log;
    }
    public set log(value: Array<Message>) {
        this._log = value;
    }
    public get reports(): Array<Report> {
        return this._reports;
    }
    public set reports(value: Array<Report>) {
        this._reports = value;
    }
}