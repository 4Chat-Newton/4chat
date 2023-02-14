// @ts-ignore
import * as cypress from "cypress";
import {expect} from "chai";
describe('Testing user functionality', () => {

    it('Registering a new user', () => {
        cy.wait(1000)
        cy.visit('http://localhost:3000/register')
        cy.intercept("POST", "/data/register", (req) => {
            req.continue((res) => {
                expect(res.statusCode).to.eq(200)
                expect(res.body.message).to.have.eq("New user registered!")
            })
        })

        cy.get('#username').click().type("Test_User")
        cy.get('#email').click().type("Test_User@gmail.com")
        cy.get('#password').click().type("12345")
        cy.get('#confirmPassword').click().type("12345")
        cy.get('#terms').click()
        cy.get('#submit_btn').click()

        // cy.wait(2000)
        // cy.get('#cancel_btn').click()
    }) // end of test

    it('Login a user', () => {
        cy.wait(1000)
        cy.visit('http://localhost:3000/login')
        cy.intercept("POST", "/data/login", (req)=>{
            req.continue((res)=>{
                expect(res.statusCode).to.eq(200)
                expect(res.body.loggedIn).to.have.eq(true)
            })
        })
            cy.get('#email').click().type("Test_User@gmail.com")
            cy.get('#password').click().type("12345")

            cy.get('#login_btn').click()
            // cy.wait(2000)
    })

    it('Sign out a user', () => {
        cy.wait(1000)
        cy.visit('http://localhost:3000/chatroom')
        cy.intercept("DELETE", "/data/login", (req)=>{
            req.continue((res)=>{
                expect(res.statusCode).to.eq(200)
                expect(res.body.loggedIn).to.have.eq(false)
            })
        })
        cy.get('#signOut-btn').click()

    })

    it('Delete a user', () => {
        // TODO add intercept or something else after the initial create user have been created
        cy.wait(2000)
        cy.request('DELETE', 'http://localhost:8080/data/register/Test_User').then((response)=> {
            expect(response.status).to.eq(200)
        } )
    })

})

export const deleteUser = async function (server, db){
    server.delete("/data/setting/user", verifyJWT, async (req: express.Request, res: express.Response) => {
        const {id, username,email, password} = req.body;
        let user = returnUser(req, res)
        await findUser(email, db)

        if (user.isLoggedIn) {
            return res.status(200).send(`User '${req.body.name}' doesn't exist!`)
        } else {
            try {
                await db.prepare("DELETE FROM room WHERE name = ?").run(req.body.name);
                return res.status(200).send(`Room '${req.body.name}' has been deleted!`)
            } catch(e) {
                return res.status(400).send(`Failed to delete room '${req.body.name}'!`)
            }
        }
    })
}



