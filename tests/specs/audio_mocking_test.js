import test from '../../setup/lambdatest-setup.js';
import { expect } from '@playwright/test';

test.describe('SigFig: Mic Test', () => {
  test('SigFig: Audio Mocking Test', async ({ page }) => {
    await page.goto('https://mictests.com/check');
    const micBtn = page.locator('#mic-launcher');
    await expect(micBtn).toBeEnabled();
    console.log('mic-launcher ready. Proceeding...');
    await micBtn.click();

    /* The button hides once the mic test starts; fall back to a JS click if an overlay ate the first one */
    const started = await micBtn.waitFor({ state: 'hidden', timeout: 10000 }).then(() => true, () => false);
    if (!started) {
      console.log('mic-launcher still visible after click. Retrying with JS click...');
      await micBtn.evaluate((el) => el.click());
    }
    await expect(micBtn, 'Check my microphone button was not clicked').toBeHidden({ timeout: 10000 });

    /* Keep session alive for observation */
    await page.waitForTimeout(15000);
  });
});
