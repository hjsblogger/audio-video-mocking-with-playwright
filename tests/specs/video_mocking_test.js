import test from '../../setup/lambdatest-setup.js';
import { expect } from '@playwright/test';

test.describe('SigFig: Video Test', () => {
  test('SigFig: Video Mocking Test', async ({ page }) => {
    await page.goto('https://webcamtests.com/');
    const webcamBtn = page.locator('#webcam-launcher');
    await webcamBtn.waitFor({ state: 'attached' });
    await page.waitForTimeout(10000);
    console.log('webcam-launcher removed. Proceeding...');
    await webcamBtn.click();
    await page.waitForTimeout(20000);

    const settings = await page.evaluate(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const track = stream.getVideoTracks()[0];
        const { width, height } = track.getSettings();
        const label = track.label;
        stream.getTracks().forEach((t) => t.stop());
        return { width, height, label };
      } catch (err) {
        return { error: `${err.name}: ${err.message}` };
      }
    });
    console.log('Camera track settings:', JSON.stringify(settings));

    expect(settings.error, `getUserMedia failed - ${settings.error}`).toBeUndefined();

    /* Chrome's built-in fake camera is 640x480; garden_sif.y4m is 352x240,
       so the frame size tells us whether the file feed was actually used. */
    expect(settings.width, 'Fake video file not used (expected 352px width from garden_sif.y4m)').toBe(352);
    expect(settings.height, 'Fake video file not used (expected 240px height from garden_sif.y4m)').toBe(240);
  });
});
