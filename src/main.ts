import {FileCollector} from "./FileCollector";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const amrToMp3 = require('amrToMp3');

const QQ_FOLDER = `C:\\Users\\quhxu\\Documents\\Tencent Files\\1355784643\\MyCollection\\Audio`;
const COLLECT_DIR = `D:\\collected-audio\\tmp`;
const COLLECT_HISTORY_FILE = `D:\\collected-audio\\.history`;


const fileCollector = new FileCollector(COLLECT_HISTORY_FILE);
fileCollector.collect(QQ_FOLDER, COLLECT_DIR, [`.amr`]);


