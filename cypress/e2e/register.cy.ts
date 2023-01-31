// @ts-ignore
import * as cypress from "cypress";

describe('Testing user functionality', () => {
    it('Registering a new user', () => {

        cy.visit('http://localhost:3000/register')

        cy.intercept("POST", "/data/register", (req)=>{
            req.continue((res)=>{
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

        // cy.request('GET', 'http://localhost:8080/data/register/Test_User')
        //     .then((response) => {
        //         //Use the response object to make your assertions
        //         expect(response.status).to.eq(200)
        //         expect(response.body.username).to.have.eq("Test_User")
        //
        //     })

    }) // end of test

    it('Check that user is logged in', () => {

        cy.visit('http://localhost:3000/login')

        cy.intercept("POST", "/data/login", (req)=>{
            req.continue((res)=>{
                expect(res.body.loggedIn).to.have.eq(true)
            })
        })

        cy.get('#email').click().type("Test_User@gmail.com")
        cy.get('#password').click().type("12345")
        cy.get('#login_btn').click()

        // cy.request('POST', 'http://localhost:8080/data/login',
        //     {
        //         email: "Test_User@gmail.com",
        //         password: "12345"
        //     })
        //     .then((response) => {
        //         // Use the response object to make your assertions
        //         expect(response.status).to.eq(200)
        //         expect(response.body.loggedIn).to.have.eq(true)
        //     })
    })

    it('Delete user', () => {
        // TODO add intercept or something else after the initial create user have been created
        // cy.wait(2000)
        cy.request('DELETE', 'http://localhost:8080/data/register/Test_User').then((response)=> {
            expect(response.status).to.eq(200)
            // expect(response.body.username).to.have.eq("Test_User")
        } )
    })

})