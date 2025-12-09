const fs = require('fs');

// Tọa độ GPS cho các thành phố
const coordinates = {
  'Hồ Chí Minh': [
    { lat: 10.8231, lng: 106.6797 }, // 1
    { lat: 10.8245, lng: 106.6920 }, // 3
    { lat: 10.8190, lng: 106.7050 }, // 4
    { lat: 10.8340, lng: 106.6650 }, // 6
    { lat: 10.8100, lng: 106.7120 }, // 7
    { lat: 10.8400, lng: 106.6550 }, // 9
    { lat: 10.8150, lng: 106.6800 }, // 10
    { lat: 10.8280, lng: 106.7000 }, // 12
    { lat: 10.8220, lng: 106.6900 }, // 13
    { lat: 10.8350, lng: 106.6700 }, // 15
    { lat: 10.8100, lng: 106.7200 }, // 17
    { lat: 10.8260, lng: 106.6850 }, // 18
    { lat: 10.8190, lng: 106.7080 }, // 20
    { lat: 10.8310, lng: 106.6600 }, // 22
    { lat: 10.8130, lng: 106.7150 }, // 24
  ],
  'Hà Nội': [
    { lat: 21.0285, lng: 105.8542 }, // 2
    { lat: 21.0305, lng: 105.8445 }, // 5
    { lat: 21.0265, lng: 105.8650 }, // 8
    { lat: 21.0320, lng: 105.8400 }, // 11
    { lat: 21.0245, lng: 105.8700 }, // 14
    { lat: 21.0340, lng: 105.8350 }, // 16
    { lat: 21.0280, lng: 105.8600 }, // 19
    { lat: 21.0310, lng: 105.8480 }, // 21
    { lat: 21.0250, lng: 105.8750 }, // 23
  ]
};

// Đọc file mock data
const filePath = 'd:\\DACS2\\NextStepZ\\frontend\\lib\\companies-mock-data.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Tìm tất cả các company ID
const companyMatches = [];
const companyRegex = /id: ['\"](\d+)['\"]/g;
let match;
while ((match = companyRegex.exec(content)) !== null) {
  companyMatches.push(parseInt(match[1]));
}

console.log('Found companies:', companyMatches);

// Tạo mapping
let hcmIndex = 0;
hanoiIndex = 0;

companyMatches.forEach(id => {
  // Tìm location của company này
  const companyIdPattern = new RegExp(`id: ['\"]${id}['\"]\\s*,.*?location: ['\"]([^'\"]*)['\"]\s*,`, 's');
  const locationMatch = content.match(companyIdPattern);
  
  if (locationMatch) {
    const location = locationMatch[1];
    let coords;
    
    if (location === 'Hồ Chí Minh') {
      coords = coordinates['Hồ Chí Minh'][hcmIndex];
      hcmIndex++;
    } else if (location === 'Hà Nội') {
      coords = coordinates['Hà Nội'][hanoiIndex];
      hanoiIndex++;
    }
    
    if (coords && !content.match(new RegExp(`id: ['\"]${id}['\"]\\s*,.*?latitude:`, 's'))) {
      // Thêm tọa độ ngay sau location
      const oldPattern = new RegExp(`(id: ['\"]${id}['\"]\\s*,.*?location: ['\"]${location}['\"],)`, 's');
      const newText = `$1\n    latitude: ${coords.lat},\n    longitude: ${coords.lng},`;
      content = content.replace(oldPattern, newText);
      console.log(`Updated company ${id} (${location}) with coords: ${coords.lat}, ${coords.lng}`);
    }
  }
});

// Ghi file lại
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated coordinates!');
