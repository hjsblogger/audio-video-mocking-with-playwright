import path from 'path';

const browserArgsLocal = [
  '--no-sandbox',
  '--start-maximized',
  '--disable-infobars',
  '--allow-file-access-from-files',
  '--use-fake-ui-for-media-stream',
  `--use-file-for-fake-audio-capture=${path.resolve('./media/harvard.wav')}`,
  `--use-file-for-fake-video-capture=${path.resolve('./media/garden_sif.y4m')}`,
  '--use-fake-device-for-media-stream',
  '--enable-features=ClipboardReadWrite',
  '--autoplay-policy=no-user-gesture-required'
];

const webSpecs = ['audio_mocking_test.js', 'video_mocking_test.js'];

/* Project names follow <browser>:<version>:<platform>@lambdatest or
   <device>:<os version>:android@lambdatest; setup/lambdatest-setup.js builds the capabilities from them */
const config = {
  testDir: './tests/specs',
  testMatch: '*.js',
  timeout: 300000,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    actionTimeout: 60000,
    navigationTimeout: 90000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    /* Local execution */
    {
      name: 'chrome:local',
      testMatch: webSpecs,
      use: {
        channel: 'chrome',
        headless: false,
        viewport: null,
        permissions: ['camera', 'microphone'],
        launchOptions: { args: browserArgsLocal }
      },
    },
    /* Local execution */
    {
      name: 'edge:local',
      testMatch: webSpecs,
      use: {
        channel: 'msedge',
        headless: false,
        viewport: null,
        permissions: ['camera', 'microphone'],
        launchOptions: { args: browserArgsLocal }
      },
    },

    /* Cloud execution - LambdaTest (headless only affects the unused local page fixture) */
    {
      name: 'chrome:latest:Windows 11@lambdatest',
      testMatch: webSpecs,
      use: {
        headless: true,
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'MicrosoftEdge:latest:Windows 11@lambdatest',
      testMatch: webSpecs,
      use: {
        headless: true,
        viewport: { width: 1920, height: 1080 },
      },
    },
    /* Commenting out execution on real devices */
    /*
    {
      name: 'Galaxy.*:16:android@lambdatest',
      testMatch: [...webSpecs, 'audio_mocking_real_device_test.js'],
      use: {
        headless: true,
      },
    },
    */
  ],
};

export default config;