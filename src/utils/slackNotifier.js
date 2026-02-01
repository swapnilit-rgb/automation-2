import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({ path: '.dev.vars' });
/**
 * Sends a test notification to Slack via the trigger URL.
 * @param {Object} params
 * @param {string} params.status - 'passed' or 'failed'
 * @param {string} params.title - Test title
 * @param {string} params.section - Section name
 * @param {Error} [params.error] - Error object, if any
 * @param {string} [params.screenshotPath] - Path to screenshot, if any
 * @param {string} params.testName - Test file or scenario name
 */
export async function notifySlack({ status, title, section, error, screenshotPath, testName }) {
  const TRIGGER_URL = process.env.SLACK_WEBHOOK_URL;

  if (!TRIGGER_URL) {
    console.warn('Slack webhook (trigger URL) not configured in .dev.vars');
    return;
  }

  // Build the Markdown message
  const resultMessage = `
*Playwright Test ${status.toUpperCase()}*
*Test:* ${testName}
*Section:* ${section}
*Title:* ${title}
${error ? `*Error:* \`\`\`${error.message || error}\`\`\`` : ''}
${screenshotPath ? ` Screenshot: \`${screenshotPath}\`` : ''}
  `.trim();

  const payload = { result: resultMessage };

  try {
    const res = await fetch(TRIGGER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error('Failed to send Slack notification', await res.text());
    } else {
      console.log('Slack notification sent successfully');
    }
  } catch (err) {
    console.error('Error sending Slack notification:', err);
  }
}
