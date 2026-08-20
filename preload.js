const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getGlobalConfig: () => ipcRenderer.invoke('get-global-config'),
    saveGlobalConfig: (config) => ipcRenderer.invoke('save-global-config', config),
    saveFile: (data, filePath) => ipcRenderer.invoke('save-file', data, filePath),
    openFile: () => ipcRenderer.invoke('open-file'),
    importExcel: () => ipcRenderer.invoke('import-excel'),
    setWindowTitle: (title) => ipcRenderer.send('set-window-title', title),
    openFileDialog: (options) => ipcRenderer.invoke('open-file-dialog', options),
    runDigitizer: (imagePath) => ipcRenderer.invoke('run-digitizer', imagePath),
    runSmartDigitizer: (imagePath, rows, cols, threshold) => ipcRenderer.invoke('run-smart-digitizer', { imagePath, rows, cols, threshold }),
    moveFile: (oldPath, newPath) => ipcRenderer.invoke('move-file', oldPath, newPath),
    saveAsPath: (defaultPath) => ipcRenderer.invoke('save-as-path', defaultPath),
    readFileAsBase64: (filePath) => ipcRenderer.invoke('read-file-as-base64', filePath)
});
