const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

const outDir = '/workspace/app/docs/ui-design/images';
fs.mkdirSync(outDir, { recursive: true });

function drawPOSDesktop() {
  const canvas = createCanvas(1440, 900);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f9fafb';
  ctx.fillRect(0,0,1440,900);
  ctx.fillStyle = '#151515';
  ctx.fillRect(0,0,240,900);
  ctx.fillStyle = '#aa0000';
  ctx.fillRect(0,0,240,60);
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Arial';
  ctx.fillText('HoBo Retail POS', 20, 35);
  ctx.fillStyle = '#000000';
  ctx.font = '18px Arial';
  ctx.fillText('POS Terminal', 280, 40);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(1100,0,340,900);
  ctx.fillStyle = '#000000';
  ctx.font = '16px Arial';
  ctx.fillText('Cart', 1120, 40);
  ctx.fillStyle = '#aa0000';
  ctx.fillRect(1120,820,300,50);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Pay Cash', 1230, 850);
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outDir,'01_Retail_POS_Shop_UI_Desktop_POS_Terminal.png'), buf);
  console.log('done1');
}

try { require('canvas'); drawPOSDesktop(); } catch(e) { console.log('err'); }
