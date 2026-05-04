/**
 * Convert HTML proposal to professional PDF
 * 
 * Uses puppeteer to render HTML with full styling and generate PDF
 * 
 * Usage:
 *   node scripts/html-to-pdf.js proposals/iac-proposal.html
 *   node scripts/html-to-pdf.js proposals/pricing-analysis.html
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Embed logo as base64 so Puppeteer footer can render it (external URLs are blocked in footerTemplate)
const FILANTUS_LOGO_B64 = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTSAyOSw4IEwgNzIsOCBMIDcyLDU2IEwgMTUsNTYgTCAxNSwyMiBRIDE1LDggMjksOCBaIiBmaWxsPSIjMDA4OENDIiAvPgogIDxwYXRoIGQ9Ik0gNzgsOCBMIDE3MSw4IFEgMTg1LDggMTg1LDIyIEwgMTg1LDU2IEwgNzgsNTYgTCA3OCw4IFoiIGZpbGw9IiM5RkNGM0YiIC8+CiAgPHBhdGggZD0iTSAxNSw2MiBMIDcyLDYyIEwgNzIsMTkyIEwgMjksMTkyIFEgMTUsMTkyIDE1LDE3OCBMIDE1LDYyIFoiIGZpbGw9IiNFQzY3MzAiIC8+CiAgPHBhdGggZD0iTSA3OCw2MiBMIDE0Niw2MiBRIDE2MCw2MiAxNjAsNzYgTCAxNjAsMTA0IFEgMTYwLDExOCAxNDYsMTE4IEwgNzgsMTE4IEwgNzgsNjIgWiIgZmlsbD0iI0Q3N0RGRiIgLz4KPC9zdmc+';
const FILANTUS_LOGO_DATA_URI = `data:image/svg+xml;base64,${FILANTUS_LOGO_B64}`;

async function htmlToPdf(inputPath, outputPath) {
  console.log(`\n📄 Converting HTML to PDF...\n`);
  console.log(`   Input:  ${inputPath}`);
  console.log(`   Output: ${outputPath}\n`);

  // Read HTML file
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Error: File not found: ${inputPath}`);
    process.exit(1);
  }

  const htmlContent = fs.readFileSync(inputPath, 'utf-8');

  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set content and wait for fonts/styles to load
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  });

  // Generate PDF with professional settings
  await page.pdf({
    path: outputPath,
    format: 'Letter', // 8.5 x 11 inches (US standard)
    printBackground: true, // Include background colors and gradients
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.75in', // Increased to accommodate footer with page numbers
      left: '0.5in'
    },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>', // Empty header
    footerTemplate: `
      <div style="width: 100%; font-size: 9px; padding: 10px 20px; color: #666; border-top: 1px solid #e0e0e0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; width: 100%; column-gap: 10px;">
          <span>&copy; 2026 Filantus LLC. All rights reserved.</span>
          <img src="${FILANTUS_LOGO_DATA_URI}" alt="Filantus" style="height: 14px; justify-self: center;" />
          <span style="text-align: right;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
          </span>
        </div>
      </div>
    `,
    preferCSSPageSize: false,
    scale: 0.9 // Slightly reduce scale for better fit
  });

  await browser.close();

  // Check file size
  const stats = fs.statSync(outputPath);
  const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(`✅ PDF generated successfully!`);
  console.log(`   File size: ${fileSizeInMB} MB`);
  console.log(`   Location:  ${outputPath}\n`);
}

// Main execution
(async () => {
  try {
    const inputFile = process.argv[2] || 'proposals/iac-proposal.html';
    
    // Resolve paths
    const projectRoot = path.resolve(__dirname, '..');
    const inputPath = path.resolve(projectRoot, inputFile);
    
    // Generate output filename
    const inputBasename = path.basename(inputFile, '.html');
    const outputPath = path.resolve(
      path.dirname(inputPath),
      `${inputBasename}.pdf`
    );

    await htmlToPdf(inputPath, outputPath);

    console.log(`\n📧 Ready to send!\n`);
    console.log(`   You can now:`);
    console.log(`   1. Send PDF directly to IAC`);
    console.log(`   2. Upload to Google Drive for review`);
    console.log(`   3. Convert to DOCX using online tools if needed\n`);

  } catch (error) {
    console.error('\n❌ Error generating PDF:\n', error.message);
    process.exit(1);
  }
})();
