import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import CommunityPage from '../../pages/communityPage'

let communityPage: CommunityPage

When('I go to the {string} subreddit', async function (name: string) {
  communityPage = new CommunityPage(this.page)
  await communityPage.goToSubreddit(name)
})

When('I click the Join button', async function () {
  await communityPage.clickJoin()
})

When('I log in again if login modal appears', async function () {
    communityPage = new CommunityPage(this.page)
    await communityPage.loginThroughModalIfPresent()
  })

When('I click the Join button again to unjoin', async function () {
    await communityPage.clickUnjoin()
  })
