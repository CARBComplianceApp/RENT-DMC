const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/silverbackai\.agency/gi, 'rent-ruby.com');
    content = content.replace(/silverbackai/gi, 'rent-ruby.com');
    content = content.replace(/SAilverback/gi, 'Rent-Ruby');
    content = content.replace(/Silverback/gi, 'Rent-Ruby');
    content = content.replace(/SILVERBACKAI/g, 'RENT-RUBY');
    
    // Also fix the SB icon in index
    if (filePath.includes('index.html')) {
        content = content.replace(/'%239B111E'>SB<\/text>/g, "'%239B111E'>R</text>");
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
}

const files = [
    './index.html',
    './src/components/TenantPortal.tsx',
    './src/components/ProductTour.tsx',
    './src/components/FeatureSummarySheet.tsx',
    './src/components/AIImageGenerator.tsx',
    './src/components/OwnerPresentation.tsx',
    './src/components/MaintenanceModule.tsx',
    './src/components/CEOBriefingPortal.tsx',
    './src/components/RentRollDashboard.tsx'
];

files.forEach(f => {
    if(fs.existsSync(f)) {
        replaceInFile(f);
        console.log('Updated', f);
    }
});
