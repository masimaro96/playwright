import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Home', ()=>{
    test('Mail', async({page})=>{
        await page.goto('https://groupware57.hanbiro.net/ngw/app/#/');
        // Access mail page
        await page.locator('#main-navi').getByRole('link', { name: 'Mail' }).click({ force: true });
        await page.waitForTimeout(3000);
        await expect(page).toHaveTitle('Hanbiro Groupware - Mail', { timeout: 30000 });

        // Position the mouse and scroll with the mouse wheel
        // await page.locator('.sidebar-resizer').hover();
        // await page.mouse.wheel(0, 100);

        // Compose mail
        await page.locator('a').filter({ hasText: 'Compose' }).first().click();
        await page.locator('#to').getByRole('textbox').fill('quynh2@hanbiro.net');
        await page.getByRole('textbox', { name: 'Auto-save is enabled once a' }).fill('send mail with playwright');
        // Attach file
        await page.getByText('Attach File').click();
        await page.getByRole('button', { name: 'Add File' }).click();
       
        const fileWithPath = path.join(__dirname, './fixtures/fixture.pdf');
        const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            page.getByRole('button', { name: 'Add File' }).click(),
        ]);
        await fileChooser.setFiles([fileWithPath]);

        //Send mail
        await page.locator('#mail-content-editor div').fill('test mail playwright');
        await page.getByRole('button', { name: 'Send' }).click();

        // Click to setting mail
        // await page.getByRole('link', { name: 'Settings' }).click({ force: true });
        // await page.waitForTimeout(3000);
        // await page.getByRole('link', { name: ' Signature' }).click({ force: true });
    })

    test('Board', async({page})=>{
        await page.goto('https://groupware57.hanbiro.net/ngw/app/#/');
        // Access mail page
        await page.locator('#main-navi').getByRole('link', { name: 'Board' }).click({ force: true });
        await page.waitForTimeout(3000);
        await expect(page).toHaveTitle('Hanbiro Groupware - Board', { timeout: 30000 });

    })
})
