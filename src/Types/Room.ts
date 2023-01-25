import { Message } from "./Message";
import { Report } from "./Report";
import { User } from "./User";

export class Room{
    name: string;
    bannedUsers: Array<User>;
    users: Array<User>;
    moderators: Array<User>;
    creator: User;
    log: Array<Message>;
    reports: Array<Report>;

    constructor(
        name: string,
        bannedUsers: Array<User>,
        users: Array<User>,
        moderators: Array<User>,
        creator: User,
        log: Array<Message>,
        reports: Array<Report>
    ){
        this.name = name,
        this.bannedUsers = bannedUsers
        this.users = users
        this.moderators = moderators
        this.creator = creator
        this.log = log
        this.reports = reports
    }
}