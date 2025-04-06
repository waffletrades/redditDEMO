import { Page, Locator, expect } from '@playwright/test'
import { getSavedCredentials } from '../utils/credentials' //import getSavedCredentials to read stored credential 

class HomePage {
  page: Page

  public readonly fields: {
    username: Locator
    password: Locator
  }

  public readonly buttons: {
    login: Locator
  }

  public readonly topPost: Locator

  constructor(page: Page) {
    this.page = page

    this.fields = {
      username: page.locator('input[name="username"]'),
      password: page.locator('input[name="password"]')
    }

    this.buttons = {
      login: page.locator('button.login')
    }

    this.topPost = page.locator('a[slot="full-post-link"]').first()
  }

  //method to read .tmpCredentials.json and logs in 
  async loginWithSavedCredentials(): Promise<void> {
    const { email, password } = getSavedCredentials()

    await this.fields.username.fill(email)
    await this.fields.password.fill(password)
    await this.buttons.login.click()

    console.log(`Logged in with: ${email}`)
  }

  async clickTopPost(): Promise<void> {
    await this.topPost.scrollIntoViewIfNeeded()
    await this.topPost.waitFor({ state: 'visible', timeout: 10000 })
    await this.topPost.click({ force: true })
    console.log('Clicked on the top post')
  }
  

  async isTopPostVisible(): Promise<boolean> {
    const isVisible = await this.topPost.isVisible()
    console.log('Top post visibility:', isVisible)
    return isVisible
  }
}

export default HomePage
