import { test, expect } from '@playwright/test';

test.describe('Home', ()=>{
    test('Setting mail', async({page})=>{
        await page.goto('https://groupware57.hanbiro.net/ngw/app/#/');
        // Access mail page
        await page.locator('#main-navi').getByRole('link', { name: 'Mail' }).click({ force: true });
        await page.waitForTimeout(3000);
        await expect(page).toHaveTitle('Hanbiro Groupware - Mail', { timeout: 30000 });

        // Position the mouse and scroll with the mouse wheel
        await page.locator('.sidebar-resizer').hover();
        await page.mouse.wheel(0, 100);

        // Click to setting mail
        await page.getByRole('link', { name: 'Settings' }).click({ force: true });
        await page.waitForTimeout(3000);
        await page.getByRole('link', { name: ' Signature' }).click({ force: true });
        await page.waitForTimeout(3000);
    })
})
