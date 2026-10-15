<img width="1164" height="592" alt="Image" src="https://github.com/user-attachments/assets/64e3ab6b-649b-4c46-bef7-3590b630b9e5" />
<div align="center">Image generated using AI</a></div>
<br/>

In this repo, we have covered the usage of the [WebdriverIO](https://webdriver.io/) framework for mocking/faking Audio (mic) and Video (camera/web camera) on web and mobile.

## Steps for test execution

**Step 1**

Create a virtual environment by triggering the *virtualenv venv* command on the terminal

```
virtualenv venv
```

<img width="1418" alt="VirtualEnvironment" src="https://github.com/hjsblogger/web-scraping-with-python/assets/1688653/89beb6af-549f-42ac-a063-e5f715018ef8">

**Step 2**

Navigate the newly created virtual environment by triggering the *source venv/bin/activate* command on the terminal

```
source venv/bin/activate
```

**Step 3**

You can fetch the LambdaTest Credentials from the [LambdaTest Profile Section](https://accounts.lambdatest.com/security/username-accesskey) section.

Export the environment variables *LT_USERNAME* and *LT_ACCESS_KEY* by triggering the following commands on the terminal:

For macOS:

```
export LT_USERNAME=LT_USERNAME
export LT_ACCESS_KEY=LT_ACCESS_KEY
```

For Linux:

```
export LT_USERNAME=LT_USERNAME
export LT_ACCESS_KEY=LT_ACCESS_KEY
```

For Windows:

```
set LT_USERNAME=LT_USERNAME
set LT_ACCESS_KEY=LT_ACCESS_KEY
```
**Step 4**

Install the dependencies by triggering the command ```npm install --legacy-peer-deps``` on the terminal.

<img width="1482" height="436" alt="Image" src="https://github.com/user-attachments/assets/5f4433e4-f6d9-4515-867c-9e4d81d1dab5" />

**Step 5 - A/V Mocking with WebdriverIO + Chrome**

You can mock the A/V on Chrome installed on the local machine, as well as on Chrome available on a cloud grid like LambdaTest. The media files ([.wav](https://github.com/hjsblogger/webdriverio-audio-video-mocking/blob/main/media/harvard.wav) and [.y4m](https://github.com/hjsblogger/webdriverio-audio-video-mocking/blob/main/media/garden_sif.y4m)) and are present in the media folder.

*A/V Mocking on Chrome (local)*
Ensure that you have Chrome browser installed on the machine. Next, trigger the command ```npm run test:cloud:chrome``` on the terminal. The browser will spin-up and the A/V mocking will be performed on the same (with the test A/V files placed in the /media folder of the repo).

<img width="1507" height="833" alt="Image" src="https://github.com/user-attachments/assets/68ae5050-fa9f-4692-a866-84cf2547d86d" />
<br><br><br>
<img width="1507" height="833" alt="Image" src="https://github.com/user-attachments/assets/e05c907c-a7dc-4ae9-a14c-755fc46b5ec5" />

As seen above, the audio (mic) and video (webcam) were mocked/faked by using the Fake Audio/Video input.

*A/V Mocking on Edge (local)*
Ensure that you have Edge browser installed on the machine. Instead of downloading the msedgedriver, run the command ```msedgedriver --port=9515``` starts EdgeDriver and tells it which TCP port to listen on for WebDriver commands.

<img width="953" height="130" alt="Image" src="https://github.com/user-attachments/assets/a33bff8d-2898-4334-a12c-8db70cfb4ac9" />

Next, trigger the command ```npm run test:cloud:chrome``` on the terminal. The browser will spin-up and the A/V mocking will be performed on the same (with the test A/V files placed in the /media folder of the repo).

<img width="1507" height="835" alt="Image" src="https://github.com/user-attachments/assets/637d786b-3a78-4df0-9661-a9827b8cf0a3" />
<br><br><br>
<img width="1507" height="835" alt="Image" src="https://github.com/user-attachments/assets/f588d704-e357-4a94-899b-2519f669cf3e" />

As seen above, the audio (mic) and video (webcam) were mocked/faked by using the Fake Audio/Video input.

*A/V Mocking on Chrome ( cloud - LambdaTest)*
Upload the media files to the Lambda storage by triggering the following commands on the terminal. It uses the [UploadUserFiles](https://swagger-api-support.lambdatest.com/index.html#/user-files/UploadUserFiles), API endpoint, for uploading the user-files to the Lambda storage.

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

Next, trigger the command ```npm run test:cloud:chrome``` on the terminal. The browser will spin-up and the A/V mocking will be performed on Chrome on the LambdaTest grid.

<img width="963" height="738" alt="Image" src="https://github.com/user-attachments/assets/f9298801-4ccf-44f3-927f-2e859d7676f5" />
<br><br><br>
<img width="1144" height="725" alt="Image" src="https://github.com/user-attachments/assets/e57de974-dc7a-447b-b123-c7a3856e7ce0" />

Navigate to the [LambdaTest dashboard](https://automation.lambdatest.com) to check the status of the test execution:

<img width="1403" height="708" alt="Image" src="https://github.com/user-attachments/assets/3fbecdb4-f3aa-41d2-97cb-b13dc32f5e81" />
<br><br><br>
<img width="1403" height="708" alt="Image" src="https://github.com/user-attachments/assets/c0433b5a-ce56-4f03-a75a-bb0b5eeadf8e" />

As seen above, A/V mocking on Chrome on LambdaTest was performed successfully!

*A/V Mocking on Edge ( cloud - LambdaTest)*
In case you have not uploaded the media files to the Lambda storage, run the below commands on the terminal (PS: Please skip the commands in case you have already uploaded the required test media files):

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

Next, trigger the command ```npm run test:cloud:edge``` on the terminal. The browser will spin-up and the A/V mocking will be performed on Edge on the LambdaTest grid.

<img width="959" height="546" alt="Image" src="https://github.com/user-attachments/assets/6a8c4827-a8e3-4f95-9365-032846dc5c28" />
<br><br><br>
<img width="1476" height="533" alt="Image" src="https://github.com/user-attachments/assets/838e5152-5458-4f1e-83ba-15d89e990ef2" />

Navigate to the [LambdaTest dashboard](https://automation.lambdatest.com) to check the status of the test execution:

<img width="1499" height="731" alt="Image" src="https://github.com/user-attachments/assets/889b4b91-495d-49dc-9314-6a26d842e02a" />
<br><br><br>
<img width="1499" height="775" alt="Image" src="https://github.com/user-attachments/assets/9b83f871-adad-420f-9ccf-74bd1d66310e" />

As seen above, A/V mocking on Edge on LambdaTest was performed successfully!

*Work In Progress:*
1. A/V mocking with Safari (on macOS)
2. A/V mocking on real devices (Android & iOS)

## Have feedback or need assistance?
Feel free to fork the repo and contribute to make it better! Email to [himanshu[dot]sheth[at]gmail[dot]com](mailto:himanshu.sheth@gmail.com) for any queries or ping me on the following social media sites:

<b>LinkedIn</b>: [@hjsblogger](https://linkedin.com/in/hjsblogger)<br/>
<b>Twitter</b>: [@hjsblogger](https://www.twitter.com/hjsblogger)