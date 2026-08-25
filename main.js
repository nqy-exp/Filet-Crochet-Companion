const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process'); 
const ExcelJS = require('exceljs');        



// --- 1. 初始化窗口 ---
// ... 原有的 require 和 createWindow 之后 ...

let isClosing = false; // 用于标记是否是用户点击了“确认关闭”后的二次关闭动作

function createWindow() {
    const win = new BrowserWindow({
        width: 1200, 
        height: 850,
        icon: path.join(__dirname, 'assets/icon.png'), 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), 
            contextIsolation: true,  
            nodeIntegration: false, 
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));

    // --- 【新增】：监听窗口关闭事件 ---
    win.on('close', (e) => {
        if (isClosing) return; // 如果是由于用户点击了弹窗中的“确定”触发的，则允许直接关闭

        e.preventDefault(); // 阻止默认关闭动作
        win.webContents.send('ask-dirty'); // 发送询问指令给渲染层
    });
}

// --- 【新增】：监听来自渲染层的状态返回 ---
ipcMain.on('dirty-status-response', async (event, data) => { // 注意这里我们直接拿 data 对象
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;

    // 【核心修改】：从传过来的 data 中解构出 buttons
    const { dirty, title, message, buttons } = data;

    if (!dirty) {
        isClosing = true;
        win.close();
        return;
    }

    // 弹出对话框
    const choice = dialog.showMessageBoxSync(win, {
        type: 'warning',
        // 【关键】：使用渲染层传过来的 buttons，如果没有传则给一个默认兜底
        buttons: buttons || ['Confirm Close', 'Cancel'], 
        defaultId: 1, 
        title: title,
        message: message
    });

    if (choice === 0) { 
        isClosing = true;
        win.close();
    }
});



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
    emojiList: ['⭐', '⚫️', '⚪️', '🧶', '🕸️', '💡'],
    language: 'en-US',
    defaultEmoji: '⭐' 
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


// 修改后的代码
app.on('window-all-closed', () => {
  app.quit(); // 不管是 Mac 还是 Windows，只要窗口关了，程序就直接退出
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
                defaultPath: path.join(app.getPath('documents'), 'my_crochet_project.fccb'),
                filters: [{ name: 'FCCB Project', extensions: ['fccb'] }]
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
        title: 'Open FCCB Project',
        filters: [{ name: 'FCCB Project', extensions: ['fccb'] }],
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


    const defaultFilePath = path.join(app.getPath('documents'), 'my_crochet_project.fccb');
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


// --- 🖼️ 图片转 Excel 工具指令 (Digitizer Tool) ---

ipcMain.handle('run-digitizer', async (event, imagePath) => {
    return new Promise((resolve, reject) => {
        const isDev = !app.isPackaged;
        let pythonExecPath;
        if (isDev) {
            pythonExecPath = 'python3';
        } else {
            const venvPath = path.join(process.resourcesPath, 'venv_dist');
            pythonExecPath = process.platform === 'win32' 
                ? path.join(venvPath, 'Scripts', 'python.exe') 
                : path.join(venvPath, 'bin', 'python');
        }

        const scriptPath = isDev 
            ? path.join(__dirname, 'digitizer.py') 
            : path.join(process.resourcesPath, 'digitizer.py');

        const pythonProcess = spawn(pythonExecPath, [scriptPath, imagePath]);

        let errorMsg = "";
        pythonProcess.stdout.on('data', (data) => console.log(`Python: ${data}`));
        pythonProcess.stderr.on('data', (data) => { errorMsg += data.toString(); });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // 【核心修复】：使用 path.basename 确保只提取文件名，不带路径
                const extension = path.extname(imagePath);
                const pureFileName = path.basename(imagePath, extension); // 得到 "pixel_art_large (1)"
                
                const tempDir = require('os').tmpdir(); 
                // 现在拼接出来的路径是正确的：/var/folders/.../T/pixel_art_large (1)_pattern.xlsx
                const fullTempPath = path.join(tempDir, pureFileName + "_pattern.xlsx");
                
                resolve(fullTempPath); 
            } else {
                reject(new Error(errorMsg || "Python_digitizer_erro"));
            }
        });
    });
});




// --- 修正后的 save-as-path 指令 ---
ipcMain.handle('save-as-path', async (event, tempFilePath) => {
    // 1. 从 Python 返回的那个“隐形路径”中，只提取出文件名
    // 例如：从 "/var/folders/.../my_pattern.xlsx" 提取出 "my_pattern.xlsx"
    const fileName = path.basename(tempFilePath);

    // 2. 构建一个用户一眼就能看到的、合理的默认路径（例如“下载”文件夹）
    // 这样对话框打开时，用户看到的就是 Downloads/my_pattern.xlsx
    const defaultDownloadsPath = path.join(app.getPath('downloads'), fileName);

    const result = await dialog.showSaveDialog({
        defaultPath: defaultDownloadsPath, // <--- 这里是关键：默认指向下载目录 + 文件名
        filters: [{ name: 'Excel Files', extensions: ['xlsx'] }]
    });

    return result.filePath; 
});




const os = require('os');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

ipcMain.handle('move-file', async (event, oldPath, newPath) => {
    try {
        if (oldPath === newPath) return true;

        // 安全检查：source 必须位于系统临时目录内
        const tempDir = path.resolve(os.tmpdir()) + path.sep;
        const resolvedOldPath = path.resolve(oldPath);

        if (!resolvedOldPath.startsWith(tempDir)) {
            throw new Error('Invalid source file path.');
        }

        // 等待临时文件生成完成
        let attempts = 0;
        const maxAttempts = 5;
        let fileReady = false;

        console.log(`[Move] Attempting to move: ${resolvedOldPath}`);

        while (attempts < maxAttempts) {
            if (fs.existsSync(resolvedOldPath)) {
                fileReady = true;
                break;
            }

            attempts++;
            console.log(
                `[Move] File not ready, retrying in 200ms... (Attempt ${attempts}/${maxAttempts})`
            );

            await sleep(200);
        }

        if (!fileReady) {
            throw new Error(
                `File not found after ${maxAttempts} attempts: ${resolvedOldPath}`
            );
        }

        // 确认 source 是普通文件
        const stat = fs.statSync(resolvedOldPath);

        if (!stat.isFile()) {
            throw new Error('Source path is not a regular file.');
        }

        // 保持原来的跨分区移动方式
        fs.copyFileSync(resolvedOldPath, newPath);
        fs.unlinkSync(resolvedOldPath);

        console.log(`[Move] Success: ${newPath}`);
        return true;

    } catch (err) {
        console.error('[Main] Move-file Error:', err.message);
        throw err;
    }
});




// --- 🛠️ 高级模式 (Smart Digitizer) 指令 ---
ipcMain.handle('run-smart-digitizer', async (event, { imagePath, rows, cols, threshold }) => {
    return new Promise((resolve, reject) => {
        const isDev = !app.isPackaged; 


        let pythonExecPath;
        if (isDev) {
            pythonExecPath = 'python3';
        } else {
            const venvPath = path.join(process.resourcesPath, 'venv_dist');
            pythonExecPath = process.platform === 'win32' 
                ? path.join(venvPath, 'Scripts', 'python.exe') 
                : path.join(venvPath, 'bin', 'python');
        }

        const scriptPath = isDev
            ? path.join(__dirname, 'smart_digitizer.py') 
            : path.join(process.resourcesPath, 'smart_digitizer.py');

        const pythonProcess = spawn(pythonExecPath, [scriptPath, imagePath, rows.toString(), cols.toString(), threshold.toString()]);

        let errorMsg = "";
        pythonProcess.stdout.on('data', (data) => console.log(`Smart-Digitizer: ${data}`));
        pythonProcess.stderr.on('data', (data) => { errorMsg += data.toString(); });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // 【核心修复】：使用 path.basename 确保只提取文件名，不带路径
                const extension = path.extname(imagePath);
                const pureFileName = path.basename(imagePath, extension); 
                
                const tempDir = require('os').tmpdir(); 
                const fullTempPath = path.join(tempDir, pureFileName + "_smart_pattern.xlsx");

                resolve(fullTempPath); 
            } else {
                reject(new Error(errorMsg || "erro_smart_digitier_python"));
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


// --- 在文件顶部或 handle 函数上方定义这些配置 ---
const ALLOWED_IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.bmp']);
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 我帮你调到了 100MB，这对于图片来说已经非常巨大了，绝对够用

// --- 修改后的函数 ---
ipcMain.handle('read-file-as-base64', async (event, filePath) => {
    try {
        // 1. 安全检查：将路径解析为绝对路径，防止 "../../" 这种路径穿越攻击
        const resolvedPath = path.resolve(filePath);

        // 2. 检查文件扩展名是否在允许的图片列表中
        const ext = path.extname(resolvedPath).toLowerCase();
        if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
            throw new Error('Unsupported file type. Please select an image.');
        }

        // 3. 获取文件状态（检查是否存在、是否是普通文件、大小是多少）
        const stat = fs.statSync(resolvedPath);

        if (!stat.isFile()) {
            throw new Error('The selected path is not a regular file.');
        }

        // 4. 检查文件大小，防止内存溢出 (DoS攻击)
        if (stat.size > MAX_FILE_SIZE) {
            throw new Error(`File is too large. Max limit is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
        }

        // 5. 读取文件内容
        const data = fs.readFileSync(resolvedPath);

        // 6. 返回 Base64 格式字符串
        // 注意：这里使用 ext.slice(1) 是为了把 ".jpg" 变成 "jpg"
        return `data:image/${ext.slice(1)};base64,${data.toString('base64')}`;

    } catch (err) {
        console.error('[Main] Failed to read image:', err.message);
        // 将错误抛给渲染层，让用户能看到报错（比如“文件太大”或“格式不支持”）
        throw err; 
    }
});



ipcMain.on('set-window-title', (event, title) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.setTitle(title);
});
