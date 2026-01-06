console.clear();

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const { exec } = require("child_process");

const userHome = getUserHome();

let cheatsFounds = 0;
let cleanersFound = 0;

const logFile = 'logs.log';

function resetLogFile() {
  try {
    const timestamp = new Date().toISOString();
    const header = `=== FiveM Cheat Scanner Log ===\nStarted at: ${timestamp}\n${'='.repeat(50)}\n\n`;
    fs.writeFileSync(logFile, header);
    logToFile(`Log file reset at program start`);
  } catch (error) {
    console.log(colors.red(`[!] Error resetting log file: ${error.message}`));
  }
}

function openURL(url) {
  const command = 
    process.platform === "win32" ? `start ${url}` :
    process.platform === "darwin" ? `open ${url}` :
    `xdg-open ${url}`;

  exec(command, (err) => {
    if (err) console.log(colors.red(`[!] Failed to open URL: ${err.message}`));
  });
}

function logToFile(message) {
  try {
    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
  } catch (error) {
    console.log(colors.red(`[!] Error writing to log file: ${error.message}`));
  }
}

resetLogFile();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const text = `  
   /$$$$$$$  /$$                               /$$$$$$$                     
  | $$__  $$|__/                              | $$__  $$                    
  | $$  \ $$ /$$ /$$$$$$/$$$$  /$$$$$$$$      | $$  \ $$ /$$$$$$$  /$$   /$$
  | $$$$$$$ | $$| $$_  $$_  $$|____ /$$/      | $$  | $$| $$__  $$| $$  | $$
  | $$__  $$| $$| $$ \ $$ \ $$   /$$$$/       | $$  | $$| $$  \ $$| $$  | $$
  | $$  \ $$| $$| $$ | $$ | $$  /$$__/        | $$  | $$| $$  | $$| $$  | $$
  | $$$$$$$/| $$| $$ | $$ | $$ /$$$$$$$$      | $$$$$$$/| $$  | $$|  $$$$$$/
  |_______/ |__/|__/ |__/ |__/|________/      |_______/ |__/  |__/ \______/ `;

console.log(colors.red(text));
console.log(colors.red("                                          ╭───────────────────────────────────────────╮"));
console.log(colors.red("                                          |           "),colors.red("FiveM Cheat Scanner"),colors.red("           |"));
console.log(colors.red("                                          |            "),colors.red("By Bimz Beta Test"),colors.red("            |"));
console.log(colors.red("                                          |  "),colors.gray("Press"), colors.red("ENTER"), colors.gray ("to start scanning the PC…"),colors.red("  |"));
console.log(colors.red("                                          ╰───────────────────────────────────────────╯"));

logToFile("Scanner started - waiting for user input");

rl.on('line', () => {
  rl.close();
  console.log(colors.red(""));
  
  logToFile("User pressed ENTER - starting scan");
  
  setTimeout(() => {
    console.log(colors.gray(" ["),colors.red("?"),colors.gray("]"),colors.gray ("Is currently scanning your PC..."));
    logToFile("Scanning process initiated");
    
    checkDirectory(userHome, "Downloads");
    checkDirectory(userHome, "Desktop");
    checkDirectory(userHome, "Documents");
    checkDirectory(userHome, "Videos");
    checkDirectory(userHome, "Pictures");
    checkDirectory(userHome, "OneDrive");
    //checkDirectory(userHome, "Recent");

    setTimeout(() => {
      console.log(colors.red(""));
      console.log(colors.gray(" ["),colors.red("?"),colors.gray("]"),colors.gray ("If you can see something"), colors.red("Red"), colors.gray ("inside the program, it means there is a cheat"));
      console.log(colors.gray(" ["),colors.red("?"),colors.gray("]"),colors.gray ("If you can see something"), colors.blue("Blue"), colors.gray ("inside the program, it means there is a cleaner"));
      console.log(colors.red(""));
      
      setTimeout(() => {
        console.log(colors.yellow(" ═══════════════════════════════════════════════════════════════"));
        console.log(colors.yellow("                          SCAN SUMMARY"));
        console.log(colors.yellow(" ═══════════════════════════════════════════════════════════════"));
        console.log(colors.gray(" ["),colors.red("!"),colors.gray("]"), colors.red("Cheats Found:"), colors.red(cheatsFounds));
        console.log(colors.gray(" ["),colors.red("!"),colors.gray("]"), colors.blue("Cleaners Found:"), colors.blue(cleanersFound));
        
        logToFile(`Initial scan completed - Cheats: ${cheatsFounds}, Cleaners: ${cleanersFound}`);
        
        if (cheatsFounds === 0 && cleanersFound === 0) {
          console.log(colors.gray(" ["),colors.green("✓"),colors.gray("]"), colors.green("No cheats or cleaners detected!"));
          logToFile("No cheats or cleaners detected in initial scan");
        } else if (cheatsFounds > 0) {
          console.log(colors.gray(" ["),colors.red("!"),colors.gray("]"), colors.red("WARNING: Cheats detected on your system!"));
          logToFile(`WARNING: ${cheatsFounds} cheats detected on the system`);
        }
        
        console.log(colors.yellow(" ═══════════════════════════════════════════════════════════════"));
        
        setTimeout(() => {
          askForAdditionalScan();
        }, 1000);
        
      }, 2500);
    }, 2200);
  }, 50);
}); 

function askForAdditionalScan() {
  const scanRl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log(colors.cyan("\n ═══════════════════════════════════════════════════════════════"));
  console.log(colors.cyan("                     ADDITIONAL SCAN OPTIONS"));
  console.log(colors.cyan(" ═══════════════════════════════════════════════════════════════"));
  console.log(colors.gray(" ["),colors.yellow("1"),colors.gray("]"), colors.white("Scan suspicious folders (AppData, Temp, etc.)"));
  console.log(colors.gray(" ["),colors.yellow("2"),colors.gray("]"), colors.white("Enter custom folder path to scan"));
  console.log(colors.gray(" ["),colors.yellow("3"),colors.gray("]"), colors.white("Exit scanner"));
  console.log(colors.cyan(" ═══════════════════════════════════════════════════════════════"));
  
  logToFile("Additional scan options presented to user");
  
  scanRl.question(colors.gray("\n Select option (1-3): "), (answer) => {
    switch(answer.trim()) {
      case '1':
        console.log(colors.yellow("\n ["),colors.yellow("!"),colors.yellow("]"),colors.yellow ("Starting deep scan of suspicious locations..."));
        logToFile("User selected deep scan of suspicious locations");
        scanSuspiciousFolders();
        setTimeout(() => {
          scanRl.close();
          askForAdditionalScan(); 
        }, 5000);
        break;
      case '2':
        const nfd = require("node-file-dialog");

        (async () => {
            try {
                const selected = await nfd({
                    type: 'directory'
                });

                const folderPath = Array.isArray(selected) ? selected[0] : selected;

                console.log(
                    colors.yellow("\n ["),
                    colors.yellow("!"),
                    colors.yellow("]"),
                    colors.yellow(" Selected Folder: " + folderPath)
                );

                if (folderPath && fs.existsSync(folderPath)) {

                    logToFile(`User selected folder: ${folderPath}`);
                    checkDirectory('', folderPath);

                    setTimeout(() => {
                        showFinalResults();
                        setTimeout(() => {
                            scanRl.close();
                            askForAdditionalScan();
                        }, 3000);
                    }, 3000);

                } else {
                    console.log(colors.red("\n [!] Folder not found!"));
                    logToFile(`Invalid folder: ${folderPath}`);
                    askForAdditionalScan();
                }

            } catch (err) {
                console.log(colors.red("\n [!] User canceled folder select dialog"));
                askForAdditionalScan();
            }
        })();
        break;
      case '3':
        console.log(colors.green("\n ["),colors.green("✓"),colors.green("]"),colors.green ("Scanner closed. Thank you for using FiveM Cheat Scanner!"));
        console.log(colors.gray("\n [+] Opening advanced online scanner for more accurate results... (https://detect.ac/tools)"));
        openURL("https://detect.ac/tools");
        logToFile(`Scanner closed - Final results: Cheats: ${cheatsFounds}, Cleaners: ${cleanersFound}`);
        logToFile("=== Scan session ended ===");
        scanRl.close();
        process.exit(0);
        break;
      default:
        console.log(colors.red("\n ["),colors.red("!"),colors.red("]"),colors.red ("Invalid option!"));
        logToFile(`User entered invalid option: ${answer}`);
        scanRl.close();
        askForAdditionalScan(); 
        break;
    }
  });
}

function scanSuspiciousFolders() {
  const suspiciousFolders = [
    { base: userHome, folder: "AppData" },
    { base: userHome, folder: "AppData\\Roaming" },
    { base: userHome, folder: "AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup" },
    { base: userHome, folder: "AppData\\Local\\FiveM" },
    { base: userHome, folder: "AppData\\Local\\FiveM\\FiveM.app" },
    { base: userHome, folder: "Saved Games" }
  ];
  
  logToFile(`Starting deep scan of ${suspiciousFolders.length} suspicious locations`);
  
  suspiciousFolders.forEach((folder, index) => {
    setTimeout(() => {
      checkDirectory(folder.base, folder.folder);
    }, index * 100);
  });
}

function showFinalResults() {
  console.log(colors.yellow("\n ═══════════════════════════════════════════════════════════════"));
  console.log(colors.yellow("                         FINAL SCAN RESULTS"));
  console.log(colors.yellow(" ═══════════════════════════════════════════════════════════════"));
  console.log(colors.gray(" ["),colors.red("!"),colors.gray("]"), colors.red("Total Cheats Found:"), colors.red(cheatsFounds));
  console.log(colors.gray(" ["),colors.red("!"),colors.gray("]"), colors.blue("Total Cleaners Found:"), colors.blue(cleanersFound));
  
  logToFile(`FINAL RESULTS - Cheats: ${cheatsFounds}, Cleaners: ${cleanersFound}`);
  
  if (cheatsFounds === 0 && cleanersFound === 0) {
    console.log(colors.gray(" ["),colors.green("✓"),colors.gray("]"), colors.green("Your system appears to be clean!"));
    logToFile("System appears to be clean - no threats detected");
  } else if (cheatsFounds > 0) {
    console.log(colors.gray(" ["),colors.red("⚠"),colors.gray("]"), colors.red("WARNING: Potential cheats detected!"));
    logToFile(`WARNING: ${cheatsFounds} potential cheats detected on system`);
  }
  
  console.log(colors.yellow(" ═══════════════════════════════════════════════════════════════"));

  console.log(colors.gray("\n [+] Opening advanced online scanner for more accurate results... (https://detect.ac/tools)"));
}

function checkDirectory(parentDir, directory) {
  const fullPath = path.join(parentDir, directory);
  if (fs.existsSync(fullPath)) {
    fs.readdir(fullPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        logToFile(`Error reading directory ${fullPath}: ${err.message}`);
        return;
      }
      files.forEach(file => {
        const filePath = path.join(fullPath, file.name);
        if (file.isDirectory()) {
          checkDirectory(fullPath, file.name);
        } else {
          if (file.name.includes('loader_prod.exe')) {
            setTimeout(() => {  
              cheatsFounds++;
              console.log(colors.red(" "));
              console.log(colors.gray(" ["),colors.red("+"),colors.gray("]"), colors.gray ("Eulen loader found in:"), colors.red(fullPath), colors.gray("|"), colors.green(file.name));
              logToFile(`CHEAT DETECTED: Eulen loader at ${path.join(fullPath, file.name)}`);
            }, 200);

          } else if (file.name.includes('loader.cfg')) {
            setTimeout(() => {
              cheatsFounds++;
              console.log(colors.red(" "));
              console.log(colors.gray(" ["),colors.red("+"),colors.gray("]"), colors.gray ("Settings Eulen found in:"), colors.red(fullPath), colors.gray("|"), colors.red(file.name));
              logToFile(`CHEAT DETECTED: Eulen settings at ${path.join(fullPath, file.name)}`);
            }, 400);

          } else if (file.name.includes('settings.cock')) {
            setTimeout(() => {
              cheatsFounds++;
              console.log(colors.red(" "));
              console.log(colors.gray(" ["),colors.red("+"),colors.gray("]"), colors.gray ("Settings redEngine in:"), colors.red(fullPath), colors.gray("|"), colors.red(file.name));
              logToFile(`CHEAT DETECTED: redEngine settings at ${path.join(fullPath, file.name)}`);
            }, 600);

          } else if (file.name.includes('password_is_eulen')) {
            setTimeout(() => {  
              cheatsFounds++;
              console.log(colors.red(" "));
              console.log(colors.gray(" ["),colors.red("+"),colors.gray("]"), colors.gray ("Eulen download folder found in:"), colors.red(fullPath), colors.gray("|"), colors.red(file.name));
              logToFile(`CHEAT DETECTED: Eulen download folder at ${path.join(fullPath, file.name)}`);
            }, 800);

          } else if (file.name.startsWith('chrome.exe')) {
            cheatsFounds++;
            setTimeout(() => { 
              console.log(colors.gray( ))
              console.log(colors.gray(" ["),colors.red("+"),colors.gray("]"), colors.gray ("TZ folder found in:"), colors.red(fullPath), colors.gray("|"), colors.red(file.name));
              logToFile(`CHEAT DETECTED: TZ folder at ${path.join(fullPath, file.name)}`);
            }, 1000);

          } else if (file.name.includes('Susano')) {
            setTimeout(() => {
              cheatsFounds++;
              console.log(colors.red(" "));
              console.log(colors.gray(" ["),colors.red("+"),colors.gray("]"),  colors.gray("Susano found in:"), colors.red(fullPath), colors.gray("|"), colors.red(file.name));
              logToFile(`CHEAT DETECTED: Susano at ${path.join(fullPath, file.name)}`);
            }, 1200);

          } else if (file.name.includes('TDPremium.exe') || file.name.includes('TDLoader.exe')) {
            setTimeout(() => {
              cheatsFounds++;
              console.log(colors.red(" "));
              console.log(colors.gray(" ["),colors.red("+"),colors.gray("]"),  colors.gray("TDPremium or TDLoader found in:"), colors.red(fullPath), colors.gray("|"), colors.red(file.name));
              logToFile(`CHEAT DETECTED: TDPremium/TDLoader at ${path.join(fullPath, file.name)}`);
            }, 1400);

          } else if (file.name.includes('d3d10.dll')) {
            setTimeout(() => {
              cheatsFounds++;
              console.log(colors.red(" "));
              console.log(colors.gray(" ["),colors.red("+"),colors.gray("]"),  colors.gray("Free FiveM Cheat found in:"), colors.red(fullPath), colors.gray("|"), colors.red(file.name));
              logToFile(`CHEAT DETECTED: Free FiveM Cheat at ${path.join(fullPath, file.name)}`);
            }, 1600);

          } else if (file.name.startsWith('usbdeview-x64.zip')) {
            cheatsFounds++;
            setTimeout(() => {  
              console.log(colors.green( ))
              console.log(colors.gray(" ["),colors.red("+"),colors.gray("]"), colors.gray("Skript folder found in:"), colors.red(fullPath), colors.gray("|"), colors.red(file.name));
              logToFile(`CHEAT DETECTED: Skript folder at ${path.join(fullPath, file.name)}`);
            }, 1800);

          } else if (file.name.startsWith('plug.exe')) {
            cheatsFounds++;
            setTimeout(() => {
              console.log(colors.green())
              console.log(colors.gray(" ["),colors.red("+"),colors.gray("]"), colors.gray("plug folder found in:"), colors.red(fullPath), colors.gray("|"), colors.red(file.name));
              logToFile(`CHEAT DETECTED: plug folder at ${path.join(fullPath, file.name)}`);
            }, 2000);

          } 
          else if (file.name.includes('cleaner') || file.name.includes('Cleaner')) {
            setTimeout(() => {
              cleanersFound++;
              console.log(colors.blue(" "));
              console.log(colors.gray(" ["),colors.blue("+"),colors.gray("]"), colors.gray("Cleaner found in:"), colors.blue(fullPath), colors.gray("|"), colors.blue(file.name));
              logToFile(`CLEANER DETECTED: Cleaner at ${path.join(fullPath, file.name)}`);
            }, 2200);

          } else if (file.name.includes('spoofer') || file.name.includes('Spoofer')) {
            setTimeout(() => {
              cleanersFound++;
              console.log(colors.blue(" "));
              console.log(colors.gray(" ["),colors.blue("+"),colors.gray("]"), colors.gray("Spoofer found in:"), colors.blue(fullPath), colors.gray("|"), colors.blue(file.name));
              logToFile(`CLEANER DETECTED: Spoofer at ${path.join(fullPath, file.name)}`);
            }, 2400);

          } else if (file.name.includes('hwid') || file.name.includes('HWID')) {
            setTimeout(() => {
              cleanersFound++;
              console.log(colors.blue(" "));
              console.log(colors.gray(" ["),colors.blue("+"),colors.gray("]"), colors.gray("HWID Changer found in:"), colors.blue(fullPath), colors.gray("|"), colors.blue(file.name));
              logToFile(`CLEANER DETECTED: HWID Changer at ${path.join(fullPath, file.name)}`);
            }, 2600);

          } else if (file.name.includes('ban_remover') || file.name.includes('BanRemover')) {
            setTimeout(() => {
              cleanersFound++;
              console.log(colors.blue(" "));
              console.log(colors.gray(" ["),colors.blue("+"),colors.gray("]"), colors.gray("Ban Remover found in:"), colors.blue(fullPath), colors.gray("|"), colors.blue(file.name));
              logToFile(`CLEANER DETECTED: Ban Remover at ${path.join(fullPath, file.name)}`);
            }, 2800);

          } else if (file.name.includes('trace_cleaner') || file.name.includes('TraceCleaner')) {
            setTimeout(() => {
              cleanersFound++;
              console.log(colors.blue(" "));
              console.log(colors.gray(" ["),colors.blue("+"),colors.gray("]"), colors.gray("Trace Cleaner found in:"), colors.blue(fullPath), colors.gray("|"), colors.blue(file.name));
              logToFile(`CLEANER DETECTED: Trace Cleaner at ${path.join(fullPath, file.name)}`);
            }, 3000);

          } else if (file.name.includes('fivem_cleaner') || file.name.includes('FiveMCleaner')) {
            setTimeout(() => {
              cleanersFound++;
              console.log(colors.blue(" "));
              console.log(colors.gray(" ["),colors.blue("+"),colors.gray("]"), colors.gray("FiveM Cleaner found in:"), colors.blue(fullPath), colors.gray("|"), colors.blue(file.name));
              logToFile(`CLEANER DETECTED: FiveM Cleaner at ${path.join(fullPath, file.name)}`);
            }, 3200);

          } else if (file.name.includes('registry_cleaner') || file.name.includes('RegistryCleaner')) {
            setTimeout(() => {
              cleanersFound++;
              console.log(colors.blue(" "));
              console.log(colors.gray(" ["),colors.blue("+"),colors.gray("]"), colors.gray("Registry Cleaner found in:"), colors.blue(fullPath), colors.gray("|"), colors.blue(file.name));
              logToFile(`CLEANER DETECTED: Registry Cleaner at ${path.join(fullPath, file.name)}`);
            }, 3400);

          } else if (file.name.includes('Anti-Echo') || file.name.includes('anti-echo')) {
            setTimeout(() => {
              cleanersFound++;
              console.log(colors.blue(" "));
              console.log(colors.gray(" ["),colors.blue("+"),colors.gray("]"), colors.gray("Anti Echo found in:"), colors.blue(fullPath), colors.gray("|"), colors.blue(file.name));
              logToFile(`CLEANER DETECTED: Anti Echo at ${path.join(fullPath, file.name)}`);
            }, 3400);

          } else if (file.name.includes('Bongsai') || file.name.includes('bongsai')) {
            setTimeout(() => {
              cleanersFound++;
              console.log(colors.blue(" "));
              console.log(colors.gray(" ["),colors.blue("+"),colors.gray("]"), colors.gray("Bongsai found in:"), colors.blue(fullPath), colors.gray("|"), colors.blue(file.name));
              logToFile(`CLEANER DETECTED: Bongsai at ${path.join(fullPath, file.name)}`);
            }, 3400);

          } else {
            const possibleFileNames = [
              'visualstudio.exe',
              'edge.exe',
              'eclipse.exe',
              'excel.exe',
              'filezilla.exe',
              'explorer.exe',
              'firefox.exe',
              'wordpad.exe',
              'acrobat.exe',
              'discord.exe',
              'winword.exe',
              'teams.exe',
              'notepad.exe',
              'opera.exe',
              'paint.exe',
              'premiere.exe',
              'putty.exe',
              'dwm.exe',
              'iexplore.exe',
              'outlook.exe',
              'photoshop.exe',
              'gimp.exe',
              'skype.exe',
              'obs.exe',
              'thunderbird.exe',
              'microsoftpowerpoint.exe',
              'steam.exe',
              'notepad++.exe',
              'microsoftedge.exe'
            ];

            for (const possibleName of possibleFileNames) {
              if (file.name.includes(possibleName)) {
                fs.stat(filePath, (err, stats) => {
                  if (err) {
                    console.log(colors.red("[!] Error loading file :", colors.yellow(filePath)));
                    logToFile(`Error analyzing file ${filePath}: ${err.message}`);
                    return;
                  }
                  const fileSizeInBytes = stats.size;
                  const fileSizeInKilobytes = fileSizeInBytes / 1024;
                  const fileSizeInMegabytes = fileSizeInKilobytes / 1024;

                  const megabytesString = fileSizeInMegabytes.toFixed(2);
                  const threeFirstDigits = parseFloat(megabytesString.substring(0, 4));

                  if (threeFirstDigits === 5.94) {
                    cheatsFounds++;
                    console.log(colors.green("[+] HX found in :", colors.yellow(fullPath), "|", colors.red(file.name)));
                    logToFile(`CHEAT DETECTED: HX at ${path.join(fullPath, file.name)} (size: ${megabytesString} MB)`);
                  }
                });
                break;
              }
            }
          }
        }
      });
    });
  }
}

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}