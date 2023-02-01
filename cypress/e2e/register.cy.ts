// @ts-ignore
import * as cypress from "cypress";
import {expect} from "chai";

describe('Testing user functionality', () => {

    it('Registering a new user', () => {

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

        cy.wait(2000)
        cy.get('#cancel_btn').click()
    }) // end of test

    it('Login a user', () => {

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
            cy.wait(2000)

    })

    it('Delete a user', () => {
        // TODO add intercept or something else after the initial create user have been created
        cy.wait(2000)
        cy.request('DELETE', 'http://localhost:8080/data/register/Test_User').then((response)=> {
            expect(response.status).to.eq(200)
        } )
    })

})

// describe('Testing 2', () => {
//
//     it('Login a user', () => {
//
//         cy.visit('http://localhost:3000/login')
//         cy.intercept("POST", "/data/login", (req) => {
//             req.continue((res) => {
//                 expect(res.statusCode).to.eq(200)
//                 //expect(res.body.loggedIn).to.have.eq(true)
//             })
//         })
//
//         cy.wait(2000)
//
//         cy.get('#email').click().type("Test_User@gmail.com")
//         cy.get('#password').click().type("12345")
//         cy.get('#login_btn').click()
//
//
//     })
// })
//
// describe('Testing 3', () => {
//
//     it('Delete a user', () => {
//         // TODO add intercept or something else after the initial create user have been created
//         cy.wait(2000)
//         cy.request('DELETE', 'http://localhost:8080/data/register/Test_User').then((response) => {
//             expect(response.status).to.eq(200)
//         })
//     })
//
// })