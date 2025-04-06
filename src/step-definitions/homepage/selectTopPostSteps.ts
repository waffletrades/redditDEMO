import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import HomePage from '../../pages/homePage'

When('I click on the top post', async function () {
  await this.homePage.clickTopPost()
})

Then('the top post should be visible and selected', async function () {
  const isVisible = await this.homePage.isTopPostVisible()
  expect(isVisible).toBeTruthy()
})
