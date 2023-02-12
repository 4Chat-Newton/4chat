import { User } from "./User";

export class Report {
    private _reportedUserId: number;

    private _message: string;

    private _timeStamp: Date;

    private _creator: User;


    constructor(
        reportedUserId: number,
        message: string,
        timeStamp: Date,
        creator: User
    ) {
        this._reportedUserId = reportedUserId;
        this._message = message;
        this._timeStamp = timeStamp;
        this._creator = creator;
    }


    //------------ Accessors -------------

    public get reportedUserId_1(): number {
        return this._reportedUserId;
    }
    public set reportedUserId_1(value: number) {
        this._reportedUserId = value;
    }
    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }
    public get timeStamp(): Date {
        return this._timeStamp;
    }
    public set timeStamp(value: Date) {
        this._timeStamp = value;
    }
    public get creator(): User {
        return this._creator;
    }
    public set creator(value: User) {
        this._creator = value;
    }
}
