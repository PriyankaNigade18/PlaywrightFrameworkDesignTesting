import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

async function sendEmail() {

    console.log('1️⃣ Starting email process...');

    const username = process.env.MAIL_USERNAME;
    const password = process.env.MAIL_APP_PASSWORD;

    console.log('2️⃣ Username available:', !!username);
    console.log('3️⃣ Password available:', !!password);

    if (!username || !password) {
        throw new Error(
            'MAIL_USERNAME or MAIL_APP_PASSWORD is missing.'
        );
    }

    const reportPath = path.join(
        process.cwd(),
        'allure-report.zip'
    );

    console.log('4️⃣ Checking report:', reportPath);

    if (!fs.existsSync(reportPath)) {
        throw new Error(
            `Allure report ZIP not found: ${reportPath}`
        );
    }

    console.log('5️⃣ Report ZIP found.');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: username,
            pass: password
        }
    });

    console.log('6️⃣ SMTP transporter created.');

    await transporter.verify();

    console.log('7️⃣ Gmail SMTP connection successful.');

    await transporter.sendMail({

        from: username,

        to: username,

        subject: 'Playwright Automation - Allure Report',

        text: `
Hello,

Playwright automation execution has completed.

Environment: QA
Framework: Playwright
Browser: Chromium

Please find the Allure report attached.

Regards,
Automation Team
`,

        attachments: [
            {
                filename: 'allure-report.zip',
                path: reportPath
            }
        ]
    });

    console.log('8️⃣ Email sent successfully.');
}

sendEmail().catch(error => {

    console.error(
        '❌ Failed to send email:',
        error
    );

    process.exit(1);
});