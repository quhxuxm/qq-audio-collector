import {app, BrowserWindow} from 'electron';
export class MainFrame {
    private browserWindow: BrowserWindow;
    constructor(private width: number, private height: number, private page: string) {
    }
    public start() {
        app.on('ready', () => {
            this.browserWindow = new BrowserWindow({
                height: this.height,
                width: this.width,
            });
            this.browserWindow.loadURL(this.page);
        });
    }
}
