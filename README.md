# GasWise — LPG Cylinder Refill Estimator

GasWise is a simple Node.js application designed to help households track cooking usage and estimate when an LPG cylinder might need refilling.

The project focuses on a real household problem: LPG cylinders sometimes run out unexpectedly, making it difficult to plan refills in advance.

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
- Cooking duration
- Number of burners used
- Flame intensity (low, medium, or high)

Flame intensity is assigned the following weights:

| Flame intensity | Weight |
|---|---|
| Low | 0.7 |
| Medium | 1.0 |
| High | 1.3 |

The application uses these values to calculate an approximate cooking-usage score.

**Important:** This score represents relative cooking activity, not the actual quantity of LPG consumed.

## Installation and Usage

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd GasWise
```

### 2. Check Node.js

```bash
node --version
```

### 3. Prepare the data

Add cooking records to `data.csv` using the CSV format expected by the application.

### 4. Run the application

```bash
node index.js
```

The application reads the cooking records, validates them, and displays the calculated results.

## Data Collection

Cooking records were collected with help from my mother to understand household cooking patterns.

The data was used to evaluate the application's calculations and understand the limitations of estimating LPG usage from cooking activities.

AI-generated sample records were also used during development for testing, but they are not substitutes for genuine household observations.

## Limitations

- The application does not directly measure LPG remaining in a cylinder.
- Cooking duration and flame intensity provide approximate usage indicators.
- Actual LPG consumption depends on burner efficiency, gas flow, cooking habits, and other factors.
- Predictions based on an assumed cylinder lifespan may not reflect the actual refill date.
- More genuine historical cooking and refill data would improve future estimates.

## Future Improvements

- Track actual cylinder replacement dates.
- Collect more historical cooking records.
- Introduce more reliable consumption estimates.
- Add a simple web interface.
- Provide configurable refill reminders.

## AI Assistance

ChatGPT was used to assist with project planning, JavaScript implementation, debugging, CSV validation, testing, and documentation.

Details are available in the AI assistance record included in the repository.

## Project Reflection

The project reflection is available in [`reflection.md`](reflection.md).

## Conclusion

GasWise demonstrates how a small software application can help address an everyday household problem.

The project also highlights the importance of genuine data collection, understanding user needs, and clearly communicating the limitations of estimation-based solutions.