/**
 * i18n.js - 多语言管理模块 (最终稳定版)
 */

const i18nData = {
    'zh-CN': {
        // --- 顶部栏 (Top Bar) ---
        'app_title': '方眼蕾丝钩织伴侣 - Workspace',
        'btn_proj_settings': '⚙️ 项目设置',
        'btn_sys_prefs': '🛠️ 系统偏好',
        'btn_digitize': '📸 图片转Excel',
        'btn_smart_digitize': '💡 糊图转Excel',
        'btn_new': '✨ 新建',
        'btn_import': '📥 导入 Excel',

        // --- HUD 模块 (Bottom HUD) ---
        'label_emoji': 'Emoji 库',
        'label_notes': '项目备注',
        'placeholder_notes': '在此输入您的心得、提醒或技巧...',
        'label_stats': '当前进度',
        'label_rows_done': '已完成行数',
        'btn_open': '📂 打开',
        'btn_save': '💾 保存',

        // --- 项目设置 (Project Settings) ---
        'modal_title_proj': '⚙️ 项目设置',
        'sec_display_logic': '📐 显示与逻辑',
        'label_view_cols': '显示列数',
        'label_view_rows': '显示行数',
        'label_group_size': '每组列数',
        'label_cell_size': '格子大小 (Cell Size)',
        'label_first_dir': '第一行方向',
        'opt_dir_ltr': '左 → 右',
        'opt_dir_rtl': '右 ← 左',
        'label_minimap_w': '小地图宽度(px)',
        'label_minimap_h': '小地图高度(px)',
        'sec_appearance': '🎨 外观样式',
        'label_theme_preset': '快速主题:',
        'theme_minimalist': '📄 极简',
        'theme_nordic': '❄️ 北欧',
        'theme_lavender': '💜 芋泥',
        'theme_nature': '🍃 自然',
        'theme_retro': '🧶 复古',
        'theme_sunset': '🌅 落日',
        'theme_dark': '🌑 暗黑',
        'theme_forestDark': '🌲 深林',
        'theme_cyber': '⚡ 赛博',
        'label_random_color': '🎲 随机',
        'label_bg_color': '背景色:',
        'label_div_color': '分割线颜色:',
        'label_div_width': '分割线粗细',
        'label_comp_color': '完成覆盖基准色:',
        'label_preview': '即时预览 (含透明度):',
        'sec_emoji': '✨ Emoji 库',
        'hint_emoji': '(用逗号分隔)',
        'btn_cancel': '取消',
        'btn_apply_save': '应用并保存',

        // --- 工具模态框 (Digitizer Modals) ---
        'modal_title_digitize': '📸 图片转 Excel Tool',
        'desc_digitize': '上传一张清晰方眼蕾丝图，系统将自动识别网格并转换成可编辑的 Excel 文件。',
        'text_no_image': '未选择图片',
        'btn_select_img': '📂 选择图片',
        'btn_start_process': '⚡ 开始转换',
        'status_ready': '准备就绪',
        'modal_title_smart': '💡 糊图转Excel',
        'desc_smart': '适用于模糊、不规则或有背景干扰的图案。',
        'label_smart_rows': '花样行数',
        'hint_smart_rows': '例如: 30',
        'label_smart_cols': '花样列数',
        'label_smart_threshold': '转换敏感度',
        'hint_smart_threshold': '(0=极度敏感 | 255=不敏感)',
        'btn_smart_select_img': '📂 选择图片',
        'btn_smart_start': '⚡ 开始智能转换',

        // --- 系统设置 (System Settings) ---
        'modal_title_sys': '🛠️ 系统偏好设置',
        'desc_sys_prefs': '这些设置将决定你每次“新建项目”时的初始状态。',
        'sec_canvas_defaults': '📐 默认画布',
        'label_sys_view_cols': '默认显示列数',
        'label_sys_view_rows': '默认显示行数',
        'label_sys_cell_size': '默认格子大小',
        'label_sys_group_size': '默认每组列数',
        'sec_lang_content': '🌍 语言与内容',
        'label_sys_lang': '默认界面语言',
        'label_sys_emojis': '默认 Emoji 库 (逗号分隔)',
        'btn_apply_save_sys': '保存并应用',

        // --- JS 动态文本 & 弹窗 ---
        'status_img_ready': '图片已就绪，可以转换',
        'status_processing': '正在识别网格并转换，请稍候...',
        'status_success': '🎉 转换成功！请保存文件。',
        'status_saved': '✅ 已成功保存到目标位置！',
        'status_cancelled': '已取消保存。',
        'err_select_fail': '❌ 选择失败:',
        'err_generic': '❌ 错误:',
        'alert_invalid_input': '请输入有效的行数和列数！',
        'alert_save_fail': '保存失败！原因: ',
        'alert_critical_error': '程序发生严重错误，请检查控制台日志。',
        'alert_sys_settings_saved': '系统默认设置已保存！下次新建项目将生效。',
        'alert_sys_save_fail': '保存失败: ',
        'confirm_new_project': '⚠️ 当前项目尚未保存，新建操作将导致当前进度丢失。是否确认新建？'
    },
    'en-US': {
        // --- Top Bar ---
        'app_title': 'Filet Crochet Companion',
        'btn_proj_settings': '⚙️ Project Settings',
        'btn_sys_prefs': '🛠️ System Preferences',
        'btn_digitize': '📸 Image to Excel',
        'btn_smart_digitize': '💡 Blurry Image to Excel',
        'btn_new': '✨ New',
        'btn_import': '📥 Import Excel',

        // --- HUD ---
        'label_emoji': 'Emoji Library',
        'label_notes': 'Project Notes',
        'placeholder_notes': 'Enter your notes, reminders or tips...',
        'label_stats': 'Current Progress',
        'label_rows_done': 'Rows Completed',
        'btn_open': '📂 Open',
        'btn_save': '💾 Save',

        // --- Project Settings ---
        'modal_title_proj': '⚙️ Project Settings',
        'sec_display_logic': '📐 Display & Logic',
        'label_view_cols': 'View Columns',
        'label_view_rows': 'View Rows',
        'label_group_size': 'Group Size',
        'label_cell_size': 'Cell Size',
        'label_first_dir': 'First Row Direction',
        'opt_dir_ltr': 'Left → Right',
        'opt_dir_rtl': 'Right ← Left',
        'label_minimap_w': 'Minimap Width (px)',
        'label_minimap_h': 'Minimap Height (px)',
        'sec_appearance': '🎨 Appearance',
        'label_theme_preset': 'Theme Presets:',
        'theme_minimalist': '📄 Minimalist',
        'theme_nordic': '❄️ Nordic',
        'theme_lavender': '💜 Lavender',
        'theme_nature': '🍃 Nature',
        'theme_retro': '🧶 Retro',
        'theme_sunset': '🌅 Sunset',
        'theme_dark': '🌑 Dark',
        'theme_forestDark': '🌲 Forest',
        'theme_cyber': '⚡ Cyber',
        'label_random_color': '🎲 Random',
        'label_bg_color': 'Background Color:',
        'label_div_color': 'Divider Color:',
        'label_div_width': 'Divider Width',
        'label_comp_color': 'Completion Base Color:',
        'label_preview': 'Live Preview:',
        'sec_emoji': '✨ Emoji Library',
        'hint_emoji': '(Comma separated)',
        'btn_cancel': 'Cancel',
        'btn_apply_save': 'Apply & Save',

        // --- Digitizer Modals ---
        'modal_title_digitize': '📸 Image to Excel Tool',
        'desc_digitize': 'Upload a clear pattern image, and the system will automatically detect the grid and convert it into an editable Excel file.',
        'text_no_image': 'No image selected',
        'btn_select_img': '📂 Select Image',
        'btn_start_process': '⚡ Start Conversion',
        'status_ready': 'Ready',
        'modal_title_smart': '💡 Blurry Image to Excel',
        'desc_smart': 'Suitable for blurry, irregular, or patterned images.',
        'label_smart_rows': 'Pattern Rows',
        'hint_smart_rows': 'e.g. 30',
        'label_smart_cols': 'Pattern Cols',
        'label_smart_threshold': 'Conversion Sensitivity',
        'hint_smart_threshold': '(0=Very sensitive | 255=Not sensitive)',
        'btn_smart_select_img': '📂 Select Image',
        'btn_smart_start': '⚡ Start Smart Conversion',
        'status_smart_img_ready': 'Image ready, please enter rows and cols',
        'status_smart_processing': 'Analyzing boundaries and sampling, please wait...',

        // --- System Settings ---
        'modal_title_sys': '🛠️ System Preferences',
        'desc_sys_prefs': 'These settings determine the initial state when creating a new project.',
        'sec_canvas_defaults': '📐 Default Canvas',
        'label_sys_view_cols': 'Default View Columns',
        'label_sys_view_rows': 'Default View Rows',
        'label_sys_cell_size': 'Default Cell Size',
        'label_sys_group_size': 'Default Group Size',
        'sec_lang_content': '🌍 Language & Content',
        'label_sys_lang': 'Default Interface Language',
        'label_sys_emojis': 'Default Emoji List (comma separated)',
        'btn_apply_save_sys': 'Apply & Save',

        // --- JS Dynamic Text & Alerts ---
        'status_img_ready': 'Image ready, conversion can start',
        'status_processing': 'Identifying grid and converting, please wait...',
        'status_success': '🎉 Conversion successful! Please save the file.',
        'status_saved': '✅ Successfully saved to target location!',
        'status_cancelled': 'Save cancelled.',
        'err_select_fail': '❌ Selection failed:',
        'err_generic': '❌ Error:',
        'alert_invalid_input': 'Please enter valid rows and columns!',
        'alert_save_fail': 'Save failed! Reason: ',
        'alert_critical_error': 'A critical error occurred, please check the console logs.',
        'alert_sys_settings_saved': 'System default settings saved! Will take effect on next new project.',
        'alert_sys_save_fail': 'Save failed: ',
        'confirm_new_project': '⚠️ Current project is not saved. New project will cause loss of progress. Confirm?'
    },
        'de-DE': {
        // --- Top Bar ---
        'app_title': 'Filet-Häkelbegleiter',
        'btn_proj_settings': '⚙️ Proj.-Einst.', // Abbreviated
        'btn_sys_prefs': '🛠️ System-Präf.',   // Abbreviated
        'btn_digitize': '📸 Bild zu Excel',
        'btn_smart_digitize': '💡 Unscharfe Bild zu Excel', // Abbreviated
        'btn_new': '✨ Neu',
        'btn_import': '📥 Excel Import',

        // --- HUD ---
        'label_emoji': 'Emoji-Bibliothek',
        'label_notes': 'Notizen',
        'placeholder_notes': 'Notizen, Erinnerungen oder Tipps eingeben...',
        'label_stats': 'Fortschritt',
        'label_rows_done': 'Zeilen fertig',
        'btn_open': '📂 Öffnen',
        'btn_save': '💾 Speichern',

        // --- Project Settings ---
        'modal_title_proj': '⚙️ Proj.-Einst.',
        'sec_display_logic': '📐 Anzeige & Logik',
        'label_view_cols': 'Spaltenanzahl',
        'label_view_rows': 'Zeilenanzahl',
        'label_group_size': 'Gruppengröße',
        'label_cell_size': 'Zellgröße',
        'label_first_dir': 'Erste Zeilenrichtung',
        'opt_dir_ltr': 'Links → Rechts',
        'opt_dir_rtl': 'Rechts ← Links',
        'label_minimap_w': 'Minimap Breite (px)',
        'label_minimap_h': 'Minimap Höhe (px)',
        'sec_appearance': '🎨 Aussehen',
        'label_theme_preset': 'Themen:',
        'theme_minimalist': '📄 Minimal',
        'theme_nordic': '❄️ Nordisch',
        'theme_lavender': '💜 Lavendel',
        'theme_nature': '🍃 Natur',
        'theme_retro': '🧶 Retro',
        'theme_sunset': '🌅 Sonnenuntergang',
        'theme_dark': '🌑 Dunkel',
        'theme_forestDark': '🌲 Wald',
        'theme_cyber': '⚡ Cyber',
        'label_random_color': '🎲 Zufällig',
        'label_bg_color': 'Hintergrundfarbe:',
        'label_div_color': 'Trennlinienfarbe:',
        'label_div_width': 'Linienstärke',
        'label_comp_color': 'Abschlussfarbe:',
        'label_preview': 'Live-Vorschau:',
        'sec_emoji': '✨ Emoji-Bibliothek',
        'hint_emoji': '(Kommagetrennt)',
        'btn_cancel': 'Abbrechen',
        'btn_apply_save': 'Anwenden & Speichern',

        // --- Digitizer Modals ---
        'modal_title_digitize': '📸 Bild zu Excel',
        'desc_digitize': 'Laden Sie ein Musterbild hoch, um es automatisch in eine Excel-Datei umzuwandeln.',
        'text_no_image': 'Kein Bild gewählt',
        'btn_select_img': '📂 Bild wählen',
        'btn_start_process': '⚡ Starten',
        'status_ready': 'Bereit',
        'modal_title_smart': '💡 Unscharfe Bilder zu Excel',
        'desc_smart': 'Für unscharfe oder unregelmäßige Muster geeignet.',
        'label_smart_rows': 'Musterzeilen',
        'hint_smart_rows': 'z.B. 30',
        'label_smart_cols': 'Musterspalten',
        'label_smart_threshold': 'Empfindlichkeit',
        'hint_smart_threshold': '(0=Hoch | 255=Niedrig)',
        'btn_smart_select_img': '📂 Bild wählen',
        'btn_smart_start': '⚡ Smart-Start',
        'status_smart_img_ready': 'Bild bereit, bitte Zeilen/Spalten eingeben',
        'status_smart_processing': 'Analysiere Muster, bitte warten...',

        // --- System Settings ---
        'modal_title_sys': '🛠️ System-Präf.',
        'desc_sys_prefs': 'Diese Einstellungen bestimmen den Startzustand neuer Projekte.',
        'sec_canvas_defaults': '📐 Standard-Canvas',
        'label_sys_view_cols': 'Standard Spalten',
        'label_sys_view_rows': 'Standard Zeilen',
        'label_sys_cell_size': 'Standard Zellgröße',
        'label_sys_group_size': 'Standard Gruppengröße',
        'sec_lang_content': '🌍 Sprache & Inhalt',
        'label_sys_lang': 'Standardsprache',
        'label_sys_emojis': 'Standard Emojis (Komma)',
        'btn_apply_save_sys': 'Speichern & Anwenden',

        // --- JS Dynamic Text & Alerts ---
        'status_img_ready': 'Bild bereit, Start möglich',
        'status_processing': 'Verarbeite Bild, bitte warten...',
        'status_success': '🎉 Erfolg! Datei speichern.',
        'status_saved': '✅ Erfolgreich gespeichert!',
        'status_cancelled': 'Abgebrochen.',
        'err_select_fail': '❌ Auswahl fehlgeschlagen:',
        'err_generic': '❌ Fehler:',
        'alert_invalid_input': 'Bitte gültige Zeilen/Spalten eingeben!',
        'alert_save_fail': 'Speichern fehlgeschlagen: ',
        'alert_critical_error': 'Kritischer Fehler! Log prüfen.',
        'alert_sys_settings_saved': 'System-Einstellungen gespeichert!',
        'alert_sys_save_fail': 'Fehler beim Speichern: ',
        'confirm_new_project': '⚠️ Ungespeicherte Änderungen gehen verloren. Fortfahren?'
    },

    'fr-FR': {
        // --- Top Bar ---
        'app_title': 'Compagnon Filet Crochet',
        'btn_proj_settings': '⚙️ Paramètres Proj.',
        'btn_sys_prefs': '🛠️ Préférences Syst.',
        'btn_digitize': '📸 Image vers Excel',
        'btn_smart_digitize': '💡 Image floue en Excel',
        'btn_new': '✨ Nouveau',
        'btn_import': '📥 Importer Excel',

        // --- HUD ---
        'label_emoji': 'Bibliothèque Emoji',
        'label_notes': 'Notes Projet',
        'placeholder_notes': 'Entrez vos notes, rappels ou astuces...',
        'label_stats': 'Progression',
        'label_rows_done': 'Lignes finies',
        'btn_open': '📂 Ouvrir',
        'btn_save': '💾 Sauvegarder',

        // --- Project Settings ---
        'modal_title_proj': '⚙️ Paramètres Proj.',
        'sec_display_logic': '📐 Affichage & Logique',
        'label_view_cols': 'Colonnes à voir',
        'label_view_rows': 'Lignes à voir',
        'label_group_size': 'Taille groupe',
        'label_cell_size': 'Taille cellule',
        'label_first_dir': 'Sens 1ère ligne',
        'opt_dir_ltr': 'Gauche → Droite',
        'opt_dir_rtl': 'Droite ← Gauche',
        'label_minimap_w': 'Largeur Minimap (px)',
        'label_minimap_h': 'Hauteur Minimap (px)',
        'sec_appearance': '🎨 Apparence',
        'label_theme_preset': 'Thèmes:',
        'theme_minimalist': '📄 Minimaliste',
        'theme_nordic': '❄️ Nordique',
        'theme_lavender': '💜 Lavande',
        'theme_nature': '🍃 Nature',
        'theme_retro': '🧶 Rétro',
        'theme_sunset': '🌅 Coucher Soleil',
        'theme_dark': '🌑 Sombre',
        'theme_forestDark': '🌲 Forêt',
        'theme_cyber': '⚡ Cyber',
        'label_random_color': '🎲 Aléatoire',
        'label_bg_color': 'Couleur fond:',
        'label_div_color': 'Couleur diviseur:',
        'label_div_width': 'Épaisseur ligne',
        'label_comp_color': 'Couleur complétion:',
        'label_preview': 'Aperçu en direct:',
        'sec_emoji': '✨ Bibliothèque Emoji',
        'hint_emoji': '(Séparés par virgule)',
        'btn_cancel': 'Annuler',
        'btn_apply_save': 'Appliquer & Sauver',

        // --- Digitizer Modals ---
        'modal_title_digitize': '📸 Image vers Excel',
        'desc_digitize': 'Téléchargez une image claire pour la convertir en fichier Excel éditable.',
        'text_no_image': 'Aucune image choisie',
        'btn_select_img': '📂 Choisir Image',
        'btn_start_process': '⚡ Convertir',
        'status_ready': 'Prêt',
        'modal_title_smart': '💡 Image floue en Excel',
        'desc_smart': 'Pour les images floues ou irrégulières.',
        'label_smart_rows': 'Lignes motif',
        'hint_smart_rows': 'ex: 30',
        'label_smart_cols': 'Colonnes motif',
        'label_smart_threshold': 'Sensibilité',
        'hint_smart_threshold': '(0=Max | 255=Min)',
        'btn_smart_select_img': '📂 Choisir Image',
        'btn_smart_start': '⚡ Smart Start',
        'status_smart_img_ready': 'Image prête, entrez lignes/cols',
        'status_smart_processing': 'Analyse en cours...',

        // --- System Settings ---
        'modal_title_sys': '🛠️ Préférences Syst.',
        'desc_sys_prefs': 'Ces réglages définissent l\'état initial de chaque nouveau projet.',
        'sec_canvas_defaults': '📐 Canvas par défaut',
        'label_sys_view_cols': 'Colonnes par déf.',
        'label_sys_view_rows': 'Lignes par déf.',
        'label_sys_cell_size': 'Taille cellule par déf.',
        'label_sys_group_size': 'Taille groupe par déf.',
        'sec_lang_content': '🌍 Langue & Contenu',
        'label_sys_lang': 'Langue de l\'interface',
        'label_sys_emojis': 'Liste Emoji (virgule)',
        'btn_apply_save_sys': 'Appliquer & Sauver',

        // --- JS Dynamic Text & Alerts ---
        'status_img_ready': 'Image prête, démarrage possible',
        'status_processing': 'Conversion en cours...',
        'status_success': '🎉 Succès ! Veuillez sauvegarder.',
        'status_saved': '✅ Sauvegardé avec succès !',
        'status_cancelled': 'Annulé.',
        'err_select_fail': '❌ Échec sélection:',
        'err_generic': '❌ Erreur:',
        'alert_invalid_input': 'Entrez des lignes/cols valides!',
        'alert_save_fail': 'Échec sauvegarde! Raison: ',
        'alert_critical_error': 'Erreur critique! Voir console.',
        'alert_sys_settings_saved': 'Paramètres système sauvegardés!',
        'alert_sys_save_fail': 'Échec sauvegarde: ',
        'confirm_new_project': '⚠️ Non enregistré. Perdre les progrès? Confirmer?'
    },

    'es-ES': {
        // --- Top Bar ---
        'app_title': 'Compañero de Filet Crochet',
        'btn_proj_settings': '⚙️ Ajustes Proy.',
        'btn_sys_prefs': '🛠️ Preferencias Sist.',
        'btn_digitize': '📸 Imagen a Excel',
        'btn_smart_digitize': '💡 Imagen borrosa a Excel',
        'btn_new': '✨ Nuevo',
        'btn_import': '📥 Importar Excel',

        // --- HUD ---
        'label_emoji': 'Emoji Library',
        'label_notes': 'Notas Proyecto',
        'placeholder_notes': 'Escriba notas, recordatorios o tips...',
        'label_stats': 'Progreso Actual',
        'label_rows_done': 'Filas completadas',
        'btn_open': '📂 Abrir',
        'btn_save': '💾 Guardar',

        // --- Project Settings ---
        'modal_title_proj': '⚙️ Ajustes Proy.',
        'sec_display_logic': '📐 Visualización',
        'label_view_cols': 'Columnas vista',
        'label_view_rows': 'Filas vista',
        'label_group_size': 'Tamaño grupo',
        'label_cell_size': 'Tamaño celda',
        'label_first_dir': 'Dirección fila 1',
        'opt_dir_ltr': 'Izq → Der',
        'opt_dir_rtl': 'Der ← Izq',
        'label_minimap_w': 'Ancho Minimapa (px)',
        'label_minimap_h': 'Alto Minimapa (px)',
        'sec_appearance': '🎨 Apariencia',
        'label_theme_preset': 'Temas:',
        'theme_minimalist': '📄 Minimalista',
        'theme_nordic': '❄️ Nórdico',
        'theme_lavender': '💜 Lavanda',
        'theme_nature': '🍃 Naturaleza',
        'theme_retro': '🧶 Retro',
        'theme_sunset': '🌅 Atardecer',
        'theme_dark': '🌑 Oscuro',
        'theme_forestDark': '🌲 Bosque',
        'theme_cyber': '⚡ Cyber',
        'label_random_color': '🎲 Aleatorio',
        'label_bg_color': 'Color fondo:',
        'label_div_color': 'Color divisor:',
        'label_div_width': 'Grosor línea',
        'label_comp_color': 'Color completado:',
        'label_preview': 'Vista previa:',
        'sec_emoji': '✨ Emoji Library',
        'hint_emoji': '(Separados por coma)',
        'btn_cancel': 'Cancelar',
        'btn_apply_save': 'Aplicar y Guardar',

        // --- Digitizer Modals ---
        'modal_title_digitize': '📸 Imagen a Excel',
        'desc_digitize': 'Suba una imagen clara para convertirla en un archivo Excel editable.',
        'text_no_image': 'Sin imagen seleccionada',
        'btn_select_img': '📂 Seleccionar Imagen',
        'btn_start_process': '⚡ Convertir',
        'status_ready': 'Listo',
        'modal_title_smart': '💡 Imagen borrosa a Excel',
        'desc_smart': 'Para imágenes borrosas o irregulares.',
        'label_smart_rows': 'Filas patrón',
        'hint_smart_rows': 'ej. 30',
        'label_smart_cols': 'Cols patrón',
        'label_smart_threshold': 'Sensibilidad',
        'hint_smart_threshold': '(0=Alta | 255=Baja)',
        'btn_smart_select_img': '📂 Seleccionar Imagen',
        'btn_smart_start': '⚡ Inicio Smart',
        'status_smart_img_ready': 'Imagen lista, ingrese filas/cols',
        'status_smart_processing': 'Analizando imagen...',

        // --- System Settings ---
        'modal_title_sys': '🛠️ Preferencias Sist.',
        'desc_sys_prefs': 'Estos ajustes definen el estado inicial de cada nuevo proyecto.',
        'sec_canvas_defaults': '📐 Lienzo por defecto',
        'label_sys_view_cols': 'Columnas def.',
        'label_sys_view_rows': 'Filas def.',
        'label_sys_cell_size': 'Tamaño celda def.',
        'label_sys_group_size': 'Grupo def.',
        'sec_lang_content': '🌍 Idioma y Contenido',
        'label_sys_lang': 'Idioma interfaz',
        'label_sys_emojis': 'Lista Emoji (coma)',
        'btn_apply_save_sys': 'Aplicar y Guardar',

        // --- JS Dynamic Text & Alerts ---
        'status_img_ready': 'Imagen lista, puede empezar',
        'status_processing': 'Convirtiendo, espere...',
        'status_success': '🎉 ¡Éxito! Guarde el archivo.',
        'status_saved': '✅ ¡Guardado con éxito!',
        'status_cancelled': 'Cancelado.',
        'err_select_fail': '❌ Error selección:',
        'err_generic': '❌ Error:',
        'alert_invalid_input': '¡Ingrese filas/cols válidas!',
        'alert_save_fail': 'Error al guardar: ',
        'alert_critical_error': 'Error crítico! Ver logs.',
        'alert_sys_settings_saved': 'Ajustes guardados!',
        'alert_sys_save_fail': 'Error al guardar: ',
        'confirm_new_project': '⚠️ Proyecto no guardado. ¿Perder progreso? Confirmar?'
    },

    'ru-RU': {
        // --- Top Bar ---
        'app_title': 'Filet Crochet Companion',
        'btn_proj_settings': '⚙️ Настр. проекта',
        'btn_sys_prefs': '🛠️ Сист. настройки',
        'btn_digitize': '📸 Картинка в Excel',
        'btn_smart_digitize': '💡 Размытые фото в Excel',
        'btn_new': '✨ Новый',
        'btn_import': '📥 Импорт Excel',

        // --- HUD ---
        'label_emoji': 'Emoji библиотека',
        'label_notes': 'Заметки',
        'placeholder_notes': 'Введите заметки или советы...',
        'label_stats': 'Прогресс',
        'label_rows_done': 'Ряды готовы',
        'btn_open': '📂 Открыть',
        'btn_save': '💾 Сохранить',

        // --- Project Settings ---
        'modal_title_proj': '⚙️ Настр. проекта',
        'sec_display_logic': '📐 Вид и Логика',
        'label_view_cols': 'Кол-во столбцов',
        'label_view_rows': 'Кол-во рядов',
        'label_group_size': 'Размер группы',
        'label_cell_size': 'Размер ячейки',
        'label_first_dir': 'Направление ряда',
        'opt_dir_ltr': 'Слева → Направо',
        'opt_dir_rtl': 'Справа ← Налево',
        'label_minimap_w': 'Ширина карты (px)',
        'label_minimap_h': 'Высота карты (px)',
        'sec_appearance': '🎨 Внешний вид',
        'label_theme_preset': 'Темы:',
        'theme_minimalist': '📄 Минимализм',
        'theme_nordic': '❄️ Нордик',
        'theme_lavender': '💜 Лаванда',
        'theme_nature': '🍃 Природа',
        'theme_retro': '🧶 Ретро',
        'theme_sunset': '🌅 Закат',
        'theme_dark': '🌑 Темный',
        'theme_forestDark': '🌲 Лес',
        'theme_cyber': '⚡ Кибер',
        'label_random_color': '🎲 Рандом',
        'label_bg_color': 'Фон:',
        'label_div_color': 'Разделитель:',
        'label_div_width': 'Толщина линии',
        'label_comp_color': 'Цвет финиша:',
        'label_preview': 'Предпросмотр:',
        'sec_emoji': '✨ Emoji библиотека',
        'hint_emoji': '(через запятую)',
        'btn_cancel': 'Отмена',
        'btn_apply_save': 'Применить и Сохранить',

        // --- Digitizer Modals ---
        'modal_title_digitize': '📸 Картинка в Excel',
        'desc_digitize': 'Загрузите паттерн, чтобы превратить его в Excel.',
        'text_no_image': 'Нет изображения',
        'btn_select_img': '📂 Выбрать фото',
        'btn_start_process': '⚡ Старт',
        'status_ready': 'Готово',
        'modal_title_smart': '💡 Размытые фото в Excel',
        'desc_smart': 'Для размытых или сложных узоров.',
        'label_smart_rows': 'Рядов в узоре',
        'hint_smart_rows': 'напр. 30',
        'label_smart_cols': 'Кол-во столбцов',
        'label_smart_threshold': 'Чувствительность',
        'hint_smart_threshold': '(0=Выс | 255=Низ)',
        'btn_smart_select_img': '📂 Выбрать фото',
        'btn_smart_start': '⚡ Smart-старт',
        'status_smart_img_ready': 'Фото готово, введите ряды/кол.',
        'status_smart_processing': 'Обработка...',

        // --- System Settings ---
        'modal_title_sys': '🛠️ Настройки системы',
        'desc_sys_prefs': 'Эти настройки задают старт для новых проектов.',
        'sec_canvas_defaults': '📐 По умолчанию',
        'label_sys_view_cols': 'Кол-во столбцов',
        'label_sys_view_rows': 'Кол-во рядов',
        'label_sys_cell_size': 'Размер ячейки',
        'label_sys_group_size': 'Размер группы',
        'sec_lang_content': '🌍 Язык и Контент',
        'label_sys_lang': 'Язык интерфейса',
        'label_sys_emojis': 'Список Emoji (через запятую)',
        'btn_apply_save_sys': 'Сохранить и Применить',

        // --- JS Dynamic Text & Alerts ---
        'status_img_ready': 'Готово к конвертации',
        'status_processing': 'Обработка, подождите...',
        'status_success': '🎉 Готово! Сохраните файл.',
        'status_saved': '✅ Успешно сохранено!',
        'status_cancelled': 'Отменено.',
        'err_select_fail': '❌ Ошибка выбора:',
        'err_generic': '❌ Ошибка:',
        'alert_invalid_input': 'Введите корректные ряды/кол!',
        'alert_save_fail': 'Ошибка сохранения: ',
        'alert_critical_error': 'Критическая ошибка! Проверьте лог.',
        'alert_sys_settings_saved': 'Настройки сохранены!',
        'alert_sys_save_fail': 'Ошибка сохранения: ',
        'confirm_new_project': '⚠️ Не сохранено. Потерять прогресс? Да?'
    },

    'ja-JP': {
        // --- Top Bar ---
        'app_title': 'かぎ針編み 方眼レース アシスタント',
        'btn_proj_settings': '⚙️ プロジェクト設定',
        'btn_sys_prefs': '🛠️ システム設定',
        'btn_digitize': '📸 画像をExcelへ',
        'btn_smart_digitize': '💡 ぼやけた画像をExcelへ',
        'btn_new': '✨ 新規',
        'btn_import': '📥 Excel取込',

        // --- HUD ---
        'label_emoji': '絵文字ライブラリ',
        'label_notes': 'プロジェクトノート',
        'placeholder_notes': 'メモ、リマインダー、ヒントを入力...',
        'label_stats': '現在の進捗',
        'label_rows_done': '完了した行数',
        'btn_open': '📂 開く',
        'btn_save': '💾 保存',

        // --- Project Settings ---
        'modal_title_proj': '⚙️ プロジェクト設定',
        'sec_display_logic': '📐 表示とロジック',
        'label_view_cols': '表示列数',
        'label_view_rows': '表示行数',
        'label_group_size': 'グループサイズ',
        'label_cell_size': 'セルサイズ',
        'label_first_dir': '最初の行の方向',
        'opt_dir_ltr': '左 → 右',
        'opt_dir_rtl': '右 ← 左',
        'label_minimap_w': 'ミニマップ幅 (px)',
        'label_minimap_h': 'ミニマップ高 (px)',
        'sec_appearance': '🎨 外観',
        'label_theme_preset': 'テーマ:',
        'theme_minimalist': '📄 ミニマリスト',
        'theme_nordic': '❄️ 北欧風',
        'theme_lavender': '💜 ラベンダー',
        'theme_nature': '🍃 ナチュラル',
        'theme_retro': '🧶 レトロ',
        'theme_sunset': '🌅 サンセット',
        'theme_dark': '🌑 ダーク',
        'theme_forestDark': '🌲 フォレスト',
        'theme_cyber': '⚡ サイバー',
        'label_random_color': '🎲 ランダム',
        'label_bg_color': '背景色:',
        'label_div_color': '区切り線色:',
        'label_div_width': '線の太さ',
        'label_comp_color': '完了色:',
        'label_preview': 'ライブプレビュー:',
        'sec_emoji': '✨ 絵文字ライブラリ',
        'hint_emoji': '(カンマ区切り)',
        'btn_cancel': 'キャンセル',
        'btn_apply_save': '適用して保存',

        // --- Digitizer Modals ---
        'modal_title_digitize': '📸 画像をExcelへ',
        'desc_digitize': '画像をアップロードすると、自動でグリッドを検出してExcelに変換します。',
        'text_no_image': '画像未選択',
        'btn_select_img': '📂 画像を選択',
        'btn_start_process': '⚡ 変換開始',
        'status_ready': '準備完了',
        'modal_title_smart': '💡 ぼやけた画像をExcelへ',
        'desc_smart': 'ぼやけた画像や不規則なパターンに適しています。',
        'label_smart_rows': 'パターンの行数',
        'hint_smart_rows': '例: 30',
        'label_smart_cols': 'パターンの列数',
        'label_smart_threshold': '変換感度',
        'hint_smart_threshold': '(0=高 | 255=低)',
        'btn_smart_select_img': '📂 画像を選択',
        'btn_smart_start': '⚡ スマート開始',
        'status_smart_img_ready': '画像準備完了。行と列を入力してください',
        'status_smart_processing': '解析中、お待ちください...',

        // --- System Settings ---
        'modal_title_sys': '🛠️ システム設定',
        'desc_sys_prefs': 'これらの設定は新しいプロジェクト作成時の初期状態を決定します。',
        'sec_canvas_defaults': '📐 デフォルト設定',
        'label_sys_view_cols': '既定の列数',
        'label_sys_view_rows': '既定の行数',
        'label_sys_cell_size': '既定のセルサイズ',
        'label_sys_group_size': '既定のグループサイズ',
        'sec_lang_content': '🌍 言語とコンテンツ',
        'label_sys_lang': 'デフォルト言語',
        'label_sys_emojis': '既定の絵文字 (カンマ区切り)',
        'btn_apply_save_sys': '適用して保存',

        // --- JS Dynamic Text & Alerts ---
        'status_img_ready': '画像準備完了、変換可能です',
        'status_processing': '変換中、お待ちください...',
        'status_success': '🎉 成功！ファイルを保存してください。',
        'status_saved': '✅ 保存が完了しました！',
        'status_cancelled': 'キャンセルされました。',
        'err_select_fail': '❌ 選択失敗:',
        'err_generic': '❌ エラー:',
        'alert_invalid_input': '有効な行数と列数を入力してください！',
        'alert_save_fail': '保存失敗! 理由: ',
        'alert_critical_error': '重大なエラーが発生しました。ログを確認してください。',
        'alert_sys_settings_saved': 'システム設定が保存されました!',
        'alert_sys_save_fail': '保存失敗: ',
        'confirm_new_project': '⚠️ 未保存の変更があります。続行しますか？'
    },
        'zh-HK': {
        // --- Top Bar ---
        'app_title': '方眼蕾絲鉤織伴侶 - Workspace',
        'btn_proj_settings': '⚙️ 項目設定',
        'btn_sys_prefs': '🛠️ 系統偏好',
        'btn_digitize': '📸 圖片轉 Excel',
        'btn_smart_digitize': '💡 糊圖轉Excel',
        'btn_new': '✨ 新建',
        'btn_import': '📥 匯入 Excel',

        // --- HUD ---
        'label_emoji': 'Emoji 庫',
        'label_notes': '項目筆記',
        'placeholder_notes': '在此輸入您的心得、提醒或技巧...',
        'label_stats': '目前進度',
        'label_rows_done': '已完成行數',
        'btn_open': '📂 打開',
        'btn_save': '💾 儲存',

        // --- Project Settings ---
        'modal_title_proj': '⚙️ 項目設定',
        'sec_display_logic': '📐 顯示與邏輯',
        'label_view_cols': '顯示列數',
        'label_view_rows': '顯示行數',
        'label_group_size': '每組列數',
        'label_cell_size': '格子大小 (Cell Size)',
        'label_first_dir': '第一行方向',
        'opt_dir_ltr': '左 → 右',
        'opt_dir_rtl': '右 ← 左',
        'label_minimap_w': '小地圖寬度(px)',
        'label_minimap_h': '小地圖高度(px)',
        'sec_appearance': '🎨 外觀樣式',
        'label_theme_preset': '快速主題:',
        'theme_minimalist': '📄 極簡',
        'theme_nordic': '❄️ 北歐',
        'theme_lavender': '💜 薰衣草',
        'theme_nature': '🍃 自然',
        'theme_retro': '🧶 復古',
        'theme_sunset': '🌅 落日',
        'theme_dark': '🌑 暗黑',
        'theme_forestDark': '🌲 深林',
        'theme_cyber': '⚡ 賽博',
        'label_random_color': '🎲 隨機',
        'label_bg_color': '背景色:',
        'label_div_color': '分割線顏色:',
        'label_div_width': '分割線粗細',
        'label_comp_color': '完成覆蓋基準色:',
        'label_preview': '即時預覽 (含透明度):',
        'sec_emoji': '✨ Emoji 庫',
        'hint_emoji': '(用逗號分隔)',
        'btn_cancel': '取消',
        'btn_apply_save': '套用並儲存',

        // --- Digitizer Modals ---
        'modal_title_digitize': '📸 圖片轉 Excel 工具',
        'desc_digitize': '上傳一張清晰方眼蕾絲圖，系統將自動識別網格並轉換成可編輯的 Excel 檔案。',
        'text_no_image': '未選擇圖片',
        'btn_select_img': '📂 選擇圖片',
        'btn_start_process': '⚡ 開始轉換',
        'status_ready': '準備就緒',
        'modal_title_smart': '💡 糊圖轉Excel',
        'desc_smart': '適用於模糊、不規則或有背景干擾的圖案。',
        'label_smart_rows': '花樣行數',
        'hint_smart_rows': '例如: 30',
        'label_smart_cols': '花樣列數',
        'label_smart_threshold': '轉換敏感度',
        'hint_smart_threshold': '(0=極度敏感 | 255=不敏感)',
        'btn_smart_select_img': '📂 選擇圖片',
        'btn_smart_start': '⚡ 開始智能轉換',
        'status_smart_img_ready': '圖片已就緒，請輸入行列數',
        'status_smart_processing': '正在智能分析邊界並採樣，請稍候...',

        // --- System Settings ---
        'modal_title_sys': '🛠️ 系統偏好設定',
        'desc_sys_prefs': '這些設定將決定你每次「新建項目」時的初始狀態。',
        'sec_canvas_defaults': '📐 預設畫布',
        'label_sys_view_cols': '預設顯示列數',
        'label_sys_view_rows': '預設顯示行數',
        'label_sys_cell_size': '預設格子大小',
        'label_sys_group_size': '預設每組列數',
        'sec_lang_content': '🌍 語言與內容',
        'label_sys_lang': '預設界面語言',
        'label_sys_emojis': '預設 Emoji 庫 (逗號分隔)',
        'btn_apply_save_sys': '套用並儲存',

        // --- JS Dynamic Text & Alerts ---
        'status_img_ready': '圖片已就緒，可以轉換',
        'status_processing': '正在識別網格並轉換，請稍候...',
        'status_success': '🎉 轉換成功！請儲存檔案。',
        'status_saved': '✅ 已成功儲存到目標位置！',
        'status_cancelled': '已取消儲存。',
        'err_select_fail': '❌ 選擇失敗:',
        'err_generic': '❌ 錯誤:',
        'alert_invalid_input': '請輸入有效的行數和列數！',
        'alert_save_fail': '儲存失敗！原因: ',
        'alert_critical_error': '程式發生嚴重錯誤，請檢查控制台日誌。',
        'alert_sys_settings_saved': '系統預設設定已儲存！下次新建項目將生效。',
        'alert_sys_save_fail': '儲存失敗: ',
        'confirm_new_project': '⚠️ 目前項目尚未儲存，新建操作將導致目前進度遺失。是否確認新建？'
    },


};

let currentLang = 'en-US';

function initI18n() {
    console.log(`[i18n] Initializing language: ${currentLang}`);
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nData[currentLang] && i18nData[currentLang][key]) {
            const newText = i18nData[currentLang][key];

            // 【核心修复逻辑】：判断是否包含子元素（如 input）
            if (el.children.length > 0) {
                // 如果是 label 且里面有 input，我们只替换第一个文本节点，不破坏 input
                if (el.tagName === 'LABEL' && el.querySelector('input, select, textarea')) {
                    // 找到第一个文本节点并修改它，如果没有则创建一个
                    const firstNode = el.firstChild;
                    if (firstNode && firstNode.nodeType === Node.TEXT_NODE) {
                        firstNode.textContent = newText;
                    } else {
                        el.prepend(document.createTextNode(newText));
                    }
                } else {
                    // 其他情况（如 span, div）直接替换内容
                    el.innerText = newText;
                }
            } else {
                // 纯文本元素，直接替换
                el.innerText = newText;
            }
        }
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18nData[currentLang] && i18nData[currentLang][key]) {
            el.placeholder = i18nData[currentLang][key];
        }
    });
}

function t(key) {
    if (i18nData[currentLang] && i18nData[currentLang][key]) {
        return i18nData[currentLang][key];
    }
    return `[${key}]`;
}

function setLanguage(lang) {
    if (i18nData[lang]) {
        currentLang = lang;
        initI18n();
        console.log(`[i18n] Language switched to: ${lang}`);
    }
}

window.i18n = { init: initI18n, t: t, setLang: setLanguage };
