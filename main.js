const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const Menu =electron.Menu;
const template = [];
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------*/
// Mant�n una referencia global del objeto window, si no lo haces, la ventana
// se cerrar� autom�ticamente cuando el objeto JavaScript sea eliminado por el recolector de basura.
let win

function createWindow () {
	// Crea la ventana del navegador.
	win = new BrowserWindow({ width: 1358, height: 760, webPreferences: {nodeIntegration: true }});
	
	// y carga el archivo index.html de la aplicaci�n.
	win.loadFile('index.html');
	
	// Abre las herramientas de desarrollo (DevTools).
	win.webContents.openDevTools()
	
	// Emitido cuando la ventana es cerrada.
	win.on('closed', () => {
		// Elimina la referencia al objeto window, normalmente  guardar�as las ventanas
		// en un vector si tu aplicaci�n soporta m�ltiples ventanas, este es el momento
		// en el que deber�as borrar el elemento correspondiente.
		win = null
	})
	
}

// Este m�todo ser� llamado cuando Electron haya terminado
// la inicializaci�n y est� listo para crear ventanas del navegador.
// Algunas APIs pueden usarse s�lo despu�s de que este evento ocurra.
app.on('ready', function(){
	createWindow()
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
})

// Sal cuando todas las ventanas hayan sido cerradas.
app.on('window-all-closed', () => {
	// En macOS es com�n para las aplicaciones y sus barras de men�
	// que est�n activas hasta que el usuario salga explicitamente con Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// En macOS es com�n volver a crear una ventana en la aplicaci�n cuando el
	// icono del dock es clicado y no hay otras ventanas abiertas.
	if (win === null) {
		createWindow()
	}
})
// En este archivo puedes incluir el resto del c�digo del proceso principal de
// tu aplicaci�n. Tambi�n puedes ponerlos en archivos separados y requerirlos aqu�.
