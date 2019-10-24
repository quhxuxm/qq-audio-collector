import {FileCollector} from "./FileCollector";

const fileCollector = new FileCollector(`D:\\Perforce-copy\\.history`);
fileCollector.collect(`D:\\Perforce`, `D:\\Perforce-copy`, [`.java`]);
