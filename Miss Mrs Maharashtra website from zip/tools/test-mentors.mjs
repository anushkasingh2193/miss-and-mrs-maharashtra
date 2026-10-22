import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const siteSource = readFileSync(new URL("../src/data/site.ts", import.meta.url), "utf8");
const mentorsPageSource = readFileSync(new URL("../src/pages/Mentors.tsx", import.meta.url), "utf8");
const mentorBlock = siteSource.match(/export const mentors = \[([\s\S]*?)\n\];\n\nexport const jury/);

assert.ok(mentorBlock, "mentor roster should be exported before the jury roster");

const expectedMentors = [
  ["Mrs. Zoya Siraj Sheikh", "Founder & Chairman"],
  ["Mr. Siraj Sheikh", "Chairman"],
  ["Mrs. Kavita Kharayat", "Fashion Grooming & Stylist Expert"],
  ["Megha Kapoor Amesar", "Makeover Expert"],
  ["Mrs. Sonali Nakshine", "Voice Modulation Expert"],
  ["Miss Mohini Sharma", "Mentor, Season 1"],
  ["Dr. Girish Chhabrani", "Smile Expert"],
  ["Dr. Anshul Jain", "Skin Expert"],
  ["Mrs. Soniya Khatri", "Diet Expert"],
  ["Dr. Shivangi Garg", "Mental Health Expert"],
];

for (const [name, role] of expectedMentors) {
  assert.match(mentorBlock[1], new RegExp(`name: "${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  assert.match(mentorBlock[1], new RegExp(`role: "${role.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
}

assert.equal((mentorBlock[1].match(/\{ name:/g) ?? []).length, 10, "mentor roster should contain ten profiles");
assert.match(mentorBlock[1], /mentor\/dr-girish-chhabrani-provisional\.jpeg/);
assert.match(mentorBlock[1], /mentor\/dr-anshul-jain-provisional\.png/);
assert.match(mentorBlock[1], /mentor\/soniya-khatri-provisional\.png/);
assert.match(mentorBlock[1], /mentor\/dr-shivangi-garg-provisional\.png/);
assert.match(mentorsPageSource, /\[mentors\.length, "Mentors"\]/, "mentor count should follow the roster data");

console.log("Mentor roster test passed: 10 profiles with current roles and provisional assets.");
