# Telegram to Google Spreadsheet bot for tracking expenses

TBD: Add link to the article

### How to deploy your own bot?
1. Create a new spreadsheet or take the existing one
2. Create a new Apps Script application:
![app-setup-1](https://user-images.githubusercontent.com/11630525/198940396-c2615533-f381-4bfe-a68a-1166fa96af85.png)
3. Copy and paste code from `Code.gs` and set it up according to the instructions in the comments
4. Create a new deployment:
![app-setup-2](https://user-images.githubusercontent.com/11630525/198940722-caa322b0-e850-4ead-9d23-067f97ee8e9e.png)
![app-setup-3](https://user-images.githubusercontent.com/11630525/198940688-09e77909-67e3-49a4-a407-ba6d126ca6b5.png)
![app-setup-4](https://user-images.githubusercontent.com/11630525/198940704-8e84f54e-ee64-49e7-a369-9b47abf16c93.png)
5. Update `WEBAPP_URL` in your Code.gs and run `init()` function
6. When Google asks for granting permission to access your spreadsheet allow it.
