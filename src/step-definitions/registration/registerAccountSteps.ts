import '../../support/hook'
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import RegistrationPage from '../../pages/registrationPage'

let registrationPage: RegistrationPage

Given('I open the Reddit signup page', async function () {
  registrationPage = new RegistrationPage(this.page)
  await this.page.goto('https://www.reddit.com/register/')
})

When('I enter a random email address', async function () {
  await registrationPage.enterRandomEmail()
})

When('I click skip on email verification', async function () {
  await registrationPage.clickSkipEmailVerification()
})

When('I click the suggest username button', async function () {
  await registrationPage.clickSuggestUsernameButton()
})

When('I enter a random password', async function () {
  await registrationPage.enterRandomPassword()
})

When('I click continue to create the account', async function () {
  await registrationPage.clickCreateAccountButton()
})

When('I select gender as man', async function () {
  await registrationPage.selectGenderMan()
})

When('I select "Ask Reddit" as an interest', async function () {
  await registrationPage.selectAskReddit()
})

When('I select "NBA" as an interest', async function () {
  await registrationPage.selectNBA()
})

When('I click continue on the interests page', async function () {
  await registrationPage.clickInterestsContinue()
})

Then('the account should be registered successfully', async function () {
  const isRegistered = await registrationPage.isSuccessVisible()
  expect(isRegistered).toBeTruthy()
})
  