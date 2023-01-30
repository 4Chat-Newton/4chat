const {Given, When, Then} = require("@wido/cucumber-framework")
const assert = require('assert')



export {}
Given('I am on the Google Search Page', async () => {
    await window.open(`http://localhost:3000/register`);
    // await $('#L2AGLb').click();
});

// const assert = require('assert')
// const { When, Then } = require('@cucumber/cucumber')
// const { Greeter } = require('../../src')

// When('the new user fills in the registration form and submits', function () {
//
// });

// Then('I should have heard {string}', function (expectedResponse: any) {
//     assert.equal(whatIHeard, expectedResponse)
// });

