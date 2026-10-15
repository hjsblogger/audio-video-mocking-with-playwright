<img width="1758" height="895" alt="image" src="https://github.com/user-attachments/assets/2d5e3bb7-6221-42dc-a5c5-a95c6f8471ff" />

<div align="center">Image generated using AI</a></div>
<br/>

In this repo, we have covered the usage of the [Playwright](https://playwright.dev/) framework for mocking/faking Audio (mic) and Video (camera/web camera) on web.

This repo is loosely based on [webdriverio-audio-video-mocking](https://github.com/hjsblogger/webdriverio-audio-video-mocking), which covers A/V mocking with the [WebdriverIO](https://webdriver.io/) framework.

## How the A/V mocking works

Chromium-based browsers (Chrome and Edge) can be launched with flags that replace the real mic and camera with media files:

```
--use-fake-ui-for-media-stream
--use-fake-device-for-media-stream
--use-file-for-fake-audio-capture=<path to .wav file>
--use-file-for-fake-video-capture=<path to .y4m file>
```

The test media files ([harvard.wav](media/harvard.wav) and [garden_sif.y4m](media/garden_sif.y4m)) are present in the [media](media) folder.

The tests are located in the [tests/specs](tests/specs) folder:

- [audio_mocking_test.js](tests/specs/audio_mocking_test.js) - Opens [mictests.com](https://mictests.com/check) and starts the mic test, which uses the fake audio input
- [video_mocking_test.js](tests/specs/video_mocking_test.js) - Opens [webcamtests.com](https://webcamtests.com/) and starts the webcam test. It also checks that the camera frame size is 352x240 (the size of *garden_sif.y4m*). Chrome's built-in fake camera is 640x480, so this confirms that the video file was used.

The browser projects are defined in [playwright.config.js](playwright.config.js), and the LambdaTest capabilities are created in [setup/lambdatest-setup.js](setup/lambdatest-setup.js).

## Steps for test execution

**Step 1**

Ensure that you have [Node.js](https://nodejs.org/) installed on the machine. Install the dependencies by triggering the following command on the terminal:

```
npm install
```

<!-- Add screenshot: npm install -->

**Step 2**

This step is only needed for running the tests on the LambdaTest cloud grid. You can fetch the LambdaTest Credentials from the [LambdaTest Profile Section](https://accounts.lambdatest.com/security/username-accesskey) section.

Export the environment variables *LT_USERNAME* and *LT_ACCESS_KEY* by triggering the following commands on the terminal:

For macOS & Linux:

```
export LT_USERNAME=LT_USERNAME
export LT_ACCESS_KEY=LT_ACCESS_KEY
```

For Windows:

```
set LT_USERNAME=LT_USERNAME
set LT_ACCESS_KEY=LT_ACCESS_KEY
```

**Step 3 - A/V Mocking with Playwright + Chrome/Edge**

You can mock the A/V on Chrome/Edge installed on the local machine, as well as on Chrome/Edge available on a cloud grid like LambdaTest.

| Command | Browser | Where |
| --- | --- | --- |
| `npm run test:local:chrome` | Chrome | Local machine |
| `npm run test:local:edge` | Edge | Local machine |
| `npm run test:cloud:chrome` | Chrome (latest) on Windows 11 | LambdaTest |
| `npm run test:cloud:edge` | Edge (latest) on Windows 11 | LambdaTest |
| `npm run test:lambdatest` | All LambdaTest projects | LambdaTest |

*A/V Mocking on Chrome (local)*

Ensure that you have Chrome browser installed on the machine. Next, trigger the command ```npm run test:local:chrome``` on the terminal. The browser will spin-up and the A/V mocking will be performed on the same (with the test A/V files placed in the /media folder of the repo).

<!-- Add screenshots: A/V mocking on Chrome (local) -->

As seen above, the audio (mic) and video (webcam) were mocked/faked by using the Fake Audio/Video input.

*A/V Mocking on Edge (local)*

Ensure that you have Edge browser installed on the machine. Unlike WebdriverIO, Playwright launches Edge directly, so there is no need to download or start the msedgedriver. Next, trigger the command ```npm run test:local:edge``` on the terminal. The browser will spin-up and the A/V mocking will be performed on the same (with the test A/V files placed in the /media folder of the repo).

<!-- Add screenshots: A/V mocking on Edge (local) -->

As seen above, the audio (mic) and video (webcam) were mocked/faked by using the Fake Audio/Video input.

*A/V Mocking on Chrome (cloud - LambdaTest)*

Upload the media files to the Lambda storage by triggering the following commands on the terminal. It uses the [UploadUserFiles](https://swagger-api-support.lambdatest.com/index.html#/user-files/UploadUserFiles) API endpoint for uploading the user-files to the Lambda storage.

- To upload .wav (audio) file to Lambda storage

```
curl -u "<LT_USERNAME>:<LT_ACCESS_KEY>" \
  -X POST "https://api.lambdatest.com/automation/api/v1/user-files" \
  -F "file=@media/harvard.wav"
```

- To upload .y4m (video) file to Lambda storage

```
curl -u "<LT_USERNAME>:<LT_ACCESS_KEY>" \
  -X POST "https://api.lambdatest.com/automation/api/v1/user-files" \
  -F "file=@media/garden_sif.y4m"
```

The *userFiles* capability downloads the uploaded files to the *Downloads* folder (*C:\Users\ltuser\Downloads*) of the remote machine, and the fake audio/video flags point to the files in that folder.

Next, trigger the command ```npm run test:cloud:chrome``` on the terminal. The A/V mocking will be performed on Chrome on the LambdaTest grid.

<!-- Add screenshots: terminal output for Chrome (cloud) -->

Navigate to the [LambdaTest dashboard](https://automation.lambdatest.com) to check the status of the test execution:

<img width="1494" height="824" alt="playwright-chrome-audio" src="https://github.com/user-attachments/assets/0cbf3201-85a6-4ab9-b74c-7d7b7c7f5f43" />
<br><br><br>
<img width="1494" height="824" alt="playwright-chrome-video" src="https://github.com/user-attachments/assets/697cef26-11e2-4e53-95df-4d7b18aca202" />

As seen above, A/V mocking on Chrome on LambdaTest was performed successfully!

*A/V Mocking on Edge (cloud - LambdaTest)*

In case you have not uploaded the media files to the Lambda storage, run the commands mentioned in the *A/V Mocking on Chrome (cloud - LambdaTest)* section (PS: Please skip the commands in case you have already uploaded the required test media files).

Next, trigger the command ```npm run test:cloud:edge``` on the terminal. The A/V mocking will be performed on Edge on the LambdaTest grid.

<!-- Add screenshots: terminal output for Edge (cloud) -->

Navigate to the [LambdaTest dashboard](https://automation.lambdatest.com) to check the status of the test execution:

<img width="1494" height="824" alt="playwright-edge-audio" src="https://github.com/user-attachments/assets/5bfbc95c-5300-4b2e-888e-569c6ab2ebdb" />
<br><br><br>
<img width="1494" height="824" alt="playwright-edge-video" src="https://github.com/user-attachments/assets/86b28b51-3ee6-4db4-8b3b-17555b9c6528" />

As seen above, A/V mocking on Edge on LambdaTest was performed successfully!

*Test Report*

Playwright generates an HTML report in the *playwright-report* folder after every run. Trigger the command ```npx playwright show-report``` on the terminal to view the same.

<!-- Add screenshot: Playwright HTML report -->

*Work In Progress:*
1. A/V mocking with Safari (on macOS)
2. A/V mocking on real devices (Android & iOS)

## Have feedback or need assistance?
Feel free to fork the repo and contribute to make it better! Email to [himanshu[dot]sheth[at]gmail[dot]com](mailto:himanshu.sheth@gmail.com) for any queries or ping me on the following social media sites:

<b>LinkedIn</b>: [@hjsblogger](https://linkedin.com/in/hjsblogger)<br/>
<b>Twitter</b>: [@hjsblogger](https://www.twitter.com/hjsblogger)
