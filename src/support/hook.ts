import { Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { chromium, Browser, Page } from '@playwright/test'

let browser: Browser

// Set default step timeout to 20 seconds for steps to load 
setDefaultTimeout(20000)

console.log('⚠️  hook.ts file is being loaded...')

Before(async function () {
  console.log('✅ Hook running: Launching browser...')
  browser = await chromium.launch({ headless: false }) // turn true or fasle 
  const context = await browser.newContext()
  this.page = await context.newPage()
  this.page.setDefaultNavigationTimeout(30000) 
  this.page.setDefaultTimeout(15000)           

  console.log('🟢 Hook completed: this.page is set!')
})

After(async function () {
  console.log('🔴 Closing browser...')
  await browser.close()
})
