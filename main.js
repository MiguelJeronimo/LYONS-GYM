const {app, BrowserWindow,Menu, ipcMain , webContents, globalShortcut} = require('electron'); 

const url = require('url');
const path = require('path');

//if (process.env.NODE_ENV !== 'production') {// comparamos si la aplicacion es diferente a producción
  //  require('electron-reload')(__dirname, {
  //      electron: path.join(__dirname, '../node_modules', '.bin', 'electron')// para cuando se modifique algo del condigo de electron
    
    
 //})    

//}

function Ventana_Principal() {
    let win = new BrowserWindow({width: 1000, height: 600, maxWidth:1000, maxHeight: 600, minHeight:600,minWidth:800,show: false,title: 'Lyons GYM' ,maximizable: false ,icon: 'src/img/dragon.png'});
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/panel.html'),
        protocol: 'file',
        slashes: true,    
    }));
    
    /**esta funcion se utiliza para abrir la consola del navegador en electron
     * cuando se vaya a complilar la app, solo comentar esta funcion para que no aparesca en producción
     */
    app.whenReady().then(function(){
        globalShortcut.register('Alt+Control+I',function(){
            win.openDevTools();
            console.log('se activo consola')
        })
    });//.then(Ventana_Principal);

    win.once('ready-to-show', () => {
        win.show()
      })


       //creando menus en la aplicación
    //const Mainmenu = Menu.buildFromTemplate(Arreglo_menus);
    Menu.setApplicationMenu(null);//integrando el menu a la aplicación 
    win.on('closed', function () {//cuando cerremos la aplicacion ejecutara el evento que cerrara todas las ventanas
       app.quit(); //cerrando la aplicacion con las multiples ventanas
})


}

app.on('ready', Ventana_Principal);