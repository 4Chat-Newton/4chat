import express from "express";

// module.exports = function (host, server){
//
//     server.get("/data", async (req: express.Request, res: express.Response) => {
//         res.json([
//             {
//                 route:"/data",
//                 methods: ["GET"],
//                 description:"This route: The API documentation"
//             },
//             {
//                 route:"/data/register",
//                 methods: ["POST","GET","DELETE"],
//                 description:"Login user, get current logged in user, logout"
//             },
//             {
//                 route:"/data/users",
//                 methods: ["GET","POST","PUT"],
//                 description:"Get list of users, create user, add/change user details",
//                 link: host  + "/data/users"
//             },
//             {
//                 route:"/data/users/password",
//                 methods: ["DELETE","PATCH"],
//                 description:"Clear old password, add new password",
//                 link: host  + "/data/users/password"
//             }
//
//         ])
//     })
// }