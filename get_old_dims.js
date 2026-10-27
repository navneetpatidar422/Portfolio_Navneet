import { execSync } from 'child_process';
const oldData = execSync('git show HEAD:src/app/components/home/portraitData.ts').toString();
const m = oldData.match(/base64,([^"']+)/);
const buf = Buffer.from(m[1], 'base64');
let idx = 2;
while (idx < buf.length) {
  if (buf[idx] !== 0xFF) break;
  const marker = buf[idx + 1];
  if (marker === 0xC0 || marker === 0xC2) {
    console.log('Old portrait dims:', buf.readUInt16BE(idx + 7), 'x', buf.readUInt16BE(idx + 5));
    break;
  }
  idx += 2 + buf.readUInt16BE(idx + 2);
}
