# GasWise — Testing Report

## Test 1: Invalid CSV Row

**Input:**

`2026-11-20,19:00,tea,-15,3,invalid`

**Expected Result:**
- The program identifies invalid CSV records.
- Validation errors are displayed.
- Report generation stops until the invalid data is corrected.

**Actual Result:**
- Valid records: 20
- Invalid records: 1
- The invalid cooking record was identified.
- The application stopped report generation without crashing.
- Existing valid records remained unchanged.

**Status:** Passed

## Test 2: Refill Reminder Threshold

**Original threshold:** 7 days

**Updated threshold:** 10 days

**Results:**
- Approximate depletion: 14 January 2027
- Original reminder: 7 January 2027
- Updated reminder: 4 January 2027

**Status:** Passed

## Limitations

- Cooking records include information collected from my mother, direct observations, and estimated entries based on her usual cooking routine.
- Not all records represent individually observed cooking sessions.
- The tool does not measure actual LPG remaining.
- The estimated refill date is based on an assumed 60-day cylinder lifespan rather than actual measured consumption.
- Additional tests are needed for individual invalid fields, missing records, and malformed CSV files.