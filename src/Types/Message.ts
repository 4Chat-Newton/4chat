import { Certificate } from "crypto";
import { User } from "./User";

export class Message {
    roomId: number;
    message: string;
    timeStamp: Date;
    creator: User;
    editedMessage: Array<string>;
    deleted: boolean;

    constructor(
        roomId: number,
        message: string,
        timeStamp: Date,
        creator: User,
        editedMessage: Array<string>,
        deleted: boolean
    ) {
        this.roomId = roomId;
        this.message = message;
        this.timeStamp = timeStamp;
        this.creator = creator;
        this.editedMessage = editedMessage;
        this.deleted = deleted;
    }
}
