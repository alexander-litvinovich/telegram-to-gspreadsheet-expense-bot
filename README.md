# Telegram to Google Spreadsheet bot for tracking expenses

TBD: Add link to the article

### How to deploy your own bot?
1. Create a [new spreadsheet](https://sheet.new/) or take the existing one
2. Create a new Apps Script application:
![app-setup-1](https://user-images.githubusercontent.com/11630525/198940396-c2615533-f381-4bfe-a68a-1166fa96af85.png)
3. Copy and paste code from `Code.gs` and set it up according to the instructions in the comments
4. Add your Telegram username as granted users without "@" in the `GRANTED_USERS` constant. If you want to have shared access from multiple account write several separated by comma 'username1', 'username2', 'username3'
5. [Register new bot in BotFather](https://t.me/BotFather) and write the token from it to the `TOKEN` constant.
6. Write the spreadsheet ID in the `SPREADSHEET_ID` constant.
7. If you going to use not the first list in the spreadsheet change the `SPREADSHEET_SHEET_INDEX` constant according to your list number (1st page — index 0, 2nd page — index 1, and so on).
![spreadsheet-id](https://user-images.githubusercontent.com/11630525/199492696-842a1162-3266-494d-994f-99361fceaa37.png)
8. Create a new deployment:
![app-setup-2](https://user-images.githubusercontent.com/11630525/198940722-caa322b0-e850-4ead-9d23-067f97ee8e9e.png)
![app-setup-3](https://user-images.githubusercontent.com/11630525/198940688-09e77909-67e3-49a4-a407-ba6d126ca6b5.png)
![app-setup-4](https://user-images.githubusercontent.com/11630525/198940704-8e84f54e-ee64-49e7-a369-9b47abf16c93.png)
9. Update `WEBAPP_URL` in your Code.gs and run `init()` function
10. When Google asks for granting permission to access your spreadsheet allow it.
11. Write to your bot about expenses "Milk 10". One per line, each record on the new line.
