# GasWise — Testing Report

## Test 1: Invalid CSV Row

**Input:**

`2026-11-20,19:00,tea,-15,3,invalid`

**Expected:** Reject the invalid row without stopping the program.

**Actual Result:**
- Valid records: 20
- Invalid records: 1
- Program continued executing successfully.
- Existing cooking-usage calculations remained unchanged.

**Status:** Passed

## Test 2: Refill Reminder Threshold

**Original threshold:** 7 days

**Updated threshold:** 10 days

**Results:**
- Approximate depletion: 14 January 2027
- Updated reminder: 4 January 2027

**Status:** Passed

## Limitations

- Tests were conducted using synthetic cooking records.
- The tool does not measure actual LPG remaining.
- The refill date uses an approximate 60-day historical lifespan.
- Additional tests are needed for individual invalid fields, missing records, and malformed CSV files.
