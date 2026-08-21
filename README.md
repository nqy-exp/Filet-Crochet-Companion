
# 🧶 Filet Crochet Companion (Beta)

**Vibe Coding Project.** I built this because I kept losing track of rows while crocheting filet lace patterns. This companion helps you focus on specific sections, move around, and mark your progress easily.

## 🛠️ What does it do?
A specialized tool designed to:
1. **Digitize:** Convert pattern images into Excel files. Supports black-and-white output only.
2. **Track:** Import existing Excel patterns to track progress and mark motifs directly in the app. Standard Excel colors support.

(Note: Excel theme colors may not be recognized accurately. If you want to use them, please test your palette with a small sample before importing full patterns to avoid unexpected results.)

<img width="1200" height="813" alt="FCC-index" src="https://github.com/user-attachments/assets/829743ee-dca0-47d7-a633-25ea07396edc" />

### ✨ Key Features

**Crochet Tracking Mode:**
* **Dynamic Progress Filling (Core Mechanic):** 
  This tool treats your crochet work as a continuous process. As you complete rows(by left click), the app visually "**fills in**" the completed area behind your current working row. This creates a clear, intuitive boundary between your finished work and the active zone, helping you stay focused.
  *(Note: The direction of the "fill" match your chosen crochet direction—whether bottom-up or top-down.)*
* **Direction:** Default Bottom-up (matches my preference). The first row direction is adjustable.
*For a top-down crochet direction, simply remove renderer.js and rename renderer_top.js to renderer.js after cloning.*
* **Controls:**
    * `Left Click` $\rightarrow$ Mark as "Done" (with a colored overlay).
    * `Double Left Click` $\rightarrow$ Undo/Rewind.
    * `Right Click / Drag Emoji` $\rightarrow$ Mark special motifs.
* **Extras:** Supports notes, customizable rows/cols/group size, and theme colors (HUD color is fixed).

<img width="640" height="420" alt="FCC" src="https://github.com/user-attachments/assets/90d2f0ea-ca28-4507-b4ed-9497d860a409" />

**📸 Digitizer Tool:**
Manual drawing in Excel is tedious, so I built two modes:
* **Standard Mode:** For clear images. Automatically detects rows and columns to generate an Excel grid.
* **Blurry Mode:** For blurry or irregular patterns. Just crop the pattern area, input the row/col counts, and it uses brightness sampling to detect the grid—much faster than manual drawing.

⚠️ Note: The digitizer currently outputs black-and-white patterns. For colored patterns, please use an external tool or edit the Excel file manually.

### 🌐 Language Support
To support more handmade enthusiasts, I've added several languages commonly found in crochet magazines: Simplified Chinese, Traditional Chinese, English, French, German, Spanish, Russian, and Japanese.

**Note:** My language is Simplified Chinese; all other languages are **AI-translated**. If you spot any translation errors, please let me know via an Issue!

---
## 🧵 How it works

1. Prepare your pattern in Excel: fill cells to create your filet crochet grid, or use the built-in digitizer tool to generate one from an image (please double-check the output, as the tool may not be 100% accurate). Adjust it until it looks right to you.
2. Import the Excel file into the app.
3. Track your progress: mark cells as you go.
4. Don’t forget to save your progress regularly, there’s no auto-save or exit warning.

### 📌  Pro Tips for Excel Import

- Automatic Detection: The app detects boundaries based on the last non-empty cell (colored or motif).
- Custom Margins: To define a specific area, mark the four corners of your pattern with a color fill in Excel.
- Alignment Check: Use the arrow keys to move around and ensure the grid aligns perfectly with your pattern before you start.


❗️ Attention: The app is a viewer/tracker; it does not modify your original Excel file. All grid adjustments must be made in Excel before importing. Importing a new file will reset all current progress.

---

## 🚀 How to run?
This is an experimental version; you need to set up your own environment.

### Prerequisites
* Python 3.13.9
* Node.js

### Commands
```bash
# 1. Clone and enter directory
git clone https://github.com/nqy-exp/Filet-Crochet-Companion.git
cd Filet-Crochet-Companion

# 2. Install dependencies
pip install -r requirements.txt
npm install

# 3. Start the app
npm start
```

---
## 📜 Credits

- **Icons provided by** [Flaticon](https://www.flaticon.com/free-icons/crochet) (Created by Magnific)
- **Processed via** IconKitchen

---

## ⚠️ Disclaimer
This is a **Beta version**, developed for personal use.

* Expect bugs; pattern recognition accuracy depends on image quality.
* **Use at your own risk.**

**No PRs accepted. Feel free to Fork and play with it!**

**License:** [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)

---

### 📦 Beta Status

This app is currently in beta and is being tested through my personal crochet workflow. Official release packages will be provided once the project reaches a stable version.

---

*This README was translated with AI assistance.*

*Last update: 2026.08.21*
