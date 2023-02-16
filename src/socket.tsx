import { io } from "socket.io-client";
import { API_BASE_URL } from "./consts";

// const URL = "http://localhost:3000";
const socket = io(API_BASE_URL, {autoConnect: false});

export default socket;