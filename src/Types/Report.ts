import { User } from "./User";

export class Report {
    reportedUserId: number;
    message: string;
    timeStamp: Date;
    creator: User;

    constructor(
        reportedUserId: number,
        message: string,
        timeStamp: Date,
        creator: User
    ) {
        this.reportedUserId = reportedUserId;
        this.message = message;
        this.timeStamp = timeStamp;
        this.creator = creator;
    }
}
