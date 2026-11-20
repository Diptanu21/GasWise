
# GasWise — LPG Cylinder Refill Estimator

GasWise is a simple Node.js application designed to help households track cooking usage and estimate when an LPG cylinder might need refilling.

The project focuses on a real household problem: LPG cylinders sometimes run out unexpectedly, making it difficult to plan refills in advance.

## Demo Video

[Watch GasWise Project Demonstration](https://drive.google.com/file/d/1NvYgVwiX9lK2UcmGGxr8meQC-W72IC2e/view?usp=sharing)

The demonstration includes:
- Project overview and cooking dataset
- Running the Node.js application
- Cooking-usage calculations
- LPG refill reminder
- Invalid CSV input validation
- Restoring the original dataset after testing

## Problem Statement

My mother manages daily cooking at home, and unexpected LPG cylinder depletion can cause inconvenience.

GasWise aims to help by recording cooking activity, estimating relative gas usage, and providing an early refill reminder.

## Features

- Tracks cooking activity using CSV records.
- Considers cooking duration, burner usage, and flame intensity.
- Calculates a weighted cooking-usage score.
- Provides an approximate refill reminder.
- Validates CSV records and handles invalid input.
- Runs locally using Node.js.

## Technologies Used

- JavaScript
- Node.js
- CSV for storing cooking records
- Git and GitHub for version control

## How It Works

GasWise uses cooking records containing information such as:

- Date of cooking
- Cooking start time
- Cooking activity
- Cooking duration
- Number of burners used
- Flame intensity (low, medium, or high)

Flame intensity is assigned the following weights:

| Flame intensity | Weight |
|---|---|
| Low | 0.7 |
| Medium | 1.0 |
| High | 1.3 |

The weighted cooking-usage score is calculated as:

Weighted Usage = Duration × Number of Burners × Flame Weight

The application calculates:
- Total cooking duration
- Total weighted burner minutes
- Average usage per recorded day
- Usage breakdown by cooking activity

**Important:** The usage score represents relative cooking activity, not the actual quantity of LPG consumed.

### Refill Reminder Calculation

The current version uses:
- Cylinder installation date: 15 November 2026
- Assumed cylinder lifespan: 60 days
- Reminder threshold: 10 days

Based on these assumptions:
- Approximate depletion date: 14 January 2027
- Suggested reminder date: 4 January 2027

The reminder is calculated using the assumed cylinder lifespan rather than the weighted cooking-usage score.

## Installation and Usage

### 1. Clone the repository

```bash
git clone https://github.com/Diptanu21/GasWise.git
cd GasWise
```

### 2. Check Node.js

```bash
node --version
```

### 3. Prepare the data

Add cooking records to `data.csv` using the following format:

```csv
date,start_time,meal,duration_min,burners,flame
2026-11-20,08:00,breakfast,30,1,medium
```

### 4. Run the application

```bash
node index.js
```

The application reads the cooking records, validates them, and displays the calculated results.

## CSV Validation

GasWise checks:
- Date and time formats
- Missing cooking activities
- Invalid cooking durations
- Invalid burner counts
- Unsupported flame intensity values
- Incorrect numbers of CSV columns

If any invalid records are detected, the program displays validation errors and stops report generation until the data is corrected.

## Data Collection

Cooking information was collected with help from my mother to understand household cooking patterns.

The dataset includes information reported by my mother, direct observations, and estimated records based on her usual cooking routine.

Not all records represent individually observed cooking sessions.

AI-generated sample records were also used during development for testing, but they are not substitutes for genuine household observations.

Further real-world observations are required to improve the reliability of the estimation.

More information is available in [fieldwork.md](fieldwork.md).

## Testing

The application was tested for:

1. Invalid CSV records
2. Refill reminder threshold changes
3. Successful processing of valid cooking records

The invalid CSV test confirmed that the application identifies incorrect input and stops report generation.

The reminder threshold test compared 7-day and 10-day advance reminders.

Detailed testing information is available in [testing.md](testing.md).

## Limitations

- The application does not directly measure LPG remaining in a cylinder.
- Cooking duration and flame intensity provide approximate usage indicators.
- Actual LPG consumption depends on burner efficiency, gas flow, cooking habits, and other factors.
- The refill reminder uses an assumed 60-day cylinder lifespan.
- Cooking-usage scores do not currently affect the estimated depletion date.
- More genuine historical cooking and refill data would improve future estimates.

## Future Improvements

- Track actual cylinder replacement dates.
- Collect more historical cooking records.
- Introduce usage-calibrated consumption estimates.
- Add a simple web interface.
- Provide configurable refill reminders.
- Compare actual refill history with estimated dates.

## AI Assistance

ChatGPT was used to assist with project planning, JavaScript implementation, debugging, CSV validation, testing, and documentation.

Details are available in the AI assistance record included in the repository.

## Project Reflection

The project reflection is available in [reflection.md](reflection.md).

## Conclusion

GasWise demonstrates how a small software application can help address an everyday household problem.

The application currently provides cooking-usage monitoring and a calendar-based early refill reminder.

The project also highlights the importance of genuine data collection, understanding user needs, and clearly communicating the limitations of estimation-based solutions.
