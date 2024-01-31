import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    // await pages[page].open()
    await browser.url("https://www.account.box.com/login");
    const loginEmailText = await $('#login-email');
    await loginEmailText.waitForDisplayed({ timeout: 5000 });
    await loginEmailText.setValue('e2e-test+live+enterprise+user1@boxdemo.com');
    const loginSubmitButton = await $('#login-submit');
    await loginSubmitButton.click();
    const loginPasswordText = await $('#password-login');
    await loginPasswordText.waitForDisplayed({ timeout: 5000 });
    await loginPasswordText.setValue('Test12345!');
    const loginPasswordSubmitButton = await $('#login-submit-password');
    await loginPasswordSubmitButton.click();
    await browser.refresh();
    await browser.getCookies();
    await browser.refresh();
    await browser.getCookies();
    
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

