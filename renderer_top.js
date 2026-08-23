//  This is an alternative version for top-down crochet direction.
// To use it, rename this file to renderer.js and replace the original.
let isProjectLoaded = false; 
let currentFilePath = null; // 用于记录当前打开的文件路径


const CURRENT_SCHEMA_VERSION = 1; 
// --- 🛠️ 图片转 Excel 工具逻辑 (最终正确版) ---


let selectedImagePath = null; // 用于记录用户选中的本地图片路径
let globalAppSettings = {
    viewCols: 15,
    viewRows: 2,
    cellSize: 40,
    groupSize: 5,
    emojiList: ['⭐', '❤️', '🌸', '🧶', '🕸️', '🌙']
};

function safeSetVal(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.value = value;
    } else {
        console.error(`[Renderer Error] 找不到 ID 为 "${id}" 的元素，无法设置值。请检查 HTML！`);
    }
}


/**
 * 打开工具模态框
 */
function openDigitizerModal() {
    document.getElementById('digitizer-modal').style.display = 'block';
    // 重置状态
    selectedImagePath = null;
    document.getElementById('image-preview-img').style.display = 'none';
    document.getElementById('preview-placeholder').style.display = 'block';
    document.getElementById('btn-start-process').disabled = true;
    document.getElementById('btn-start-process').style.opacity = 0.5;
    document.getElementById('digitizer-status').innerText = window.i18n.t('status_ready');
}


/**
 * 关闭工具模态框
 */
function closeDigitizerModal() {
    document.getElementById('digitizer-modal').style.display = 'none';
}


/**
 * 【核心修复】：专门用来初始化 Digitizer 的所有按钮事件
 */
async function setupDigitizerListeners() {
    const selectBtn = document.getElementById('btn-select-img');
    const startBtn = document.getElementById('btn-start-process');
    const status = document.getElementById('digitizer-status');
    const imgPreview = document.getElementById('image-preview-img');
    const placeholder = document.getElementById('preview-placeholder');

    // 1. 处理“选择图片”按钮
    selectBtn.addEventListener('click', async () => {
        try {
            const filePath = await window.api.openFileDialog({
                filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }]
            });

            if (filePath) {
                selectedImagePath = filePath;
                console.log("Selected:", filePath);

                const base64Data = await window.api.readFileAsBase64(filePath);
                if (base64Data) {
                    imgPreview.src = base64Data;
                    imgPreview.style.display = 'block';
                    placeholder.style.display = 'none';
                    startBtn.disabled = false;
                    startBtn.style.opacity = 1;
                    status.innerText = window.i18n.t('status_img_ready');
                }
            }
        } catch (err) {
            console.error("Select Image Error:", err);
            status.innerText = window.i18n.t('err_select_fail') + " " + err.message;
        }
    });

    // 2. 处理“开始转换”按钮
    startBtn.addEventListener('click', async () => {
        if (!selectedImagePath) return;

        try {
            status.innerText = window.i18n.t('status_processing');
            startBtn.disabled = true;
            startBtn.style.opacity = 0.5;

            const resultPath = await window.api.runDigitizer(selectedImagePath);

            if (resultPath) {
                status.innerText = window.i18n.t('status_success');

                const savePath = await window.api.saveAsPath(resultPath);

                if (savePath) {
                    await window.api.moveFile(resultPath, savePath);
                    status.innerText = window.i18n.t('status_saved');
                } else {
                    status.innerText = window.i18n.t('status_cancelled');
                }
            }
        } catch (err) {
            console.error("Process Error:", err);
            status.innerText = window.i18n.t('err_generic') + " " + err.message;
        } finally {
            startBtn.disabled = false;
            startBtn.style.opacity = 1;
        }
    });
}



// --- [MODULE 1: DATA MODEL] ---
const CrochetModel = {
    grid: [], 
    rowProgress: [], 
    curR: 0,  
    curC: 0,  
    direction: 1, 
    totalRows: 0,
    totalCols: 0,
    notes: "", 

    config: {
        totalRows: 10,
        totalCols: 15,
        viewCols: 15,
        viewRows: 2,
        cellSize: 40,
        arrowWidth: 30,
        groupSize: 5,
        dividerWidth: 2,
        basePatternBg: '#1a1a1a',
        checkerboardLight: '#ecf0f1',
        checkerboardDark: '#bdc3c7',
        firstRowDir: 1, 
        emojiList: ['⭐', '❤️', '🌸', '🧶', '🕸️', '🌙'],
        minimapWidth: 150,  // 新增：小地图默认宽度
        minimapHeight: 150, // 新增：小地图默认高度
        defaultEmoji: '⭐', 
    },

    // 统一的方向计算引擎
    getRowDirection(r) {
        return (r % 2 === 0) ? this.config.firstRowDir : -this.config.firstRowDir;
    },

// --- [MODULE 1: DATA MODEL] --- (找到 init 函数进行替换)
init(incomingGrid = null, customConfig = null) {
    if (customConfig) {
        Object.assign(this.config, customConfig); 
    }
    this.notes = ""; 
    if (incomingGrid && typeof incomingGrid === 'object') {
        // 【修复】：不再强制使用 .reverse()！
        // 因为保存时数据已经是正确的顺序了，加载时直接赋值即可。
        this.grid = incomingGrid; 
        this.totalRows = this.grid.length;
        this.totalCols = this.grid[0].length;
    } else {
        // ... (这里保持原有的创建空白网格的逻辑不变)
        this.totalRows = this.config.totalRows;
        this.totalCols = this.config.totalCols;
        this.grid = [];
        for (let r = 0; r < this.totalRows; r++) {
            let row = [];
            for (let c = 0; c < this.totalCols; c++) {
                let baseColor = ((r + c) % 2 === 0) ? this.config.checkerboardLight : this.config.checkerboardDark;
                row.push({ color: baseColor, isDone: false, emoji: null });
            }
            this.grid.push(row);
        }
    }
    // 注意：curR 和 curC 的赋值被移到了 loadProject 逻辑中，这里只做默认初始化
    this.curR = 0; 
    this.curC = 0;
    this.rowProgress = new Array(this.totalRows).fill(-1);
    this.direction = (this.curR % 2 === 0) ? this.config.firstRowDir : -this.config.firstRowDir;
},


    /**
     * 【前进逻辑】：向上推进水位
     */
    advance(r, c) {
        const rowDir = this.getRowDirection(r);

        // 1. 处理当前行的水平填充
        if (rowDir === 1) {
            for (let i = 0; i <= c; i++) this.grid[r][i].isDone = true;
            if (c > this.rowProgress[r]) this.rowProgress[r] = c;
        } else {
            for (let i = c; i < this.totalCols; i++) this.grid[r][i].isDone = true;
            if (this.rowProgress[r] === -1 || c < this.rowProgress[r]) {
                this.rowProgress[r] = c;
            }
        }

        // 2. 【纵向联动】：水位上升，下面所有的行 (索引比 r 小) 全部设为已完成
        for (let lowerR = 0; lowerR < r; lowerR++) {
            for (let colIdx = 0; colIdx < this.totalCols; colIdx++) {
                this.grid[lowerR][colIdx].isDone = true;
            }
            // 下面的行现在是全满状态，根据方向设置进度
            this.rowProgress[lowerR] = (rowDir === 1) ? this.totalCols - 1 : 0;
        }
    },

    /**
     * 【回退逻辑】：向下降低水位
     */
    rewind(r, c) {
        const rowDir = this.getRowDirection(r);
        const lastIdx = this.rowProgress[r];
        if (lastIdx === -1) return;

        // 1. 处理当前行的水平撤销
        if (rowDir === 1) {
            for (let i = c; i < this.totalCols; i++) {
                this.grid[r][i].isDone = false;
            }
            this.rowProgress[r] = c - 1;
        } else {
            for (let i = 0; i <= c; i++) {
                this.grid[r][i].isDone = false;
            }
            this.rowProgress[r] = c + 1;
        }

        // 2. 【纵向联动】：水位下降，上面所有的行 (索引比 r 大) 全部取消完成状态
        // 因为你撤销了这一层，那么依赖于这一层的“高层建筑”必须全部拆除
        for (let higherR = r + 1; higherR < this.totalRows; higherR++) {
            for (let colIdx = 0; colIdx < this.totalCols; colIdx++) {
                this.grid[higherR][colIdx].isDone = false;
            }
            // 重置上面行的进度
            this.rowProgress[higherR] = -1;
        }
    },

    toggleEmoji(r, c) {
        // 【核心修改】：不再使用 emojiList[0]，而是使用 config.defaultEmoji
        const targetEmoji = this.config.defaultEmoji || '⭐';
        this.grid[r][c].emoji = this.grid[r][c].emoji ? null : targetEmoji;
    }
};




// --- [MODULE 2: RENDERER] ---
const CrochetRenderer = {
    mainCanvas: null,
    ctx: null,
    miniCanvas: null,
    miniCtx: null,
    miniViewRect: null,
    config: {},

initCanvas(canvas, miniCanvas) {
    this.mainCanvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.miniCanvas = miniCanvas;
    this.miniCtx = miniCanvas.getContext('2d');
    this.miniViewRect = document.getElementById('minimap-view-rect');

    // 【新增】：获取设备的像素比 (例如 Retina 屏通常是 2)
    this.dpr = window.devicePixelRatio || 1;
},


    renderAll(model) {
        this.config = model.config;
        document.getElementById('coord-val').innerText = `R${model.curR + 1}, C${model.curC + 1}`;
        const dirText = (model.direction === 1) ? "L → R" : "R ← L";
        document.getElementById('dir-val').innerText = dirText;
        const groupNum = Math.floor(model.curC / this.config.groupSize) + 1;
        const totalGroups = Math.ceil(model.totalCols / this.config.groupSize);
        document.getElementById('group-val').innerText = `${groupNum} / ${totalGroups}`;


        this.updateHUD(model);
        document.body.style.backgroundColor = this.config.basePatternBg;

        this.drawMainView(model);
        this.drawUIOverlay(model);
        this.drawMinimap(model);
        this.updateMinimapIndicator(model);
    },

        updateHUD(model) {
        // A. 更新进度数字 (例如 "12 / 50")
        const progressElem = document.getElementById('progress-val');
        if (progressElem) {
            // 计算已填满的行数
            const completedRows = model.grid.filter(row => row.every(cell => cell.isDone)).length;
            progressElem.innerText = `${completedRows} / ${model.totalRows}`;
        }

        // B. 更新时间戳 (YYYY-MM-DD HH:mm)
        const timeElem = document.getElementById('time-val');
        if (timeElem) {
            const now = new Date();
            const y = now.getFullYear();
            const m = String(now.getMonth() + 1).padStart(2, '0');
            const d = String(now.getDate()).padStart(2, '0');
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            timeElem.innerText = `${y}-${m}-${d} ${hh}:${mm}`;
        }
    },

// --- [MODULE 2: RENDERER] --- (请完整替换这两个函数)

drawMainView(model) {
    const ctx = this.ctx;
    const config = this.config;
    const canvas = this.mainCanvas;
    const OFFSET = 35; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 【核心修改】：计算当前视图窗口的起始行 (startR)
    // 我们希望 curR 出现在视野的底部，所以 startR 是 curR 减去视图高度
    let startR = model.curR - config.viewRows + 1;
    if (startR < 0) startR = 0; // 防止索引变成负数

    // 【核心修改】：现在的循环是“加法模式”
    for (let vRowIdx = 0; vRowIdx < config.viewRows; vRowIdx++) {
        let rIdx = startR + vRowIdx; // 随着视觉行号增加，数组索引也增加

        // 如果超过了总行数，就停止绘制
        if (rIdx >= model.totalRows) break;

        for (let vCol = 0; vCol < config.viewCols; vCol++) {
            let cIdx = model.curC + vCol;
            if (cIdx >= model.totalCols) break;

            const cell = model.grid[rIdx][cIdx];
            const x = config.cellSize * 1.5 + (vCol * config.cellSize);
            // Y坐标随 visualRowIdx 增加而增加，实现从上往下排
            const y = OFFSET + (vRowIdx * config.cellSize);

            ctx.fillStyle = cell.color;
            ctx.fillRect(x, y, config.cellSize, config.cellSize);

            if (cell.isDone) {
                ctx.fillStyle = config.completionColor;
                ctx.fillRect(x, y, config.cellSize, config.cellSize);
            }

            // 绘制边框和分割线 (保持你原来的逻辑不变)
            ctx.strokeStyle = '#dfe6e9'; 
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, config.cellSize, config.cellSize);

            const isFirstInGroup = (cIdx % config.groupSize === 0);
            const isLastInGroup = ((cIdx + 1) % config.groupSize === 0);
            if (isFirstInGroup || isLastInGroup) {
                ctx.strokeStyle = config.dividerColor;
                ctx.lineWidth = config.dividerWidth;
                ctx.beginPath();
                if (isFirstInGroup) { ctx.moveTo(x, y); ctx.lineTo(x, y + config.cellSize); }
                if (isLastInGroup) { ctx.moveTo(x + config.cellSize, y); ctx.lineTo(x + config.cellSize, y + config.cellSize); }
                ctx.stroke();
            }

            if (cell.emoji) {
                ctx.font = `${config.cellSize * 0.7}px Arial`;
                ctx.textAlign = "center"; ctx.textBaseline = "middle";
                ctx.fillStyle = "#2c3e50";
                ctx.fillText(cell.emoji, x + config.cellSize/2, y + config.cellSize/2);
            }
        }
    }
},




drawUIOverlay(model) {
    const ctx = this.ctx;
    const config = this.config;
    const canvas = this.mainCanvas;
    const sideMargin = config.cellSize * 1.5;
    const OFFSET = 35;

    // 【核心】：计算当前视图的起始行，与 drawMainView 保持完全一致
    let startR = model.curR - config.viewRows + 1;
    if (startR < 0) startR = 0;

    // --- 1. 行号与箭头 (绘制在格子的两侧) ---
    for (let vRowIdx = 0; vRowIdx < config.viewRows; vRowIdx++) {
        const rIdx = startR + vRowIdx; // 随视觉行数递增
        if (rIdx >= model.totalRows) break;

        // Y坐标计算：OFFSET 是顶部预留空间，vRowIdx 决定了在视野中的高度
        const y = OFFSET + (vRowIdx * config.cellSize) + (config.cellSize / 2);

        ctx.font = `bold ${config.cellSize * 0.37}px Arial`;
        ctx.fillStyle = "#95a5a6";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";

        // 行号 (左侧和右侧)
        ctx.fillText(rIdx + 1, sideMargin * 0.3, y);
        ctx.fillText(rIdx + 1, canvas.width - (sideMargin * 0.3), y);

        // 箭头 (根据该行的方向计算颜色和符号)
        const rowDir = model.getRowDirection(rIdx);
        const arrowIcon = rowDir === 1 ? "→" : "←";
        const arrowColor = rowDir === 1 ? "#3498db" : "#e74c3c";
        ctx.font = `bold ${config.cellSize * 0.5}px Arial`;
        ctx.fillStyle = arrowColor;
        ctx.fillText(arrowIcon, sideMargin * 0.6, y);
        ctx.fillText(arrowIcon, canvas.width - (sideMargin * 0.6), y);
    }

    // --- 2. 顶部/底部标尺 (Ruler) 部分 ---
    // 这部分逻辑主要基于列 (Column)，不随行号变化，保持原样即可
    const rulerFontSize = config.cellSize * 0.35;
    const dotRadius = config.cellSize * 0.05;
    const groupLabelStyle = { color: "#e67e22", fontSize: rulerFontSize * 0.9 };
    const viewWidthLimit = sideMargin + (config.viewCols * config.cellSize) + 5;

    // A. 顶部倒序标尺
    const topRulerY = OFFSET / 2; 
    ctx.font = `bold ${rulerFontSize}px Arial`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";

    for (let cIdx = 0; cIdx <= model.totalCols; cIdx += config.groupSize) {
        if (cIdx >= model.curC && cIdx <= model.curC + config.viewCols) {
            const visualCol = cIdx - model.curC;
            const x = sideMargin + (visualCol * config.cellSize);
            const reverseValue = model.totalCols - cIdx;

            ctx.font = `bold ${rulerFontSize}px Arial`;
            ctx.fillStyle = "#95a5a6";
            ctx.fillText(reverseValue, x, topRulerY);
            ctx.beginPath();
            ctx.arc(x, topRulerY + (rulerFontSize * 0.7), dotRadius, 0, Math.PI * 2);
            ctx.fill();

        }
    }

    // B. 底部正向标尺
    const bottomRulerY = canvas.height - (OFFSET / 2);
    for (let cIdx = 0; cIdx <= model.totalCols; cIdx += config.groupSize) {
        if (cIdx >= model.curC && cIdx <= model.curC + config.viewCols) {
            const visualCol = cIdx - model.curC;
            const x = sideMargin + (visualCol * config.cellSize);
            ctx.font = `bold ${rulerFontSize}px Arial`;
            ctx.fillStyle = "#7f8c8d";
            ctx.fillText(cIdx, x, bottomRulerY);
            ctx.beginPath();
            ctx.arc(x, bottomRulerY + (rulerFontSize * 0.7), dotRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 小组号绘制逻辑（保持原样，因为它们只依赖 cIdx）
    const totalGroups = Math.ceil(model.totalCols / config.groupSize);
    for (let i = 0; i < totalGroups; i++) {
        const cStart = i * config.groupSize;
        const xMid = sideMargin + ((cStart + config.groupSize / 2) - model.curC) * config.cellSize;
        if (xMid >= sideMargin - 10 && xMid <= viewWidthLimit) {
            // 顶部小组号倒序显示
            ctx.font = `bold ${groupLabelStyle.fontSize}px Arial`;
            ctx.fillStyle = groupLabelStyle.color;
            ctx.fillText(totalGroups - i, xMid, topRulerY + (rulerFontSize * 0.3));


            // 底部小组号正序显示
            ctx.fillText(i + 1, xMid, bottomRulerY + (rulerFontSize * 0.3));
                   
            // 2. 画下方的小三角 ▼
        const triSize = dotRadius * 1.5;
        ctx.beginPath();
        ctx.moveTo(xMid, topRulerY + (rulerFontSize * 0.6)); // 三角顶点
        ctx.lineTo(xMid - triSize, topRulerY + (rulerFontSize * 0.6) + triSize); // 左下
        ctx.lineTo(xMid + triSize, topRulerY + (rulerFontSize * 0.6) + triSize); // 右下
        ctx.closePath();
        ctx.fill();
       
        ctx.beginPath();
        ctx.moveTo(xMid, bottomRulerY + (rulerFontSize * 0.6)); // 三角顶点
        ctx.lineTo(xMid - triSize, bottomRulerY + (rulerFontSize * 0.6) + triSize); // 左下
        ctx.lineTo(xMid + triSize, bottomRulerY + (rulerFontSize * 0.6) + triSize); // 右下
        ctx.closePath();
        ctx.fill();
        }
    }
},









// --- [MODULE 2: RENDERER] --- (找到 drawMinimap 函数进行替换)

drawMinimap(model) {
    const miniCtx = this.miniCtx;
    const miniCanvas = this.miniCanvas;
    const baseCompletionColor = model.config.completionColor;

    miniCtx.clearRect(0, 0, miniCanvas.width, miniCanvas.height);

    for (let r = 0; r < model.totalRows; r++) {
        for (let c = 0; c < model.totalCols; c++) {
            const cell = model.grid[r][c];
            const miniX = c;
            const miniY = r; // 【核心修改】：直接使用行索引，不再翻转

            if (cell.isDone) {
                const parts = baseCompletionColor.match(/\d+/g);
                if (parts && parts.length >= 3) {
                    miniCtx.fillStyle = `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, 0.7)`;
                } else {
                    miniCtx.fillStyle = baseCompletionColor;
                }
            } else {
                miniCtx.fillStyle = cell.color;
            }
            miniCtx.fillRect(miniX, miniY, 1, 1);
        }
    }
},




updateMinimapIndicator(model) {
    const config = this.config;
    const modelTotalRows = model.totalRows;
    const viewRows = config.viewRows;
    const viewCols = config.viewCols;
    const modelTotalCols = model.totalCols;

    // 1. 计算宽度百分比 (保持不变)
    const viewWidthPercent = (viewCols / modelTotalCols) * 100;
    
    // 2. 计算高度百分比 (保持不变)
    const viewHeightPercent = (viewRows / modelTotalRows) * 100;

    // 3. 【核心修改】：计算顶部边缘的百分比位置
    // 我们要找的是：当前视野窗口的最顶端所在的行索引。
    // 根据 drawMainView 的逻辑，起始行 startR = max(0, curR - viewRows + 1)
    let startR = model.curR - viewRows + 1;
    if (startR < 0) startR = 0;

    // 计算这个起始行在整个模型中的百分比位置
    let topPercent = (startR / modelTotalRows) * 100;

    // 4. 计算左侧边缘的百分比 (保持不变)
    const leftPercent = (model.curC / model.totalCols) * 100;

    // 5. 应用到样式
    this.miniViewRect.style.width = `${viewWidthPercent}%`;
    this.miniViewRect.style.height = `${viewHeightPercent}%`;
    this.miniViewRect.style.left = `${leftPercent}%`;
    this.miniViewRect.style.top = `${topPercent}%`;
},



resize(model) {
    const config = model.config;
    const OFFSET = 35; // 顶部和底部预留的空间高度
    
    // 宽度：侧边距 + 格子总宽 + 侧边距
    this.mainCanvas.width = (config.viewCols * config.cellSize) + (config.cellSize * 3);
    
    // 高度：顶部空间 + 格子实际高度 + 底部空间
    this.mainCanvas.height = OFFSET + (config.viewRows * config.cellSize) + OFFSET;

    this.miniCanvas.width = model.totalCols;
    this.miniCanvas.height = model.totalRows;
},



};




// --- [MODULE 3: INTERACTION] ---
const InteractionManager = {
    init(model, renderer, canvas) {
        this.model = model;
        this.renderer = renderer;
        this.canvas = canvas;

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        canvas.addEventListener('dblclick', (e) => this.handleDoubleClick(e));
        
        canvas.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); }, false);
        canvas.addEventListener('dragenter', (e) => { e.preventDefault(); e.stopPropagation(); }, false);
        canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleDrop(e);
        }, false);

        // 【关键修复】：绑定 Emoji 拖拽数据
        this.bindEmojiDragEvents();

        const notesArea = document.getElementById('project-notes');
        if (notesArea) {
            notesArea.addEventListener('input', () => {
                syncNotesToModel(notesArea); // 调用我们后面定义的函数
            });
        }
    },

    bindEmojiDragEvents() {
        document.querySelectorAll('.emoji-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData("text/plain", e.target.innerText);
                e.dataTransfer.effectAllowed = "copy";
            });
        });
    },

handleKeyDown(e) {
    const m = this.model;
    const config = this.renderer.config;

    // Ctrl + S 保存逻辑保持不变
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject();
        return;
    }

    switch(e.key) {
        case 'ArrowRight': 
            // 向右移动，限制在视野范围内
            if (m.curC < m.totalCols - config.viewCols) m.curC++; 
            break;
        case 'ArrowLeft':  
            // 向左移动
            if (m.curC > 0) m.curC--; 
            break;
        case 'ArrowUp':    
            // 【修正】：向上走应该是减小行索引
            if (m.curR > 0) m.curR--; 
            break;
        case 'ArrowDown':  
            // 【修正】：向下走应该是增加行索引
            if (m.curR < m.totalRows - 1) m.curR++; 
            break;
    }

    // 更新方向状态并重新渲染
    m.direction = m.getRowDirection(m.curR);
    this.renderer.renderAll(m);
},


// --- 请在 InteractionManager 对象内替换这两个函数 ---

handleMouseDown(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const config = this.renderer.config;
    const OFFSET = 35;
    const sideMargin = config.cellSize * 1.5;

    // 边界检查
    if (mouseX < sideMargin || mouseX > this.canvas.width - sideMargin || mouseY < OFFSET) return;

    // 1. 计算列索引
    let vCol = Math.floor((mouseX - sideMargin) / config.cellSize);
    let realC = this.model.curC + vCol;

    // 2. 【核心修改】：计算行索引 (从加法模式转换过来)
    let visualRowIdx = Math.floor((mouseY - OFFSET) / config.cellSize);
    
    // 计算当前视图窗口的起始行 (必须与 drawMainView 完全一致)
    let startR = Math.max(0, this.model.curR - config.viewRows + 1);
    let rIdx = startR + visualRowIdx;

    if (rIdx < 0 || rIdx >= this.model.totalRows) return;

    if (e.button === 0) { // 左键单击：前进
        this.model.advance(rIdx, realC);
    } else if (e.button === 2) { // 右键点击：切换 Emoji
        this.model.toggleEmoji(rIdx, realC);
    }
    this.renderer.renderAll(this.model);
},

handleDoubleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const config = this.renderer.config;
    const OFFSET = 35;
    const sideMargin = config.cellSize * 1.5;

    if (mouseX < sideMargin || mouseX > this.canvas.width - sideMargin || mouseY < OFFSET) return;

    let vCol = Math.floor((mouseX - sideMargin) / config.cellSize);
    let realC = this.model.curC + vCol;

    // 【核心修改】：计算行索引 (必须与 handleMouseDown 完全一致)
    let visualRowIdx = Math.floor((mouseY - OFFSET) / config.cellSize);
    let startR = Math.max(0, this.model.curR - config.viewRows + 1);
    let rIdx = startR + visualRowIdx;

    if (rIdx < 0 || rIdx >= this.model.totalRows) return;

    this.model.rewind(rIdx, realC); // 双击是回退逻辑
    this.renderer.renderAll(this.model);
},




handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    let emoji = e.dataTransfer.getData("text/plain");
    if (!emoji) return;

    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const config = this.renderer.config;

    const OFFSET = 35; // 必须与渲染器一致
    const sideMargin = config.cellSize * 1.5;

    // 边界检查：如果落在标尺区域，不执行放置
    if (mouseX < sideMargin || mouseX > this.canvas.width - sideMargin || mouseY < OFFSET) {
        return;
    }

    let vCol = Math.floor((mouseX - sideMargin) / config.cellSize);
    let realC = this.model.curC + vCol;
    
    // 【核心】：计算视觉行时，必须减去 OFFSET 偏移量
    let visualRowIdx = Math.floor((mouseY - OFFSET) / config.cellSize);
    let startR = Math.max(0, this.model.curR - config.viewRows + 1);
    let rIdx = startR + visualRowIdx;

    if (rIdx >= 0 && rIdx < this.model.totalRows && realC >= 0 && realC < this.model.totalCols) {
        this.model.grid[rIdx][realC].emoji = emoji;
        this.renderer.renderAll(this.model);
    }
},


};


// --- [MAIN APP CONTROLLER] ---

async function initApp() {
    const canvasElement = document.getElementById('mainCanvas');

    try {
        const savedSettings = await window.api.getGlobalConfig();
        globalAppSettings = savedSettings; 
    } catch (err) {
        console.error("Failed to load global settings, using defaults.", err);
    }

    CrochetModel.config = {
        ...CrochetModel.config,
        viewCols: globalAppSettings.viewCols,
        viewRows: globalAppSettings.viewRows,
        cellSize: globalAppSettings.cellSize,
        groupSize: globalAppSettings.groupSize,
        emojiList: globalAppSettings.emojiList,
        defaultEmoji: globalAppSettings.defaultEmoji || '⭐'
    };
    if (window.i18n && globalAppSettings.language) {
        window.i18n.setLang(globalAppSettings.language); 
    } else if (window.i18n) {
        window.i18n.init(); // 如果读取失败，才使用 i18n.js 里的默认值
    }
    CrochetModel.init();
    const miniContainer = document.getElementById('minimap-container');
    if (miniContainer) {
        miniContainer.style.width = CrochetModel.config.minimapWidth + "px";
        miniContainer.style.height = CrochetModel.config.minimapHeight + "px";
    }
    CrochetRenderer.initCanvas(canvasElement, document.getElementById('minimap-canvas'));
    CrochetRenderer.resize(CrochetModel);
    InteractionManager.init(CrochetModel, CrochetRenderer, canvasElement);

    await setupDigitizerListeners(); 
    await setupSmartDigitizerListeners(); 
    applyTheme('minimalist'); 
    updateEmojiPalette(); 
    CrochetRenderer.renderAll(CrochetModel);
    updateButtonStates(); 
        if (window.i18n) {
        window.i18n.init();
    }
}


// --- API 桥接 ---

async function saveProject() {
    const notesArea = document.getElementById('project-notes');
    if (notesArea) syncNotesToModel(notesArea);

    const projectData = {
        schema_version: CURRENT_SCHEMA_VERSION, 
        grid: CrochetModel.grid,
        rowProgress: CrochetModel.rowProgress,
        currentProgress: {
            curR: CrochetModel.curR,
            curC: CrochetModel.curC,
            direction: CrochetModel.direction
        },
        config: CrochetModel.config,
        notes: CrochetModel.notes
    };

    try {
        const result = await window.api.saveFile({
            data: projectData,
            filePath: currentFilePath
        });

        if (result && result.success) {
            currentFilePath = result.path; 
            console.log("Project successfully saved to:", currentFilePath); 
            const fileName = result.path.split(/[\\/]/).pop();
            window.api.setWindowTitle(`${window.i18n.t('app_title')} --- ${fileName}`);

            const hud = document.getElementById('hud');
            const originalBg = hud.style.background;
            hud.style.transition = "background 0.3s";
            hud.style.background = "#27ae60";
            setTimeout(() => { hud.style.background = originalBg; }, 500);

            isProjectLoaded = true;
            updateButtonStates();
        } else {
            const errorReason = result?.error || "Unknown Error";
            alert(window.i18n.t('alert_save_fail') + errorReason);
        }

    } catch (err) {
        console.error("Critical Save Error:", err);
        alert(window.i18n.t('alert_critical_error'));
    }
}





// --- [MAIN APP CONTROLLER] --- (找到 loadProject 函数进行替换)
async function loadProject() {
    try {
        const result = await window.api.openFile();
        if (result && result.success) {
            let loadedData = result.data;
                // --- 【核心修改：版本检查与自动迁移逻辑】 ---

            // 情况 1: 如果文件里根本没有 schema_version 字段 (说明是改代码前的旧文件, 即 v0)
            if (!loadedData.schema_version) {
                console.log("Legacy (v0) format detected. Performing automatic upgrade...");
                
                loadedData.schema_version = 1;
            } 
            // 情况 2: 如果版本号比当前软件要求的还要高 (用户用了未来的版本)
            else if (loadedData.schema_version > CURRENT_SCHEMA_VERSION) {
                alert("This file was created by a newer version of the software. Please upgrade your app to avoid data corruption!");
                return; // Abort loading
            } 
            // 情况 3: 版本完全匹配 (已经是 v1)
            else {
                console.log(`Standard format (v${loadedData.schema_version}) detected.`);
            }

            CrochetModel.init(loadedData.grid, null); 
            CrochetModel.notes = loadedData.notes || "";
            CrochetModel.config = loadedData.config || CrochetModel.config;

            const progress = loadedData.currentProgress; // 使用 loadedData
            if (progress) {
                CrochetModel.curR = progress.curR;
                CrochetModel.curC = progress.curC;
                CrochetModel.direction = progress.direction;
            }

            // 使用 loadedData 获取行进度
            CrochetModel.rowProgress = loadedData.rowProgress || new Array(CrochetModel.totalRows).fill(-1);

            // 使用 loadedData 获取路径信息
            if (loadedData.path) {
                const fileName = loadedData.path.split(/[\\/]/).pop();
                window.api.setWindowTitle(`${window.i18n.t('app_title')} --- ${fileName}`);
            }

            // 渲染逻辑...
            CrochetRenderer.resize(CrochetModel);
            CrochetRenderer.renderAll(CrochetModel);
            currentFilePath = result.path;     
            isProjectLoaded = true;
            updateButtonStates();

            const notesArea = document.getElementById('project-notes');
            if (notesArea) syncModelToNotesUI(notesArea);

        }
    } catch (err) {
        console.error("Load failed:", err);
    }
}


async function importExcel() {
    try {
        const result = await window.api.importExcel();
        if (result && result.success) {
            const mirroredGrid = [...result.grid].reverse();
            CrochetModel.init(mirroredGrid, null); 
            const grid = result.grid; 
        
            CrochetModel.init(grid, null); 

            if (result.rows && result.cols) {
                CrochetModel.totalRows = result.rows;
                CrochetModel.totalCols = result.cols;
            }

            CrochetModel.rowProgress = new Array(CrochetModel.totalRows).fill(-1);
            CrochetRenderer.resize(CrochetModel);
            CrochetRenderer.renderAll(CrochetModel);

            isProjectLoaded = true; 
            updateButtonStates();    
        }
    } catch (err) { 
        console.error("Import error:", err); 
    }
}




// --- [SETTINGS MANAGEMENT] ---




/**
 * 辅助函数：生成色块 HTML 并绑定点击事件
 * @param {string} containerId - HTML 容器 ID
 * @param {string} type - 类型 ('bg', 'div', 'comp')
 * @param {Array} colors - 颜色数组
 */
function renderSwatches(containerId, type, colors) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; 

    colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'swatch';
        // 处理颜色格式，确保能显示出来
        const displayColor = color.startsWith('#') || color.startsWith('rgba') ? color : '#ffffff';
        swatch.style.backgroundColor = displayColor;

        // 如果是第一个，标记为“当前激活”
        if (index === 0) swatch.classList.add('active');

        // 如果是最后一个，显示自定义图标
        if (index === colors.length - 1) {
            swatch.innerHTML = '🎨';
            swatch.classList.add('custom-trigger');
        }

        swatch.onclick = (e) => {
            e.stopPropagation();
            const targetId = type === 'bg' ? 'set-bgCol' : (type === 'div' ? 'set-divCol' : 'set-compCol');
            const input = document.getElementById(targetId);

            if (index === colors.length - 1) {
                // 点击最后一个，触发隐藏的 color input
                input.click();
            } else {
                // 点击普通色块，直接更新输入框并刷新预览
                input.value = colorToHex(color);
                updatePreview();
                
                // 更新所有兄弟节点的 active 状态 (可选)
                Array.from(container.children).forEach(child => child.classList.remove('active'));
                swatch.classList.add('active');
            }
        };

        container.appendChild(swatch);
    });
}



function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}






function updateEmojiPalette() {
    const palette = document.getElementById('emoji-palette');
    if (!palette) return;

    // 标题不再直接写在 HTML 里，而是由 CSS 的 card-label 管理
    let html = '';

    CrochetModel.config.emojiList.forEach(emoji => {
        // 我们把 emoji 包裹在一个名为 emoji-tile 的卡片里
        html += `
            <div class="emoji-tile" draggable="true" title="${emoji}">
                ${emoji}
            </div>`;
    });

    palette.innerHTML = html;

    // 【关键】：重新绑定拖拽事件到新的 .emoji-tile 上
    document.querySelectorAll('.emoji-tile').forEach(item => {
        item.addEventListener('dragstart', (e) => {
            // 获取卡片里的文本内容（即 emoji 本身）
            const emojiContent = e.target.innerText;
            e.dataTransfer.setData("text/plain", emojiContent);
            e.dataTransfer.effectAllowed = "copy";
        });
    });
}


function colorToHex(color) {
    if (color.startsWith('#')) return color;
    return '#ffffff'; 
}

function rgbToHex(rgb) {
    const match = rgb.match(/\d+/g);
    if (!match) return '#ffffff';
    return "#" + match.slice(0,3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
}


// --- [NEW THEME SYSTEM] ---

const THEMES = {
    // ============================================================
    // 🌅 【晨曦维度】 - 明亮、干净、高对比度线条 (使用深色线)
    // ============================================================

    // 1. [新] 极简纸质 (Minimalist Paper)
    minimalist: {
        bg: '#FCFAF2',         
        divider: '#d07d00',    // 【修正】：从浅灰改为深陶土色，线条清晰可见
        dividerW: 2,
        comp: '#4A90E2',       
    },

    // 2. 北欧之风 (Nordic Calm)
    nordic: {
        bg: '#F1F5F9',         
        divider: '#0a2449',    // 【修正】：从淡蓝灰改为深石板蓝，强化轮廓
        dividerW: 2,
        comp: '#0EA5E9',       
    },

    // 3. 薰衣草梦境 (Lavender Dream)
    lavender: {
        bg: '#FAF5FF',         
        divider: '#7C3AED',    // 【修正】：从淡紫色改为深丁香紫，极其锐利
        dividerW: 2,
        comp: '#A855F7',       
    },

    // ============================================================
    // 🌿 【午后维度】 - 自然、温暖、高对比度线条 (使用深色线)
    // ============================================================

    // 4. 自然森林 (Nature Breeze)
    nature: {
        bg: '#F0FDF4',         
        divider: '#166534',    // 【修正】：从浅绿改为深森林绿，界限分明
        dividerW: 3,
        comp: '#16A34A',       
    },

    // 5. 复古织物 (Vintage Textile)
    retro: {
        bg: '#F5E6CA',         
        divider: '#78350F',    // 【修正】：保持深琥珀棕，非常有质感
        dividerW: 3,
        comp: '#B91C1C',       
    },

    // 6. 落日余晖 (Golden Hour)
    sunset: {
        bg: '#fae4caf6',         
        divider: '#ec8900',    // 【修正】：从橘线改为深赭石色，线条感更强
        dividerW: 3,
        comp: '#bc8fff',       
    },

    // ============================================================
    // 🌙 【深夜维度】 - 深邃、专注、高对比度亮线 (使用霓虹/亮色线)
    // ============================================================

    // 7. 深海暗夜 (Deep Sea Night)
    dark: {
        bg: '#0F172A',         
        divider: '#0c0092',    // 【修正】：从板岩灰改为亮天蓝色，在深蓝底色上闪耀
        dividerW: 3,
        comp: '#38BDF8',       
    },

    // 8. 幽暗森林 (Midnight Forest)
    forestDark: {
        bg: '#064E3B',         
        divider: '#b43301',    // 【修正】：从暗绿改为亮翠绿色，像发光的植物脉络
        dividerW: 3,
        comp: '#34D399',       
    },

    // 9. 赛博霓虹 (Cyber Neon)
    cyber: {
        bg: '#050505',         
        divider: '#ecef17',    // 【修正】：从深灰改为霓虹粉，极致的视觉冲击力
        dividerW: 3,
        comp: '#FF00FF',       
    }
};



/**
 * 专业配色库 (Palettes)
 * 规则：每个数组包含 8 个精心挑选的颜色 + 第 9 个为 '🎨'
 */
const COLOR_PALETTES = {
    // 背景色：全部采用低饱和度、柔和的“纸张感”色彩
    backgrounds: [
        '#FDFCF0', // 1. 象牙奶油 (极浅)
        '#FAF9F6', // 2. 亚麻织物
        '#F5F5DC', // 3. 温暖米色
        '#EAE7DC', // 4. 砂石色
        '#DCD7C9', // 5. 燕麦灰 (中性)
        '#A89F91', // 6. 暖陶土灰
        '#34495E', // 7. 石板蓝 (深色系开始)
        '#2C3E50', // 8. 深海蓝
        '#1A1A1A',  // 9. 软黑 (极深)
        '🎨'       // 自定义触发器
    ],

    // 分割线：一半是深沉的颜色，一半是高对比度的跳跃色
    dividers: [
        '#0D47A1', // 1. 深邃海蓝 (Deep Navy)
        '#00E5FF', // 2. 电光青 (Vibrant Cyan - 亮眼但不浅)
        '#004D40', // 3. 深邃墨绿 (Deep Teal)
        '#00FF88', // 4. 极光绿 (Vibrant Spring Green)
        '#880E4F', // 5. 深沉酒红 (Deep Wine)
        '#FF0055', // 6. 霓虹玫红 (Vibrant Rose)
        '#4A148C', // 7. 深邃紫罗兰 (Deep Violet)
        '#D500F9', // 8. 极光紫 (Vibrant Magenta)
        '#111111',  // 9. 曜石黑 (Sharp Obsidian - 用于最高强度的界定)
        '🎨'       // 自定义触发器
    ],

    // 完成色：保持高饱和度，因为有 0.5 透明度加持，看起来会非常高级
    completions: [
        '#00E5FF', // 1. 电光青 
        '#58D68D', // 2. 嫩芽绿 (浅)
        '#2980B9', // 3. 蓝宝石 (深)
        '#AED6F1', // 4. 天空蓝 (浅)
        '#8E44AD', // 5. 紫水晶 (深)
        '#D7BDE2', // 6. 薰衣草 (浅)
        '#C0392B', // 7. 红宝石 (深)
        '#F1948A', // 8. 珊瑚红 (浅)
        '#F39C12',  // 9. 琥珀金 (点睛之笔)
        '🎨'       // 自定义触发器
    ]
};



// --- [SETTINGS MANAGEMENT] ---

function openSettings() {

    const config = CrochetModel.config;

    // 使用 safeSetVal 代替直接的 .value = ...
    safeSetVal('set-viewCols', config.viewCols);
    safeSetVal('set-viewRows', config.viewRows);
    safeSetVal('set-groupSize', config.groupSize);
    safeSetVal('set-firstDir', config.firstRowDir);
    safeSetVal('set-divWidth', config.dividerWidth);

    // 颜色输入框
    safeSetVal('set-bgCol', colorToHex(config.basePatternBg)); 
    safeSetVal('set-divCol', colorToHex(config.dividerColor));
    safeSetVal('set-compCol', rgbaToHex(config.completionColor));
    safeSetVal('set-cellSize', config.cellSize || 40);

    // 其他
    safeSetVal('set-emojis', config.emojiList.join(','));
    safeSetVal('set-miniW', config.minimapWidth);
    safeSetVal('set-miniH', config.minimapHeight);

    // 渲染 Swatches
    renderSwatches('bg-swatches', 'bg', COLOR_PALETTES.backgrounds);
    renderSwatches('div-swatches', 'div', COLOR_PALETTES.dividers);
    renderSwatches('comp-swatches', 'comp', COLOR_PALETTES.completions);

    // 显示模态框并启动预览
    document.getElementById('settings-modal').style.display = 'block';
    updatePreview();
}


function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

async function applySettings() {
    const config = CrochetModel.config;

    // 1. 更新数值配置
    config.viewCols = parseInt(document.getElementById('set-viewCols').value);
    config.viewRows = parseInt(document.getElementById('set-viewRows').value);
    config.groupSize = parseInt(document.getElementById('set-groupSize').value);
    config.firstRowDir = parseInt(document.getElementById('set-firstDir').value);
    config.dividerWidth = parseInt(document.getElementById('set-divWidth').value);

    // 2. 更新颜色配置
    config.basePatternBg = document.getElementById('set-bgCol').value;
    config.dividerColor = document.getElementById('set-divCol').value;
    config.cellSize = parseInt(document.getElementById('set-cellSize').value) || 40;
    const compBaseHex = document.getElementById('set-compCol').value;
    config.completionColor = hexToRgba(compBaseHex, 0.5);

    // 3. 更新 Emoji
    const emojiInput = document.getElementById('set-emojis').value;
    config.emojiList = emojiInput.split(',').map(s => s.trim()).filter(s => s !== "");
    
    config.minimapWidth = parseInt(document.getElementById('set-miniW').value) || 150;
    config.minimapHeight = parseInt(document.getElementById('set-miniH').value) || 150;
    const miniContainer = document.getElementById('minimap-container');
    if (miniContainer) {
        miniContainer.style.width = config.minimapWidth + "px";
        miniContainer.style.height = config.minimapHeight + "px";
    }
    // 4. 通知渲染器刷新
    updateEmojiPalette();
    CrochetRenderer.resize(CrochetModel);
    CrochetRenderer.renderAll(CrochetModel);

    console.log("Settings applied successfully.");
    closeSettings();
}



// 预设的主题列表，用于随机抽取
const THEME_KEYS = Object.keys(THEMES);


function applyTheme(themeKey) {
    const theme = THEMES[themeKey];
    if (!theme) return;

    // 1. 【核心】：直接更新 Model (这是唯一的真理来源)
    CrochetModel.config.basePatternBg = theme.bg;
    CrochetModel.config.dividerColor = theme.divider;
    CrochetModel.config.dividerWidth = theme.dividerW || 2;
    // 确保模型里的完成色是 rgba 格式，方便渲染器使用透明度
    CrochetModel.config.completionColor = hexToRgba(theme.comp, 0.5);

    // 2. 【同步】：将 Model 的值映射到 UI 输入框上
    // 注意：input[type="color"] 必须接收 #RRGGBB 格式的字符串
    document.getElementById('set-bgCol').value = colorToHex(theme.bg);
    document.getElementById('set-divCol').value = colorToHex(theme.divider);
    document.getElementById('set-compCol').value = colorToHex(theme.comp);
    document.getElementById('set-divWidth').value = theme.dividerW || 2;

    // 3. 【刷新】：通知渲染器和预览窗口
    updatePreview();             // 基于 Model 更新小预览图
    CrochetRenderer.resize(CrochetModel); 
    CrochetRenderer.renderAll(CrochetModel); // 基于 Model 更新大画布

}





/**
 * 【核心功能】：独立随机抽取三种颜色的配色方案
 */
function applyRandomColors() {
    // 1. 定义一个辅助函数：从数组中随机抽取一个元素（排除最后一个 '🎨'）
    const getRandomColor = (paletteArray) => {
        // 我们只在除去最后一个元素（自定义按钮）的范围内进行随机
        const validColors = paletteArray.slice(0, -1); 
        const randomIndex = Math.floor(Math.random() * validColors.length);
        return validColors[randomIndex];
    };

    // 2. 分别从三个库中独立抽取颜色
    const newBg = getRandomColor(COLOR_PALETTES.backgrounds);
    const newDiv = getRandomColor(COLOR_PALETTES.dividers);
    const newCompBase = getRandomColor(COLOR_PALETTES.completions);

    // 3. 将抽取到的颜色同步到 HTML 输入框中，这样用户能看到选了什么
    document.getElementById('set-bgCol').value = colorToHex(newBg);
    document.getElementById('set-divCol').value = colorToHex(newDiv);
    document.getElementById('set-compCol').value = colorToHex(newCompBase);

    // 4. 【关键】：立即应用这些颜色到当前的 CrochetModel 中，而不需要用户点“保存”
    const config = CrochetModel.config;
    config.basePatternBg = newBg;
    config.dividerColor = newDiv;
    // 完成色需要处理透明度，保持和你 applySettings 里的逻辑一致
    config.completionColor = hexToRgba(newCompBase, 0.5);

    // 5. 刷新 UI 和画布
    updatePreview();              // 更新设置面板的小预览图
    CrochetRenderer.renderAll(CrochetModel); // 立即让主画布变色，看到效果

}


/**
 * 更新设置面板中的小预览窗口
 */
/**
 * 更新设置面板中的小预览窗口
 * 【修复版】：直接从 DOM Input 读取值，实现真正的即时反馈
 */
function updatePreview() {
    const canvas = document.getElementById('settings-preview-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 1. 直接从 HTML 输入框获取用户当前选中的值 (不再读取 Model)
    const bg = document.getElementById('set-bgCol').value;
    const divCol = document.getElementById('set-divCol').value;
    const divW = parseInt(document.getElementById('set-divWidth').value) || 2;
    const compHex = document.getElementById('set-compCol').value;
    
    // 将输入的 Hex 转换为带 0.5 透明度的 RGBA，用于模拟完成色效果
    const compRGBA = hexToRgba(compHex, 0.5);

    // 2. 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 3. 绘制背景
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. 绘制格子示例 (展示对比度)
    const cellW = 20;
    const cellH = 20;
    for (let i = 0; i < 3; i++) {
        const x = 15 + (i * 25);
        const y = 15;

        // 绘制格子底色（浅灰色，方便看清颜色覆盖）
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(x, y, cellW, cellH);

        // 在第一个格子上叠加“完成色”覆盖层
        if (i === 0) {
            ctx.fillStyle = compRGBA;
            ctx.fillRect(x, y, cellW, cellH);
        }

        // 绘制分割线（只在中间画一条）
        if (i === 1) {
            ctx.beginPath();
            ctx.strokeStyle = divCol;
            ctx.lineWidth = divW;
            ctx.moveTo(x + cellW, y);
            ctx.lineTo(x + cellW, y + cellH);
            ctx.stroke();
        }
    }
}






// --- 【辅助工具函数】 ---

// 将 rgba 转为 hex (用于把当前配置写回 input)
function rgbaToHex(rgba) {
    const parts = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!parts) return "#ffffff";
    const r = parseInt(parts[1]).toString(16).padStart(2, '0');
    const g = parseInt(parts[2]).toString(16).padStart(2, '0');
    const b = parseInt(parts[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

// 将 hex 转为 rgba (用于预览)
function hexToRgba(hex, alpha) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    } else {
        return `rgba(0,0,0,${alpha})`; // fallback
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 通用的颜色转 Hex (用于给 input 赋值)
function colorToHex(color) {
    if (!color) return "#ffffff";
    if (color.startsWith('#')) return color;
    if (color.startsWith('rgba')) return rgbaToHex(color);
    return "#ffffff";
}

/**
 * 【新增】：执行“新建项目”的操作
 */
async function createNewProject() {
    if (isProjectLoaded) {
        const confirmNew = confirm(window.i18n.t('confirm_new_project'));
        if (!confirmNew) return;
    }
    CrochetModel.config = {
        ...CrochetModel.config,
        viewCols: globalAppSettings.viewCols,
        viewRows: globalAppSettings.viewRows,
        cellSize: globalAppSettings.cellSize,
        groupSize: globalAppSettings.groupSize,
        emojiList: globalAppSettings.emojiList
    };

    CrochetModel.init();
    CrochetModel.notes = "";
    isProjectLoaded = false;
    currentFilePath = null;

    const notesArea = document.getElementById('project-notes');
    if (notesArea) notesArea.value = "";
    updateButtonStates();
    CrochetRenderer.resize(CrochetModel);
    CrochetRenderer.renderAll(CrochetModel);
}

/**
 * 【新增】：根据项目加载状态，更新所有功能按钮的可用性
 */
function updateButtonStates() {
    const importBtn = document.getElementById('btn-import');
    const openBtn = document.getElementById('btn-open');
    const saveBtn = document.getElementById('btn-save');
    // 新建按钮 (如果 HTML 里定义了)
    const newBtn = document.getElementById('btn-new');

    if (isProjectLoaded) {
        if (importBtn) importBtn.disabled = true;
        if (openBtn) openBtn.disabled = false;
        if (saveBtn) saveBtn.disabled = false;
        if (newBtn) newBtn.disabled = false;
    } else {
        if (importBtn) importBtn.disabled = false;
        if (openBtn) openBtn.disabled = false;
        if (saveBtn) saveBtn.disabled = true;
        if (newBtn) newBtn.disabled = false;
    }
}

/**
 * 【新增】：将 Model 中的 notes 字段同步到 UI 文本框中
 * @param {HTMLTextAreaElement} textareaElement - 输入框元素
 */

function syncNotesToModel(textareaElement) {
    if (textareaElement) CrochetModel.notes = textareaElement.value;
}
function syncModelToNotesUI(textareaElement) {
    if (textareaElement) textareaElement.value = CrochetModel.notes || "";
}
/**
 * 【新增】：计算并返回当前的行进度字符串
 * @returns {string} 格式如 "12 / 50"
 */
function getProgressStats() {
    const total = CrochetModel.totalRows;
    // 计算已完成的行数 (isDone 为 true 的行)
    const completed = CrochetModel.rowProgress.filter(p => p !== -1).length;
    // 注意：这里根据你的 advance 逻辑，rowProgress 记录的是每一行的进度索引。
    // 如果你想统计“完全填满”的行，可以用下面的逻辑：
    // const completedRows = CrochetModel.grid.filter(row => row.every(cell => cell.isDone)).length;
    // 但根据你目前的业务逻辑，我们通常指“已经开始处理并完成填充”的行。
    // 为了保持简单直观，我们采用：已填满的行数
    const completedRows = CrochetModel.grid.filter(row => row.every(cell => cell.isDone)).length;

    return `${completedRows} / ${total}`;
}


// --- 🧠 高级智能转换工具逻辑 (Smart Digitizer) ---

let smartSelectedImagePath = null; // 记录高级模式选中的图片路径

/**
 * 打开高级模式模态框
 */
function openSmartDigitizerModal() {
    document.getElementById('smart-digitizer-modal').style.display = 'block';
    // 重置状态
    smartSelectedImagePath = null;
    document.getElementById('smart-image-preview-img').style.display = 'none';
    document.getElementById('smart-preview-placeholder').style.display = 'block';
    document.getElementById('btn-smart-start').disabled = true;
    document.getElementById('btn-smart-start').style.opacity = 0.5;
    document.getElementById('smart-digitizer-status').innerText = "准备就绪";
    document.getElementById('smart-input-rows').value = "";
    document.getElementById('smart-input-cols').value = "";
    document.getElementById('smart-threshold-input').value = 160; 
}

/**
 * 关闭高级模式模态框
 */
function closeSmartDigitizerModal() {
    document.getElementById('smart-digitizer-modal').style.display = 'none';
}

/**
 * 初始化高级模式的监听器
 */
async function setupSmartDigitizerListeners() {
    const selectBtn = document.getElementById('btn-smart-select-img');
    const startBtn = document.getElementById('btn-smart-start');
    const status = document.getElementById('smart-digitizer-status');
    const imgPreview = document.getElementById('smart-image-preview-img');
    const placeholder = document.getElementById('smart-preview-placeholder');

    // 1. 处理“选择图片”按钮
    selectBtn.addEventListener('click', async () => {
        try {
            const filePath = await window.api.openFileDialog({
                filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }]
            });

            if (filePath) {
                smartSelectedImagePath = filePath;
                const base64Data = await window.api.readFileAsBase64(filePath);
                if (base64Data) {
                    imgPreview.src = base64Data;
                    imgPreview.style.display = 'block';
                    placeholder.style.display = 'none';
                    status.innerText = window.i18n.t('status_smart_img_ready');
                    startBtn.disabled = false;
                    startBtn.style.opacity = 1;
                }
            }
        } catch (err) {
            console.error("Smart Select Error:", err);
            status.innerText = window.i18n.t('err_select_fail') + " " + err.message;
        }
    });

    // 2. 处理“开始智能转换”按钮
    startBtn.addEventListener('click', async () => {
        if (!smartSelectedImagePath) return;

        const rows = parseInt(document.getElementById('smart-input-rows').value);
        const cols = parseInt(document.getElementById('smart-input-cols').value);
        const threshold = parseInt(document.getElementById('smart-threshold-input').value);

        if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
            alert(window.i18n.t('alert_invalid_input'));
            return;
        }

        try {
            status.innerText = window.i18n.t('status_smart_processing');
            startBtn.disabled = true;
            startBtn.style.opacity = 0.5;

         const resultPath = await window.api.runSmartDigitizer(smartSelectedImagePath, rows, cols, threshold);

            if (resultPath) {
                status.innerText = window.i18n.t('status_success');
                const savePath = await window.api.saveAsPath(resultPath);

                if (savePath) {
                    await window.api.moveFile(resultPath, savePath);
                    status.innerText = window.i18n.t('status_saved');
                } else {
                    status.innerText = window.i18n.t('status_cancelled');
                }
            }
        } catch (err) {
            console.error("Smart Process Error:", err);
            status.innerText = window.i18n.t('err_generic') + " " + err.message;
        } finally {
            startBtn.disabled = false;
            startBtn.style.opacity = 1;
        }
    });
}


// 在 renderer.js 中添加用于修改全局设置的函数

async function openSystemSettings() {
    // 使用 safeSetVal 代替直接的 .value = ...
    safeSetVal('sys-viewCols', globalAppSettings.viewCols);
    safeSetVal('sys-viewRows', globalAppSettings.viewRows);
    safeSetVal('sys-cellSize', globalAppSettings.cellSize);
    safeSetVal('sys-groupSize', globalAppSettings.groupSize);
    safeSetVal('sys-lang', globalAppSettings.language || 'en-US');
    safeSetVal('sys-emojis', globalAppSettings.emojiList.join(', '));
    safeSetVal('sys-default-emoji', globalAppSettings.defaultEmoji || '⭐');

    // 显示模态框
    document.getElementById('system-settings-modal').style.display = 'block';
}

function closeSystemSettings() {
    document.getElementById('system-settings-modal').style.display = 'none';
}


async function saveSystemSettings() {
    const newSettings = {
        viewCols: parseInt(document.getElementById('sys-viewCols').value),
        viewRows: parseInt(document.getElementById('sys-viewRows').value),
        cellSize: parseInt(document.getElementById('sys-cellSize').value),
        groupSize: parseInt(document.getElementById('sys-groupSize').value),
        emojiList: document.getElementById('sys-emojis').value.split(',').map(s => s.trim()),
        language: document.getElementById('sys-lang').value,
        defaultEmoji: document.getElementById('sys-default-emoji').value || '⭐'
    };

    const result = await window.api.saveGlobalConfig(newSettings);
    if (result.success) {
        globalAppSettings = newSettings;
        window.i18n.setLang(newSettings.language); 
        CrochetModel.config.defaultEmoji = newSettings.defaultEmoji;
        alert(window.i18n.t('alert_sys_settings_saved'));
        document.getElementById('system-settings-modal').style.display = 'none';
    } else {
        alert(window.i18n.t('alert_sys_save_fail') + result.error);
    }
}

window.openHelpModal = function() {
    document.getElementById('help-modal').style.display = 'block';
};

window.closeHelpModal = function() {
    document.getElementById('help-modal').style.display = 'none';
};



// Global exposures
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.applySettings = applySettings;
window.saveProject = saveProject;
window.loadProject = loadProject;
window.importExcel = importExcel;
window.openSystemSettings = openSystemSettings;
window.closeSystemSettings = closeSystemSettings;
window.saveSystemSettings = saveSystemSettings;

initApp();
