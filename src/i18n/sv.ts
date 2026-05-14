/**
 * Swedish translations.
 *
 * Structure mirrors `en.ts`. Any field omitted (or set to empty string)
 * falls back to the EN value at runtime. Machine-translated entries are
 * marked with `// MT` comments above them; entries without that marker
 * were preserved verbatim from the legacy translation files (human-quality).
 *
 * Maintainers: see docs/i18n-refactor/PLAN.md § "Translation policy".
 */
import type { DeepPartial } from './types'
import type { Translation } from './en'

export const sv: DeepPartial<Translation> = {
  modules: {
    aiproblem: {
      // From legacy: src/modules/aiproblem/translations.ts → landscapeSv
      landscape: {
        title: '1. AI-familjeträdet',
        intro:
          '"AI" är ett stort paraply. Allt under det är inte samma sak. Tänk så här: alla LLM:er är AI, men all AI är inte en LLM — precis som alla golden retrievers är hundar, men inte alla hundar är golden retrievers. Klicka på varje lager för att lära dig mer.',
        levels: [
          {
            label: 'Artificiell intelligens',
            plain: 'All smart automatisering',
            analogy:
              'Ett samlingsbegrepp för programvara som gör saker vi tidigare trodde bara människor kunde — känna igen ansikten, förstå tal, fatta beslut.',
            examples: [
              'Spamfilter i din e-post',
              'Automatisk komplettering när du skriver',
              'Bedrägeridetektering på ditt kreditkort',
            ],
          },
          {
            label: 'Maskininlärning',
            plain: 'Lär sig från exempel',
            analogy:
              'Istället för att programmera varje regel för hand visar du systemet tusentals exempel och det hittar mönstren — som att utbilda en nyanställd genom att studera tidigare ärenden istället för att läsa en 500-sidig manual.',
            examples: [
              'Netflix-rekommendationer',
              'E-postsortering i Primär/Socialt/Kampanjer',
              'Förutsäga vilka kunder som kan säga upp sig',
            ],
          },
          {
            label: 'Djupinlärning',
            plain: 'Mönsterigenkänning på steroider',
            analogy:
              'En kraftfullare version av maskininlärning som kan hantera stökig, komplex data som foton, ljud och text — saker som är enkla för människor men var omöjliga för traditionell programvara.',
            examples: [
              'Ansiktsigenkänning för att låsa upp din telefon',
              'Röstassistenter som förstår vad du säger',
              'Översättning mellan språk i realtid',
            ],
          },
          {
            label: 'Stora språkmodeller',
            plain: 'AI som förstår och genererar språk',
            analogy:
              'AI:n bakom ChatGPT, Copilot och Gemini. Tränad genom att läsa miljarder webbsidor lärde den sig skriva, resonera, sammanfatta, översätta och konversera — som en otroligt beläst kollega.',
            examples: [
              'ChatGPT, Claude, Gemini, Copilot',
              'Skriva e-post, sammanfatta dokument',
              'Svara på frågor om ditt företags data',
            ],
          },
        ],
        examplesLabel: 'Exempel du redan använder:',
      },
      // From legacy: src/modules/aiproblem/translations.ts → decisionSv
      decision: {
        title: '2. Ska du använda AI för detta?',
        intro:
          'Inte alla problem behöver AI. Ibland räcker ett kalkylblad, en checklista eller en enkel regel. Nyckelfrågan är: finns det tydliga regler, eller krävs det omdöme?',
        introSub:
          'Tänk så här: om du kan skriva de fullständiga instruktionerna på en enda sida behöver du förmodligen inte AI. Om det krävs års erfarenhet för att göra det bra kan AI hjälpa.',
        scenarios: [
          {
            task: 'Beräkna anställdas bonusar baserat på en fast formel',
            answer: 'Ingen AI behövs',
            why: 'Reglerna är fasta och exakta — som att följa ett recept steg för steg. En kalkylbladsformel gör detta perfekt.',
          },
          {
            task: 'Förutsäga vilka kunder som troligen säger upp sig nästa kvartal',
            answer: 'Maskininlärning',
            why: 'Det finns historisk data och mönster att hitta. ML lär sig dessa mönster från exempel — som en säljare som utvecklar en magkänsla för riskfyllda konton, men baserat på data.',
          },
          {
            task: 'Svara på anställdas frågor om företagets policyer',
            answer: 'LLM + dina dokument',
            why: 'Anställda ställer frågor på naturligt språk. En LLM kan förstå frågan, söka i dina policydokument och ge ett tydligt svar — som en alltid tillgänglig HR-assistent.',
          },
          {
            task: 'Sammanfatta ett 50-sidigt kontrakt och flagga viktiga risker',
            answer: 'LLM',
            why: 'Detta kräver läsning, kontextförståelse och bedömning — precis vad LLM:er är bra på. Som att be en junior jurist göra en första genomgång, men på 30 sekunder.',
          },
        ],
        bestFitLabel: 'Bäst lämpat:',
        selfExplainPrompt:
          'Tänk på en uppgift på ditt jobb som tar mycket tid. Skulle AI hjälpa? Är den regelbaserad (kalkylblad), mönsterbaserad (ML) eller språkbaserad (LLM)?',
        selfExplainAnswer:
          "Exempel: 'Jag lägger 2 timmar varje måndag på att kategorisera supportärenden efter prioritet.' Detta är mönsterbaserat — det finns historisk data, och uppgiften kräver att läsa texten och göra en bedömning. En LLM kunde kategorisera baserat på tidigare mönster.",
      },
      // From legacy: src/modules/aiproblem/tech-translations.ts → landscapeSectionSv
      // Original had p2-p20 empty placeholders that fall back to EN — omitted here.
      landscapeSection: {
        title: '1. Landskapet',
        intro:
          'AI är ett brett fält. Maskininlärning är en delmängd, djupinlärning en delmängd av det, och LLM:er en specifik typ av djupinlärning.',
        // From legacy: src/modules/aiproblem/data-translations.ts → levelsTranslations.sv
        levels: [
          { label: 'Artificiell intelligens', definition: 'System som utför uppgifter som normalt kräver mänsklig intelligens — resonemang, planering, perception eller beslutsfattande.', examples: ['Regelbaserade system (if/else-logik för skatteberäkningar)', 'Expertsystem (medicinsk diagnos från symptomregler)', 'Sökalgoritmer (A*, minimax för schack)', 'Robotprocessautomation (RPA för formulärfyllning)'] },
          { label: 'Maskininlärning', definition: 'System som lär sig mönster från data istället för att vara explicit programmerade. De förbättras med mer data.', examples: ['Regression (förutsäga huspriser)', 'Klassificering (spam vs inte spam)', 'Klustring (kundsegmentering)', 'Rekommendationsmotorer (Netflix, Spotify)'] },
          { label: 'Djupinlärning', definition: 'ML med neurala nätverk med många lager. Utmärker sig på att lära sig från rå, ostrukturerad data som bilder, ljud och text.', examples: ['CNN:er — bildklassificering, objektdetektering', 'RNN/LSTM — tidsserier, sekvensmodellering', 'Transformers — arkitekturen bakom moderna LLM:er', 'GAN:er — bildgenerering, stilöverföring'] },
          { label: 'Stora språkmodeller', definition: 'Massiva transformer-modeller tränade på internetskala text. De förutsäger nästa token och utvecklar förmågor inom resonemang, kodning och konversation.', examples: ['GPT-4, Claude, Gemini — allmänt resonemang', 'Llama, Mistral — öppna modeller', 'Textgenerering, sammanfattning, översättning', 'Kodgenerering, analys, felsökning'] },
        ],
        // From legacy: src/modules/aiproblem/data-translations.ts → overlaysTranslations.sv
        overlays: [
          { label: 'Generativ AI', description: 'Modeller som skapar nytt innehåll (text, bilder, ljud, kod). Spänner över djupinlärning och LLM:er.' },
          { label: 'Agentisk AI', description: 'LLM:er förstärkta med verktyg, minne och planering — de utför handlingar, inte bara genererar text.' },
        ],
      },
      // From legacy: src/modules/aiproblem/tech-translations.ts → classificationSectionSv
      classificationSection: {
        title: '2. Problemklassificering',
        // The legacy field name was `intro`, mapped to `p2` in the new tree
        // (the EN component renders this as the first paragraph after the heading).
        // MT
        p2: 'Inte alla problem behöver en LLM. Klicka på varje kort för att visa den bästa metoden — och viktigare,',
        // From legacy: src/modules/aiproblem/data-translations.ts → scenariosTranslations.sv
        scenarios: [
          { problem: 'Förutsäga kundavhopp', approach: 'Klassisk ML', why: 'Strukturerad data med tydligt prediktionsmål' },
          { problem: 'Sammanfatta juridiska kontrakt', approach: 'LLM', why: 'Kräver läsning och bedömning av lång text' },
          { problem: 'Beräkna skatt', approach: 'Regelbaserat', why: 'Exakta regler definierade i lag' },
          { problem: 'Klassificera röntgenbilder', approach: 'Deep Learning (CNN)', why: 'Visuell mönsterigenkänning' },
          { problem: 'Svara på kundfrågor', approach: 'LLM + RAG', why: 'Naturligt språk + företagsspecifik kunskap' },
          { problem: 'Upptäcka bedrägeri', approach: 'ML (anomalidetektion)', why: 'Hitta ovanliga mönster i transaktionsdata' },
          { problem: 'Generera produktbeskrivningar', approach: 'LLM', why: 'Kreativt skrivande med varumärkesröst' },
          { problem: 'Sortera e-post', approach: 'ML (klassificering)', why: 'Kategorisera i fördefinierade klasser' },
          { problem: 'Rekommendera produkter', approach: 'ML (collaborative filtering)', why: 'Mönster i användarbeteende' },
          { problem: 'Översätta dokument', approach: 'LLM', why: 'Kräver djup språkförståelse' },
        ],
      },
      // From legacy: src/modules/aiproblem/tech-translations.ts → decisionFrameworkSectionSv
      decisionFrameworkSection: {
        title: '3. Beslutsramverket',
        intro: 'Gå igenom detta beslutsträd för att hitta rätt metod för ditt problem.',
        // From legacy: src/modules/aiproblem/data-translations.ts → treeTranslations.sv
        tree: {
          start: { question: 'Är ditt problem väldefinierat med tydliga, deterministiska regler?' },
          'rule-based': { answer: 'Regelbaserat system', explanation: 'Om logiken helt kan fångas i formler, uppslagstabeller eller beslutsregler — behöver du inte ML alls. Traditionell programvara är billigare, snabbare och 100% förutsägbar.', example: 'Skatteberäkning, enhetskonvertering, fraktformler, formulärvalidering.' },
          structured: { question: 'Har du strukturerad/tabelldata?' },
          prediction: { question: 'Behöver du prediktion eller mönsterigenkänning?' },
          'classical-ml': { answer: 'Klassisk ML', explanation: 'Strukturerad data med rader och kolumner är den perfekta platsen för gradient boosting, random forests och logistisk regression. Dessa modeller är snabba, tolkbara och beprövade.', example: 'Bedrägeridetektering, kundavhoppsprediktion, kreditbedömning, efterfrågeprognos.' },
          'rule-based-2': { answer: 'Regelbaserat eller enkel analys', explanation: 'Om du har strukturerad data men bara behöver aggregering, filtrering eller rapportering — SQL och affärslogik är rätt verktyg.', example: 'Dashboardmätvärden, lagervarningar, tröskelbaserade notifieringar.' },
          media: { question: 'Involverar det bilder, ljud eller video?' },
          'deep-learning': { answer: 'Djupinlärning (CNN / talmodeller)', explanation: 'Ostrukturerad mediadata kräver neurala nätverk som lär sig hierarkiska features. CNN:er för bilder, specialiserade arkitekturer som Whisper för ljud.', example: 'Bildklassificering, objektdetektering, tal-till-text, videoanalys.' },
          text: { question: 'Involverar det att förstå eller generera naturligt språk?' },
          llm: { answer: 'LLM', explanation: 'Om uppgiften kräver att läsa, skriva, resonera om eller generera text — LLM:er är byggda för detta. Lägg till RAG för domänkunskap, finjustering för specialiserat beteende.', example: 'Sammanfattning, chattbotar, kodgenerering, dokument-Q&A, översättning.' },
          reassess: { answer: 'Omvärdera problemet', explanation: 'Om inget av ovanstående passar, bryt ner problemet i mindre delproblem. De flesta verkliga system kombinerar flera metoder.', example: 'E-handel: regler för prissättning + ML för rekommendationer + LLM för produktbeskrivningar.' },
        },
      },
      // From legacy: src/modules/aiproblem/tech-translations.ts → lLMDifferenceSectionSv
      llmDifferenceSection: {
        title: '4. Vad gör LLM:er annorlunda',
        intro:
          'LLM:er är inte bara större ML-modeller. De representerar ett fundamentalt annorlunda paradigm.',
        // MT
        sameProblemHeading: 'Samma problem, två metoder: Sentimentanalys',
        // From legacy: src/modules/aiproblem/data-translations.ts → comparisonTranslations.sv
        comparison: [
          { dimension: 'Indata', ml: 'Strukturerade features (siffror i kolumner)', llm: 'Rå text (naturligt språk)' },
          { dimension: 'Träning', ml: 'Uppgiftsspecifik (en modell per uppgift)', llm: 'Generell (en modell, många uppgifter)' },
          { dimension: 'Datamängd', ml: '1K-1M märkta exempel', llm: 'Biljoner tokens oövervakad text' },
          { dimension: 'Utdata', ml: 'Siffra eller kategori', llm: 'Fri text, kod, resonemang' },
          { dimension: 'Generaliserbarhet', ml: 'Bara den tränade uppgiften', llm: 'Zero-shot till nya uppgifter' },
          { dimension: 'Tolkbarhet', ml: 'Ofta tolkbar (beslutsträd, SHAP)', llm: 'Svårtolkad (svart låda)' },
        ],
        // From legacy: overkillCasesTranslations.sv
        overkillCases: [
          { label: 'Tabelldata med tydligt mål', detail: 'Huspriser, kundavhopp, kreditrisk — gradient boosting slår LLM:er' },
          { label: 'Deterministisk logik', detail: 'Skatteberäkning, regelvalidering — traditionell kod är 100% korrekt' },
          { label: 'Realtidssignalbehandling', detail: 'Sensordata, anomalidetektion — specialiserade ML-modeller är snabbare' },
        ],
        // From legacy: mlBetterCasesTranslations.sv
        mlBetterCases: [
          { label: 'Strukturerad data', detail: 'Rader och kolumner med numeriska features' },
          { label: 'Latenskritiskt', detail: 'Behöver svar på <10ms (LLM:er tar 100ms+)' },
          { label: 'Tolkbarhet krävs', detail: 'Regulatoriska krav på att förklara beslut' },
        ],
      },
      // From legacy: src/modules/aiproblem/tech-translations.ts → toolboxSectionSv
      toolboxSection: {
        title: '5. AI/ML/LLM-verktygslådan',
        intro: 'Varje nivå i AI-landskapet har sitt eget ekosystem av verktyg och ramverk.',
        // MT
        upNextNote:
          'Resten av kursen dyker djupt in i LLM-spåret — hur de fungerar under huven, hur du använder dem effektivt och hur du bygger riktiga applikationer med dem.',
        // From legacy: src/modules/aiproblem/data-translations.ts → toolboxTranslations.sv
        toolbox: [
          { level: 'Klassisk ML', tools: ['scikit-learn', 'XGBoost', 'LightGBM', 'pandas'] },
          { level: 'Deep Learning', tools: ['PyTorch', 'TensorFlow', 'JAX', 'Keras'] },
          { level: 'LLM-träning', tools: ['HuggingFace Transformers', 'DeepSpeed', 'Megatron-LM'] },
          { level: 'LLM-inferens', tools: ['vLLM', 'llama.cpp', 'Ollama', 'Amazon Bedrock'] },
          { level: 'LLM-applikationer', tools: ['LangChain', 'LlamaIndex', 'Vercel AI SDK', 'Amazon Bedrock Agents'] },
        ],
      },
    },
  },
}
