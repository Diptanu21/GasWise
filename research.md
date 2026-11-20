# GasWise — Smart LPG Refill Estimator

## 1. Problem Statement

1. My mother uses an LPG cylinder for everyday cooking at home.
2. One cylinder typically lasts approximately 60 days.
3. She currently estimates the remaining LPG by judging the cylinder's weight by feel.
4. Unexpected shortages have occurred because it is difficult to know exactly when the cylinder will become empty.
5. I want to build GasWise, a simple tool that tracks daily cooking usage and provides an early refill-planning reminder.

## 2. Target User

- **Name:** Tutan Sarkar Mahajan
- **Role:** My mother, who manages household cooking and LPG usage
- **Location:** Our home in  Agartala,Tripura.
- **Problem:** Uncertainty about when the LPG cylinder will run out, sometimes resulting in unexpected shortages.

## 3. Proposed Solution

GasWise is a lightweight JavaScript-based LPG usage tracking and refill-planning tool.

It will:

- Record cooking duration for breakfast, lunch, dinner, and other cooking activities.
- Track the number of burners used and approximate flame intensity (low, medium, high).
- Read at least 20 real cooking observations from a CSV file.
- Calculate average daily cooking usage using weighted burner minutes.
- Use the household's approximate 60-day cylinder lifespan as an initial reference.
- Provide an estimated refill-planning window and a reminder to check the cylinder before the expected depletion date.

The current cylinder was installed approximately five days before November 20, 2026.

The tool will not measure actual LPG consumption directly. Cooking duration and flame intensity provide approximate usage indicators, not precise measurements of gas remaining.

## 4. Existing Solutions

### Solution 1: Calendar-Based Refill Reminders

A standard calendar application can remind someone to check or book an LPG refill after a fixed number of days.

**Why it does not fully solve the problem:**

Cooking habits are not identical every day. Some days involve longer cooking times or more burners. A fixed reminder does not automatically account for these differences.

### Solution 2: LPG Cylinder Weighing Scale

A suitable weighing scale can help estimate the remaining LPG by comparing measured cylinder weight with the cylinder's tare weight.

**Why it does not fit my target user:**

My mother currently judges cylinder weight by feel rather than using a weighing scale. Buying and using additional measuring equipment would introduce another step into her existing routine.

## 5. Research Sources

### Source 1: LPG Safety Guidelines — IndianOil

- **Title:** PMUY LPG Safety Guidelines — IndianOil
- **URL:** https://iocl.com/download/PMUY_SAFETY_Poster_English_07_06_2016.pdf

**Three-line research note:**

1. IndianOil recommends keeping LPG cylinders upright and following proper safety practices.
2. I learned that physically moving or tilting a connected cylinder is not a suitable method for repeatedly monitoring LPG levels.
3. GasWise should track cooking usage and provide refill reminders without requiring users to move the cylinder.

### Source 2: Evaluating the Performance of Household Liquefied Petroleum Gas Cookstoves

- **Title:** Evaluating the Performance of Household Liquefied Petroleum Gas Cookstoves
- **URL:** https://pmc.ncbi.nlm.nih.gov/articles/PMC7362386/

**Three-line research note:**

1. Researchers studied the performance of different household LPG cooking stoves under different operating conditions.
2. I learned that burner power and stove conditions affect cooking performance and gas consumption.
3. GasWise should record cooking duration, burner usage, and approximate flame intensity instead of relying only on the number of days since cylinder installation.


## 6. Expected Outcome

The first version of GasWise will read real cooking records from `data.csv` and generate a simple cooking-usage summary.

It will also provide an approximate refill-planning reminder based on the household's historical cylinder lifespan and observed usage patterns.

The main goal is to help Tutan Mahajan plan LPG refills earlier and reduce the chance of unexpected shortages.

## 7. Limitations

- Cooking duration alone cannot determine the exact amount of LPG remaining.
- Flame intensity is recorded approximately.
- Cylinder weight is currently judged by feel rather than measured numerically.
- The historical cylinder lifespan of approximately 60 days is an estimate.
- A short observation period may not represent normal usage across two months.
- GasWise is a planning aid, not a replacement for safe cylinder handling or official LPG safety guidance.
