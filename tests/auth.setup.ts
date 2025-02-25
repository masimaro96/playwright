import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://groupware57.hanbiro.net/ngw/app/#/sign');
    await expect(page).toHaveTitle('Hanbiro Groupware - Sign', { timeout: 30000 });
    await page.getByPlaceholder('ID').fill('quynh1');
    await page.locator('#iframeLoginPassword').contentFrame().getByRole('textbox', { name: 'Password' }).fill('quynh1!@');
    await page.locator('#btn-log').click({ timeout: 10000 });
    await page.waitForTimeout(3000);
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('https://groupware57.hanbiro.net/ngw/app/#/');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page).toHaveTitle('Hanbiro Groupware - HOME', { timeout: 30000 });
     // End of authentication steps.

  await page.context().storageState({ path: authFile });
});