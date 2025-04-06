import { Given, When } from '@cucumber/cucumber'
import HomePage from '../../pages/homePage'
import { getSavedCredentials } from '../../utils/credentials'

Given('I navigate to the Reddit login page', async function () {
  this.homePage = new HomePage(this.page)
  await this.page.goto('https://www.reddit.com/login/')
  console.log('🌐 Navigated to login page')
})

When('I log in with the saved credentials', async function () {
  const { email, password } = getSavedCredentials()
  await this.homePage.fields.username.fill(email)
  await this.homePage.fields.password.fill(password)
  await this.homePage.buttons.login.click()
  console.log('✅ Logged in with saved credentials')
})