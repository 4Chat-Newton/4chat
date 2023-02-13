import { Certificate } from "crypto";
import { User } from "./User";

export class Message {
    private _roomId: number;
    private _message: string;
    private _timeStamp: Date;
    private _creator: User;
    private _editedMessage: Array<string>;
    private _deleted: boolean;

    constructor(
        roomId: number,
        message: string,
        timeStamp: Date,
        creator: User,
        editedMessage: Array<string>,
        deleted: boolean
    ) {
        this._roomId = roomId;
        this._message = message;
        this._timeStamp = timeStamp;
        this._creator = creator;
        this._editedMessage = editedMessage;
        this._deleted = deleted;
    }

    // -------------- Accessors -------------

    public get roomId(): number {
        return this._roomId;
    }
    public set roomId(value: number) {
        this._roomId = value;
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
    public get editedMessage(): Array<string> {
        return this._editedMessage;
    }
    public set editedMessage(value: Array<string>) {
        this._editedMessage = value;
    }
    public get deleted(): boolean {
        return this._deleted;
    }
    public set deleted(value: boolean) {
        this._deleted = value;
    }
}
