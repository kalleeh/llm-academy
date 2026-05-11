import { readFileSync, writeFileSync } from 'fs';

// All target .tsx files
const files = [
  'src/modules/AgentsModule.tsx',
  'src/modules/AlignmentModule.tsx',
  'src/modules/EvaluationModule.tsx',
  'src/modules/IndustryModule.tsx',
  'src/modules/SolutionModule.tsx',
  'src/modules/FineTuningModule.tsx',
  'src/modules/AIInOrgModule.tsx',
  'src/modules/agents/ContextFilesSection.tsx',
  'src/modules/agents/BusinessImpactBusiness.tsx',
  'src/modules/agents/AgentPatternsBusiness.tsx',
  'src/modules/agents/MCPSection.tsx',
  'src/modules/agents/A2ASection.tsx',
  'src/modules/agents/BuildingAgentsSection.tsx',
  'src/modules/agents/WhatAreAgentsBusiness.tsx',
  'src/modules/agents/ContextFilesBusiness.tsx',
  'src/modules/agents/HowAgentsConnectBusiness.tsx',
  'src/modules/agents/WhatAreAgentsSection.tsx',
  'src/modules/agents/ProductionGovernanceSection.tsx',
  'src/modules/agents/SkillsHarnessSection.tsx',
  'src/modules/agents/DesignPatternsSection.tsx',
  'src/modules/agents/ToolUseBusiness.tsx',
  'src/modules/agents/FunctionCallingSection.tsx',
  'src/modules/alignment/WhyAIGoesWrongBusiness.tsx',
  'src/modules/alignment/ComplianceBusiness.tsx',
  'src/modules/alignment/ModernAlternativesSection.tsx',
  'src/modules/alignment/PostTrainingPipelineSection.tsx',
  'src/modules/alignment/GuardrailsBusiness.tsx',
  'src/modules/alignment/SafetyGuardrailsSection.tsx',
  'src/modules/alignment/AlignmentProblemSection.tsx',
  'src/modules/alignment/AlignmentPipelineSection.tsx',
  'src/modules/evaluation/ModelPersonalitiesBusiness.tsx',
  'src/modules/evaluation/WhyEvaluationSection.tsx',
  'src/modules/evaluation/ChoosingModelsBusiness.tsx',
  'src/modules/evaluation/CustomEvalSection.tsx',
  'src/modules/evaluation/MeasuringAIBusiness.tsx',
  'src/modules/evaluation/BenchmarksSection.tsx',
  'src/modules/evaluation/ModelSelectionSection.tsx',
  'src/modules/evaluation/LeaderboardSection.tsx',
  'src/modules/industry/OpenVsClosedSection.tsx',
  'src/modules/industry/KeyPlayersBusiness.tsx',
  'src/modules/industry/WhereItsHeadingSection.tsx',
  'src/modules/industry/OpenVsClosedBusiness.tsx',
  'src/modules/industry/EcosystemSection.tsx',
  'src/modules/industry/WhoBuiltWhatSection.tsx',
  'src/modules/industry/WhereItsHeadingBusiness.tsx',
  'src/modules/solution/CostRealityBusiness.tsx',
  'src/modules/solution/BuildVsBuyBusiness.tsx',
  'src/modules/solution/ApproachesBusiness.tsx',
  'src/modules/solution/AdaptationSpectrumSection.tsx',
  'src/modules/solution/CaseStudiesSection.tsx',
  'src/modules/solution/BuildVsBuySection.tsx',
  'src/modules/solution/CostCalculatorSection.tsx',
  'src/modules/solution/RAGDeepDiveSection.tsx',
  'src/modules/finetuning/FineTuningRunSection.tsx',
  'src/modules/finetuning/WhenToFineTuneSection.tsx',
  'src/modules/finetuning/PreparingDataSection.tsx',
  'src/modules/finetuning/EvaluationMergingSection.tsx',
  'src/modules/finetuning/CostPlatformSection.tsx',
];

const accents = ['amber', 'emerald', 'blue', 'purple', 'red', 'cyan', 'green', 'violet', 'pink', 'orange', 'rose', 'yellow', 'indigo', 'sky', 'teal'];

// Use lookbehind/lookahead that allows quotes, backticks, and whitespace as boundaries
// (?<=^|[\s'"` {]) - preceded by start, whitespace, quote, backtick, space, or {
// (?=$|[\s'"` }]) - followed by end, whitespace, quote, backtick, space, or }
const LB = "(?<=^|[\\s'\"\\`{])";
const LA = "(?=$|[\\s'\"\\`}])";

function buildRules() {
  const rules = [];

  // --- Neutrals (zinc) ---
  rules.push([new RegExp(`${LB}bg-zinc-950${LA}`, 'gm'), 'bg-zinc-50 dark:bg-zinc-950']);
  rules.push([new RegExp(`${LB}bg-zinc-900${LA}`, 'gm'), 'bg-white dark:bg-zinc-900']);
  rules.push([new RegExp(`${LB}bg-zinc-800\\/50${LA}`, 'gm'), 'bg-zinc-100 dark:bg-zinc-800/50']);
  rules.push([new RegExp(`${LB}bg-zinc-800${LA}`, 'gm'), 'bg-zinc-100 dark:bg-zinc-800']);
  rules.push([new RegExp(`${LB}bg-zinc-700${LA}`, 'gm'), 'bg-zinc-200 dark:bg-zinc-700']);
  rules.push([new RegExp(`${LB}text-zinc-100${LA}`, 'gm'), 'text-zinc-900 dark:text-zinc-100']);
  rules.push([new RegExp(`${LB}text-zinc-200${LA}`, 'gm'), 'text-zinc-800 dark:text-zinc-200']);
  rules.push([new RegExp(`${LB}text-zinc-300${LA}`, 'gm'), 'text-zinc-700 dark:text-zinc-300']);
  rules.push([new RegExp(`${LB}text-zinc-400${LA}`, 'gm'), 'text-zinc-600 dark:text-zinc-400']);
  rules.push([new RegExp(`${LB}text-zinc-600${LA}`, 'gm'), 'text-zinc-500 dark:text-zinc-600']);
  rules.push([new RegExp(`${LB}border-zinc-700${LA}`, 'gm'), 'border-zinc-200 dark:border-zinc-700']);
  rules.push([new RegExp(`${LB}border-zinc-800${LA}`, 'gm'), 'border-zinc-200 dark:border-zinc-800']);
  rules.push([new RegExp(`${LB}border-zinc-900${LA}`, 'gm'), 'border-zinc-300 dark:border-zinc-900']);
  rules.push([new RegExp(`${LB}divide-zinc-800${LA}`, 'gm'), 'divide-zinc-200 dark:divide-zinc-800']);
  rules.push([new RegExp(`${LB}ring-zinc-700${LA}`, 'gm'), 'ring-zinc-300 dark:ring-zinc-700']);
  rules.push([new RegExp(`${LB}placeholder-zinc-500${LA}`, 'gm'), 'placeholder-zinc-400 dark:placeholder-zinc-500']);

  // --- Hover/focus variants ---
  rules.push([new RegExp(`${LB}hover:bg-zinc-800${LA}`, 'gm'), 'hover:bg-zinc-100 dark:hover:bg-zinc-800']);
  rules.push([new RegExp(`${LB}hover:bg-zinc-700${LA}`, 'gm'), 'hover:bg-zinc-200 dark:hover:bg-zinc-700']);
  rules.push([new RegExp(`${LB}hover:text-zinc-100${LA}`, 'gm'), 'hover:text-zinc-900 dark:hover:text-zinc-100']);
  rules.push([new RegExp(`${LB}hover:text-zinc-200${LA}`, 'gm'), 'hover:text-zinc-800 dark:hover:text-zinc-200']);
  rules.push([new RegExp(`${LB}hover:text-zinc-300${LA}`, 'gm'), 'hover:text-zinc-700 dark:hover:text-zinc-300']);
  rules.push([new RegExp(`${LB}focus:ring-zinc-700${LA}`, 'gm'), 'focus:ring-zinc-300 dark:focus:ring-zinc-700']);
  rules.push([new RegExp(`${LB}hover:border-zinc-700${LA}`, 'gm'), 'hover:border-zinc-300 dark:hover:border-zinc-700']);
  rules.push([new RegExp(`${LB}hover:border-zinc-600${LA}`, 'gm'), 'hover:border-zinc-300 dark:hover:border-zinc-600']);

  // --- Accents ---
  for (const c of accents) {
    rules.push([new RegExp(`${LB}bg-${c}-500\\/5${LA}`, 'gm'), `bg-${c}-50 dark:bg-${c}-500/5`]);
    rules.push([new RegExp(`${LB}bg-${c}-500\\/10${LA}`, 'gm'), `bg-${c}-50 dark:bg-${c}-500/10`]);
    rules.push([new RegExp(`${LB}bg-${c}-500\\/20${LA}`, 'gm'), `bg-${c}-100 dark:bg-${c}-500/20`]);
    rules.push([new RegExp(`${LB}bg-${c}-500\\/30${LA}`, 'gm'), `bg-${c}-200 dark:bg-${c}-500/30`]);
    rules.push([new RegExp(`${LB}border-${c}-500\\/20${LA}`, 'gm'), `border-${c}-300 dark:border-${c}-500/20`]);
    rules.push([new RegExp(`${LB}border-${c}-500\\/30${LA}`, 'gm'), `border-${c}-400 dark:border-${c}-500/30`]);
    rules.push([new RegExp(`${LB}border-${c}-500\\/40${LA}`, 'gm'), `border-${c}-400 dark:border-${c}-500/40`]);
    rules.push([new RegExp(`${LB}text-${c}-300${LA}`, 'gm'), `text-${c}-700 dark:text-${c}-300`]);
    rules.push([new RegExp(`${LB}text-${c}-400${LA}`, 'gm'), `text-${c}-700 dark:text-${c}-400`]);
    // text-<C>-500 but NOT text-<C>-500/xx
    rules.push([new RegExp(`${LB}text-${c}-500(?!\\/)${LA}`, 'gm'), `text-${c}-700 dark:text-${c}-500`]);
    rules.push([new RegExp(`${LB}text-${c}-200${LA}`, 'gm'), `text-${c}-800 dark:text-${c}-200`]);
  }

  return rules;
}

const rules = buildRules();
const report = [];

for (const file of files) {
  const path = `/Users/wallbomk/Projects.local/llm-learning/${file}`;
  let content;
  try {
    content = readFileSync(path, 'utf8');
  } catch (e) {
    report.push(`${file}: SKIPPED (file not found)`);
    continue;
  }

  // First, revert any previous transformations from the first run
  // by restoring original file from git or just re-reading
  // Actually, since the first run already wrote, we need to handle already-transformed classes
  // The already-transformed classes look like "bg-white dark:bg-zinc-900" 
  // If we run the rules again, "dark:bg-zinc-900" won't match because it starts with "dark:"
  // But we might double-transform things that were partially done
  // Let's just process as-is - the rules won't match already-prefixed classes

  let modified = content;
  let count = 0;

  for (const [regex, replacement] of rules) {
    regex.lastIndex = 0;
    const matches = modified.match(regex);
    if (matches) {
      count += matches.length;
      modified = modified.replace(regex, replacement);
    }
  }

  if (count > 0) {
    writeFileSync(path, modified, 'utf8');
    report.push(`${file}: ${count} classes updated`);
  } else {
    report.push(`${file}: 0 classes (no changes needed)`);
  }
}

console.log('\n=== LIGHT MODE SWEEP REPORT (pass 2) ===\n');
for (const line of report) {
  console.log(line);
}
console.log(`\nTotal files processed: ${files.length}`);
console.log(`Files modified: ${report.filter(r => !r.includes('0 classes') && !r.includes('SKIPPED')).length}`);
