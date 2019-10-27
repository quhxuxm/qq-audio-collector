import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
export class FileCollector {
    private outputIndex: number;
    private historyMd5: Set<string>;
    private historyFilePath: string;
    constructor(historyFilePath: string) {
        this.outputIndex = 0;
        this.historyMd5 = new Set();
        this.historyFilePath = historyFilePath;
        if (!fs.existsSync(historyFilePath)) {
            fs.mkdirSync(path.dirname(historyFilePath), {
                recursive: true,
            });
            fs.writeFileSync(historyFilePath, []);
        }
        const historyFileContent = readline.createInterface({
            input: fs.createReadStream(historyFilePath),
        });
        historyFileContent.on('line', (input) => {
            this.historyMd5.add(input);
        });
    }
    public collect(sourceFolder: string, targetFolder: string, extensions: string[]) {
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder, {
                recursive: true,
            });
        }
        const sourceFiles = fs.readdirSync(sourceFolder);
        sourceFiles.forEach((value, index, array) => {
            const absolutePath = path.join(sourceFolder, value);
            if (fs.lstatSync(absolutePath).isDirectory()) {
                this.collect(absolutePath, targetFolder, extensions);
                return;
            }
            const fileExtension = path.extname(absolutePath);
            if (extensions.indexOf(fileExtension) < 0) {
                return;
            }
            const md5Hash = crypto.createHash('md5');
            const fileMd5 = md5Hash.update(fs.readFileSync(absolutePath)).digest('hex');
            if (this.historyMd5.has(fileMd5)) {
                this.outputIndex++;
                return;
            }
            this.historyMd5.add(fileMd5);
            fs.appendFileSync(this.historyFilePath, fileMd5 + '\n');
            const targetFilePath = path.join(targetFolder, `${this.outputIndex}${fileExtension}`);
            try {
                fs.copyFileSync(absolutePath, targetFilePath);
                console.log(fileMd5);
                this.outputIndex++;
            } catch (e) {
                console.log(`Can not copy file ${value} to ${targetFilePath} because of error.`, e);
            }
        });
    }
}
