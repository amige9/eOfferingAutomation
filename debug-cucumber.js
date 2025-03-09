// Run with: node debug-cucumber.js
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

console.log('======== Cucumber.js Diagnostic Tool ========');
console.log(`Working directory: ${process.cwd()}`);
console.log(`Node version: ${process.version}`);

// Scan for feature files
console.log('\n=== Feature Files ===');
const featureFiles = [];

function findFiles(dir, extension) {
    const results = [];
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            results.push(...findFiles(fullPath, extension));
        } else if (file.name.endsWith(extension)) {
            results.push(fullPath);
        }
    }
    
    return results;
}

try {
    const features = findFiles('.', '.feature');
    console.log(`Found ${features.length} feature files:`);
    features.forEach(f => {
        console.log(`- ${f}`);
        // Check for @fail tags
        const content = fs.readFileSync(f, 'utf8');
        const hasFailTag = content.includes('@fail');
        console.log(`  Has @fail tag: ${hasFailTag ? 'YES' : 'NO'}`);
        
        // Show first few lines
        const lines = content.split('\n').slice(0, 5);
        console.log('  First 5 lines:');
        lines.forEach(line => console.log(`    ${line}`));
    });
    featureFiles.push(...features);
} catch (err) {
    console.error('Error finding feature files:', err);
}

// Check step definition files
console.log('\n=== Step Definition Files ===');
try {
    const patterns = ['**/*.steps.ts', '**/*steps.ts', '**/steps/**/*.ts'];
    console.log('Looking for step files matching patterns:', patterns);
    
    let stepsFound = 0;
    const allTsFiles = findFiles('.', '.ts');
    console.log(`Found ${allTsFiles.length} TypeScript files total.`);
    
    for (const file of allTsFiles) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('Given(') || content.includes('When(') || content.includes('Then(')) {
            console.log(`- ${file} (contains step definitions)`);
            stepsFound++;
        }
    }
    
    console.log(`Found ${stepsFound} files with step definitions.`);
} catch (err) {
    console.error('Error finding step files:', err);
}

// Check environment variables
console.log('\n=== Environment Setup ===');
console.log('Environment variables:');
console.log(`- BASEURL: ${process.env.BASEURL || 'not set'}`);
console.log(`- BROWSER: ${process.env.BROWSER || 'not set'}`);
console.log(`- ENV: ${process.env.ENV || 'not set'}`);

// Check for .env.test file
if (fs.existsSync('.env.test')) {
    console.log('Found .env.test file:');
    const envContent = fs.readFileSync('.env.test', 'utf8');
    envContent.split('\n').forEach(line => console.log(`  ${line}`));
} else {
    console.log('No .env.test file found');
}

// Try running cucumber with --dry-run
console.log('\n=== Cucumber Dry Run ===');
try {
    // First, try running with ts-node
    console.log('Running: npx cucumber-js --dry-run --format summary');
    const result = spawnSync('npx', ['cucumber-js', '--dry-run', '--format', 'summary'], { 
        encoding: 'utf8',
        shell: true
    });
    
    if (result.status === 0) {
        console.log('Cucumber.js dry run successful:');
        console.log(result.stdout);
    } else {
        console.log('Cucumber.js dry run failed:');
        console.log(result.stdout);
        console.error(result.stderr);
    }
    
    // Try directly with a specific feature file if we found any
    if (featureFiles.length > 0) {
        console.log(`\nTrying with specific feature file: ${featureFiles[0]}`);
        const featureResult = spawnSync('npx', ['cucumber-js', featureFiles[0], '--dry-run'], {
            encoding: 'utf8',
            shell: true
        });
        
        if (featureResult.status === 0) {
            console.log('Feature dry run succeeded:');
            console.log(featureResult.stdout);
        } else {
            console.log('Feature dry run failed:');
            console.log(featureResult.stdout);
            console.error(featureResult.stderr);
        }
    }
} catch (err) {
    console.error('Error running cucumber dry run:', err);
}

console.log('\n=== Diagnostic Complete ===');