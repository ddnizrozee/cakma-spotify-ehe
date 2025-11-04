# Installing Node.js & npm on Windows

If you see an error like `'npm' is not recognized as an internal or external command`, Windows does
not know where your Node.js tools are installed yet. Follow the steps below to fix it.

## 1. Install Node.js

1. Visit [https://nodejs.org/](https://nodejs.org/) and download the **LTS** installer.
2. Run the installer, accept the defaults, and finish the setup.
3. (Optional) You can also install Node.js via the Windows Package Manager with:

   ```powershell
   winget install OpenJS.NodeJS.LTS
   ```

## 2. Refresh your PATH

- Close any Command Prompt, PowerShell, or terminal windows that were open before the installation.
- Launch a **new** terminal (Command Prompt, PowerShell, or Windows Terminal). The installer only adds
  `node.exe` and `npm.cmd` to PATH for sessions started after installation.

## 3. Verify the installation

Run the following commands inside the new terminal:

```powershell
node --version
npm --version
```

You should see version numbers. If either command fails:

- Ensure the installation directory (typically `C:\Program Files\nodejs\`) is on your PATH.
- Re-run the installer and choose the "Change" option to repair the installation.

## 4. Still not working?

- Restart your computer to ensure PATH updates take effect everywhere.
- Confirm that your antivirus did not block the installation.
- Check `%AppData%\npm` and `%ProgramFiles%\nodejs\` for the presence of `npm.cmd`.
- As a fallback, manually add `C:\Program Files\nodejs\` to your PATH through **System Properties →
  Environment Variables**.

Once `node --version` and `npm --version` both work, return to the project folder and run `npm install`
to set up the Electron dependencies.