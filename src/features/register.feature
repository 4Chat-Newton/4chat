#import {expect, describe, test} from "@jest/globals";
#
#describe("testing register", () => {
#    test("first test", async () => {
#
#        await fetch('http://localhost:8080/data/register', {
#            method: 'POST',
#            headers: {'Content-Type': 'application/json'},
#            body: JSON.stringify({
#                username: "user_test",
#                email: "user_test@gmail.com",
#                password: "pass1234",
#            })
#        }).then(function (res) {
#            expect(res.ok).toBe(res.ok)
#            console.log(res.ok)
#        })
#
#    });
#});

Feature: Register
    Scenario: Register new user
        Given I am on the Google Search Page
#        When the new user fills in the registration form and submits
#        Then I should have heard "hello"
