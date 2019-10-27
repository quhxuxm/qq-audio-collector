import {MainFrame} from './ui/MainFrame';


const QQ_FOLDER = `C:\\Users\\quhxu\\Documents\\Tencent Files\\1355784643\\MyCollection\\Audio`;
const COLLECT_DIR = `D:\\collected-audio\\tmp`;
const COLLECT_HISTORY_FILE = `D:\\collected-audio\\.history`;

//
// const fileCollector = new FileCollector(COLLECT_HISTORY_FILE);
// fileCollector.collect(QQ_FOLDER, COLLECT_DIR, [`.amr`]);

const mainFrame = new MainFrame(800, 600, `https://www.baidu.com`)
mainFrame.start();


