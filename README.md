# 🛡️ FiveM Cheat Scanner (Beta)

FiveM Cheat Scanner adalah tools berbasis **Node.js** untuk melakukan pemindaian lokal pada PC (terutama Windows) guna mendeteksi **cheat FiveM** dan **cleaner/spoofer** yang umum digunakan untuk menghindari ban.

> ⚠️ Tools ini menggunakan metode **deteksi berbasis nama file & pola**, bukan antivirus atau kernel-level scanner. Hasil tidak 100% akurat.

## ✨ Features

- 🔍 Scan otomatis folder umum:
  - Downloads
  - Desktop
  - Documents
  - Videos
  - Pictures
  - OneDrive

- 🧠 Deep Scan folder mencurigakan:
  - AppData
  - FiveM Local Files
  - Startup Folder
  - Saved Games

- 📁 Scan folder manual (custom path)
- 🧾 Log aktivitas ke file `logs.log`
- 🎨 Tampilan CLI berwarna (Cheat = Merah, Cleaner = Biru)
- 🌐 Redirect ke online scanner tambahan
- 💻 Cross-platform (Windows / Linux / macOS – optimal di Windows)

## 🚨 Detected Threats

### 🎯 Cheats
- Eulen (`loader_prod.exe`, `loader.cfg`)
- redEngine (`settings.cock`)
- Susano
- TDPremium / TDLoader
- Free FiveM Cheat (`d3d10.dll`)
- HX (berdasarkan ukuran file)
- Fake executables (`chrome.exe`, dll di lokasi mencurigakan)

### 🧹 Cleaners / Spoofers
- HWID Changer
- Spoofer
- FiveM Cleaner
- Registry Cleaner
- Trace Cleaner
- Ban Remover
- Anti-Echo
- Bongsai

## ⚠️ Disclaimer

- Tool ini tidak menghapus atau memodifikasi file
- Tidak melakukan perubahan registry atau sistem
- Deteksi berbasis nama file → false positive bisa terjadi
- Gunakan sebagai alat bantu investigasi, bukan bukti tunggal

## 🌐 Additional Scanner

- Untuk hasil lebih akurat, gunakan scanner online tambahan:
- https://detect.ac/tools

## 🧑‍💻 Author

- Bimz
- FiveM Community Tool

## 📦 Requirements

- Node.js v16 atau lebih baru
- OS: Windows (recommended)

## 📜 License
```
MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files to deal in the Software
without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, subject to the following conditions.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```


## 📥 Installation

```bash
git clone https://github.com/USERNAME/fivem-cheat-scanner.git
cd fivem-cheat-scanner
npm install
```
