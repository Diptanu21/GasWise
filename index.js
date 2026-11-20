
const fs = require("fs");

const INSTALL_DATE = "2026-11-15";
const EXPECTED_LIFESPAN = 60;
const REMINDER_DAYS = 10;

const flameFactor = {
  low: 0.7,
  medium: 1.0,
  high: 1.3
};

const lines = fs.readFileSync("data.csv", "utf8")
  .trim()
  .split(/\r?\n/)
  .slice(1);

let totalMinutes = 0;
let weightedUsage = 0;
let validRecords = 0;
let invalidRecords = 0;

const observedDays = new Set();
const mealUsage = {};

for (const line of lines) {
  if (!line.trim()) continue;

  const [date, startTime, meal, duration, burners, flame] =
    line.split(",").map(x => x.trim());

  const minutes = Number(duration);
  const burnerCount = Number(burners);
  const factor = flameFactor[flame?.toLowerCase()];

  const validDate =
    /^\d{4}-\d{2}-\d{2}$/.test(date || "") &&
    !Number.isNaN(new Date(date + "T00:00:00").getTime());

  const validTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(startTime || "");

  if (
    !validDate ||
    !validTime ||
    !meal ||
    !duration ||
    !burners ||
    !Number.isFinite(minutes) ||
    minutes <= 0 ||
    !Number.isInteger(burnerCount) ||
    burnerCount < 1 ||
    burnerCount > 2 ||
    factor === undefined
  ) {
    console.log("Skipping invalid row:", line);
    invalidRecords++;
    continue;
  }

  const usage = minutes * burnerCount * factor;

  totalMinutes += minutes;
  weightedUsage += usage;
  observedDays.add(date);
  validRecords++;

  mealUsage[meal] = (mealUsage[meal] || 0) + usage;
}

console.log("\n===== GasWise LPG Usage Report =====");

console.log("Valid records:", validRecords);
console.log("Invalid records:", invalidRecords);
console.log("Observed dates:", observedDays.size);
console.log("Total cooking minutes:", totalMinutes);
console.log("Weighted burner minutes:", weightedUsage.toFixed(2));

if (observedDays.size > 0) {
  const average = weightedUsage / observedDays.size;
  console.log("Average usage per recorded day:", average.toFixed(2));
}

console.log("\nUsage by cooking activity:");

for (const [meal, usage] of Object.entries(mealUsage)) {
  console.log(`${meal}: ${usage.toFixed(2)}`);
}

// Calendar-based baseline estimate
const install = new Date(INSTALL_DATE + "T12:00:00");
const estimatedEmpty = new Date(install);

estimatedEmpty.setDate(
  estimatedEmpty.getDate() + EXPECTED_LIFESPAN
);

const reminder = new Date(estimatedEmpty);
reminder.setDate(reminder.getDate() - REMINDER_DAYS);

const formatDate = d => d.toISOString().slice(0, 10);

console.log("\n===== Refill Planning =====");
console.log("Installation date:", INSTALL_DATE);
console.log("Expected lifespan:", EXPECTED_LIFESPAN, "days");
console.log("Approximate depletion date:", formatDate(estimatedEmpty));
console.log("Suggested reminder date:", formatDate(reminder));

console.log("\nImportant:");
console.log("Cooking scores are relative, not kilograms of LPG.");
console.log("Refill dates use the historical 60-day estimate.");
console.log("They are not calculated from remaining gas weight.");
console.log("Current dataset is synthetic testing data.");
