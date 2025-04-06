import { Page, Locator } from '@playwright/test'
import { getSavedCredentials } from '../utils/credentials' // Make sure this path is correct


class CommunityPage {
  page: Page

  public readonly joinButton: Locator

  constructor(page: Page) {
    this.page = page
    this.joinButton = page.locator('button[data-post-click-location="join"]')
  }

  async goToSubreddit(name: string): Promise<void> {
    await this.page.goto(`https://www.reddit.com/r/${name}/`)
    console.log(`Navigated to r/${name}`)
    await this.page.waitForTimeout(1000)

  }

  async clickJoin(): Promise<void> {
    console.log(' Waiting for Join button to be visible...')
    await this.joinButton.waitFor({ state: 'visible' })
  
    console.log('✅ Join button is visible. Clicking now...')
    await this.joinButton.click()
    console.log(' Clicked Join button successfully')
    await this.page.waitForTimeout(10000)

  }

  async clickUnjoin(): Promise<void> {
    console.log(' Waiting for Join button to be visible...')
    await this.joinButton.waitFor({ state: 'visible' })
  
    console.log(' Join button is visible. Clicking now...')
    await this.joinButton.click()
    console.log(' Clicked Join button successfully')
  }
  
 
  async loginThroughModalIfPresent(): Promise<void> {
    console.log(' Checking for login modal...')
  
    try {
      //  check if login link exists
      const loginLink = this.page.locator(':light(auth-flow-link[step="login"])')
      const isVisible = await loginLink.isVisible({ timeout: 5000 })
  
      if (isVisible) {
        console.log('🟡 Login modal detected. Attempting login...')
        await loginLink.click()
        console.log('👉 Clicked login link')
        
        // Give time for modal to fully load
        await this.page.waitForTimeout(3000)
        
        // Get credentials
        const { email, password } = getSavedCredentials()
        console.log(`📧 Credentials found: ${email}`)
        
        // Try to fill the username field using more robust approaches
        try {
          // First try: direct evaluation with input events to trigger UI updates
          const usernameSuccess = await this.page.evaluate((email) => {
            const input = document.querySelector('faceplate-text-input[id="loginUsername"]')?.shadowRoot?.querySelector('input');
            if (input) {
              input.value = email;
              // Dispatch events to ensure form validation recognizes the change
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
              return true;
            }
            return false;
          }, email);
          
          if (usernameSuccess) {
            console.log('✅ Filled username via JS evaluation with events');
          } else {
            // More aggressive approach if needed
            await this.page.evaluate((email) => {
              // Try to find input by traversing all shadow roots
              const inputs = document.querySelectorAll('*');
              for (const elem of inputs) {
                if (elem.shadowRoot) {
                  const shadowInputs = elem.shadowRoot.querySelectorAll('input');
                  for (const input of shadowInputs) {
                    if (input.id === 'loginUsername' || input.name === 'username') {
                      input.value = email;
                      input.dispatchEvent(new Event('input', { bubbles: true }));
                      input.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                  }
                }
              }
            }, email);
            console.log('✅ Attempted username fill with shadow DOM traversal');
          }
        } catch (e) {
          console.log('⚠️ Username fill failed:', e);
        }
        
        // Similar approach for password
        try {
          const passwordSuccess = await this.page.evaluate((password) => {
            const input = document.querySelector('faceplate-text-input[id="loginPassword"]')?.shadowRoot?.querySelector('input');
            if (input) {
              input.value = password;
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
              return true;
            }
            return false;
          }, password);
          
          if (passwordSuccess) {
            console.log('✅ Filled password via JS evaluation with events');
          } else {
            // More aggressive approach if needed
            await this.page.evaluate((password) => {
              const inputs = document.querySelectorAll('*');
              for (const elem of inputs) {
                if (elem.shadowRoot) {
                  const shadowInputs = elem.shadowRoot.querySelectorAll('input');
                  for (const input of shadowInputs) {
                    if (input.id === 'loginPassword' || input.name === 'password' || input.type === 'password') {
                      input.value = password;
                      input.dispatchEvent(new Event('input', { bubbles: true }));
                      input.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                  }
                }
              }
            }, password);
            console.log('✅ Attempted password fill with shadow DOM traversal');
          }
        } catch (e) {
          console.log('⚠️ Password fill failed:', e);
        }
        
        // Wait a bit to ensure form validation completes
        await this.page.waitForTimeout(1000);
        
        // Try to click the login button
        try {
          await this.page.locator('button.login.w-100').click({ timeout: 5000, force: true });
          console.log('🚀 Clicked login button by class');
        } catch (e) {
          console.log('⚠️ Login button click failed:', e);
        }
      } else {
        console.log('✅ Login modal not visible – skipping modal login');
      }
    } catch (err) {
      console.log('❌ Error while trying to handle login modal:', err);
    }
  }
  
}

export default CommunityPage
