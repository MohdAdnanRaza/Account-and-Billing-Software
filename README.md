File Upload for Bills: Allows the uploading of Excel files, processes data using xlsx, and stores it in MongoDB.
Assign Bills to Salesmen: Provides endpoints to assign selected bills to specific salesmen.
Daily Cron Job for Deletion: Scheduled to delete assigned bills at midnight daily.
Salesman-Specific Bill Fetching: Enables fetching of bills by salesman name.
Wallet and Payment Summaries: Routes to retrieve, update, and summarize wallets and payments for individual salesmen.
Payment Approval Workflow: Allows salesmen to request payment approvals, capturing details based on payment modes (cheque, UPI).
Admin Payment Approval: Admin can view and approve or reject pending payments, updating bill status accordingly.
CRUD Operations for Bills: Includes endpoints to add, update, and delete bills.
Bill Filtering and Categorization: Categorizes bills by age ranges (0-7, 8-14, 15-21, and 22-28 days) for easier filtering and tracking.
If want to you run this app run "npm run dev" this will start your frontend and for backend run "npm start". 
