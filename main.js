const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process'); 
const ExcelJS = require('exceljs');        



// --- 1. 初始化窗口 ---
function createWindow() {
    const win = new BrowserWindow({
        width: 1200, 
        height: 850,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), 
            contextIsolation: true,  
            nodeIntegration: false, 
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));
}


// --- 2. 全局配置逻辑 (Global Settings) ---
const CONFIG_FILE_NAME = 'app_global_settings.json';


function getGlobalConfigPath() {
    return path.join(app.getPath('userData'), CONFIG_FILE_NAME);
}


const DEFAULT_GLOBAL_SETTINGS = {
    viewCols: 15,
    viewRows: 2,
    cellSize: 40,
    groupSize: 5,
    emojiList: ['⭐', '❤️', '🌸', '🧶', '🕸️', '🌙'],
    language: 'en-US' 
};


// 读取全局设置
ipcMain.handle('get-global-config', async () => {
    const configPath = getGlobalConfigPath();
    try {
        if (fs.existsSync(configPath)) {
            const data = fs.readFileSync(configPath, 'utf-8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error("Failed to read global config:", err); 
    }
    return DEFAULT_GLOBAL_SETTINGS;
});


// 保存全局设置
ipcMain.handle('save-global-config', async (event, newConfig) => {
    const configPath = getGlobalConfigPath();
    try {
        fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
        return { success: true };
    } catch (err) {
        console.error("Failed to save global config:", err); 
        return { success: false, error: err.message };
    }
});



// --- 3. 窗口生命周期 ---
app.whenReady().then(createWindow);


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});



// ============================================================
// 📂 文件操作与项目管理指令 (Project Management)
// ============================================================


// 保存项目 (.fcc 文件)
ipcMain.handle('save-file', async (event, payload) => {
    const { data, filePath } = payload;
    try {
        if (filePath) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            return { success: true, path: filePath };
        } else {
            const { filePath: newPath } = await dialog.showSaveDialog({
                title: 'Save New Project',
                defaultPath: path.join(app.getPath('documents'), 'my_crochet_project.fcc'),
                filters: [{ name: 'FCC Project', extensions: ['fcc'] }]
            });


            if (newPath) {
                fs.writeFileSync(newPath, JSON.stringify(data, null, 2));
                return { success: true, path: newPath };
            }
            return { success: false, cancelled: true };
        }
    } catch (err) {
        console.error("[Main] Save Error:", err); 
        return { success: false, error: err.message };
    }
});


// 打开项目 (.fcc 文件)
ipcMain.handle('open-file', async () => {
    const { filePaths } = await dialog.showOpenDialog({
        title: 'Open FCC Project',
        filters: [{ name: 'FCC Project', extensions: ['fcc'] }],
        properties: ['openFile']
    });


    if (filePaths.length > 0) {
        try {
            const content = fs.readFileSync(filePaths[0], 'utf-8');
            return { success: true, data: JSON.parse(content), path: filePaths[0] };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }


    const defaultFilePath = path.join(app.getPath('documents'), 'my_crochet_project.fcc');
    if (fs.existsSync(defaultFilePath)) {
        try {
            const content = fs.readFileSync(defaultFilePath, 'utf-8');
            return { success: true, data: JSON.parse(content), path: defaultFilePath };
        } catch (err) {
            return { success: false, error: "err_default_load_failed" };
        }
    }
    return { success: false, cancelled: true };
});



// --- 🖼️ 图片转 Excel 工具指令 (Digitizer Tool) ---


ipcMain.handle('open-file-dialog', async (event, options) => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        ...options
    });
    return result.filePaths[0]; 
});


// 调用 Python 处理图片
ipcMain.handle('run-digitizer', async (event, imagePath) => {
    return new Promise((resolve, reject) => {
        const isDev = !app.isPackaged;
        const scriptPath = isDev 
        ? path.join(__dirname, 'digitizer.py') 
        : path.join(process.resourcesPath, 'digitizer.py');
        const smartScriptPath = isDev 
           ? path.join(__dirname, 'smart_digitizer.py') 
           : path.join(process.resourcesPath, 'smart_digitizer.py');


        const pythonProcess = spawn('python3', [scriptPath, imagePath]);


        let errorMsg = "";
        pythonProcess.stdout.on('data', (data) => console.log(`Python: ${data}`));
        pythonProcess.stderr.on('data', (data) => { errorMsg += data.toString(); });


        pythonProcess.on('close', (code) => {
            if (code === 0) {
                const extension = path.extname(imagePath);
                const baseName = imagePath.substring(0, imagePath.length - extension.length);
                resolve(baseName + "_pattern.xlsx"); 
            } else {
                reject(new Error(errorMsg || "err_python_failed"));
            }
        });
    });
});


ipcMain.handle('save-as-path', async (event, defaultPath) => {
    const result = await dialog.showSaveDialog({
        defaultPath: defaultPath,
        filters: [{ name: 'Excel Files', extensions: ['xlsx'] }]
    });
    return result.filePath; 
});


ipcMain.handle('move-file', async (event, oldPath, newPath) => {
    try {
        fs.renameSync(oldPath, newPath);
        return true;
    } catch (err) {
        console.error("Move error:", err); 
        return false;
    }
});



// --- 🛠️ 高级模式 (Smart Digitizer) 指令 ---
ipcMain.handle('run-smart-digitizer', async (event, { imagePath, rows, cols, threshold }) => {
    return new Promise((resolve, reject) => {
        const isDev = !app.isPackaged;
        const scriptPath = isDev 
        ? path.join(__dirname, 'smart_digitizer.py') 
        : path.join(process.resourcesPath, 'smart_digitizer.py');


        const pythonProcess = spawn('python3', [scriptPath, imagePath, rows.toString(), cols.toString(), threshold.toString()]);


        let errorMsg = "";
        pythonProcess.stdout.on('data', (data) => console.log(`Smart-Digitizer: ${data}`));
        pythonProcess.stderr.on('data', (data) => { errorMsg += data.toString(); });


        pythonProcess.on('close', (code) => {
            if (code === 0) {
                const extension = path.extname(imagePath);
                const baseName = imagePath.substring(0, imagePath.length - extension.length);
                resolve(baseName + "_smart_pattern.xlsx"); 
            } else {
                reject(new Error(errorMsg || "err_smart_python_failed"));
            }
        });
    });
});



// --- 📊 导入现有 Excel 指令 (Color Scanning Mode) ---
ipcMain.handle('import-excel', async () => {
    const { filePaths } = await dialog.showOpenDialog({
        title: 'Select your design Excel file',
        filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }],
        properties: ['openFile']
    });


    if (filePaths.length === 0) return { success: false, cancelled: true };


    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePaths[0]);
        const worksheet = workbook.worksheets[0];


        let maxR = 0;
        let maxC = 0;
        const tempGrid = [];


        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                const fill = cell.fill;
                if (fill && fill.fgColor && fill.fgColor.argb && fill.fgColor.argb !== 'FFFFFFFF') {
                    if (rowNumber > maxR) maxR = rowNumber;
                    if (colNumber > maxC) maxC = colNumber;
                }
            });
        });


        if (maxR === 0 || maxC === 0) throw new Error("err_no_color_detected");


        for (let r = 1; r <= maxR; r++) {
            const rowData = [];
            for (let c = 1; c <= maxC; c++) {
                const cell = worksheet.getCell(r, c);
                let color = '#ffffff';
                if (cell.fill && cell.fill.fgColor && cell.fill.fgColor.argb) {
                    const argb = cell.fill.fgColor.argb;
                    if (argb !== 'FFFFFFFF') color = '#' + argb.substring(2);
                }
                rowData.push({ color: color, isDone: false, emoji: null });
            }
            tempGrid.push(rowData);
        }


        return { success: true, grid: tempGrid, rows: maxR, cols: maxC };
    } catch (err) {
        return { success: false, error: err.message };
    }
});



// --- 🛠️ 其他辅助指令 ---
ipcMain.handle('read-file-as-base64', async (event, filePath) => {
    try {
        const data = fs.readFileSync(filePath);
        return `data:image/${path.extname(filePath).substring(1)};base64,${data.toString('base64')}`;
    } catch (err) {
        console.error("Read file error:", err); 
        return null;
    }
});


ipcMain.on('set-window-title', (event, title) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.setTitle(title);
});
