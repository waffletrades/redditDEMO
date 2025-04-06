import { Page, Locator, expect } from '@playwright/test'
import fs from 'fs' // api for interacting with system files 


class RegistrationPage {
  page: Page

  public generatedEmail: string = '' // emptry string for random generated email
  public generatedPassword: string = ''

  public readonly fields: {
    email: Locator
    password: Locator
  }

  public readonly buttons: {
    skip: Locator
    suggestUsername: Locator
    continue: Locator
    continueCreateAccount: Locator
  }

  public readonly genderButtons: {
    woman: Locator
    man: Locator
    nonBinary: Locator
    preferNotToSay: Locator
  }

  public readonly interests: {
    askReddit: Locator
    nba: Locator
    continue: Locator
  }

  constructor(page: Page) {
    this.page = page

    // Form Fields
    this.fields = {
      email: page.locator('input[name="email"]'),
      password: page.locator('input[name="password"]')
    }

    // Buttons
    this.buttons = {
      skip: page.getByRole('button', { name: 'Skip' }),
      suggestUsername: page.locator('button.suggest-username'),
      continue: page.locator('button.continue'),
      continueCreateAccount: page.locator('button.create')
    }

    // Gender Buttons
    this.genderButtons = {
      woman: page.locator('input[name="genderEnum"][value="FEMALE"]'),
      man: page.locator('button[name="genderEnum"][value="MALE"]'),
      nonBinary: page.locator('input[name="genderEnum"][value="NON_BINARY"]'),
      preferNotToSay: page.locator('input[name="genderEnum"][value="OPT_OUT"]')
    }

    // Intrests 
    this.interests = {
      askReddit: page.getByRole('checkbox', { name: 'Ask Reddit' }).first(),
      nba: page.getByRole('checkbox', { name: 'NBA' }).first(),
      continue: page.getByRole('button', { name: 'Continue' }).last()
    }

  }

  async enterRandomEmail(): Promise<void> {
    const random = Math.floor(Math.random() * 100000)
    this.generatedEmail = `testuser${random}@gmail.com`
  
    await this.fields.email.fill(this.generatedEmail)
    console.log(`Entered email: ${this.generatedEmail}`)
  
    await this.buttons.continue.click()
  }
  
  async clickSkipEmailVerification(): Promise<void> {
    await this.buttons.skip.waitFor({ state: 'visible' })
    await this.buttons.skip.click()
    console.log('Clicked Skip on email verification step')
  }

  async clickSuggestUsernameButton(): Promise<void> {
    await this.buttons.suggestUsername.waitFor({ state: 'visible' })
    await this.buttons.suggestUsername.click()
    console.log('Clicked suggest username button')
  }
  
  async enterRandomPassword(): Promise<void> {
    const random = Math.floor(Math.random() * 100000)
    this.generatedPassword = `Test@${random}`
  
    await this.fields.password.fill(this.generatedPassword)
    console.log(`Entered password: ${this.generatedPassword}`)
  
    // save email + password to tmpCredentials.json
    fs.writeFileSync('tmpCredentials.json', JSON.stringify({
      email: this.generatedEmail,
      password: this.generatedPassword
    }, null, 2))
  }
  
  async clickCreateAccountButton(): Promise<void> {
    await this.buttons.continueCreateAccount.waitFor({ state: 'visible' })
    await this.buttons.continueCreateAccount.click()
    console.log('Clicked continue to create account')
  }

  async selectGenderMan(): Promise<void> {
    await this.genderButtons.man.waitFor({ state: 'visible', timeout: 10000 })
    await this.genderButtons.man.click()
    console.log('Selected gender: Man')
  }
  
  async selectAskReddit(): Promise<void> {
    await this.interests.askReddit.waitFor({ state: 'visible' ,  timeout: 10000 })
    await this.interests.askReddit.click()
    console.log('Selected: Ask Reddit')
  }

  async selectNBA(): Promise<void> {
    await this.interests.nba.waitFor({ state: 'visible',  timeout: 10000 })
    await this.interests.nba.click()
    console.log('Selected: NBA')
  }
  
  async clickInterestsContinue(): Promise<void> {
    await this.interests.continue.waitFor({ state: 'visible' })
    await this.interests.continue.click()
    console.log('Clicked: Continue on Interests page')
  }
  
  async isSuccessVisible(): Promise<boolean> {
    try {
      await this.page.waitForSelector('a#reddit-logo[href="/"]', { timeout: 10000 });
      
      const isRedditLogoVisible = await this.page.isVisible('a#reddit-logo[href="/"]');
      
      console.log('Reddit homepage verification (logo check):', isRedditLogoVisible);
      return isRedditLogoVisible;
    } catch (error) {
      console.error('Failed to verify Reddit homepage:', error);
      return false;
    }
  }


}

export default RegistrationPage
