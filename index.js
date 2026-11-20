
const fs = require("fs");
const path = require("path");

// Configuration
const CSV_PATH = path.join(__dirname, "data.csv");

const INSTALL_DATE = "2026-11-15";
const EXPECTED_LIFESPAN = 60;
const REMINDER_DAYS = 10;

const flameWeights = {
  low: 0.7,
  medium: 1.0,
  high: 1.3,
};

// Validate YYYY-MM-DD calendar dates
function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  );
}

// Read and validate CSV
function readCSV() {
  const text = fs
    .readFileSync(CSV_PATH, "utf8")
    .replace(/^\uFEFF/, "");

  const lines = text.split(/\r?\n/);

  const expectedHeader =
    "date,start_time,meal,duration_min,burners,flame";

  if (lines[0]?.trim() !== expectedHeader) {
    throw new Error("Invalid CSV header");
  }

  const records = [];
  const errors = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const fields = line.split(",").map(x => x.trim());

    if (fields.length !== 6) {
      errors.push(`Line ${i + 1}: Expected 6 columns`);
      continue;
    }

    const [
      date,
      start_time,
      meal,
      durationText,
      burnersText,
      flameText
    ] = fields;

    const duration_min = Number(durationText);
    const burners = Number(burnersText);
    const flame = flameText.toLowerCase();

    const validTime =
      /^([01]\d|2[0-3]):[0-5]\d$/.test(start_time);

    if (!validDate(date)) {
      errors.push(`Line ${i + 1}: Invalid date`);
    } else if (!validTime) {
      errors.push(`Line ${i + 1}: Invalid start time`);
    } else if (!meal) {
      errors.push(`Line ${i + 1}: Missing meal`);
    } else if (
      !durationText ||
      !Number.isInteger(duration_min) ||
      duration_min <= 0 ||
      duration_min > 1440
    ) {
      errors.push(`Line ${i + 1}: Invalid cooking duration`);
    } else if (
      !burnersText ||
      !Number.isInteger(burners) ||
      burners < 1 ||
      burners > 2
    ) {
      errors.push(`Line ${i + 1}: Invalid burner count`);
    } else if (!Object.hasOwn(flameWeights, flame)) {
      errors.push(`Line ${i + 1}: Invalid flame intensity`);
    } else {
      records.push({
        date,
        start_time,
        meal,
        duration_min,
        burners,
        flame
      });
    }
  }

  return { records, errors };
}

// Calculate cooking usage
function calculateStats(records) {
  let totalDuration = 0;
  let totalUsage = 0;

  const dates = new Set();
  const activityUsage = {};

  for (const record of records) {
    const {
      date,
      meal,
      duration_min,
      burners,
      flame
    } = record;

    const score =
      duration_min * burners * flameWeights[flame];

    totalDuration += duration_min;
    totalUsage += score;

    dates.add(date);

    const activity = meal.toLowerCase();

    if (!Object.hasOwn(activityUsage, activity)) {
      activityUsage[activity] = {
        sessions: 0,
        duration: 0,
        usage: 0
      };
    }

    activityUsage[activity].sessions++;
    activityUsage[activity].duration += duration_min;
    activityUsage[activity].usage += score;
  }

  const recordedDays = dates.size;

  return {
    sessions: records.length,
    recordedDays,
    totalDuration,
    totalUsage,
    averageDailyUsage:
      recordedDays > 0 ? totalUsage / recordedDays : 0,
    activityUsage
  };
}

// Calculate refill planning dates
function calculateRefill() {
  if (!validDate(INSTALL_DATE)) {
    throw new Error("Invalid cylinder installation date");
  }

  const install = new Date(`${INSTALL_DATE}T00:00:00Z`);

  const estimatedEmpty = new Date(install);
  estimatedEmpty.setUTCDate(
    estimatedEmpty.getUTCDate() + EXPECTED_LIFESPAN
  );

  const reminder = new Date(estimatedEmpty);
  reminder.setUTCDate(
    reminder.getUTCDate() - REMINDER_DAYS
  );

  const formatDate = date => date.toISOString().slice(0, 10);

  return {
    estimatedEmpty: formatDate(estimatedEmpty),
    reminder: formatDate(reminder)
  };
}

// Display final report
function printReport(stats, refill) {
  console.log("\n===== GasWise LPG Usage Report =====");

  console.log("Valid records:", stats.sessions);
  console.log("Invalid records: 0");
  console.log("Recorded days:", stats.recordedDays);
  console.log("Total cooking minutes:", stats.totalDuration);

  console.log(
    "Weighted burner minutes:",
    stats.totalUsage.toFixed(2)
  );

  console.log(
    "Average usage per recorded day:",
    stats.averageDailyUsage.toFixed(2)
  );

  console.log("\nUsage by cooking activity:");

  for (const [meal, data] of Object.entries(stats.activityUsage)) {
    console.log(
      `${meal}: ${data.usage.toFixed(2)} ` +
      `(${data.sessions} sessions, ${data.duration} min)`
    );
  }

  console.log("\n===== Refill Planning =====");
  console.log("Installation date:", INSTALL_DATE);
  console.log("Expected lifespan:", EXPECTED_LIFESPAN, "days");
  console.log("Approximate depletion date:", refill.estimatedEmpty);
  console.log("Suggested reminder date:", refill.reminder);

  console.log("\nImportant:");
  console.log("Cooking scores are relative, not kilograms of LPG.");
  console.log("Refill dates use the historical 60-day estimate.");
  console.log("They are not calculated from remaining gas weight.");
console.log("Dataset includes estimated and reported cooking records.");
console.log("See fieldwork.md for data sources and limitations.");
}

// Main
function main() {
  try {
    const { records, errors } = readCSV();

    if (errors.length > 0) {
  console.error("Valid records:", records.length);
  console.error("Invalid records:", errors.length);

  console.error("\nCSV validation errors:");

  for (const error of errors) {
    console.error("-", error);
  }

  console.error(
    "\nReport not generated until invalid rows are corrected."
  );

  process.exitCode = 1;
  return;
}

    if (records.length === 0) {
      console.error("No cooking records found.");
      process.exitCode = 1;
      return;
    }

    const stats = calculateStats(records);
    const refill = calculateRefill();

    printReport(stats, refill);
  } catch (error) {
    console.error("Error:", error.message);
    process.exitCode = 1;
  }
}

main();
