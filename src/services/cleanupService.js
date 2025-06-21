import cron from 'node-cron';
import UserVerification from '../models/UserVerification.js';
import { EOL } from 'os';

const scheduledCleanup = () => {
    // Schedule a task to run at midnight every day.
    cron.schedule('0 0 * * *', async () => {
        try {
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            
            // Delete all records created more than 24 hours ago.
            const result = await UserVerification.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
            
            process.stdout.write(EOL); // New line
            console.log('--- Running Scheduled Verification Cleanup ---');
            console.log(`Successfully deleted ${result.deletedCount} expired verification records.`);
            console.log('--------------------------------------------');
            process.stdout.write(EOL); // New line

        } catch (error) {
            console.error('Error during scheduled verification cleanup:', error);
        }
    }, {
        scheduled: true,
        timezone: "UTC"
    });
};

export default scheduledCleanup; 