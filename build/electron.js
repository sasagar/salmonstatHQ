const { app, Menu, BrowserWindow, ipcMain } = require('electron');
// Module to control application life.
// Module to create native browser window.

const path = require('path');
const url = require('url');
const fs = require('fs');

const em = require('../src/electron-menu');

const userDataDir = app.getPath('userData');

process.env.REACT_APPDIR = userDataDir;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		minWidth: 980,
		minHeight: 300,
		center: true,
		webPreferences: {
			nodeIntegration: false,
			preload: __dirname + '/../src/preload.js'
		}
	});

	// and load the index.html of the app.
	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, '/../build/index.html'),
			protocol: 'file:',
			slashes: true
		});
	mainWindow.loadURL(startUrl);
	// Open the DevTools.
	//mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createWindow();
	// メニューを作る
	const template = em.template;

	if (process.platform === 'darwin') {
		template.unshift(em.darwinTemplate.main);

		// Edit menu
		template[1].submenu.push(em.darwinTemplate.sub1);

		// Window menu
		template[3].submenu = em.darwinTemplate.sub2;
	}

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('getAllStat', event => {
	fs.readFile(
		path.join(process.env.REACT_APPDIR, '/SalmonRec.json'),
		(err, data) => {
			if (err) {
				console.log(err);

				fs.writeFile(
					path.join(process.env.REACT_APPDIR, '/SalmonRec.json'),
					'[]',
					err => {
						console.log(err);
						event.returnValue = false;
					}
				);

				event.returnValue = [];
			} else {
				event.returnValue = JSON.parse(data);
			}
		}
	);
});

ipcMain.on('setStat', (event, stat) => {
	const text = JSON.stringify(stat);
	fs.writeFile(
		path.join(process.env.REACT_APPDIR, '/SalmonRec.json'),
		text,
		err => {
			console.log(err);
			event.returnValue = false;
		}
	);
	event.returnValue = true;
});

ipcMain.on('addStat', (event, stat) => {
	const readFile = (...args) => {
		return new Promise(function(resolve, reject) {
			fs.readFile(...args, function(error, data) {
				if (error) reject(error);
				else resolve(data);
			});
		});
	};
	let file;
	readFile(path.join(process.env.REACT_APPDIR, '/SalmonRec.json'))
		.then(data => {
			file = JSON.parse(data);
		})
		.then(() => {
			const time = new Date(Date.now());
			const isoTime = time.toISOString();
			stat.time = isoTime.slice(0, -5) + 'Z';
			let id = 1;
			if (file.length !== 0) {
				id = file[file.length - 1].id + 1;
			}
			stat.id = id;
			delete stat.waveList[0].type;
			delete stat.waveList[1].type;
			delete stat.waveList[2].type;
		})
		.then(() => {
			const successes = stat.waveList.map(wave => {
				return wave.success;
			});
			const waves = successes.indexOf(false);
			return waves;
		})
		.then(waves => {
			console.log(waves);
			while (waves < 2 && waves !== -1) {
				delete stat.waveList.pop();
				waves++;
			}
		})
		.then(() => {
			file.push(stat);
		})
		.then(() => {
			const data = JSON.stringify(file);
			fs.writeFile(
				path.join(process.env.REACT_APPDIR, '/SalmonRec.json'),
				data
			);
		})
		.then(() => {
			event.returnValue = true;
		})
		.catch(error => {
			console.log(error);
			event.returnValue = false;
		});
});
