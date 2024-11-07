const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { app, BrowserWindow } = require("electron");
const { autoUpdater, AppUpdater } = require("electron-updater");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

// Constantes
const ICON_PATH = path.join(__dirname, "assets", "logo-gcene.ico");

function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: ICON_PATH,
  });

  mainWindow.maximize();
  mainWindow.show();

  mainWindow.loadFile("index.html");
  mainWindow.removeMenu();
}

app.whenReady().then(async () => {
  try {
    createWindow();
  } catch (error) {
    console.error("Erro durante a inicialização do app:", error);
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  autoUpdater.checkForUpdates();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
