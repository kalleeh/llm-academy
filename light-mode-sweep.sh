#!/bin/bash
cd /Users/wallbomk/Projects.local/llm-learning

# Function to apply transformations to a file
transform_file() {
  local file="$1"
  
  # Check if file has any color classes worth transforming
  if ! grep -qE '(bg-zinc|text-zinc|border-zinc|divide-zinc|ring-zinc|placeholder-zinc|bg-(amber|emerald|blue|purple|red|cyan|green|violet|pink|orange|rose)|text-(amber|emerald|blue|purple|red|cyan|green|violet|pink|orange|rose)|border-(amber|emerald|blue|purple|red|cyan|green|violet|pink|orange|rose))' "$file"; then
    return
  fi

  # Use perl for complex regex replacements
  # The strategy: find color classes that don't already have dark: prefix and transform them
  
  local tmp="${file}.tmp"
  cp "$file" "$tmp"
  
  # === HOVER/FOCUS VARIANTS (must be done BEFORE base classes) ===
  
  # hover:bg-zinc-800 → hover:bg-zinc-100 dark:hover:bg-zinc-800
  sed -i '' 's/\bhover:bg-zinc-800\b/hover:bg-zinc-100 dark:hover:bg-zinc-800/g' "$tmp"
  # hover:bg-zinc-700 → hover:bg-zinc-200 dark:hover:bg-zinc-700
  sed -i '' 's/\bhover:bg-zinc-700\b/hover:bg-zinc-200 dark:hover:bg-zinc-700/g' "$tmp"
  # hover:bg-zinc-900 → hover:bg-white dark:hover:bg-zinc-900
  sed -i '' 's/\bhover:bg-zinc-900\b/hover:bg-white dark:hover:bg-zinc-900/g' "$tmp"
  # hover:text-zinc-100 → hover:text-zinc-900 dark:hover:text-zinc-100
  sed -i '' 's/\bhover:text-zinc-100\b/hover:text-zinc-900 dark:hover:text-zinc-100/g' "$tmp"
  # hover:text-zinc-200 → hover:text-zinc-800 dark:hover:text-zinc-200
  sed -i '' 's/\bhover:text-zinc-200\b/hover:text-zinc-800 dark:hover:text-zinc-200/g' "$tmp"
  # hover:text-zinc-300 → hover:text-zinc-700 dark:hover:text-zinc-300
  sed -i '' 's/\bhover:text-zinc-300\b/hover:text-zinc-700 dark:hover:text-zinc-300/g' "$tmp"
  # focus:ring-zinc-700 → focus:ring-zinc-300 dark:focus:ring-zinc-700
  sed -i '' 's/\bfocus:ring-zinc-700\b/focus:ring-zinc-300 dark:focus:ring-zinc-700/g' "$tmp"
  
  # === NEUTRAL BACKGROUNDS ===
  
  # bg-zinc-950 → bg-zinc-50 dark:bg-zinc-950
  sed -i '' 's/\bbg-zinc-950\b/bg-zinc-50 dark:bg-zinc-950/g' "$tmp"
  # bg-zinc-900 → bg-white dark:bg-zinc-900 (but not dark:bg-zinc-900 or hover:bg-zinc-900)
  perl -i -pe 's/(?<!dark:)(?<!hover:)(?<!dark:hover:)\bbg-zinc-900\b/bg-white dark:bg-zinc-900/g' "$tmp"
  # bg-zinc-800\/50 → bg-zinc-100 dark:bg-zinc-800/50
  sed -i '' 's|bg-zinc-800/50|bg-zinc-100 dark:bg-zinc-800/50|g' "$tmp"
  # bg-zinc-800 → bg-zinc-100 dark:bg-zinc-800 (but not dark:bg-zinc-800 or hover:bg-zinc-800)
  perl -i -pe 's/(?<!dark:)(?<!hover:)(?<!dark:hover:)\bbg-zinc-800\b(?!\/)/bg-zinc-100 dark:bg-zinc-800/g' "$tmp"
  # bg-zinc-700 → bg-zinc-200 dark:bg-zinc-700 (but not dark:bg-zinc-700 or hover:bg-zinc-700)
  perl -i -pe 's/(?<!dark:)(?<!hover:)(?<!dark:hover:)\bbg-zinc-700\b/bg-zinc-200 dark:bg-zinc-700/g' "$tmp"
  
  # === NEUTRAL TEXT ===
  
  # text-zinc-100 → text-zinc-900 dark:text-zinc-100 (but not hover: or dark: prefixed)
  perl -i -pe 's/(?<!dark:)(?<!hover:)(?<!dark:hover:)\btext-zinc-100\b/text-zinc-900 dark:text-zinc-100/g' "$tmp"
  # text-zinc-200 → text-zinc-800 dark:text-zinc-200
  perl -i -pe 's/(?<!dark:)(?<!hover:)(?<!dark:hover:)\btext-zinc-200\b/text-zinc-800 dark:text-zinc-200/g' "$tmp"
  # text-zinc-300 → text-zinc-700 dark:text-zinc-300
  perl -i -pe 's/(?<!dark:)(?<!hover:)(?<!dark:hover:)\btext-zinc-300\b/text-zinc-700 dark:text-zinc-300/g' "$tmp"
  # text-zinc-400 → text-zinc-600 dark:text-zinc-400
  perl -i -pe 's/(?<!dark:)(?<!hover:)(?<!dark:hover:)\btext-zinc-400\b/text-zinc-600 dark:text-zinc-400/g' "$tmp"
  # text-zinc-600 → text-zinc-500 dark:text-zinc-600
  perl -i -pe 's/(?<!dark:)(?<!hover:)(?<!dark:hover:)\btext-zinc-600\b/text-zinc-500 dark:text-zinc-600/g' "$tmp"
  
  # === NEUTRAL BORDERS ===
  
  # border-zinc-700 → border-zinc-200 dark:border-zinc-700
  perl -i -pe 's/(?<!dark:)\bborder-zinc-700\b/border-zinc-200 dark:border-zinc-700/g' "$tmp"
  # border-zinc-800 → border-zinc-200 dark:border-zinc-800
  perl -i -pe 's/(?<!dark:)\bborder-zinc-800\b/border-zinc-200 dark:border-zinc-800/g' "$tmp"
  # border-zinc-900 → border-zinc-300 dark:border-zinc-900
  perl -i -pe 's/(?<!dark:)\bborder-zinc-900\b/border-zinc-300 dark:border-zinc-900/g' "$tmp"
  
  # === DIVIDE ===
  # divide-zinc-800 → divide-zinc-200 dark:divide-zinc-800
  perl -i -pe 's/(?<!dark:)\bdivide-zinc-800\b/divide-zinc-200 dark:divide-zinc-800/g' "$tmp"
  
  # === RING ===
  # ring-zinc-700 → ring-zinc-300 dark:ring-zinc-700
  perl -i -pe 's/(?<!dark:)(?<!focus:)\bring-zinc-700\b/ring-zinc-300 dark:ring-zinc-700/g' "$tmp"
  
  # === PLACEHOLDER ===
  # placeholder-zinc-500 → placeholder-zinc-400 dark:placeholder-zinc-500
  perl -i -pe 's/(?<!dark:)\bplaceholder-zinc-500\b/placeholder-zinc-400 dark:placeholder-zinc-500/g' "$tmp"
  
  # === ACCENT COLORS ===
  # For each accent color
  for C in amber emerald blue purple red cyan green violet pink orange rose; do
    # bg-<C>-500/5 → bg-<C>-50 dark:bg-<C>-500/5
    perl -i -pe "s/(?<!dark:)\bbg-${C}-500\/5\b/bg-${C}-50 dark:bg-${C}-500\/5/g" "$tmp"
    # bg-<C>-500/10 → bg-<C>-50 dark:bg-<C>-500/10
    perl -i -pe "s/(?<!dark:)\bbg-${C}-500\/10\b/bg-${C}-50 dark:bg-${C}-500\/10/g" "$tmp"
    # bg-<C>-500/20 → bg-<C>-100 dark:bg-<C>-500/20
    perl -i -pe "s/(?<!dark:)\bbg-${C}-500\/20\b/bg-${C}-100 dark:bg-${C}-500\/20/g" "$tmp"
    # bg-<C>-500/30 → bg-<C>-200 dark:bg-<C>-500/30
    perl -i -pe "s/(?<!dark:)\bbg-${C}-500\/30\b/bg-${C}-200 dark:bg-${C}-500\/30/g" "$tmp"
    
    # border-<C>-500/20 → border-<C>-300 dark:border-<C>-500/20
    perl -i -pe "s/(?<!dark:)\bborder-${C}-500\/20\b/border-${C}-300 dark:border-${C}-500\/20/g" "$tmp"
    # border-<C>-500/30 → border-<C>-400 dark:border-<C>-500/30
    perl -i -pe "s/(?<!dark:)\bborder-${C}-500\/30\b/border-${C}-400 dark:border-${C}-500\/30/g" "$tmp"
    # border-<C>-500/40 → border-<C>-400 dark:border-<C>-500/40
    perl -i -pe "s/(?<!dark:)\bborder-${C}-500\/40\b/border-${C}-400 dark:border-${C}-500\/40/g" "$tmp"
    
    # text-<C>-300 → text-<C>-700 dark:text-<C>-300
    perl -i -pe "s/(?<!dark:)\btext-${C}-300\b/text-${C}-700 dark:text-${C}-300/g" "$tmp"
    # text-<C>-400 → text-<C>-700 dark:text-<C>-400
    perl -i -pe "s/(?<!dark:)\btext-${C}-400\b/text-${C}-700 dark:text-${C}-400/g" "$tmp"
    # text-<C>-500 → text-<C>-700 dark:text-<C>-500
    perl -i -pe "s/(?<!dark:)\btext-${C}-500\b/text-${C}-700 dark:text-${C}-500/g" "$tmp"
    # text-<C>-200 → text-<C>-800 dark:text-<C>-200
    perl -i -pe "s/(?<!dark:)\btext-${C}-200\b/text-${C}-800 dark:text-${C}-200/g" "$tmp"
  done
  
  # Check if file actually changed
  if ! diff -q "$file" "$tmp" > /dev/null 2>&1; then
    mv "$tmp" "$file"
    echo "MODIFIED: $file"
  else
    rm "$tmp"
  fi
}

# List of files to process
FILES=(
  # Top-level modules (check for color classes)
  "src/modules/AgentsModule.tsx"
  "src/modules/AlignmentModule.tsx"
  "src/modules/EvaluationModule.tsx"
  "src/modules/IndustryModule.tsx"
  "src/modules/SolutionModule.tsx"
  "src/modules/FineTuningModule.tsx"
  "src/modules/AIInOrgModule.tsx"
  # agents subdir
  "src/modules/agents/ContextFilesSection.tsx"
  "src/modules/agents/BusinessImpactBusiness.tsx"
  "src/modules/agents/AgentPatternsBusiness.tsx"
  "src/modules/agents/MCPSection.tsx"
  "src/modules/agents/A2ASection.tsx"
  "src/modules/agents/BuildingAgentsSection.tsx"
  "src/modules/agents/WhatAreAgentsBusiness.tsx"
  "src/modules/agents/ContextFilesBusiness.tsx"
  "src/modules/agents/HowAgentsConnectBusiness.tsx"
  "src/modules/agents/WhatAreAgentsSection.tsx"
  "src/modules/agents/ProductionGovernanceSection.tsx"
  "src/modules/agents/SkillsHarnessSection.tsx"
  "src/modules/agents/DesignPatternsSection.tsx"
  "src/modules/agents/ToolUseBusiness.tsx"
  "src/modules/agents/FunctionCallingSection.tsx"
  # alignment subdir
  "src/modules/alignment/WhyAIGoesWrongBusiness.tsx"
  "src/modules/alignment/ComplianceBusiness.tsx"
  "src/modules/alignment/ModernAlternativesSection.tsx"
  "src/modules/alignment/PostTrainingPipelineSection.tsx"
  "src/modules/alignment/GuardrailsBusiness.tsx"
  "src/modules/alignment/SafetyGuardrailsSection.tsx"
  "src/modules/alignment/AlignmentProblemSection.tsx"
  "src/modules/alignment/AlignmentPipelineSection.tsx"
  # evaluation subdir
  "src/modules/evaluation/ModelPersonalitiesBusiness.tsx"
  "src/modules/evaluation/WhyEvaluationSection.tsx"
  "src/modules/evaluation/ChoosingModelsBusiness.tsx"
  "src/modules/evaluation/CustomEvalSection.tsx"
  "src/modules/evaluation/MeasuringAIBusiness.tsx"
  "src/modules/evaluation/BenchmarksSection.tsx"
  "src/modules/evaluation/ModelSelectionSection.tsx"
  "src/modules/evaluation/LeaderboardSection.tsx"
  # industry subdir
  "src/modules/industry/OpenVsClosedSection.tsx"
  "src/modules/industry/KeyPlayersBusiness.tsx"
  "src/modules/industry/WhereItsHeadingSection.tsx"
  "src/modules/industry/OpenVsClosedBusiness.tsx"
  "src/modules/industry/EcosystemSection.tsx"
  "src/modules/industry/WhoBuiltWhatSection.tsx"
  "src/modules/industry/WhereItsHeadingBusiness.tsx"
  # solution subdir
  "src/modules/solution/CostRealityBusiness.tsx"
  "src/modules/solution/BuildVsBuyBusiness.tsx"
  "src/modules/solution/ApproachesBusiness.tsx"
  "src/modules/solution/AdaptationSpectrumSection.tsx"
  "src/modules/solution/CaseStudiesSection.tsx"
  "src/modules/solution/BuildVsBuySection.tsx"
  "src/modules/solution/CostCalculatorSection.tsx"
  "src/modules/solution/RAGDeepDiveSection.tsx"
  # finetuning subdir
  "src/modules/finetuning/FineTuningRunSection.tsx"
  "src/modules/finetuning/WhenToFineTuneSection.tsx"
  "src/modules/finetuning/PreparingDataSection.tsx"
  "src/modules/finetuning/EvaluationMergingSection.tsx"
  "src/modules/finetuning/CostPlatformSection.tsx"
)

echo "=== Starting Light Mode Sweep ==="
for f in "${FILES[@]}"; do
  transform_file "$f"
done
echo "=== Sweep Complete ==="
