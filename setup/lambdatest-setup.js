import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import * as base from '@playwright/test';
import { chromium, _android } from 'playwright';

/* Load environment file (TEST_URL for the real device test) */
const env = process.env.TEST_ENV || 'mobile';
dotenv.config({ path: `.env.${env}` });

/* Media files are uploaded to Lambda storage (see README); the userFiles capability
   downloads them to the Downloads folder of the remote machine */
const browserArgsCloud = [
  '--start-maximized',
  '--use-fake-ui-for-media-stream',
  '--use-fake-device-for-media-stream',
  '--disable-notifications',
  '--disable-infobars',
  '--autoplay-policy=no-user-gesture-required',
  '--use-file-for-fake-audio-capture=C:\\Users\\ltuser\\Downloads\\harvard.wav',
  '--use-file-for-fake-video-capture=C:\\Users\\ltuser\\Downloads\\garden_sif.y4m'
];

/* @hjsblogger - The media files are pushed to the device before the browser is instantiated */
const ANDROID_AUDIO_PATH = '/storage/emulated/0/Download/harvard.wav';
const ANDROID_VIDEO_PATH = '/storage/emulated/0/Download/garden_sif.y4m';
const browserArgsAndroid = [
  '--use-fake-ui-for-media-stream',
  '--use-fake-device-for-media-stream',
  '--allow-file-access-from-files',
  '--allow-file-access',
  `--use-file-for-fake-audio-capture=${ANDROID_AUDIO_PATH}`,
  `--use-file-for-fake-video-capture=${ANDROID_VIDEO_PATH}`
];

const mediaPermissions = ['camera', 'microphone'];

/* Capabilities will be over-ridden by Device & OS combinations from playwright.config.js */
const capabilities = {
  browserName: 'Chrome',
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'Windows 11',
    build: 'Playwright Video + Mic Mocking Demo',
    name: 'Playwright Test',
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    network: true,
    video: true,
    terminal: true,
    console: true,
    /* Enable tunnel for testing locally-hosted pages */
    tunnel: false,
    tunnelName: '',
    geoLocation: '',
  },
};

const modifyCapabilities = (configName, testName) => {
  const config = configName.split('@lambdatest')[0];

  /* The if loop will never be executed since the test execution is only on desktop-based browsers */
  /* Chrome and Chromium-based */
  if (/android/i.test(configName)) {
    const [deviceName, platformVersion, platformName] = config.split(':');
    delete capabilities.browserName;
    delete capabilities.browserVersion;
    capabilities['LT:Options'] = {
      ...capabilities['LT:Options'],
      platformName: platformName || 'android',
      deviceName: deviceName || 'Galaxy.*',
      platformVersion: platformVersion || '16',
      isRealMobile: true,
      network: false,
      uploadMedia: ['lt://MEDIAb21270510f494f6cbcf97e9cd19d53e0'],
      build: process.env.LT_BUILD_NAME || '[Chrome - Android] : Playwright Video + Mic Mocking Demo',
      name: testName,
    };
  } else {
    const [browserName, browserVersion, platform] = config.split(':');
    capabilities.browserName = browserName || 'Chrome';
    capabilities.browserVersion = browserVersion || 'latest';
    capabilities['LT:Options'] = {
      ...capabilities['LT:Options'],
      platform: platform || 'Windows 11',
      'goog:chromeOptions': browserArgsCloud,
      /* Playwright grid takes userFiles (lambda:userFiles is the Selenium grid capability) */
      userFiles: ['harvard.wav', 'garden_sif.y4m'],
      build: process.env.LT_BUILD_NAME ||
        `[${/edge/i.test(capabilities.browserName) ? 'Edge' : 'Chrome'} + Cloud] ]Playwright Video + Mic Mocking Demo`,
      name: testName,
    };
    /* Edge is Chromium-based, so it takes the same fake media flags */
    if (/edge/i.test(capabilities.browserName)) {
      capabilities['LT:Options']['ms:edgeOptions'] = browserArgsCloud;
    } else {
      delete capabilities['LT:Options']['ms:edgeOptions'];
    }
  }
};

const wsEndpoint = () =>
  `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;

/* Extend Playwright test */
const test = base.test.extend({
  page: async ({ page }, use, testInfo) => {
    const fileName = testInfo.file.split(path.sep).pop() || '';

    if (/lambdatest/i.test(testInfo.project.name)) {
      modifyCapabilities(testInfo.project.name, `${testInfo.title} - ${fileName}`);

      let ltPage;
      let browserOrDevice;

      if (/android/i.test(testInfo.project.name)) {
        const device = await _android.connect(wsEndpoint());
        console.log(`[Device] Model: ${device.model()}, Serial: ${device.serial()}`);
        await device.push(fs.readFileSync(path.resolve('./media/harvard.wav')), ANDROID_AUDIO_PATH);
        await device.push(fs.readFileSync(path.resolve('./media/garden_sif.y4m')), ANDROID_VIDEO_PATH);
        await device.shell('am force-stop com.android.chrome');
        const context = await device.launchBrowser({
          args: browserArgsAndroid,
          permissions: mediaPermissions
        });
        context.setDefaultTimeout(100000);
        ltPage = await context.newPage();
        browserOrDevice = device;
      } else {
        const browser = await chromium.connect({ wsEndpoint: wsEndpoint() });
        const context = await browser.newContext({
          viewport: testInfo.project.use.viewport,
          permissions: mediaPermissions
        });
        ltPage = await context.newPage();
        browserOrDevice = browser;
      }

      await use(ltPage);

      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status === testInfo.expectedStatus ? 'passed' : 'failed',
          remark: testInfo.error?.stack || testInfo.error?.message || '',
        },
      };
      await ltPage.evaluate(() => {}, `lambdatest_action: ${JSON.stringify(testStatus)}`).catch(() => {});

      await ltPage.close();
      await browserOrDevice.close();
    } else {
      /* Local Execution */
      await use(page);
    }
  },
});

export default test;
