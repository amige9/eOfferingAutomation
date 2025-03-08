const report = require("multiple-cucumber-html-reporter");
import os from 'os';

// Using Multiple Cucumber HTML Report
report.generate({
  jsonDir: "test-results/HTMLReport/",
  reportPath: "test-results/HTMLReport/",
  reportName: "e-Offering Automation Report",
  displayDuration: true,
  openReportInBrowser: true,
  displayReportTime: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "133.0.6943.60",
    },
    device: "Local test machine " + os.hostname,
    platform: {
      name: "windows",
      version: "11",
    },
  },
  customData: {
    title: "Test info",
    data: [
      { label: "Project", value: "e-Offering project" },
      { label: "Environment", value: "UAT" },
    //   { label: "Cycle", value: "B11221.34321" },
    //   { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
    //   { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});


// Using Cucumber HTML Report
// import reporter from 'cucumber-html-reporter';
// import os from 'os';

// // Define the type for options
// interface ReportOptions {
//     theme: 'bootstrap' | 'hierarchy' | 'foundation' | 'simple';
//     jsonFile: string;
//     output: string;
//     reportSuiteAsScenarios: boolean;
//     scenarioTimestamp: boolean;
//     launchReport: boolean;
//     brandTitle: string;
//     name: string;
//     displayDuration: boolean;
//     durationInMS: boolean;
//     displayReportTime: boolean;
//     retryAttempts: boolean;
//     maxRetryAttempts: number;
//     metadata: {
//         "App Version": string;
//         "Test Environment": string;
//         "Browser": string;
//         "Platform": string;
//         "Parallel": string;
//         "Executed": string;
//         "Tester": string;
//         "Machine": string;
//         "Date": string;
//     };
//     failedSummaryReport: boolean;
// }

// // Initialize options outside try block
// let options: ReportOptions = {
//     theme: 'bootstrap',
//     jsonFile: 'test-results/HTMLReport/cucumber-report.json',
//     output: 'test-results/HTMLReport/cucumber-report.html',
//     reportSuiteAsScenarios: true,
//     scenarioTimestamp: true,
//     launchReport: true,
//     brandTitle: "Title",
//     name: "Automation Test Report",
//     displayDuration: true,
//     durationInMS: true,
//     displayReportTime: true,
//     retryAttempts: true,
//     maxRetryAttempts: 3,
//     metadata: {
//         "App Version": "",
//         "Test Environment": "STAGING",
//         "Browser": "Chrome  133.0.6943.60",
//         "Platform": "Windows 10",
//         "Parallel": "Scenarios",
//         "Executed": "Remote",
//         "Tester": "QA Team",
//         "Machine": os.hostname(),
//         "Date": new Date().toISOString().slice(0, 10)
//     },
//     failedSummaryReport: true
// };

// try {
//     reporter.generate(options);
// } catch (err) {
//     console.error("Error generating report:", err);
// }