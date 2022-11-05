/*
 *
 *      My humble telegram bot for measuring expenses
 *      It writes entries to the given Google Spreadsheet.
 *
 *      To setup fill next details:
 *      — add your Telegram username as granted users without "@". If you want to have shared access from multiple account write
 *        several separated by comma 'username1', 'username2', 'username3'
 *      — write the token from Botfather: https://t.me/BotFather
 *      — fill spreadsheet id (https://docs.google.com/spreadsheets/d/[ symbols written here between slashes ]/edit#gid=XXXXXXXXX)
 *      — fill spreadsheet index (1st page — index 0, 2nd page — index 1, and so on)
 *
 *      After deploy update WebApp url, save file and run init() function.
 *
 *      Want your own order of columns in record change in array in addExpense function:
 *.     ...appendRow(["", name, today(), price]); -> A=skip, B=name of expense, C=date today, D=value
 *
 */

const GRANTED_USERS = [
    "username"
];

const TOKEN = "DDDDDDDDDD:XXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const SPREADSHEET_ID = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXX";
const SPREADSHEET_SHEET_INDEX = 0;
const WEBAPP_URL =
  "https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-XXXXXX_XXXX/exec";

/* end setup */

const TELEGRAM_URL = "https://api.telegram.org/bot" + TOKEN;

const ACCESS_DENIED_MSG =
  "Sorry, it's a private bot. Want your own? Get here: https://github.com/alexander-litvinovich/telegram-to-gspreadsheet-expense-bot";
const ACCESS_DENIED_HTTP_MSG =
  "<html><body>" +
  "<h1>Expense measuring bot for Telegram</h1>" +
  "<p>It's a private expense measuring bot.</p>" +
  '<p>Want your own? Get <a href="https://github.com/alexander-litvinovich/telegram-to-gspreadsheet-expense-bot" target="_blank">instructions are here</a>.</p>' +
  "</body></html>";

const LINES_ADDED_MSG = "Lines added: ";
const INSTRUCTIONS_MSG =
  "🤖 I'm parsing your messages and trying to find lists of purchases (like Milk 10 or Bread 1,5 or Orange 3.14) and then adding them to the spreadsheet";

function init() {
  Logger.log("Get info about the bot");
  Logger.log(getMe());

  Logger.log("I gonna add a row into the spreadsheet: Test 12,34");
  parseList("Test 12,34");

  Logger.log("I gonna add the webhook url: " + WEBAPP_URL);
  Logger.log(setWebhook());
}

function getMe() {
  const url = TELEGRAM_URL + "/getMe";
  return UrlFetchApp.fetch(url);
}

function setWebhook() {
  const url = TELEGRAM_URL + "/setWebhook?url=" + WEBAPP_URL;
  return UrlFetchApp.fetch(url);
}

function doGet(e) {
  return HtmlService.createHtmlOutput(ACCESS_DENIED_HTTP_MSG);
}

function sendText(id, text) {
  const url =
    TELEGRAM_URL +
    "/sendMessage?chat_id=" +
    id +
    "&text=" +
    encodeURIComponent(text);
  return UrlFetchApp.fetch(url);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const id = data.message.chat.id;
    const messageText = data.message.text;
    const userName = data.message.chat.username;

    if (GRANTED_USERS.includes(userName)) {
      const results = parseList(messageText);
      if (results) {
        sendText(id, LINES_ADDED_MSG + results);
      } else {
        sendText(id, INSTRUCTIONS_MSG);
      }
    } else {
      sendText(id, ACCESS_DENIED_MSG);
    }
  } catch (e) {
    sendText(id, JSON.stringify(e, null, 4));
  }
}

function addExpense(name, price) {
  SpreadsheetApp.openById(SPREADSHEET_ID)
    .getSheets()
    [SPREADSHEET_SHEET_INDEX].appendRow(["", name, today(), price]);
}

function parseList(text) {
  const lineCheck = /(.+)\s+([0-9,.]+)\s*$/gm;
  const foundLines = text.match(lineCheck);

  if (!foundLines) return false;

  for (let key in foundLines) {
    let line = foundLines[key].trim().replace(/\s+/, " ");
    let price = parseFloat(
      String(/[0-9,.]+$/.exec(line))
        .trim()
        .split(",")
        .join(".")
    );
    let name = line.replace(/[0-9,.]+$/, "").trim();

    addExpense(name, price);
  }

  return parseInt(foundLines.length);
}

function today() {
  const date = new Date();
  const padLeft = function (num) {
    return num.toString().length > 1 ? num.toString() : "0" + num.toString();
  };

  return (
    padLeft(date.getDate()) +
    "." +
    padLeft(date.getMonth() + 1) +
    "." +
    date.getFullYear()
  );
}
