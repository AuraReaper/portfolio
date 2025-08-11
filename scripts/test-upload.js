#!/usr/bin/env node

/**
 * Test script for debugging upload functionality
 * Usage: node scripts/test-upload.js [image|resume] [file-path]
 */

const fs = require('fs');
const path = require('path');

async function testUpload(type, filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    console.error('❌ File not found:', filePath);
    process.exit(1);
  }

  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  console.log('🧪 Testing upload to:', `${baseUrl}/api/upload`);
  console.log('📁 File:', filePath);
  console.log('📋 Type:', type);

  try {
    const FormData = require('form-data');
    const { default: fetch } = await import('node-fetch');
    
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('type', type);

    console.log('⏳ Uploading...');
    const response = await fetch(`${baseUrl}/api/upload`, {
      method: 'POST',
      body: form,
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Upload successful!');
      console.log('🔗 URL:', result.url);
      console.log('📄 Filename:', result.filename);
    } else {
      console.log('❌ Upload failed!');
      console.log('📋 Status:', response.status);
      console.log('💬 Error:', result.error);
      console.log('🔍 Details:', result.details);
    }
  } catch (error) {
    console.error('💥 Test failed:', error.message);
  }
}

// Parse command line arguments
const [,, type, filePath] = process.argv;

if (!type || !['image', 'resume'].includes(type)) {
  console.log('Usage: node scripts/test-upload.js [image|resume] [file-path]');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/test-upload.js image ./test-image.jpg');
  console.log('  node scripts/test-upload.js resume ./test-resume.pdf');
  process.exit(1);
}

testUpload(type, filePath);