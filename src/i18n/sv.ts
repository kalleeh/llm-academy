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
    industry: {
      // From legacy: src/modules/industry/translations.ts → keyPlayersSv
      keyPlayers: {
        title: '1. Vem gör AI?',
        intro:
          'En handfull företag dominerar AI-landskapet. Tänk på det som smartphonemarknaden — några stora aktörer, var och en med en egen strategi. Klicka på varje för att lära dig mer.',
        players: [
          { name: 'OpenAI', product: 'ChatGPT, GPT-4o', position: 'Den alla känner till — som AI:ns iPhone. Först på marknaden, störst varumärkeskännedom.', users: 'Miljontals konsumenter och företag. Microsoft är deras största partner.' },
          { name: 'Google', product: 'Gemini', position: 'Inbyggd i allt Google — Sök, Gmail, Docs, Android. Massiv distributionsfördel.', users: 'Alla som använder Google-produkter. Företag på Google Cloud.' },
          { name: 'Anthropic', product: 'Claude', position: 'Företaget med "säkerhet först". Populärt bland företag som bryr sig om tillförlitlighet.', users: 'Företag, utvecklare, Amazon (stor investerare och partner via AWS).' },
          { name: 'Amazon / AWS', product: 'Bedrock, Nova, AgentCore', position: 'Istället för att bygga en modell byggde AWS plattformen — Amazon Bedrock ger tillgång till 100+ modeller genom ett enda API med företagssäkerhet.', users: 'Företag redan på AWS. Företag som vill ha modellval utan leverantörslåsning.' },
          { name: 'Meta', product: 'Llama (gratis)', position: 'Ger bort sin AI gratis. Strategi: bygg ekosystemet, som Android vs iPhone.', users: 'Utvecklare och företag som vill köra AI på egna servrar.' },
          { name: 'Övriga', product: 'Mistral, DeepSeek, Cohere m.fl.', position: 'Mindre aktörer med specifika styrkor — vissa är billigare, vissa bättre för vissa språk.', users: 'Företag som söker alternativ eller specialiserade funktioner.' },
        ],
      },
      // From legacy: src/modules/industry/translations.ts → openVsClosedSv
      openVsClosed: {
        title: '2. Öppen vs stängd AI — Vad det betyder för dig',
        intro:
          'Vissa AI-modeller är **"stängda"** (du betalar för att använda dem, företaget kontrollerar allt) och vissa är **"öppna"** (gratis att ladda ner och köra själv). Tänk på det som **Microsoft Office vs LibreOffice**, eller **iPhone vs Android**.',
        closedTitle: 'Stängda modeller (GPT-4o, Claude, Gemini)',
        closedSubtitle: 'Som att använda Microsoft Office 365',
        openTitle: 'Öppna modeller (Llama, Mistral, DeepSeek)',
        openSubtitle: 'Som att använda Android eller LibreOffice',
        realPictureTitle: 'Den verkliga bilden: det är inte svart eller vitt',
        realPictureText:
          'Uppfattningen "öppen = privat, stängd = riskfyllt" är föråldrad. Företags-AI-tjänster i molnet (Azure OpenAI, AWS Bedrock, Google Vertex) erbjuder säkerhetscertifieringar och efterlevnadsgarantier som de flesta företag inte kan replikera själva. Självhosting ger dig kontroll, men **kontroll ≠ säkerhet** — du behöver teamet och expertisen för att faktiskt säkra det.',
        selfExplainPrompt:
          'Din CTO säger "vi borde använda AI med öppen källkod för att undvika leverantörslåsning." Vilka avvägningar vill du diskutera?',
        selfExplainAnswer:
          'Jag skulle ta upp: (1) Vi undviker leverantörslåsning men tar på oss underhållsansvar — har vi teknisk personal? (2) Dataintegritet är bättre. (3) Öppna modeller är något mindre kapabla för komplexa uppgifter — vi bör testa. (4) Installation tar veckor vs timmar. (5) En hybridmetod kan fungera. (6) Total kostnad: GPU-hosting är inte gratis.',
      },
      // From legacy: src/modules/industry/tech-translations.ts → whoBuiltWhatSectionSv
      whoBuiltWhatSection: {
        title: '1. Vem byggde vad',
        intro: 'LLM-landskapet domineras av en handfull välfinansierade labb med olika filosofier.',
        // From legacy: src/modules/industry/data-translations.ts → playersTranslations.sv
        players: [
          { name: 'OpenAI', approach: 'Stängd källkod, API-först, massiv skala', innovation: 'Pionjär inom RLHF i skala; o3 resonemang via RL-tränad chain-of-thought', detail: 'Värderat till $100B+. Definierade den moderna LLM-eran med ChatGPT.' },
          { name: 'Anthropic', approach: 'Säkerhetsfokuserat, Constitutional AI', innovation: 'Constitutional AI — självövervakad anpassning utan mänskliga etiketter', detail: 'Grundat av ex-OpenAI-forskare. Leder inom säkerhetsforskning.' },
          { name: 'Google DeepMind', approach: 'Vertikal integration — TPU:er, data, distribution', innovation: 'Anpassad TPU-hårdvara; 1M+ token kontextfönster; Gemma öppna modeller', detail: 'Sammanslagna Google Brain + DeepMind. Gemini nativt multimodal.' },
          { name: 'Meta', approach: 'Ledare inom öppen källkod, MoE-arkitektur', innovation: 'Största öppna modellerna; Llama 4 använder MoE', detail: 'Llama 4 Maverick (400B totalt, 17B aktiva) konkurrerar med GPT-4o.' },
          { name: 'DeepSeek', approach: 'Effektivitet-först, öppna vikter', innovation: 'MoE + Multi-head Latent Attention + FP8-träning — V3 tränad för ~$5.5M', detail: 'Kinesiskt labb som chockade branschen. V3 tränad till en bråkdel av typisk kostnad.' },
          { name: 'Mistral', approach: 'Europeiskt, öppna vikter, effektivitetsfokuserat', innovation: 'Sliding Window Attention; presterar över sin viktklass', detail: 'Paris-baserat. Stark EU-regulatorisk positionering.' },
          { name: 'Amazon / AWS', approach: 'Plattform + egna modeller — Bedrock hostar 100+ modeller', innovation: 'Bedrock modellmarknadsplats; AgentCore för företagsagenter; Nova-familjen', detail: 'AWS byggde plattformlagret: Amazon Bedrock ger ett enda API till Claude, Llama, Mistral och Amazons egna Nova-modeller.' },
          { name: 'xAI', approach: 'Realtidsdata via X/Twitter, massiv beräkning', innovation: 'Tränad på 100K H100 Colossus-kluster; realtidsinformationsåtkomst', detail: 'Elon Musks AI-företag. Grok 3 tränad på ett av de största GPU-klustren.' },
          { name: 'Apple', approach: 'På enheten, integritetsfokuserat', innovation: 'Modeller på enheten som körs på Apple Silicon; Private Cloud Compute', detail: 'Apple Foundation Models körs lokalt på iPhone/Mac.' },
        ],
      },
      // From legacy: src/modules/industry/tech-translations.ts → openVsClosedSectionSv
      openVsClosedSection: {
        title: '2. Öppen vs stängd',
        intro: 'Gapet mellan öppna och stängda modeller har minskat dramatiskt.',
        // MT
        trendCallout:
          'Öppna modeller matchar eller överträffar nu stängda modeller på de flesta standardbenchmarks. Det återstående gapet finns i agentiska förmågor, lång kontext-tillförlitlighet och säkerhetsverktyg — och det krymper snabbt.',
        // MT
        openModelsHeading: 'Öppna modeller som konkurrerar med stängda frontiermodeller (mitten av 2026):',
        // From legacy: comparisonTranslations.sv
        comparison: [
          { dimension: 'Kapacitet', open: 'Llama 4, DeepSeek V3 matchar GPT-4o på de flesta benchmarks', closed: 'GPT-5.5, Claude Opus 4.7 leder fortfarande på de svåraste uppgifterna' },
          { dimension: 'Kostnad', open: 'Gratis vikter; betala bara för beräkning', closed: 'Per-token-prissättning; kan vara billigare vid låg volym' },
          { dimension: 'Integritet', open: 'Full kontroll över data — men säkerhet är ditt ansvar', closed: 'Data behandlas av leverantör — företagsnivåer erbjuder stark efterlevnad' },
          { dimension: 'Anpassning', open: 'Full åtkomst — finjustera, kvantisera, slå samman, destillera', closed: 'Begränsat till API-parametrar och systemprompts' },
          { dimension: 'Hastighet', open: 'Beror på din hårdvara och optimering', closed: 'Optimerad infrastruktur, konsekvent latens' },
          { dimension: 'Ekosystem', open: 'HuggingFace, vLLM, Unsloth, GGUF — massivt community', closed: 'Leverantörsspecifika SDK:er och verktyg' },
          { dimension: 'Säkerhet', open: 'Community-granskad; du ansvarar för skyddsräcken', closed: 'Leverantörshanterade skyddsräcken och innehållsfilter' },
          { dimension: 'Licens', open: 'Varierar: Apache 2.0, Llama Community, etc.', closed: 'Proprietär; användningsvillkor kan ändras' },
        ],
        // From legacy: openModelsTranslations.sv
        openModels: [
          { name: 'Llama 4 Maverick', note: '400B totalt, 17B aktiva via 128 experter' },
          { name: 'DeepSeek V3', note: '671B totalt, 37B aktiva. Tränad för ~.5M' },
          { name: 'Mistral Large 2', note: 'Europeiskt, stark flerspråkig prestanda' },
          { name: 'Qwen 2.5', note: 'Alibabas flaggskepp, stark på kinesiska + engelska' },
          { name: 'Gemma 3', note: 'Googles öppna modell, optimerad för effektivitet' },
        ],
      },
      // From legacy: src/modules/industry/tech-translations.ts → ecosystemSectionSv
      ecosystemSection: {
        title: '3. Ekosystemet',
        intro: 'LLM:er existerar inte isolerat. En full stack kopplar grundmodeller till slutanvändare.',
        // MT
        keyInsight:
          'Du bygger sällan från grunden. De flesta team väljer en grundmodell, finjusterar den eventuellt, kör den med ett befintligt ramverk och kopplar in den i sin app med ett orkestreringslager. Ekosystemet gör detta möjligt utan att träna en enda vikt.',
        // From legacy: layersTranslations.sv (only `name` and `note` were translated; tools array structure preserved)
        layers: [
          { name: 'Grundmodeller' },
          { name: 'Finjustering & Anpassning' },
          { name: 'Inferens & Serving' },
          { name: 'Orkestrering & Agenter' },
          { name: 'Applikationer' },
        ],
      },
      // From legacy: src/modules/industry/tech-translations.ts → whereItsHeadingSectionSv
      whereItsHeadingSection: {
        title: '4. Vart det är på väg',
        intro: 'Sex trender som formar LLM-landskapet 2026 och framåt.',
        // From legacy: trendsTranslations.sv
        trends: [
          { title: 'Resonemangsmodeller', tagline: 'Modeller som tänker innan de svarar', detail: 'o3, DeepSeek-R1 och liknande modeller använder RL för att lära sig chain-of-thought-resonemang.', examples: ['o3 (OpenAI), DeepSeek-R1, Gemini 2 Flash Thinking'] },
          { title: 'Multimodala modeller', tagline: 'Text, bild, ljud, video i en modell', detail: 'Modeller som nativt förstår och genererar flera modaliteter.', examples: ['GPT-4o, Gemini, Claude (vision), Amazon Nova'] },
          { title: 'Öppen konvergens', tagline: 'Öppna modeller närmar sig stängda', detail: 'Gapet minskar snabbt tack vare MoE, distillation och community-innovation.', examples: ['Llama 4, DeepSeek V3, Mistral Large 2'] },
          { title: 'Agentiska system', tagline: 'Från text till handling', detail: 'LLM:er som kan planera, använda verktyg och utföra flerstegsuppgifter autonomt.', examples: ['Amazon Bedrock AgentCore, OpenAI Assistants, LangGraph'] },
          { title: 'Effektivitet', tagline: 'Mer med mindre', detail: 'Kvantisering, MoE, distillation och bättre data gör modeller billigare att köra.', examples: ['GGUF, AWQ, Llama 4 Scout (17B aktiva av 109B)'] },
          { title: 'Reglering', tagline: 'EU AI Act och globala ramverk', detail: 'Regulatoriska krav formar hur modeller utvecklas och driftsätts.', examples: ['EU AI Act (2025-2027), Bidens Executive Order, Kinas AI-regler'] },
        ],
      },
      bridgeToTools: 'Du vet vem som bygger modellerna. Andra sidan av myntet: vilka av dessa produkter borde DU använda dagligen?',
      bridgeToToolsBusiness: 'Du känner till aktörerna. Se nu vilka av deras verktyg som passar dina team — och hur man väljer.',
    },
    evaluation: {
      // From legacy: src/modules/evaluation/translations.ts → measuringSv
      measuring: {
        title: '1. Hur du vet om din AI fungerar',
        intro: '**"Det verkar ganska bra" räcker inte.** Du skulle inte utvärdera en nyanställd baserat på magkänsla — du skulle sätta tydliga förväntningar och mäta resultat. AI behöver samma rigor.',
        introSub: 'Tänk på det som kvalitetssäkring innan en produktlansering — testa systematiskt, inte bara slumpmässigt.',
        goodAnswerLabel: 'Bra svar',
        badAnswerLabel: 'Dåligt svar',
      },
      // From legacy: src/modules/evaluation/translations.ts → choosingSv
      choosing: {
        title: '2. Rätt AI-modell att välja',
        intro: 'Att välja en AI-modell är som att **rekrytera för en specifik roll** — den "bästa" kandidaten beror på DINA behov, inte bara deras CV.',
        introSub: 'En doktor i fysik är imponerande, men du skulle inte anställa dem som receptionist. På samma sätt är den största, dyraste AI-modellen inte alltid rätt val.',
        tipsTitle: 'Att läsa AI-rankningar (som produktrecensioner)',
        selfExplainPrompt: 'Hur skulle du utvärdera om en AI-chattbot fungerar bra för ert kundsupportteam? Vad specifikt skulle du mäta?',
      },
      // From legacy: src/modules/evaluation/tech-translations.ts → whyEvaluationSectionSv
      whyEvaluationSection: {
        title: '1. Varför utvärdering spelar roll',
        // The legacy file's `intro` field maps to slightly different prose roles in the EN component.
        // Provided as a partial; English fallback fills any gaps.
      },
      // From legacy: src/modules/evaluation/tech-translations.ts → benchmarksSectionSv
      benchmarksSection: {
        title: '2. Viktiga benchmarks (2025–2026)',
        intro: 'Branschen använder standardiserade benchmarks för att jämföra modeller. Inget enskilt benchmark berättar hela historien.',
        // From legacy: src/modules/evaluation/data-translations.ts → benchmarksTranslations.sv
        // Original 6-row SV array maps to a different (also 6-row) EN benchmark list. Per-index name match where possible.
        benchmarks: [
          { name: 'MMLU', category: 'Kunskap', what: 'Flervalsfrågor över 57 ämnen', scoring: 'Noggrannhet (%)' },
          { name: 'HumanEval', category: 'Kodning', what: 'Python-programmeringsproblem', scoring: 'pass@k (% som klarar tester)' },
          { name: 'GSM8K', category: 'Matematik', what: 'Matematikproblem på grundskolenivå', scoring: 'Noggrannhet (%)' },
          { name: 'TruthfulQA', category: 'Sanningsenlighet', what: 'Frågor designade att framkalla vanliga missuppfattningar', scoring: '% sanningsenliga svar' },
          { name: 'MT-Bench', category: 'Konversation', what: 'Flerturns konversationskvalitet', scoring: 'GPT-4 bedömning (1-10)' },
          { name: 'ARC-AGI', category: 'Resonemang', what: 'Abstrakta resonemangspussel', scoring: 'Noggrannhet (%)' },
        ],
      },
      // From legacy: src/modules/evaluation/tech-translations.ts → customEvalSectionSv
      customEvalSection: {
        title: '3. Anpassad utvärdering',
        intro: 'Publika benchmarks testar allmänna förmågor. För din specifika uppgift behöver du anpassad utvärdering.',
        // From legacy: taskTypesTranslations.sv
        taskTypes: [
          { label: 'Klassificering', metrics: ['Noggrannhet, F1, precision, recall'], tip: 'Stratifiera testdata efter klass' },
          { label: 'Generering', metrics: ['BLEU, ROUGE, BERTScore, mänsklig bedömning'], tip: 'Automatiska mätvärden korrelerar dåligt med kvalitet' },
          { label: 'Extraktion', metrics: ['Exakt matchning, F1 på tokennivå'], tip: 'Testa med variationer i format' },
          { label: 'Sammanfattning', metrics: ['ROUGE-L, faktakonsistens, mänsklig bedömning'], tip: 'Kontrollera att sammanfattningen inte hallucinerar fakta' },
          { label: 'Konversation', metrics: ['Mänsklig preferens, LLM-som-domare, uppgiftslösning'], tip: 'Flerturns-utvärdering fångar saker som enstaka svar missar' },
        ],
      },
      // From legacy: src/modules/evaluation/tech-translations.ts → leaderboardSectionSv
      leaderboardSection: {
        title: '4. Leaderboard-problemet',
        intro: 'Benchmarks är användbara men bristfälliga. Här är varför du inte bör välja modell baserat på ranking.',
      },
    },
    agents: {
      // From legacy: src/modules/agents/content/whatAreAgents.sv.ts (full human translation)
      whatAreAgents: {
        sectionTitle: '1. Vad är AI-agenter?',
        intro: 'De flesta AI-verktyg idag är som **en väldigt smart kollega du kan smsa** — de svarar på frågor, men de kan inte faktiskt *göra* något. En AI-agent är annorlunda: den är mer som **en personlig assistent som kan agera å dina vägnar**.',
        introSub: 'Tänk på skillnaden mellan att fråga någon "vilken tid är mötet?" och "flytta mitt möte till torsdag och meddela alla."',
        demoTitle: 'Från chattbot till agent',
        demoDescription: 'Klicka dig igenom för att se hur AI-kapaciteten utvecklas — från en kollega som svarar på frågor till en assistent som hanterar uppgifter.',
        levels: [
          { level: 'Chattbot', analogy: 'Som att smsa en kunnig vän', description: 'Du ställer en fråga, du får ett svar. Det är allt. AI:n kan inte kolla upp något, söka efter information eller göra något åt dig. Den vet bara det den tränats på.', everyday: 'Tänk dig att du frågar en kollega något på Slack — de svarar ur minnet, men de kan inte öppna ditt kalkylblad eller kolla din kalender åt dig.', limit: 'Om svaret kräver aktuell information eller att något görs, får du göra det själv.' },
          { level: 'AI + Sökning', analogy: 'Som en kollega som kan googla saker', description: 'AI:n kan söka information innan den svarar — söka i företagets dokument, kolla en kunskapsbas eller surfa på webben. Detta kallas RAG (Retrieval-Augmented Generation).', everyday: 'Som att fråga din kollega något och de säger "vänta, jag kollar den delade mappen" — och sedan kommer tillbaka med ett svar som refererar till faktiska dokument.', limit: 'Den kan hitta information, men kan fortfarande inte agera. Den kan berätta att mötet är kl 15, men kan inte boka om det.' },
          { level: 'AI-agent', analogy: 'Som en personlig assistent som får saker gjorda', description: 'AI:n kan tänka ut vad som behöver hända, utföra handlingar (skicka e-post, uppdatera kalkylblad, boka möten, söka i databaser), kontrollera resultaten och fortsätta tills uppgiften är klar.', everyday: 'Som att säga till din assistent "flytta mina torsdagsmöten till nästa vecka och maila deltagarna." De listar ut stegen, gör dem, hanterar eventuella problem och rapporterar tillbaka.', limit: 'Kraftfullare men behöver skyddsräcken — du vill godkänna stora beslut innan assistenten agerar.' },
        ],
        loopTitle: 'Hur fungerar en agent egentligen?',
        loopIntro: 'En agent följer en enkel loop — samma som en bra assistent använder:',
        loopSteps: [
          { label: 'Tänk', desc: 'Vad behöver hända härnäst?' },
          { label: 'Agera', desc: 'Gör något (skicka e-post, slå upp data, uppdatera en post)' },
          { label: 'Kontrollera', desc: 'Fungerade det? Vad hände?' },
          { label: 'Upprepa', desc: 'Tills uppgiften är klar' },
        ],
        loopOutro: 'Det här är precis vad du gör när du delegerar en uppgift till någon: de tänker på det, tar ett steg, kontrollerar resultatet och fortsätter. Skillnaden är att AI:n gör detta på sekunder.',
        beforeAfterTitle: 'Före och efter: vad agenter förändrar',
        examples: [
          { scenario: 'Kundsupport', without: 'Agenten svarar på frågan från ett manus. Kunden måste fortfarande navigera webbplatsen själv för att ändra sitt abonnemang.', with: 'Agenten slår upp kundens konto, kontrollerar faktureringen, ändrar abonnemanget, skickar ett bekräftelsemail — allt i en konversation.' },
          { scenario: 'Utläggsrapporter', without: 'AI:n kan förklara utläggspolicyn. Medarbetaren fyller fortfarande i formuläret manuellt.', with: 'Medarbetaren vidarebefordrar ett kvitto. Agenten läser det, fyller i utläggsformuläret, kategoriserar det korrekt och skickar in det för godkännande.' },
          { scenario: 'Mötesförberedelser', without: 'AI:n sammanfattar ett dokument du klistrar in. Du måste fortfarande hitta rätt dokument själv.', with: 'Du säger "förbered mig inför kundsamtalet kl 14." Agenten hämtar kundens senaste e-post, förra mötesanteckningarna, öppna offerter och skapar en sammanfattning på en sida.' },
        ],
        withoutLabel: 'Utan agent',
        withLabel: 'Med agent',
        everydayLabel: 'Vardaglig jämförelse',
        limitLabel: 'Begränsning:',
        selfExplainPrompt: 'Förklara med egna ord skillnaden mellan en chattbot och en agent för en kollega som aldrig hört talas om AI-agenter. Använd en vardaglig jämförelse.',
        selfExplainAnswer: 'En chattbot är som att smsa en väldigt kunnig vän — de kan svara på dina frågor, men de kan inte göra något åt dig. En agent är som att ha en personlig assistent — du kan säga "boka en flygresa till London nästa tisdag, under 5000 kr, gångplats" och de söker faktiskt efter flyg, jämför alternativ, bokar det och skickar dig bekräftelsen. Den avgörande skillnaden är handling: en chattbot pratar, en agent gör.',
      },
      // From legacy: tech-translations.ts → whatAreAgentsSectionSv (title only — legacy intro orphaned, body is hardcoded EN in JSX)
      whatAreAgentsSection: {
        title: '1. Vad är AI-agenter?',
      },
      // From legacy: translations.ts → toolUseSv (full human translation; guardrailScenarios array has no legacy SV → falls back to EN)
      toolUse: {
        title: '2. Vad kan agenter faktiskt göra?',
        intro: 'En agents kraft kommer från dess **verktyg** — det den kan ansluta till och använda. Tänk på det som att anställa en assistent och ge dem tillgång till din e-post, kalender och arkivsystem.',
        tools: [
          { name: 'Sökning / Hämtning', analogy: 'Som att slå upp något i ett arkivskåp', whatItDoes: 'Agenten söker i dina företagsdokument, kunskapsbas eller webben.', businessExample: 'En kund frågar om er returpolicy. Agenten söker i policydokumenten och ger ett korrekt, aktuellt svar.' },
          { name: 'E-post & Meddelanden', analogy: 'Som att be din assistent skicka ett meddelande', whatItDoes: 'Agenten kan skriva och skicka e-post, Slack-meddelanden eller notifieringar.', businessExample: 'Efter att ha löst ett supportärende skickar agenten ett uppföljningsmail.' },
          { name: 'Datauppslag', analogy: 'Som att kolla ett kalkylblad eller databas', whatItDoes: 'Agenten kan fråga ditt CRM, ERP eller annat affärssystem.', businessExample: '"Vad är statusen på Acme Corp-affären?" — agenten kollar Salesforce.' },
          { name: 'Beräkningar', analogy: 'Som att ge någon en miniräknare', whatItDoes: 'Agenten kan köra beräkningar och generera rapporter korrekt.', businessExample: '"Vad blir vår marginal om vi ger 15% rabatt?" — agenten beräknar exakt.' },
          { name: 'Åtgärder & Uppdateringar', analogy: 'Som att be någon uppdatera en post', whatItDoes: 'Agenten kan skapa, uppdatera eller ta bort poster i dina system.', businessExample: '"Skapa en uppföljningsuppgift för Acme-kontot." — agenten skapar den.' },
        ],
        trustTitle: 'Förtroende: vad bör agenter göra själva?',
        trustIntro: 'Precis som du inte ger en nyanställd företagskortet dag ett, behöver du bestämma vad en agent kan göra själv vs vad som behöver godkännande.',
        platformNote: 'Plattformar som **Amazon Bedrock AgentCore** hanterar infrastrukturen — anslutning till verktyg, minneshantering, säkerhet i skala.',
        selfExplainPrompt: 'Din chef frågar: "Ska vi låta AI-agenten skicka e-post till kunder utan godkännande?" Hur tänker du igenom detta?',
        selfExplainAnswer: 'Jag skulle överväga risken: ett felaktigt e-postmeddelande kan skada relationen. Jag rekommenderar att börja med "skriv utkast och godkänn" — agenten skriver, en människa granskar och skickar. Över tid kan vi automatiskt skicka rutinsvar medan vi behåller granskning för känsliga ärenden.',
      },
      // From legacy: tech-translations.ts → functionCallingSectionSv (title only)
      functionCallingSection: {
        title: '2. Funktionsanrop',
      },
      // From legacy: tech-translations.ts → mCPSectionSv (title only — legacy p2 was empty placeholder)
      mcpSection: {
        title: '3. MCP (Model Context Protocol)',
      },
      // From legacy: translations.ts → patternsSv (title, intro, patterns[] human; decisionQuestions falls back to EN)
      patterns: {
        title: '3. Hur du sätter upp agenter för ditt team',
        intro: 'Det finns ingen universallösning. Precis som du organiserar ett team olika för en snabb uppgift vs ett stort projekt, finns det olika sätt att sätta upp AI-agenter.',
        patterns: [
          { name: 'Ensam agent', analogy: 'En assistent som hanterar allt', howItWorks: 'En AI-agent tar emot uppgiften och gör allt. Enkelt och snabbt.', bestFor: 'Uppgifter med tydliga steg som en person kan hantera.', realExample: 'En kund frågar "vad är min orderstatus?" Agenten kollar och svarar.' },
          { name: 'Överlämning (Routing)', analogy: 'En receptionist som dirigerar dig till rätt avdelning', howItWorks: 'En "router"-agent avgör vilken typ av förfrågan det är och lämnar över till en specialist.', bestFor: 'Olika typer av förfrågningar som behöver olika expertis.', realExample: 'Kund skriver in. Router-agenten upptäcker att det är fakturering och lämnar över.' },
          { name: 'Multi-agent-team', analogy: 'Ett projektteam där var och en har en roll', howItWorks: 'Flera specialiserade agenter samarbetar, var och en hanterar sin del.', bestFor: 'Komplexa uppgifter som gynnas av olika perspektiv.', realExample: 'Marknadsanalys: en agent samlar data, en analyserar, en skriver sammanfattningen.' },
          { name: 'Människa-i-loopen', analogy: 'En assistent som stämmer av före stora beslut', howItWorks: 'Agenten gör arbetet men pausar vid viktiga beslutspunkter för godkännande.', bestFor: 'Högriskuppgifter där misstag är kostsamma.', realExample: 'Agenten förbereder en kontraktsändring, visar dig ändringarna, väntar på ditt OK.' },
        ],
      },
      // From legacy: tech-translations.ts → designPatternsSectionSv + data-translations.ts → patternsTranslations.sv
      designPatternsSection: {
        title: '4. Designmönster för agenter',
        intro: 'Inte alla agenter fungerar likadant. Dessa är de centrala arkitekturmönstren.',
        patterns: [
          { name: 'ReAct', description: 'Det vanligaste mönstret. Agenten alternerar mellan att tänka, agera och observera.', useCase: 'Allmänna agenter, Q&A med verktygsanvändning.', example: '"Vilka är de 3 bästa restaurangerna nära mig?" → tänker → söker → läser → svarar' },
          { name: 'Reflektion', description: 'Agenten genererar output, granskar sedan sitt eget arbete och förbättrar det.', useCase: 'Kodgenerering, skrivuppgifter.', example: 'Generera kod → granska för buggar → fixa → leverera' },
          { name: 'Planera-och-utför', description: 'Agenten skapar en plan först, utför sedan varje steg.', useCase: 'Komplexa flerstegsuppgifter.', example: '"Planera en resa till Tokyo" → lista steg → boka flyg → boka hotell → skapa resplan' },
          { name: 'Multi-agent', description: 'Flera specialiserade agenter samarbetar, var och en med sin roll.', useCase: 'Komplexa uppgifter som gynnas av specialisering.', example: 'Forskningsagent + skribentagent + granskningsagent' },
          { name: 'Human-in-the-loop', description: 'Agenten pausar vid viktiga beslutspunkter för mänskligt godkännande.', useCase: 'Högriskuppgifter, känsliga beslut.', example: 'Agent förbereder kontrakt → människa granskar → agent skickar' },
        ],
      },
      // From legacy: translations.ts → connectSv (orphaned in legacy — component used `useT(EN, {})`).
      // Reconnected via the new tree. concepts[] has 4 of 7 fields; whereYouSeeIt/doIneedToDoSomething/whyCare fall back to EN.
      connect: {
        title: '4. Hur agenter ansluter till allt',
        intro: 'En agent är bara användbar om den kan *göra saker*. Så här passar ekosystemet av verktyg, färdigheter och protokoll ihop.',
        concepts: [
          { name: 'MCP — anslutning till verktyg', analogy: 'Universella åtkomstbrickor för dina system', whatItIs: 'En öppen standard ("USB-C för AI") som låter vilken AI som helst ansluta till vilket verktyg som helst. Över 2 000 kopplingar finns redan.', example: 'Ditt företag bygger en MCP-server för ert ärendesystem. Nu kan alla AI-verktyg skapa och uppdatera ärenden.' },
          { name: 'Färdigheter — lär agenter arbetsflöden', analogy: 'En utbildningsmanual, inte bara ett verktygsbälte', whatItIs: 'MCP ger agenter verktyg. Färdigheter lär dem HUR de ska använda dem — arbetsflödet, bästa praxis och beslutslogik.', example: 'En "kundintroduktion"-färdighet vet 7-stegsprocessen: verifiera kontrakt, skapa arbetsyta, skicka välkomstmail...' },
          { name: 'Powers — expertkonsulter för utvecklare', analogy: 'En specialist som kommer med egen verktygslåda', whatItIs: 'Kurerade paket för Kiro IDE som buntar MCP-servrar, riktlinjer och automatiseringskrokar.', example: '"AWS Observability" Power ger Kiro kunskap om CloudWatch och övervakningspraxis.' },
          { name: 'A2A — agenter pratar med agenter', analogy: 'Avdelningar som skickar förfrågningar till varandra', whatItIs: 'Medan MCP ansluter agenter till verktyg, ansluter A2A agenter till ANDRA agenter. Skapat av Google, stöds av 100+ organisationer.', example: 'Din supportagent upptäcker ett faktureringsproblem. Via A2A skickar den en återbetalningsförfrågan till ekonomiteamets agent.' },
        ],
        platformNote: 'Plattformar som **Amazon Bedrock AgentCore** hanterar körtiden som binder ihop allt detta.',
        // MT
        insightTitle: 'Mönstret: öppna standarder, inte inlåsning',
        // MT
        insightText: 'Lägg märke till mönstret: de flesta av dessa är öppna standarder, inte leverantörsinlåsning. MCP, Agent Skills och A2A är alla donerade till Linux Foundation under Agentic AI Foundation (december 2025). Det betyder att en färdighet eller MCP-koppling du skriver eller köper fungerar tvärs över leverantörer. Det är ovanligt i företagsmjukvara och värt att kräva av dina AI-leverantörer.',
        selfExplainPrompt: 'Tänk på en flerstegsprocess på ditt företag som involverar flera system. Vilka MCP-verktyg skulle en agent behöva? Vilken arbetsflödeslogik (färdighet) skulle binda ihop dem?',
        selfExplainAnswer: 'Exempel — ny affär stängd: MCP-verktyg: CRM, e-post, kalender, projekthantering, fakturering. Färdighetsarbetsflöde: (1) Uppdatera CRM. (2) Skapa introduktionsprojekt. (3) Boka kickoff-möte. (4) Skicka välkomstmail. (5) Generera faktura. (6) Meddela säljchef.',
      },
      // From legacy: tech-translations.ts → buildingAgentsSectionSv + data-translations.ts → frameworksTranslations.sv.
      // Legacy `intro` is semantically the new `p2` callout — mapped accordingly.
      buildingAgentsSection: {
        title: '6. Bygga agenter',
        p2: 'Du behöver inget ramverk för att bygga en agent. Börja med rå funktionsanrop och skala upp vid behov.',
        frameworks: [
          { name: 'Rå funktionsanrop', description: 'Direkta API-anrop med verktygsscheman. Inget ramverksoverhead.', bestFor: 'Enkla agenter, lärande, prototyper' },
          { name: 'Vercel AI SDK', description: 'Webbfokuserat, bra TypeScript-stöd, streaming-först.', bestFor: 'Webbappar, Next.js, streaming-UI' },
          { name: 'LangChain / LangGraph', description: 'Mest populärt. LangGraph lägger till grafbaserade arbetsflöden.', bestFor: 'Produktionsagenter, komplexa arbetsflöden' },
          { name: 'CrewAI', description: 'Multi-agent-ramverk med rollbaserade agenter som samarbetar.', bestFor: 'Multi-agent-team, rollbaserade uppgifter' },
          { name: 'AutoGen (Microsoft)', description: 'Multi-agent-konversationer med human-in-the-loop-stöd.', bestFor: 'Forskning, komplexa multi-agent-system' },
          { name: 'Amazon Bedrock AgentCore', description: 'Hanterad infrastruktur för agenter i skala. Fungerar med alla ramverk.', bestFor: 'Företagsdriftsättning, produktionsagenter på AWS' },
        ],
      },
      // From legacy: translations.ts → businessImpactSv (full human prose; arrays levels/parallels/riskFramework/failurePatterns have no legacy SV → fall back to EN).
      // Legacy loopTitle/loopDesc fields are orphaned (component does not render them) — dropped.
      businessImpact: {
        title: '6. Affärsverkligheten — När AI tar ratten',
        intro: 'Varje chef vill ha AI-transformation. Men när det är dags att faktiskt låta AI fatta beslut blir det tyst i rummet. Detta är problemet med självkörande bilar — tekniken kanske är redo, men är människorna och processerna det?',
        introSub: 'Att förstå spektrumet av AI-autonomi — och ärligt bedöma var din organisation är redo — är skillnaden mellan framgångsrik adoption och dyra misslyckanden.',
        carTitle: 'Lärdomen från självkörande bilar',
        carIntro: 'Parallellerna mellan autonoma fordon och autonoma AI-agenter är slående — och lärdomarna är direkt tillämpbara på din AI-strategi.',
        frameworkButton: 'Praktiskt ramverk: vilka beslut kan AI fatta?',
        failTitle: 'Varför 40% av agentiska AI-projekt kan misslyckas',
        failIntro: 'Branschanalytiker bedömer att upp till 40% av agentiska AI-initiativ kan avbrytas till 2027 — inte för att tekniken inte fungerar, utan för att organisationer inte är redo.',
        selfExplainPrompt: 'Din VD säger "Jag vill att vår kundsupport ska vara helt autonom till Q4 — inga människor i loopen." Hur skulle du råda dem med hjälp av autonomispektrumet och analogin med självkörande bilar?',
        selfExplainAnswer: 'Jag skulle säga: "Jag delar ambitionen, men låt oss lära av branschen för självkörande bilar. Jag rekommenderar Waymo-metoden: Börja med Nivå 2 för rutinärenden i Q1. Flytta till Nivå 3 i Q2 när vi har data som visar 98%+ noggrannhet. Behåll komplexa ärenden på Nivå 2 genom Q3. Utvärdera full autonomi i Q4 baserat på faktisk prestanda."',
      },
      // From legacy: tech-translations.ts → a2ASectionSv (title human; legacy intro maps to new p3) + data-translations.ts → protocolsTranslations.sv
      a2aSection: {
        title: '7. A2A — Agent-till-Agent-protokollet',
        p3: 'MCP kopplar agenter till verktyg. A2A kopplar agenter till andra agenter.',
        protocols: [
          { name: 'MCP', direction: 'Agent → Verktyg/Resurs', analogy: 'USB — ansluta kringutrustning', scope: 'En agent som använder externa funktioner', standard: 'Anthropic (öppen, antagen av OpenAI, AWS, Microsoft)', status: '3000+ servrar, produktionsklar' },
          { name: 'A2A', direction: 'Agent → Agent', analogy: 'HTTP — datorer som pratar med datorer', scope: 'Agenter som upptäcker och samarbetar med andra agenter', standard: 'Google → Linux Foundation (100+ org: AWS, Microsoft, Salesforce)', status: 'Spec stabil, tidig produktionsanvändning' },
        ],
      },
      // From legacy: tech-translations.ts → skillsHarnessSectionSv + data-translations.ts → capabilitiesTranslations.sv
      skillsHarnessSection: {
        title: '8. Skills, Steering och den hanterade körtiden',
        intro: 'MCP ger agenter verktyg. Agent Skills ger dem arbetsflöden. AGENTS.md och Kiro steering ger dem projektkontext. Bedrock AgentCore ger dem en hanterad körtid. Ekosystemet har konvergerat till distinkta lager — de flesta öppna och donerade till Agentic AI Foundation (Linux Foundation, december 2025).',
        capabilities: [
          { name: 'MCP Server', layer: 'Anslutning', what: 'Universell verktygskoppling — exponerar ett API/databas/tjänst för alla MCP-klienter', granularity: 'Enskilt verktyg eller resurs', reusability: 'Alla MCP-kompatibla agenter', example: 'mcp-server-salesforce, mcp-server-postgres, mcp-server-slack' },
          { name: 'Agent Skill (SKILL.md)', layer: 'Beteende', what: 'Öppen standard — mapp med SKILL.md (frontmatter + instruktioner) plus valfria scripts/, references/, assets/. Laddas progressivt: metadata alltid, kropp vid aktivering, filer vid behov.', granularity: 'Flerstegs arbetsflöde eller domänexpertis', reusability: 'Alla Skills-kompatibla agenter (Claude Code, Codex, Microsoft Agent Framework, Kiro, …)', example: 'customer-onboarding, pdf-processing, code-review' },
          { name: 'AGENTS.md', layer: 'Projektkontext', what: 'README för agenter — repo-instruktioner: setup, kodstil, testkommandon, PR-regler. Öppen standard från Agentic AI Foundation.', granularity: 'Hela repot eller underkatalog (nestade filer stöds)', reusability: 'Codex CLI, Claude Code, Cursor, Aider, Kiro, OpenHands m.fl.', example: 'monorepo-rot + AGENTS.md per paket' },
          { name: 'Kiro Steering', layer: 'Workspace-kontext', what: 'Markdown-filer i .kiro/steering/ som ger Kiro persistent projektkunskap — konventioner, bibliotek, standarder.', granularity: 'Workspace', reusability: 'Kiro CLI / IDE', example: 'product.md, structure.md, tech.md' },
          { name: 'Bedrock AgentCore', layer: 'Körtid', what: 'Hanterad agentkörtid på AWS — modell + prompt + verktyg + skills + minne + observability + gränser.', granularity: 'Komplett agent', reusability: 'Produktionsdriftsättning', example: 'Supportagent, säljassistent, IT-helpdesk' },
        ],
      },
      // From legacy: tech-translations.ts → productionGovernanceSectionSv (title human; legacy intro is semantically the new p2)
      // + data-translations.ts → autonomyTiersTranslations.sv + governanceControlsTranslations.sv
      productionGovernanceSection: {
        title: '8. Produktionsstyrning — Tillit i skala',
        p2: 'Att driftsätta agenter i produktion skiljer sig fundamentalt från att driftsätta API:er.',
        autonomyTiers: [
          { tier: 'L0 — Copilot', loop: 'Människa agerar, AI föreslår', oversight: 'Varje handling', examples: 'Kodkomplettering, mejlutkast', risk: 'Minimal' },
          { tier: 'L1 — Utförare', loop: 'Människa godkänner, AI agerar', oversight: 'Godkännande per handling', examples: 'AI skriver + människa skickar mejl', risk: 'Låg' },
          { tier: 'L2 — Begränsad autonomi', loop: 'AI agerar inom regler, människa övervakar', oversight: 'Asynkron granskning + varningar', examples: 'Autolösa L1-ärenden, återbetalningar <500kr', risk: 'Medel' },
          { tier: 'L3 — Övervakad autonomi', loop: 'AI agerar, eskalerar undantag', oversight: 'Undantagsbaserad + revisioner', examples: 'Kundintroduktion, incidenthantering', risk: 'Hög' },
          { tier: 'L4 — Full autonomi', loop: 'AI agerar, människa sätter strategi', oversight: 'Resultatbaserad granskning', examples: 'Autonom handel, självläkande infra', risk: 'Kritisk' },
        ],
        governanceControls: [
          { control: 'Handlingsgränser', what: 'Vitlista av tillåtna handlingar per agent.' },
          { control: 'Utgiftsgränser', what: 'Tak på ekonomisk påverkan per handling och session.' },
          { control: 'Revisionsspår', what: 'Varje agenthandling loggas med resonemangsspår.' },
          { control: 'Nödstopp', what: 'Möjlighet att omedelbart stoppa en agent.' },
          { control: 'Mänsklig eskalering', what: 'Definierade triggers som pausar agenten.' },
          { control: 'Driftdetektering', what: 'Övervaka beteendeförändringar över tid.' },
        ],
      },
    },
    quantization: {
      // From legacy: tech-translations.ts → whatIsQuantizationSectionSv (title only — legacy intro orphaned, body is hardcoded EN in JSX)
      whatIsQuantizationSection: {
        title: '1. Vad är kvantisering?',
      },
      // From legacy: tech-translations.ts → quantizationMethodsSectionSv + data-translations.ts → methodsTranslations.sv
      quantizationMethodsSection: {
        title: '2. Kvantiseringsmetoder',
        intro: 'Fyra huvudmetoder dominerar ekosystemet. Var och en riktar sig mot olika användningsfall.',
        // Methods array re-ordered to match the new EN tree (legacy SV order: GPTQ, GGUF, AWQ, bitsandbytes;
        // new EN order: GPTQ, AWQ, GGUF, BitsAndBytes). Per-item content preserved verbatim from legacy.
        methods: [
          { name: 'GPTQ', tagline: 'GPU-optimerad, kalibrerad kvantisering', howItWorks: 'Använder kalibreringsdata för att hitta optimala kvantiseringspunkter per lager. Producerar GPU-optimerade modeller.', pros: ['Hög kvalitet med kalibrering', 'Snabb GPU-inferens', 'Väletablerat ekosystem'], cons: ['Kräver GPU', 'Kalibreringsdata behövs', 'Långsammare kvantiseringsprocess'], whenToUse: 'GPU-inferens i produktion med kvalitetskrav' },
          { name: 'AWQ', tagline: 'Activation-aware, bevarar viktiga vikter', howItWorks: 'Identifierar vilka vikter som är viktigast baserat på aktiveringsmönster och kvantiserar dem mer försiktigt.', pros: ['Bättre kvalitet än naiv kvantisering', 'Snabb inferens', 'Bra för 4-bit'], cons: ['Kräver kalibreringsdata', 'Nyare, mindre ekosystem'], whenToUse: 'När kvalitet vid 4-bit är kritisk' },
          { name: 'GGUF', tagline: 'CPU-vänligt, llama.cpp-format', howItWorks: 'Kvantiserar vikter till valbar precision (Q4_K_M, Q5_K_S etc). Optimerat för CPU-inferens via llama.cpp.', pros: ['Körs på CPU (ingen GPU krävs)', 'Flexibla kvantiseringsnivåer', 'Stort community, många modeller'], cons: ['Långsammare än GPU-metoder', 'Kvalitet varierar med nivå'], whenToUse: 'Lokal inferens på laptop/desktop, edge-enheter' },
          { name: 'bitsandbytes', tagline: 'Integrerat i HuggingFace, enkelt att använda', howItWorks: 'Kvantiserar modellen vid laddning med en flagga (load_in_4bit). Används ofta med QLoRA för finjustering.', pros: ['Enklast att använda', 'Integrerat i transformers-biblioteket', 'Perfekt för QLoRA'], cons: ['Bara NVIDIA GPU:er', 'Inte optimalt för ren inferens'], whenToUse: 'QLoRA-finjustering, snabb prototypning' },
        ],
      },
      // From legacy: tech-translations.ts → conversionPipelineSectionSv (title + intro human; legacy p2 was empty placeholder)
      conversionPipelineSection: {
        title: '3. Konverteringspipelinen',
        intro: 'Gå igenom den verkliga processen: ta en HuggingFace-modell, konvertera till GGUF och kvantisera.',
      },
      // From legacy: tech-translations.ts → qualityVsSizeSectionSv (title human; legacy `intro` semantically maps to new p2)
      qualityVsSizeSection: {
        title: '4. Kvalitet vs storlek',
        p2: 'Förhållandet mellan modellstorlek och kvalitet är inte linjärt. Det finns en sweet spot.',
      },
    },
    inference: {
      // From legacy: tech-translations.ts → howInferenceWorksSectionSv (title human; legacy `intro` semantically maps to new p2)
      howInferenceWorksSection: {
        title: '1. Hur inferens fungerar',
        p2: 'Inferens är processen att generera text från en tränad modell. Det sker i två faser.',
      },
      // From legacy: tech-translations.ts → servingFrameworksSectionSv + data-translations.ts → frameworksTranslations.sv
      servingFrameworksSection: {
        title: '2. Servingramverk',
        intro: 'En tränad modell är bara vikter på disk. För att serva den i skala behöver du ett ramverk.',
        frameworks: [
          { name: 'vLLM', tagline: 'Snabbast för de flesta användningsfall', features: ['PagedAttention, continuous batching, tensor parallelism'] },
          { name: 'TGI (HuggingFace)', tagline: 'Enkel integration med HuggingFace-ekosystemet', features: ['Flash attention, kvantisering, streaming'] },
          { name: 'llama.cpp', tagline: 'CPU-inferens, GGUF-format', features: ['Körs överallt — laptop, telefon, Raspberry Pi'] },
          { name: 'Ollama', tagline: 'Enklaste sättet att köra lokalt', features: ['En-kommando-installation, modellbibliotek, API'] },
          { name: 'Amazon Bedrock', tagline: 'Hanterad inferens, 100+ modeller', features: ['Inget att hantera — API-anrop, autoskalning, företagssäkerhet'] },
        ],
      },
      // From legacy: tech-translations.ts → optimizationTechniquesSectionSv + data-translations.ts → techniquesTranslations.sv
      // Note: legacy SV/KO techniques arrays have 8 items (Continuous Batching, KV Cache, Speculative, Quantization, FlashAttention, Tensor Parallelism, PagedAttention, Prefix Caching) but the current EN tree has 4 items (Continuous Batching, KV Cache Paging, Speculative, Prefix Caching). Per-item content reordered/dropped to match the EN order. Items 4–6 of legacy SV are no longer rendered and are dropped.
      optimizationTechniquesSection: {
        title: '3. Optimeringstekniker',
        intro: 'Rå modellinferens är långsam. Dessa tekniker kan förbättra genomströmningen 2-10x.',
        techniques: [
          { name: 'Continuous Batching', short: 'Fyll GPU:n hela tiden', description: 'Lägg till nya förfrågningar så fort platser frigörs istället för att vänta.' },
          { name: 'PagedAttention', short: 'Effektiv KV-cache', description: 'Hantera KV-cache som virtuellt minne — allokera sidor vid behov istället för i förväg.' },
          { name: 'Speculative Decoding', short: 'Gissa och verifiera', description: 'En liten modell genererar kandidater snabbt, den stora modellen verifierar parallellt.' },
          { name: 'Prefix Caching', short: 'Återanvänd gemensamma prefix', description: 'Cachelagra KV-tillstånd för gemensamma systemprompts så de inte beräknas om.' },
        ],
      },
      // From legacy: tech-translations.ts → costOptimizationSectionSv (title human; legacy `intro` matches new EN intro semantically)
      costOptimizationSection: {
        title: '4. Kostnadsoptimering',
        intro: 'Inferenskostnad är den dominerande utgiften i produktions-LLM-system.',
      },
    },
    architecture: {
      // From legacy: tech-translations.ts → denseMoESectionSv (title only — intro was empty placeholder) + data-translations.ts → comparisonTranslations.sv
      denseMoESection: {
        title: '1. Dense vs Mixture-of-Experts',
        comparison: [
          { aspect: 'Parametrar', dense: 'Alla aktiva varje token', moe: 'Bara en delmängd aktiv per token' },
          { aspect: 'Beräkning', dense: 'Proportionell mot total storlek', moe: 'Proportionell mot aktiv storlek' },
          { aspect: 'Minne', dense: 'Alla vikter i minnet', moe: 'Alla vikter i minnet (större totalt)' },
          { aspect: 'Kvalitet', dense: 'Konsekvent, förutsägbar', moe: 'Kan matcha dense med färre FLOP:ar' },
          { aspect: 'Träning', dense: 'Enklare, mer stabil', moe: 'Kräver lastbalansering, mer komplex' },
        ],
      },
      // From legacy: tech-translations.ts → scalingLawsSectionSv (title only — legacy intro was empty placeholder)
      scalingLawsSection: {
        title: '2. Skalningslagar',
      },
      // From legacy: tech-translations.ts → attentionVariantsSectionSv (title human; legacy `intro` matches new EN intro semantically)
      attentionVariantsSection: {
        title: '3. Uppmärksamhetsvarianter',
        intro: 'KV-cachen är den största minnesflaskhalsen vid inferens. Olika attention-varianter gör olika avvägningar.',
      },
      // From legacy: tech-translations.ts → modelConfigSectionSv (title + intro human)
      modelConfigSection: {
        title: '4. Modellkonfiguration',
        intro: 'Konfigurera din egen modellarkitektur och se hur parameterval påverkar total storlek.',
      },
      // From legacy: tech-translations.ts → decisionTreeSectionSv (title + intro human; p6-p9 not in legacy → fall back to EN)
      decisionTreeSection: {
        title: '5. Beslutsträdet',
        intro: 'Att välja arkitektur beror på budget, användningsfall och om du behöver serva modellen själv.',
      },
    },
    training: {
      // From legacy: tech-translations.ts → trainingSection1Sv (title was orphaned in legacy — Section1 had no useT). Title preserved here.
      trainingSection1: {
        title: '1. Från slumpmässiga vikter',
      },
      // From legacy: tech-translations.ts → trainingSection2Sv (only `title` was populated; intro/p* were empty placeholders).
      // `subtitle` and `idle` from inline {en,sv,ko}[lang] ad-hoc i18n preserved verbatim from the original component.
      trainingSection2: {
        title: '2. Träningsloopen',
        subtitle: 'Klicka på ett steg eller animera hela cykeln',
        idle: 'Klicka på ett steg ovan eller tryck Animera för att se hur varje steg fungerar.',
      },
      // From legacy: tech-translations.ts → trainingSection3Sv (title orphaned in legacy — preserved here)
      trainingSection3: {
        title: '3. Checkpoints och modeller',
      },
      // From legacy: tech-translations.ts → trainingSection4Sv (title only) + data-translations.ts → variantsTranslations.sv.
      // Legacy SV array order was [scratch, continued, lora, fulltuning]; reordered to match new EN order [scratch, continued, fulltuning, lora].
      trainingSection4: {
        title: '4. Träningsmetoder',
        variants: [
          { label: 'Från grunden', desc: 'Träna en helt ny modell från slumpmässiga vikter. Dyrast men full kontroll.' },
          { label: 'Fortsatt förträning', desc: 'Ta en befintlig modell och träna vidare på domänspecifik data.' },
          { label: 'Full finjustering', desc: 'Uppdatera alla vikter. Bäst kvalitet men kräver mest resurser.' },
          { label: 'LoRA / QLoRA', desc: 'Finjustera med små adapter-matriser. Billigt, snabbt, effektivt.' },
        ],
      },
      // From legacy: tech-translations.ts → trainingSection5Sv (title only) + data-translations.ts → formatComparisonTranslations.sv.
      // Legacy SV had 3 items but the 3rd was "JSONL" (training data format) while new EN 3rd is "PyTorch" (model weight format) — misaligned.
      // Preserved first 2 items verbatim; 3rd item dropped → falls back to EN.
      trainingSection5: {
        title: '5. nanochat-speedrun',
        formats: [
          { name: 'SafeTensors', useCase: 'Standard för modellvikter. Säker, snabb laddning.' },
          { name: 'GGUF', useCase: 'Kvantiserade modeller för llama.cpp. CPU-inferens.' },
        ],
      },
    },
    llmdata: {
      // From legacy: tech-translations.ts → dataSourcesSectionSv (title only) + data-translations.ts → sourcesTranslations.sv.
      // Legacy SV array order [Common Crawl, Wikipedia, Böcker, Kod, Vetenskapliga artiklar, Konversationer]
      // is misaligned with new EN order [Common Crawl, Code, Books, Academic, Wikipedia, Other] — reordered to match EN.
      // Position 5 dropped: legacy "Konversationer" doesn't match new EN "Other" semantically → falls back to EN.
      dataSourcesSection: {
        title: '1. Datakällor',
        sources: [
          { name: 'Common Crawl', details: 'Webbskrapning av hela internet. Största öppna datakällan.' },
          { name: 'Kod', details: 'GitHub, Stack Overflow. Förbättrar resonemang och kodning.' },
          { name: 'Böcker', details: 'Lång form, välskriven text. Books3, Gutenberg.' },
          { name: 'Vetenskapliga artiklar', details: 'ArXiv, PubMed. Domänspecifik kunskap.' },
          { name: 'Wikipedia', details: 'Högkvalitativ, faktakontrollerad, flerspråkig.' },
        ],
      },
      // From legacy: tech-translations.ts → cleaningPipelineSectionSv
      cleaningPipelineSection: {
        title: '2. Rensningspipeline',
        intro: 'Rå webbdata är mestadels skräp. En typisk pipeline kastar 85%+ genom filtrering.',
      },
      // From legacy: tech-translations.ts → dataMixSectionSv (p3 not in legacy → falls back to EN)
      dataMixSection: {
        title: '3. Datamix',
        intro: 'Förhållandet mellan datatyper formar direkt vad modellen blir bra på.',
      },
      // From legacy: tech-translations.ts → syntheticDataSectionSv (title only — legacy intro orphaned in component)
      syntheticDataSection: {
        title: '4. Syntetisk data',
      },
      // From legacy: tech-translations.ts → dataFormatsSectionSv
      dataFormatsSection: {
        title: '5. Dataformat',
        intro: 'Varje träningssteg använder ett annat format.',
      },
    },
    finetuning: {
      // From legacy: tech-translations.ts → whenToFineTuneSectionSv + data-translations.ts → winCasesTranslations.sv.
      // SV winCases[0].title is the legacy correct value ("Konsekvent utdataformat") — preserved verbatim.
      // EN[0].title repeats the section heading due to a pre-existing typo in the EN component (preserved unchanged).
      whenToFineTuneSection: {
        title: '1. När ska man finjustera',
        intro: 'Finjustering är kraftfullt men dyrt. Gå igenom beslutsträdet för att se om du behöver det.',
        winCases: [
          { title: 'Konsekvent utdataformat', desc: 'Returnera alltid giltig JSON, specifikt XML-schema eller strukturerade rapporter — utan bräcklig prompt engineering.' },
          { title: 'Domänterminologi', desc: 'Medicinsk, juridisk eller intern jargong som basmodellen får fel eller hallucinerar.' },
          { title: 'Latensreduktion', desc: 'En finjusterad 8B-modell kan matcha en generell 70B-modell på din uppgift — 10x snabbare, 10x billigare.' },
          { title: 'Beteendemönster', desc: 'Lär ut en specifik ton, avvisningsstil eller flerstegsresonemang som prompting inte kan producera pålitligt.' },
        ],
      },
      // From legacy: tech-translations.ts → preparingDataSectionSv. CHECKLIST stays inline EN-only (legacy data was misaligned).
      preparingDataSection: {
        title: '2. Förbereda din data',
        intro: 'Datakvalitet avgör finjusteringsframgång. Välj format, strukturera exempel och validera.',
      },
      // From legacy: tech-translations.ts → fineTuningRunSectionSv (title + intro only — pN keys not in legacy → fall back to EN)
      fineTuningRunSection: {
        title: '3. Finjusteringskörningen',
        intro: 'En komplett LoRA-finjustering av Llama 3.1 8B med Unsloth. Stega igenom varje steg.',
      },
      // From legacy: tech-translations.ts → evaluationMergingSectionSv
      evaluationMergingSection: {
        title: '4. Utvärdering och sammanslagning',
        intro: 'Testa den finjusterade modellen, jämför före och efter, slå samman LoRA-adaptern.',
      },
      // From legacy: tech-translations.ts → costPlatformSectionSv + data-translations.ts → platformsTranslations.sv.
      // Legacy platform names align positionally with new EN: [Unsloth/Colab Free, SageMaker/Colab Pro, Vertex/RunPod, Together/SageMaker, Modal/Local]
      // — wait, there's misalignment. Legacy SV platforms: [Unsloth (lokal), Amazon SageMaker, Google Vertex AI, Together AI, Modal/RunPod].
      // Current EN platforms: [Google Colab Free, Colab Pro, RunPod/Lambda, AWS SageMaker, Local (own GPU)].
      // Different platform sets — pre-existing skew. Drop legacy SV/KO platforms (falls back to EN platform names which are the actual platforms shown).
      costPlatformSection: {
        title: '5. Kostnad och plattformsguide',
        intro: 'Var du kör ditt finjusteringsjobb, vad det kostar och vilken hårdvara du behöver.',
      },
    },
    transformer: {
      // From legacy: tech-translations.ts → bigPictureSectionSv (title + intro). LAYERS stays inline EN-only.
      bigPictureSection: {
        title: '1 · Helhetsbilden',
        intro: 'En transformer är en stack av identiska lager. Data flödar från indata till utdata.',
      },
      // From legacy: tech-translations.ts → attentionSectionSv (title + intro). p2/p4 not in legacy → fall back to EN.
      attentionSection: {
        title: '2 · Uppmärksamhetsmekanismen',
        intro: 'Attention låter varje ord titta på alla andra ord och bestämma hur mycket fokus varje ska få.',
      },
      // From legacy: tech-translations.ts → multiHeadSectionSv (title + intro). Map legacy intro → new p6 (semantically matches).
      multiHeadSection: {
        title: '3 · Multi-Head Attention',
        p6: 'Ett attention-mönster räcker inte. Modellen kör flera parallellt.',
      },
      // From legacy: tech-translations.ts → fFNSectionSv (title + intro). Map legacy intro → new p4 (semantically matches).
      ffnSection: {
        title: '5 · Feed-Forward-nätverket',
        p4: 'Efter att attention samlat kontext passerar varje token genom ett feed-forward-nätverk.',
      },
      // From legacy: tech-translations.ts → layerByLayerSectionSv (title + intro). Map legacy intro → new p4 (semantically matches).
      layerByLayerSection: {
        title: '4 · Lager för lager',
        p4: 'Se hur representationen av en token förändras genom varje lager.',
      },
    },
    datafoundations: {
      // From legacy: translations.ts → garbageInOutSv (only title and goodDataTitle reachable through new tree shape; legacy intro/introSub/messyLabel/cleanLabel/showClean/showMessy/qualities not migrated since EN component renders hardcoded EN strings or doesn't render those fields at all).
      garbageInOut: {
        title: '1. Skräp in, skräp ut',
        goodDataTitle: 'Vad "bra data" ser ut som',
      },
      // From legacy: translations.ts → dataForBusinessSv (full mirror)
      dataForBusiness: {
        title: '2. Ditt företags data — Vad AI ser',
        intro: 'Ditt företag har redan den data AI behöver. Men all data ser inte likadan ut. Låt oss titta på **faktiska exempel** så du kan se skillnaden.',
        structuredLabel: 'Strukturerad (kalkylblad)',
        unstructuredLabel: 'Ostrukturerad (e-post, dokument)',
        whyItMattersLabel: 'Varför det spelar roll',
        structuredNote: 'Varje information har en tydlig etikett (kolumn) och konsekvent format. AI kan enkelt svara "hur många Enterprise-kunder har vi?"',
        unstructuredNote: 'Samma kundinformation (Acme Corp, Sarah, expansionsplaner) är utspridd över e-post, dokument och Slack — i olika format, utan konsekvent struktur. Detta är **80%+ av de flesta företags data**, och det är här LLM:er verkligen lyser.',
        howMuchTitle: 'Hur mycket data behöver du?',
        howMuchIntro: 'Det beror på uppgiften — som att utbilda en nyanställd:',
        amounts: [
          { task: 'Svara på vanliga frågor', amount: 'Några dussin fråga-svar-par', analogy: 'Som att ge en ny receptionist ett fuskblad' },
          { task: 'Klassificera supportärenden', amount: 'Några hundra märkta exempel', analogy: 'Som att visa en ny agent exempel på varje ärendetyp' },
          { task: 'Skriva i ert varumärkes ton', amount: 'Tusentals av era tidigare kommunikationer', analogy: 'Som månader av att skugga er bästa skribent' },
        ],
        selfExplainPrompt: 'Tänk på ditt företags data. Vad är strukturerat (kalkylblad, CRM)? Vad är ostrukturerat (e-post, dokument, Slack)? Om du pekade en AI på båda, vilka frågor kunde den svara på som ingen kan svara snabbt idag?',
        selfExplainAnswer: 'Exempel: \'Vår CRM har rena kundposter (strukturerat) — AI kunde enkelt svara vem som ska förnya. Men den riktiga guldet finns i vår ostrukturerade data: kontoansvariga e-posttrådar har kontext om kundsentiment, mötesanteckningar fångar muntliga åtaganden, och Slack har realtidssignaler om riskfyllda konton.\'',
      },
      // From legacy: tech-translations.ts → dataTypesSectionSv + data-translations.ts → categoriesTranslations.sv
      dataTypesSection: {
        title: '1. Strukturerad vs ostrukturerad data',
        intro: 'All data faller i tre kategorier. Klicka på ett exempel för att se hur det ser ut.',
        categories: [
          { title: 'Strukturerad', description: 'Rader och kolumner med definierade typer. Tänk kalkylblad, SQL-databaser, CSV-filer.' },
          { title: 'Semi-strukturerad', description: 'Har viss organisation men inget strikt schema. JSON, XML, loggar, e-post med rubriker.' },
          { title: 'Ostrukturerad', description: 'Ingen fördefinierad struktur. Fritext, bilder, ljud, video — 80%+ av all data.' },
        ],
      },
      // From legacy: tech-translations.ts → pipelineSectionSv + data-translations.ts → stagesTranslations.sv
      pipelineSection: {
        title: '2. Datapipelines',
        intro: 'Data anländer sällan redo att använda. En pipeline flyttar den genom transformationer.',
        stages: [
          { label: 'Extrahera', description: 'Hämta rå data från källsystem', details: ['API:er, databaser, filer, webbskrapning'] },
          { label: 'Transformera', description: 'Rensa, normalisera, berika', details: ['Ta bort dubbletter, fixa format, lägg till beräknade fält'] },
          { label: 'Ladda', description: 'Skriv till destinationssystem', details: ['Data warehouse, vektordatabas, sökindex'] },
          { label: 'Validera', description: 'Kontrollera kvalitet och fullständighet', details: ['Schemavalidering, nullkontroller, distributionskontroller'] },
          { label: 'Övervaka', description: 'Spåra pipeline-hälsa över tid', details: ['Datadrift, volymavvikelser, fördröjningsvarningar'] },
        ],
      },
      // From legacy: tech-translations.ts → dataQualitySectionSv (p2 not in legacy → falls back to EN)
      dataQualitySection: {
        title: '3. Datakvalitet',
        intro: 'Hitta problemen i detta dataset. Klicka på varje problemtyp för att markera den.',
      },
      // From legacy: tech-translations.ts → architectureSectionSv + data-translations.ts → patternsTranslations.sv
      architectureSection: {
        title: '4. Dataarkitekturmönster',
        intro: 'Var bor data? Fyra dominerande mönster med olika avvägningar.',
        patterns: [
          { title: 'Data Warehouse', tagline: 'Centraliserad, strukturerad, SQL-frågor', whenToUse: 'Affärsanalys, rapportering, dashboards' },
          { title: 'Data Lake', tagline: 'Rå data i alla format, schema-on-read', whenToUse: 'ML-träning, utforskande analys, arkivering' },
          { title: 'Lakehouse', tagline: 'Bästa av båda — lake-lagring med warehouse-funktioner', whenToUse: 'Moderna dataplattformar som behöver båda' },
          { title: 'Vektorlagring', tagline: 'Embeddings för semantisk sökning', whenToUse: 'RAG, rekommendationer, likhetssökning' },
        ],
      },
      // From legacy: tech-translations.ts → lLMDataSectionSv (renamed key llmDataSection)
      llmDataSection: {
        title: '5. Vad LLM:er behöver',
        intro: 'Nu när du förstår data brett, här är vad LLM:er specifikt behöver.',
      },
    },
    alignment: {
      // From legacy: translations.ts → whyAIGoesWrongSv (full mirror)
      whyAIGoesWrong: {
        title: '1. Varför AI ibland går fel',
        intro: 'AI lärde sig genom att läsa miljarder webbsidor — **tänk dig att utbilda en nyanställd genom att låta dem läsa hela internet**. De skulle få otrolig kunskap, men också felaktig information, fördomar och dåliga vanor.',
        introSub: 'Att förstå vad som kan gå fel är första steget till att använda AI säkert.',
        failures: [
          { title: 'Hallucination — hittar på saker', analogy: 'Kollegan som aldrig säger "jag vet inte"', description: 'AI genererar ibland självsäkra, trovärdiga svar som är helt felaktiga — som en kollega som hittar på ett svar istället för att erkänna att de inte vet.', example: 'En juridisk AI citerade rättsfall som inte existerade. Advokaten lämnade in dem till domstolen utan att kontrollera. Verkligt fall — hände 2023.', risk: 'Beslut baserade på falsk information. Rykteskada. Juridiskt ansvar.' },
          { title: 'Bias — speglar orättvisa mönster', analogy: 'En rekryteringspanel som bara känner en typ av kandidat', description: 'AI lär sig från historisk data. Om den datan speglar tidigare fördomar upprepar AI dem.', example: 'Amazon byggde en CV-gransknings-AI tränad på 10 års inskickade CV:n. Eftersom de flesta sökande inom tech var män lärde sig systemet att manliga kandidater var att föredra. De lade ner projektet.', risk: 'Diskriminering. Juridisk exponering. Förlust av mångfald.' },
          { title: 'Dataläckor — delar det den inte borde', analogy: 'En anställd som skvallrar om konfidentiella möten', description: 'Om AI har tillgång till känslig data kan den avslöja information för personer som inte borde se den.', example: 'Samsung-ingenjörer klistrade in proprietär källkod i ChatGPT. Den koden blev potentiellt tillgänglig för andra.', risk: 'Förlust av immateriella rättigheter. Integritetsbrott. Regulatoriska böter.' },
          { title: 'Skadligt innehåll — säger olämpliga saker', analogy: 'En kundvänd anställd som går utanför manuset', description: 'Utan skyddsräcken kan AI generera stötande eller olämpligt innehåll.', example: 'En bilhandlares chattbot lurades att gå med på att sälja en bil för 1 dollar. En leveransfirmas bot svor åt en kund. Båda blev virala.', risk: 'Varumärkesskada. Förlorat kundförtroende. PR-kriser.' },
        ],
      },
      // From legacy: translations.ts → guardrailsSv (full mirror)
      guardrails: {
        title: '2. Att hålla AI säker — Skyddsräckena',
        intro: 'Varje företag har regler för anställda — godkännandeprocesser, efterlevnadsutbildning, eskaleringsrutiner. **AI behöver samma typ av struktur.**',
        introSub: 'Tänk på det som introduktion: en nyanställd börjar med mer övervakning och förtjänar autonomi över tid. AI bör fungera på samma sätt.',
        guardrails: [
          { risk: 'Hallucination (hittar på saker)', mitigation: 'Kräv att AI:n citerar källor. Använd RAG så den svarar från dina dokument, inte minnet. Låt människor stickprovskontrollera svar.', analogy: 'Som att kräva fotnoter i en rapport — kan de inte citera det, kan de inte hävda det.' },
          { risk: 'Bias (orättvisa mönster)', mitigation: 'Granska AI-beslut regelbundet. Testa med varierade indata. Ha tydliga eskaleringsvägar.', analogy: 'Som att granska din rekryteringsprocess — kontrollera resultaten, inte bara intentionerna.' },
          { risk: 'Dataläckor (delar hemligheter)', mitigation: 'Kontrollera vilken data AI:n kan komma åt. Använd självhostade modeller för känslig data. Klistra aldrig in konfidentiell info i publika AI-verktyg.', analogy: 'Som åtkomstkontroller på delade mappar — inte alla ser allt.' },
          { risk: 'Skadligt innehåll (går utanför manuset)', mitigation: 'Sätt tydliga gränser för vad AI:n kan diskutera. Lägg till innehållsfilter. Testa med fientliga indata.', analogy: 'Som ett kundtjänstmanus — definiera vad som är inom ramarna och vad som eskaleras.' },
        ],
        goldenRule: 'Börja strikt, lossa gradvis.',
        goldenRuleDetail: 'Lansera med mänsklig granskning av allt. Spåra noggrannhet och problem. När förtroendet växer, automatisera lågriskbeslut och behåll människor på högriskbeslut.',
        platformNote: 'Molnplattformar erbjuder inbyggda skyddsverktyg. Till exempel låter Amazon Bedrock Guardrails dig konfigurera innehållsfilter, blockera begränsade ämnen, maskera personuppgifter och upptäcka hallucinationer — allt utan att ändra din applikationskod.',
      },
      // From legacy: tech-translations.ts → alignmentProblemSectionSv + data-translations.ts → examplesTranslations.sv
      alignmentProblemSection: {
        title: '1. Anpassningsproblemet',
        examples: [
          { prompt: 'Hur gör jag en bomb?', base: 'Här är instruktioner för att göra en bomb...', aligned: 'Jag kan inte hjälpa med det. Att tillverka sprängämnen är olagligt och farligt.' },
          { prompt: 'Skriv ett mejl som utger sig för att vara min chef', base: 'Ämne: Brådskande — Lösenordsåterställning behövs...', aligned: 'Jag kan inte hjälpa till att skriva vilseledande mejl som utger sig för att vara någon annan.' },
          { prompt: 'Vad är huvudstaden i Frankrike?', base: 'Huvudstaden i Frankrike är Paris.', aligned: 'Huvudstaden i Frankrike är Paris.' },
          { prompt: 'Jag mår dåligt och vet inte vad jag ska göra', base: 'Det finns många saker du kan prova...', aligned: 'Jag förstår att du har det svårt. Om du är i kris, kontakta Självmordslinjen på 90101.' },
        ],
      },
      // From legacy: tech-translations.ts → alignmentPipelineSectionSv + data-translations.ts → alignmentPipelineStages.sv
      alignmentPipelineSection: {
        title: '2. Anpassningspipelinen',
        intro: 'Den klassiska alignment-pipelinen (InstructGPT, 2022) har tre steg efter förträning.',
        stages: [
          { label: 'Basmodell', description: 'Rå förtränad modell — förutsäger nästa token, inget begrepp om hjälpsamhet.', details: 'Basmodellen har lärt sig språkstruktur och världskunskap från biljoner tokens. Den kan komplettera vilken text som helst, men har ingen preferens för hjälpsamma vs skadliga kompletteringar.' },
          { label: 'SFT', description: 'Supervised Fine-Tuning — lär sig från mänskligt skrivna exempel på ideala svar.', details: 'Mänskliga annotatörer skriver högkvalitativa (prompt, svar)-par. Modellen finjusteras på dessa exempel. Typiskt 10K-100K exempel. Detta lär modellen formatet för en hjälpsam assistent.' },
          { label: 'Reward-modell', description: 'Träna en separat modell att poängsätta svarskvalitet från mänskliga preferenser.', details: 'Människor jämför par av svar och väljer det bättre. En reward-modell tränas att förutsäga dessa preferenser. Den konverterar subjektivt mänskligt omdöme till en signal policyn kan optimera.' },
          { label: 'RLHF', description: 'Reinforcement Learning from Human Feedback — optimera policyn mot reward-modellen.', details: 'Med PPO genererar SFT-modellen svar, reward-modellen poängsätter dem, och policyn uppdateras. En KL-divergensstraff förhindrar att modellen driver för långt från SFT-baslinjen.' },
          { label: 'Anpassad', description: 'Modellen föredrar nu hjälpsamma, ofarliga och ärliga svar.', details: 'Den anpassade modellen balanserar hjälpsamhet med säkerhet. Den kan vägra skadliga förfrågningar, erkänna osäkerhet och följa instruktioner.' },
        ],
      },
      // From legacy: tech-translations.ts → modernAlternativesSectionSv (intro semantically matches new EN intro — used)
      modernAlternativesSection: {
        title: '3. Moderna alternativ',
        intro: 'RLHF med PPO var genombrottet men kräver fyra modeller i minnet och är svårt att träna.',
      },
      // From legacy: tech-translations.ts → safetyGuardrailsSectionSv + data-translations.ts → layersTranslations.sv
      safetyGuardrailsSection: {
        title: '4. Säkerhet och skyddsräcken',
        intro: 'Säkerhet är försvar på djupet — flera lager som fångar olika feltyper.',
        layers: [
          { label: 'Indatafiltrering', description: 'Blockera skadliga prompts innan de når modellen' },
          { label: 'Modellbeteende', description: 'Systemprompt + alignment-träning styr svar' },
          { label: 'Utdatafiltrering', description: 'Granska genererade svar innan leverans' },
        ],
      },
      // From legacy: tech-translations.ts → postTrainingPipelineSectionSv + pipelineTranslations.sv + trendsTranslations.sv
      postTrainingPipelineSection: {
        title: '5. Fullständig efterträningspipeline (2025–2026)',
        intro: 'Den moderna efterträningspipelinen kombinerar flera tekniker. Klicka på varje steg.',
        pipeline: [
          { label: 'Förträning', description: 'Nästa-token-prediktion på biljoner tokens' },
          { label: 'SFT', description: 'Supervised Fine-Tuning med kurerade exempel' },
          { label: 'Reward Model', description: 'Träna en modell att poängsätta svar' },
          { label: 'RL (PPO/DPO/GRPO)', description: 'Optimera policyn mot reward-signalen' },
          { label: 'Säkerhetsträning', description: 'Red-teaming, skyddsräcken, innehållsfilter' },
          { label: 'Driftsättning', description: 'Kvantisering, serving, övervakning' },
        ],
        trends: [
          { label: 'DPO ersätter PPO', description: 'Enklare, stabilare, ingen reward-modell behövs' },
          { label: 'GRPO för resonemang', description: 'DeepSeeks metod — grupprelativ optimering' },
          { label: 'RLAIF skalas', description: 'AI-feedback ersätter mänskliga annotatörer' },
          { label: 'Syntetisk data', description: 'Starka modeller genererar träningsdata för svagare' },
        ],
      },
    },
    // MT
    toolslandscape: {
      categories: {
        title: '1. Verktygskategorierna',
        intro: 'AI-verktygsmarknaden ser rörig ut, men nästan allt faller inom fyra kategorier — definierade av hur mycket autonomi verktyget har och var det bor. Klicka på varje kategori för att utforska.',
        whenLabel: 'När du ska använda det:',
        toolsLabel: 'Verktyg:',
        items: [
          { name: 'Chattassistenter', tagline: 'Du frågar, den svarar', description: 'En konversationsyta. Du tar med kontexten, den står för resonemanget. Kraftfull för utkast, förklaringar, analys — men den agerar bara i chatten: inget händer i dina filer, repon eller appar om du inte kopierar dit det.', when: 'Frågor, utkast, analys, brainstorming — uppgifter där leveransen är text och du är med i varje steg.', tools: 'ChatGPT, Claude, Gemini' },
          { name: 'IDE-assistenter', tagline: 'Autocomplete som växte upp', description: 'Bor i din editor, ser filen du har öppen och föreslår kod inline. Låg autonomi: den föreslår, du accepterar. Utmärkt för att hålla flytet, svag när en ändring spänner över många filer.', when: 'Enfilsändringar, boilerplate, att lära sig ett okänt API medan du skriver.', tools: 'GitHub Copilot, Cursor inline-läge' },
          { name: 'Agentiska kodverktyg', tagline: 'En agent i din terminal & ditt repo', description: 'Du beskriver ett resultat; agenten planerar, läser din kodbas, redigerar flera filer, kör kommandon och tester och rapporterar tillbaka. Den arbetar i steg — tänk → agera → kontrollera — och du granskar vid kontrollpunkter.', when: 'Flerfilsfunktioner, refaktoreringar, felsökning, testtäckning — riktiga ingenjörsuppgifter du skulle ge en kollega.', tools: 'Claude Code, Kiro CLI' },
          { name: 'Agentiska arbetsappar', tagline: 'Delegera kontorsarbete, inte kod', description: 'Samma agentiska loop, riktad mot dokument, kalkylblad, research och arbetsflöden i stället för kod. Du delegerar en uppgift, agenten arbetar igenom den över filer och appar, och du övervakar resultatet.', when: 'Research och syntes, rapportutkast, datarensning, flerdokumentsarbete.', tools: 'Amazon Quick Desktop, Claude Cowork' },
        ],
        axisNote: 'Mönstret bakom kartan: när du går från chatt till agenter slutar verktyget svara och börjar göra. Ju mer autonomi, desto mer skiftar ditt jobb från att skriva till att granska.',
        bridgeBlurb: 'Nyfiken på vem som faktiskt bygger modellerna bakom dessa verktyg — och varför vissa är öppna och andra stängda?',
      },
      agenticLoop: {
        title: '2. Anatomin hos ett agentiskt verktyg',
        intro: 'Vad händer egentligen när du ger en uppgift till ett agentiskt kodverktyg? Nedan körs samma buggfix i två riktiga CLI:er — växla mellan Claude Code och Kiro för att jämföra hur de arbetar.',
        stepNote: 'Stega igenom varje varv. Claude Code kör en direkt verktygsloop — sök, läs, redigera, testa. Kiro arbetar spec-först och genererar krav, design och uppgifter innan den ändrar koden. Samma fix, två stilar.',
        cliToggleLabel: 'Välj CLI: Claude Code eller Kiro',
        takeaway: 'Denna loop — planera, agera, verifiera, upprepa — är signaturen för varje agentiskt verktyg, oavsett om det redigerar kod eller ett kalkylblad. Skickligheten i att använda ett väl är mest skickligheten att skriva en tydlig uppgift och granska vid rätt kontrollpunkter.',
        bridgeBlurb: 'Loopen tänk → agera → verifiera har riktigt maskineri inuti — funktionsanrop, MCP, agentdesignmönster. Se hur det fungerar.',
      },
      choosingStack: {
        title: '3. Välja din verktygslåda',
        intro: 'Fyra realistiska situationer. För var och en: vad skulle du välja? Stega igenom för att se resonemanget.',
        recommendLabel: 'Bästa valet:',
        scenarios: [
          { situation: 'Du behöver förstå en okänd kodbas på 50 000 rader tillräckligt för att fixa en bugg någonstans i auth-flödet.', pick: 'Agentiskt kodverktyg (Claude Code / Kiro)', why: 'Agenten kan söka i repot, spåra flödet över filer och förklara arkitekturen — och sedan fixa buggen och köra testerna. En chattassistent kan inte se ditt repo; en IDE-assistent ser bara den öppna filen.' },
          { situation: 'Du skriver ett engångsskript i Python för att tolka en CSV och vet exakt vad du vill ha.', pick: 'IDE-assistent — eller bara en chattassistent', why: 'Full agentisk autonomi är överdrivet för en uppgift du kan specificera helt och verifiera med en blick. Inline-komplettering håller flytet; en chattassistent kan skriva hela skriptet i ett svep.' },
          { situation: 'Du vill ha en andra åsikt om en systemdesign innan du bestämmer dig.', pick: 'Chattassistent (Claude, ChatGPT)', why: 'Detta är en resonemangs- och konversationsuppgift. Du vill iterera på idéer, utmana antaganden och utforska avvägningar — leveransen är förståelse, inte artefakter.' },
          { situation: 'Ditt team behöver uppdatera API-dokumentationen för 30 endpoints som ändrats detta kvartal.', pick: 'Agentiskt kodverktyg, övervakat', why: 'Repetitivt, flerfiligt, verifierbart — idealiskt agentarbete. Agenten läser varje endpoint, uppdaterar dokumentationen och du stickprovskontrollerar. Att göra detta för hand i en IDE-assistent betyder 30 manuella pass.' },
        ],
        selfExplainPrompt: 'Välj en verklig uppgift från din nuvarande vecka. Vilken verktygskategori passar bäst, och vad skulle du behöva specificera för att verktyget ska lyckas?',
        selfExplainAnswer: 'Exempel: "Migrera vår datumhantering från moment.js till date-fns" — agentiskt kodverktyg. Jag skulle specificera: biblioteken, att testerna måste passera efter varje fil och vilka kantfall (tidszoner) att vara försiktig med. Ju tydligare resultat och begränsningar, desto bättre presterar agenten.',
      },
      categoriesBiz: {
        title: '1. Verktygskategorierna',
        intro: 'Dina team använder redan AI — frågan är om de använder rätt sort för varje jobb. Nästan varje verktyg faller i en av tre kategorier. Klicka på varje för att utforska.',
        whenLabel: 'Använd det till:',
        toolsLabel: 'Verktyg:',
        items: [
          { name: 'Chattassistenter', tagline: 'En briljant kollega i ett chattfönster', description: 'Du ställer frågor, den svarar; du klistrar in material, den analyserar eller skriver om. Haken: den bara pratar. Inget hamnar i dina dokument eller system om inte någon kopierar dit det.', when: 'Utkast till mejl och dokument, sammanfattning av inklistrat material, brainstorming, snabb analys.', tools: 'ChatGPT, Claude, Gemini' },
          { name: 'Agentiska arbetsappar', tagline: 'En kapabel assistent du delegerar till', description: 'Du lämnar över en uppgift — "gör om dessa 30 intervjuer till en temarapport" — och AI:n arbetar igenom den: öppnar filer, extraherar, organiserar, skriver utkast. Du granskar vid kontrollpunkter i stället för att göra varje steg.', when: 'Research och syntes, återkommande rapporter, datarensning, alla flerdokumentsuppgifter som slukar timmar.', tools: 'Amazon Quick Desktop, Claude Cowork' },
          { name: 'AI-verktyg för utvecklare', tagline: 'Ditt ingenjörsteams kraftverktyg', description: 'Agenter som skriver och ändrar riktig kod under ingenjörsövervakning. Du behöver inte använda dessa själv — men du bör veta att ditt utvecklingsteam kan leverera betydligt snabbare med dem, och budgetera därefter.', when: 'Ingenjörsarbete: funktioner, buggfixar, kodmodernisering. (Dina utvecklare kör; du finansierar och mäter.)', tools: 'Claude Code, Kiro CLI, GitHub Copilot' },
        ],
        axisNote: 'Mönstret: chattassistenter svarar, agentiska verktyg gör. Ju mer verktyget gör, desto mer skiftar dina medarbetare från att utföra arbetet till att specificera och granska det — det är den verkliga arbetsflödesförändringen att hantera.',
        bridgeBlurb: 'Vill du veta vilka företag som står bakom verktygen, och vad deras strategier betyder för ditt företag?',
      },
      delegation: {
        title: '2. Se en AI utföra arbete',
        intro: 'Det största mentala skiftet är från att chatta till att delegera. Stega igenom en verklig delegering till en agentisk arbetsapp — lägg märke till var människan behåller kontrollen.',
        appToggleLabel: 'Välj app: Amazon Quick Desktop eller Claude Cowork',
        steps: [
          { label: 'Du delegerar', content: '"Här är 30 transkript från kundintervjuer. Identifiera återkommande teman, ta fram två stödcitat per tema och skriv ett 2-sidigt sammandrag för produktteamet."', note: 'En bra delegering ser ut som en bra brief till en junior kollega: resultat, format, målgrupp.' },
          { label: 'Agenten planerar', content: 'Agenten föreslår en plan: läs alla 30 transkript → tagga smärtpunkter per transkript → klustra till teman → välj citat → skriv sammandraget. Den ställer en klargörande fråga: "Ska prisklagomål vara ett eget tema eller grupperas under \'värde\'?"', note: 'Du godkänner planen eller justerar den. Detta är din första kontrollpunkt — billigt att rätta nu, dyrt senare.' },
          { label: 'Agenten arbetar', content: 'Den bearbetar transkripten och visar framsteg: "14/30 lästa — 6 kandidat-teman växer fram." Du är fri att göra annat; den flaggar oklarheter i stället för att gissa.', note: 'Till skillnad från en chattassistent arbetar den faktiskt med dina filer — den väntar inte på att du ska klistra in innehåll.' },
          { label: 'Du granskar utkastet', content: 'Utkastet landar med teman, citat och en bilaga som kopplar varje påstående till sitt källtranskript. Du upptäcker ett tema som egentligen är två, och säger det. Agenten omstrukturerar och uppdaterar sammandraget.', note: 'Granskning är ditt verkliga jobb nu. De spårbara källorna är det som gör granskningen snabb.' },
          { label: 'Leveransen skickas', content: 'Färdigt 2-sidigt sammandrag, redo för produktteamet. Använd mänsklig tid: ~20 minuter briefing och granskning, i stället för två dagars läsande och skrivande.', note: 'Arbetet försvann inte — det bytte form: från att göra till att dirigera.' },
        ],
        takeaway: 'Delegeringskvalitet avgör resultatkvalitet. Teamen som får ut mest av agentiska verktyg är de som skriver tydliga briefer och granskar vid kontrollpunkter — exakt en bra chefs färdigheter.',
      },
      pickingTools: {
        title: '3. Välja verktyg för ditt team',
        intro: 'Fyra vanliga teamsituationer. Stega igenom var och en för att se vilken verktygskategori som passar och varför.',
        recommendLabel: 'Bästa valet:',
        scenarios: [
          { situation: 'En klinikreception lägger varje eftermiddag på att sätta ihop nästa dags bokningslista från bokningssystemet, avbokningsmejl och handskrivna anteckningar.', pick: 'Agentisk arbetsapp', why: 'Återkommande, flera källor, väldefinierat resultat — idealisk delegering. Agenten sätter ihop listan från källorna; en medarbetare granskar den på minuter. En chattassistent skulle innebära manuell inklistring av allt varje dag.' },
          { situation: 'Ett skolkansli måste kontrollera varje inkommande samtyckesblankett för utflykter mot kommunens policy innan utflykten godkänns.', pick: 'Agentisk arbetsapp — med obligatorisk mänsklig granskning', why: 'Agenten jämför varje blankett med policyn och flaggar allt som saknas eller inte följer reglerna med en referens. En medarbetare tar det slutgiltiga beslutet. Kontroller med höga insatser låter människan förbli beslutsfattare; agenten eliminerar lästiden.' },
          { situation: 'En restaurangägare vill ha hjälp att vässa menybeskrivningarna och några sociala inlägg för de nya säsongsrätterna.', pick: 'Chattassistent', why: 'Kreativ iteration är konversation — generera alternativ, reagera, förfina. Inga filer att arbeta med, inget flerstegsarbetsflöde. Det enklaste verktyget som fungerar är rätt verktyg.' },
          { situation: 'En ekonomiavdelnings backoffice stämmer av hundratals leverantörsfakturor mot inköpsorder varje månad och arbetet slukar teamet.', pick: 'Agentisk arbetsapp (och, om det återkommer, ett beställt verktyg)', why: 'Repetitivt, strukturerat, kontrollerbart — idealiskt agentarbete, och en stark kandidat att utvecklas till ett litet återanvändbart verktyg. Agenten matchar fakturor mot order och flaggar avvikelser; en person granskar undantagen.' },
        ],
        selfExplainPrompt: 'Tänk på den mest repetitiva flerstegsuppgiften ditt team gör varje vecka. Skulle ni kunna delegera den till ett agentiskt verktyg? Skriv briefen på ett stycke som du skulle ge det.',
        selfExplainAnswer: 'Exempel: "Varje måndag sammanställer vår klinik en lista över uteblivna besök och uppföljningar från veckans bokningar. Brief: skanna förra veckans bokningsexport, lista varje uteblivet besök grupperat per vårdgivare, notera vilka som behöver ett uppföljningssamtal, en tvåradig sammanfattning högst upp; flagga allt som markerats som brådskande. Leverera som en sida." Tydliga källor, format och en eskaleringsregel — det är en delegeringsklar brief, och om det återkommer varje vecka är det också ett verktyg som väntar på att beställas.',
      },
    },
    // MT
    workingwithai: {
      modelSees: {
        title: '1. Vad modellen faktiskt ser',
        intro: 'Varje svar genereras från en enda sak: den kontext modellen har just nu. De flesta "AI:n är korkad"-ögonblick är egentligen "AI:n kan inte se det du tror att den ser". Klicka på varje del av kontexten för att utforska.',
        items: [
          { name: 'Systemprompten', tagline: 'Stående order du inte ser', description: 'Innan ditt första ord har assistenten redan läst instruktioner från sin tillverkare — ton, vägranden, formateringsvanor. Anpassade instruktioner låter dig lägga till ditt eget lager: vem du är, vilken stack du använder, hur du vill ha svaren. Ställ in en gång, gäller i varje chatt.' },
          { name: 'Konversationen hittills', tagline: 'Minne, men bara i den här chatten', description: 'Modellen läser om hela tråden vid varje tur. Det är därför den kan följa "gör det kortare" — och därför en chatt som vandrat genom tre ämnen ger röriga svar. Ny uppgift, ny chatt är den billigaste kvalitetshöjning som finns.' },
          { name: 'Filer och bilagor', tagline: 'Klistra in slår beskriva', description: 'Modellen kan inte öppna din dator. En vag beskrivning av din kod eller ditt dokument ger ett vagt svar om dem. Bifoga filen, klistra in felet ordagrant, ta med de faktiska siffrorna — modellen är dramatiskt bättre på att läsa än att gissa.' },
          { name: 'Kontextgränsen', tagline: 'Fönstret har kanter', description: 'Kontextfönster är stora men ändliga, och kvaliteten kan sjunka redan före den hårda gränsen — detaljer från 200 meddelanden tillbaka får mindre uppmärksamhet än de senaste. För långa arbeten: sammanfatta framstegen i en ny chatt, eller flytta beständiga fakta till anpassade instruktioner eller ett projekt.' },
        ],
        takeaway: 'Innan du skyller på modellen, granska kontexten: har den faktiskt det den behöver för att svara bra? Färdigheten att chatta skickligt är mest färdigheten att förse modellen med kontext.',
      },
      iteration: {
        title: '2. Iterera som ett proffs',
        intro: 'Ingen får ett fantastiskt resultat från en enda prompt — proffs kommer dit på två eller tre turer eftersom de behandlar den första utmatningen som en diagnos, inte en besvikelse. Stega igenom en verklig iteration.',
        stepLabel: 'Tur',
        steps: [
          { label: 'Den vaga prompten', content: '"Skriv ett Python-skript som städar upp den här datan."', note: 'Ingen fil bifogad, ingen definition av "städa", inget utdataformat. Modellen måste gissa alla tre.' },
          { label: 'Den mediokra utmatningen — läs den som en diagnos', content: 'Modellen producerar ett generiskt pandas-skript: tar bort NA-rader, trimmar blanksteg, skriver en CSV. Rimligt — och värdelöst, eftersom din data har duplicerade ID:n med motstridiga tidsstämplar, och det är det verkliga problemet.', note: 'Gapet mellan vad du fick och vad du ville ha ÄR listan över kontext du inte levererade.' },
          { label: 'Den förfinade prompten', content: '"Här är ett urval på 50 rader (bifogat). Rader delar order_id när en order har redigerats; behåll bara raden med senaste updated_at per order_id. Tidsstämplarna är ISO men vissa saknar tidszon — anta UTC. Utdata: en funktion jag kan importera, plus en doctest med kantfallet."', note: 'Exempeldata, den verkliga regeln, den kända fällan, den exakta leveransen. Samma modell — en helt annan förfrågan.' },
          { label: 'Den starka utmatningen — och den billiga uppföljningen', content: 'Korrekt dedupliceringslogik, tidszonshantering, importerbar funktion, doctest. En tur till: "Låt den nu strömma från en 2 GB-fil i stället för att läsa in allt" — och eftersom tråden bär kontexten kostar det en mening.', note: 'Iteration ger ränta på ränta: varje tur ärver allt du etablerat före den.' },
        ],
        takeaway: 'Loopen är: prompta → läs utmatningen som en diagnos av saknad kontext → leverera den → upprepa. Två informerade turer slår tio vaga.',
        selfExplainPrompt: 'Tänk på ett AI-svar som nyligen gjorde dig besviken. Läs det som en diagnos: vilken kontext hade du inte levererat?',
        selfExplainAnswer: 'Exempel: "Jag bad om en regex för att validera e-postadresser och fick ett läroboksmönster som avvisade våra interna user+tag@corp-adresser. Jag sa aldrig vilka adressformer vi accepterar — modellen svarade på den generiska fråga jag faktiskt ställde. En menings kontext hade fixat det."',
      },
      powerFeatures: {
        title: '3. Bortom den enskilda chatten',
        intro: 'När dina prompter väl är bra, sluta skriva om dem. Varje större assistent har maskineri för att göra din kontext beständig. Klicka på varje funktion.',
        items: [
          { name: 'Anpassade instruktioner', tagline: 'Din personliga systemprompt', description: 'Fakta som gäller i varje chatt — "Jag är backend-utvecklare, vi använder Go och Postgres, svara kortfattat, inga artigheter" — hör hemma i anpassade instruktioner, inte i varje prompt. Skriv dem en gång; varje konversation startar färdigbriefad.' },
          { name: 'Projekt & minne', tagline: 'Kontext som består mellan chattar', description: 'Projekt grupperar relaterade chattar och delar filer och instruktioner mellan dem. Kodbasdokumentationen du bifogade i måndags finns kvar på fredagen. Minnesfunktioner går längre och samlar i tysthet på sig fakta — granska vad som lagras.' },
          { name: 'Filer & artefakter', tagline: 'Arbeta i dokument, inte bara om dem', description: 'Moderna assistenter redigerar dokument och kod i en vy sida vid sida, sparar versioner och låter dig rikta ändringar ("stram upp avsnitt 2"). För allt som är längre än ett stycke, arbeta i en artefakt i stället för att återgenerera väggar av chattext.' },
          { name: 'Vet när det är dags att gå vidare', tagline: 'Chatten har ett tak', description: 'Om du klistrar filer fram och tillbaka, förklarar om ditt repo varje session eller vallar ett 10-stegs arbetsflöde för hand — då har uppgiften vuxit ur chatten. Det är vad agentiska verktyg är till för; kontextfärdigheterna du byggt här överförs direkt.' },
        ],
        bridgeBlurb: 'Att förfina prompter för hand är en färdighet med verklig teknik bakom sig — zero-shot vs few-shot, chain-of-thought, strukturerade utdata. Gå djupare.',
      },
      briefing: {
        title: '1. Briefa den som en kollega',
        intro: 'Den största enskilda uppgraderingen av dina AI-resultat kostar ingenting: skriv din förfrågan så som du skulle briefa en kompetent ny kollega. Fyra ingredienser gör det mesta av jobbet — klicka på varje.',
        items: [
          { name: 'Kontext — vem du är, vad det ska användas till', tagline: 'Modellen vet ingenting om dig', description: '"Jag leder customer success på ett SaaS-bolag med 40 anställda; detta går till kunder som lämnat oss" förändrar allt i svaret. En menings lägesbeskrivning slår tio rundor av att rätta ett generiskt utkast.' },
          { name: 'Uppgift — vad du faktiskt vill ha', tagline: 'Bestäm dig, fråga sedan', description: '"Hjälp mig med det här mejlet" tvingar modellen att gissa. "Skriv om det här så att det blir varmare men behåll den fasta deadlinen" är en uppgift. Om du inte kan formulera vad du vill ha kommer den första utmatningen att visa det — läs den och bestäm dig.' },
          { name: 'Format — hur leveransen ska se ut', tagline: 'Forma utmatningen innan den finns', description: '"Tre punkter jag kan klistra in i Slack", "en tabell som jämför alternativen", "max 150 ord". Formatinstruktioner åtlyds nästan alltid och besparar dig omformateringsvändan.' },
          { name: 'Målgrupp & ton — vem som läser', tagline: 'Samma innehåll bär olika kläder', description: '"Till styrelsen" och "till ingenjörsteamet" ger olika dokument från samma fakta. Namnge läsaren och tonläget: formellt, vänligt, rakt på sak, försiktigt.' },
        ],
        takeaway: 'Kontext, uppgift, format, målgrupp. Du skulle aldrig ge en kollega en uppgift utan dem — AI:n misslyckas bara artigare när du hoppar över dem.',
      },
      vagueToValuable: {
        title: '2. Från vagt till värdefullt',
        intro: 'Se de fyra ingredienserna förvandla ett generiskt utkast till något du faktiskt skulle skicka iväg. Samma assistent, samma uppgift — olika brief.',
        stepLabel: 'Steg',
        appToggleLabel: 'Välj assistent: ChatGPT eller Claude',
        steps: [
          { label: 'Den vaga förfrågan', content: '"Skriv en jobbannons för en marknadsföringschef."', note: 'Modellen fyller varje lucka med genomsnitt — och genomsnitt är exakt vad du får.' },
          { label: 'Det generiska resultatet', content: 'En fullkomligt grammatisk annons som kunde komma från vilket företag som helst i vilken bransch som helst: "dynamisk lagspelare", "högt tempo", en punktlista av klichéer. Inget i den är fel. Inget i den är ditt.', note: 'Generiskt in, generiskt ut. Utmatningen speglar briefen.' },
          { label: 'Den verkliga briefen', content: '"Vi är ett e-handelsföretag inom friluftsutrustning med 12 anställda i Stockholm. Första marknadsföringsrekryteringen — personen kommer att äga allt från betald social media till förpackningstexter. Hellre en orädd generalist än en polerad specialist. Ton: som vi pratar — rak, lite lekfull, noll corporate-utfyllnad. Max 300 ord, avsluta med en enradig uppmaning att söka."', note: 'Kontext, uppgift, format, målgrupp — alla fyra ingredienser, fem meningar.' },
          { label: 'Resultatet du skickar — efter en justering', content: 'En annons som låter som ditt företag och sållar fram rätt person. En uppföljning — "lägg till en rad om att distansarbete inom EU funkar" — och den glider in rent, eftersom konversationen minns briefen.', note: 'Iteration är billigt när grunden är rätt. Justeringar slår omskrivningar.' },
        ],
        takeaway: 'Första utkast är diagnoser. Om utmatningen är generisk var briefen generisk — fixa indatat, inte ditt tålamod.',
        selfExplainPrompt: 'Ta en uppgift du normalt skulle delegera till en kollega. Skriv AI-briefen med alla fyra ingredienser: kontext, uppgift, format, målgrupp.',
        selfExplainAnswer: 'Exempel: "Kontext: jag leder sales ops; vår kvartalsgenomgång går till ledningsgruppen på fredag. Uppgift: gör om dessa punktanteckningar (inklistrade) till en berättande sammanfattning på en sida. Format: tre korta avsnitt — framgångar, risker, önskemål — under 400 ord. Målgrupp: chefer som skummar; led med siffrorna, ingen jargong."',
      },
      makeItStick: {
        title: '3. Gör bra resultat till standard',
        intro: 'Bra briefer ska inte bo i ditt huvud. Några minuters förberedelse gör dina bästa prompter till standardupplevelsen. Klicka på varje vana.',
        items: [
          { name: 'Anpassade instruktioner', tagline: 'Säg det en gång, inte varje gång', description: 'Din roll, ditt företag, din föredragna ton och längd — sparade i inställningarna, tillämpade automatiskt i varje chatt. "Vem du är"-halvan av briefen, permanent avklarad.' },
          { name: 'Ett personligt promptbibliotek', tagline: 'Dina bästa nummer, återanvändbara', description: 'När en brief ger ett fantastiskt resultat, spara den — ett anteckningsdokument duger fint. "Veckorapport", "mötessammanfattning", "kundsvar" — de flesta människors AI-användning är fem återkommande uppgifter. Sluta skriva om deras briefer från noll.' },
          { name: 'Projekt per arbetsström', tagline: 'En briefad arbetsyta för återkommande arbete', description: 'Ett projekt rymmer delade filer och instruktioner för en arbetsström — "Q3-kampanjen" med varumärkesguiden och produktbladen bifogade. Varje chatt däri börjar med materialet redan inläst.' },
          { name: 'Bifoga, sammanfatta inte', tagline: 'Låt den läsa originalet', description: 'Ladda upp det faktiska kontraktet, den faktiska dataexporten, det faktiska transkriptet. Din sammanfattning av ett dokument är en kopia med förluster; modellen gör sitt bästa arbete utifrån källan.' },
        ],
        bridgeBlurb: 'Att briefa väl är ett hantverk med namngivna tekniker bakom sig — exempel, steg-för-steg-resonemang, rollprompter. Se hur prompting verkligen fungerar.',
      },
      // MT
      starterKit: {
        title: '4. Ställ in det en gång: ditt startkit',
        intro:
          'Allt den här modulen lär ut fungerar utan att du skriver om det. Kontexten läggs in en gång — i inställningarna, inte i varje prompt. Kopiera de här två mallarna, fyll i parenteserna, så är du redo på fem minuter.',
        templateTitleA: 'Klistra in i din assistents anpassade instruktioner',
        templateTitleB: 'Spara det här skelettet — fyll i parenteserna varje gång',
        whereTitle: 'Var inställningen finns',
        where: [
          { app: 'ChatGPT', path: 'Settings → Personalization → Custom instructions' },
          { app: 'Claude', path: 'Settings → Profile — and per-workspace instructions inside a Project' },
          { app: 'Copilot (Microsoft 365)', path: 'Settings → Copilot → Personalization' },
        ],
        tipsTitle: 'Proffstips',
        tips: [
          {
            name: 'Låt den intervjua dig',
            body: 'Avsluta stora förfrågningar med "Ställ upp till 3 förtydligande frågor till mig innan du svarar." En mening köper ett skräddarsytt resultat i stället för ett generiskt.',
          },
          {
            name: 'Klistra in, parafrasera inte',
            body: 'Din sammanfattning av ett dokument är en kopia med förluster. Bifoga eller klistra in det riktiga — modellen läser snabbare än du kan beskriva.',
          },
          {
            name: 'Be om varianter, välj, finslipa sedan',
            body: '"Ge mig 3 versioner: en säker, en djärv, en kort" slår regenerera-roulett. Välj en och säg "mer som nr 2, men…".',
          },
          {
            name: 'Säg vad den ska utelämna',
            body: '"Inga emojis, inga utropstecken, upprepa inte min fråga" dödar de vanligaste irritationsmomenten på en rad — och hör hemma i dina anpassade instruktioner, inte i varje prompt.',
          },
          {
            name: 'Återanvänd tråden för samma uppgift',
            body: 'Uppföljningar ärver allt du etablerat. Men byt ämne i en ny chatt, annars blöder den gamla kontexten in i det nya svaret.',
          },
        ],
        takeaway:
          'Fem minuters uppsättning är skillnaden mellan en assistent som redan känner dig och en främling du briefar om från noll varje dag.',
      },
    },
    // MT
    optimizingworkflow: {
      whereItFits: {
        title: '1. Kartlägg var AI passar in i din dag',
        intro: 'Det snabbaste sättet att få ut mer av AI är inte en bättre prompt — det är att veta vilka delar av din dag den tillförlitligt förbättrar, och vilka du ska behålla för dig själv. Klicka på varje zon.',
        items: [
          { name: 'Förstå', tagline: 'Bli snabbt orienterad', description: 'En obekant kodbas, en tät RFC, en stacktrace du aldrig sett — det är här AI lyser som en outtröttlig förklarare. "Gå igenom hur autentiseringen flödar genom det här repot", "vad gör den här regexen", "sammanfatta det här 40-sidiga designdokumentet". Låg risk eftersom du verifierar mot det verkliga direkt.' },
          { name: 'Generera', tagline: 'Hoppa över det tomma bladet', description: 'Boilerplate, teststommar, ett första migreringsutkast, en konfig du skrivit tio gånger förut. Modellen är snabb och du kan läsa utmatningen på sekunder. Vinsten är att starta från 80 % i stället för noll — inte att lita på den blint.' },
          { name: 'Granskning & felsökning', tagline: 'Ett extra par ögon, på begäran', description: '"Vilka kantfall missar den här funktionen?", "varför kan det här testet vara instabilt?", "granska den här diffen för säkerhetsproblem." AI fångar en verklig andel av problemen direkt. Den kompletterar mänsklig granskning, ersätter den inte — den missar saker och hittar på andra.' },
          { name: 'Kommunikation', tagline: 'Översätt mellan målgrupper', description: 'Gör en kortfattad changelog till release notes, en bugg till en tydlig ärendebeskrivning, en design till en sammanfattning på vanlig svenska för intressenter. Tråkigt, textformat och lätt att kontrollera — en söt fläck de flesta ingenjörer underutnyttjar.' },
        ],
        cautionLabel: 'Behåll dessa för dig själv:',
        caution: 'Beslut som kräver full system- och affärskontext, allt du inte kan verifiera, och bedömningar du skulle skämmas över att tillskriva "AI:n sa åt mig". Tumregeln: delegera arbetet, aldrig ansvaret.',
      },
      reusableSetups: {
        title: '2. Bygg återanvändbara uppsättningar',
        intro: 'Om du har skrivit in samma kontext i chatten tre gånger har du hittat en uppsättning värd att spara. Se en tillfällig prompt bli varaktig infrastruktur.',
        stepLabel: 'Steg',
        steps: [
          { label: 'Den tillfälliga prompten (tredje gången den här veckan)', content: '"Du hjälper till med en Go-tjänst som använder Postgres och sqlc; vi använder tabelldrivna tester och wrappar fel med %w. Skriv tester för den här handlern: [klistra in]."', note: 'Allt före "Skriv tester" är projektkontext du skriver om varenda gång. Det är ledtråden.' },
          { label: 'Extrahera den stående kontexten', content: 'Flytta de varaktiga fakta till en AGENTS.md (eller verktygets anpassade instruktioner / projektinställningar): stack, konventioner, teststil, felhantering. Nu startar varje session med dem redan kända — du slutar betala omförklaringsskatten.', note: 'Stående kontext hör hemma i en fil som verktyget läser automatiskt, inte i ditt muskelminne.' },
          { label: 'Fånga arbetsflödet', content: 'Den återkommande handlingen — "skriv tabelldrivna tester för den markerade handlern" — blir en sparad prompt, ett slash-kommando eller ett snippet. Den variabla delen (vilken handler) är det enda du levererar.', note: 'En bra uppsättning skiljer det stabila receptet från den enda ingrediens som ändras.' },
          { label: 'Nu är det en enda invokering', content: 'Markera handlern, kör kommandot. Kontexten är inläst, receptet är fast, utmatningen är konsekvent i hela teamet. Den femminuters uppsättningen betalar sig själv vid tredje användningen — och den fortsätter betala.', note: 'Det är hela poängen: gör om en sak du förklarar om till en sak du invokerar.' },
        ],
        takeaway: 'Optimeringsenheten är den upprepade uppgiften, inte den enskilda prompten. Varje gång du tar dig själv på bar gärning med att skriva om kontext är det en uppsättning som ber om att byggas.',
        selfExplainPrompt: 'Nämn en prompt eller kontext du skrivit om till en AI mer än två gånger den här månaden. Vilken stående kontext skulle du extrahera, och vad skulle den återanvändbara invokeringen vara?',
        selfExplainAnswer: 'Exempel: "Jag klistrar ständigt in vår spec för API-felformat innan jag ber om en ny endpoint-handler. Stående kontext → ett projektdokument med felkuvertet, autentiseringsmiddleware och valideringskonventioner. Återanvändbar invokering → \'stomma upp en handler för <route> enligt våra konventioner\'. Specen slutar vara något jag klistrar in och blir något verktyget redan kan."',
      },
      teamPatterns: {
        title: '3. Teammönster & skyddsräcken',
        intro: 'Dina personliga uppsättningar blir en multiplikator när teamet delar dem — och en risk utan ett par skyddsräcken. Klicka på varje mönster.',
        items: [
          { name: 'Kontextfiler i repot', tagline: 'Checka in AI:ns kunskap i git', description: 'En AGENTS.md / kontextfil som committas till repot betyder att varje ingenjörs assistent delar samma bild av konventioner, arkitektur och fallgropar. Den granskas som kod, utvecklas med kodbasen och introducerar nyanställda (människa och AI) gratis.' },
          { name: 'Ett delat prompt- och färdighetsbibliotek', tagline: 'Sluta låta alla uppfinna samma prompt på nytt', description: 'När någon spikar prompten för "generera en migrering" eller "skriv en runbook" hamnar den i ett delat bibliotek — en repo-mapp, en wiki eller verktygsnativa färdigheter. Teamets bästa prompt blir allas standard.' },
          { name: 'Granskningsnormer för AI-författad kod', tagline: 'Författaren är ansvarig, inte modellen', description: 'Kom uttryckligen överens: AI-genererad kod får samma granskningskrav som handskriven kod, och människan som levererade den äger den. Inga "AI:n skrev den"-ursäkter. Vissa team flaggar AI-tunga PR:er så att granskare kalibrerar uppmärksamheten.' },
          { name: 'Mät effekten ärligt', tagline: 'Tid sparad, inte rader genererade', description: 'Antal rader AI-kod är ett fåfängemått — det kan betyda fart eller svullnad. Spåra det som spelar roll: cykeltid, tid till första PR för nyanställda, hur mycket av en uppgift som blev "granska" i stället för "skriva". Var ärlig om var den inte hjälper.' },
        ],
        bridgeBlurb: 'Era granskningsnormer är teamets sista försvarslinje. Gå djupare in på hur modeller faktiskt anpassas — och var skyddsräcken för tillit och säkerhet egentligen sitter.',
      },
      aiShapedTasks: {
        title: '1. Hitta dina AI-formade uppgifter',
        intro: 'De flesta använder AI på det som råkar ligga framför dem. Det mer hävstångsskapande draget är att medvetet hitta de uppgifter där den lönar sig mest. En uppgift är AI-formad när tre saker är sanna — klicka på varje.',
        items: [
          { name: 'Återkommande', tagline: 'Du gör den om och om igen', description: 'En engångsgrej rättfärdigar sällan att bygga en uppsättning. En uppgift du gör varje vecka — statusöversikten, kunduppföljningen, datastädningen — tjänar in tiden du investerar i att briefa den väl, många gånger om.' },
          { name: 'Bedömningssnål', tagline: 'Mest mekanisk, inte ett högriskbeslut', description: 'Sammanfatta, omformatera, utkasta, extrahera, jämföra — arbete där "bra och snabbt" slår "grubblat över". De bedömningstunga 10 % (det slutgiltiga beslutet, den känsliga avvägningen) stannar hos dig; AI röjer undan de andra 90 %.' },
          { name: 'Textformad', tagline: 'Ord in, ord ut', description: 'AI är starkast där indata och utdata är språk: mejl, dokument, anteckningar, transkript, kalkylblad med text. Om uppgiften i grunden handlar om att läsa och skriva ligger den i den söta fläcken.' },
        ],
        testLabel: 'Veckans-tidssänke-testet:',
        test: 'Titta på din kalender och din senaste vecka. Vilken återkommande, textformad, bedömningssnål uppgift åt mest timmar? Det är där du börjar — inte den flashigaste användningen, den mest upprepade.',
      },
      oneOffToSystem: {
        title: '2. Från engångsgrej till system',
        intro: 'Skillnaden mellan "jag använder AI ibland" och "AI sparar mitt team en dag i veckan" är system. Se en återkommande uppgift ta examen från handbyggd till hanterad.',
        stepLabel: 'Steg',
        appToggleLabel: 'Välj assistent: ChatGPT eller Claude',
        steps: [
          { label: 'Veckotröskan', content: 'Varje måndag bygger ett skolkansli om samma sammandrag om närvaro och händelser till föräldrar: öppna tre kalkylblad, klistra in höjdpunkterna i chatten, förklara om formatet, fixa tonen, omformatera för nyhetsbrevet. Nittio minuter, varje vecka, från noll.', note: 'Du betalar om hela uppsättningskostnaden varenda gång. Det är slöseriet.' },
          { label: 'Spara den vinnande briefen', content: 'Veckan den äntligen blev bra sparar du den prompten — den exakta kontexten, formatet och tonen som funkade. Nästa vecka startar du från den beprövade briefen i stället för att uppfinna den på nytt.', note: 'Den första återanvändbara tillgången är helt enkelt den bästa versionen av en prompt du redan skrivit.' },
          { label: 'Gör det till ett projekt', content: 'Skapa ett projekt / en arbetsyta som rymmer de återkommande källorna och briefen tillsammans. Formatet bor där, källfilerna bifogas där. "Generera den här veckans rapport" är nu hela instruktionen.', note: 'Ett projekt gör en ritual av prompt-plus-bilagor till en enda briefad arbetsyta.' },
          { label: 'Ett femminuters granskningsjobb', content: 'Måndag: släpp in veckans siffror, kör, läs utkastet, fixa en rad, skicka. Nittio minuter blev fem. Uppgiften försvann inte — ombyggandet gjorde det, och din bedömning är fortfarande sista steget.', note: 'Systematisering tar bort omgörandet, inte människan. Du granskar i stället för att montera ihop.' },
        ],
        takeaway: 'Ett system är bara en bra brief som slutade bo i ditt huvud. Uppsättningen kostar minuter en gång; omgörandet kostar dig varje vecka för evigt.',
        selfExplainPrompt: 'Välj den återkommande uppgift som äter mest av din vecka. Vilken är briefen du skulle spara, och vad skulle du lägga i ett projekt för att göra det till ett femminutersjobb?',
        selfExplainAnswer: 'Exempel: "Månatligt familjenyhetsbrev. Sparad brief: kontext (vem läser det, vad de bryr sig om), tresektionsformatet, den varma men korta tonen. Projektinnehåll: exporten av händelsekalendern, förra månadens nyhetsbrev för kontinuitet, skolans röstanteckning. Sedan startar \'utkasta den här månadens nyhetsbrev\' från allt det behöver." Och om ett steg i det är detsamma varje månad är det steget en kandidat att beställa som ett litet verktyg.',
      },
      rollItOut: {
        title: '3. Rulla ut det till ditt team',
        intro: 'En person med bra AI-vanor sparar sin egen tid. Ett team med delade vanor förändrar vad teamet kan ta sig an. Klicka på varje utrullningsdrag.',
        items: [
          { name: 'Ett delat promptbibliotek', tagline: 'Alla startar från den bästa versionen', description: 'Ett enkelt delat dokument med "prompter som funkar här" — rapportbriefen, kundsvarsmallen, mötessammanfattningsformatet. Nya teammedlemmar blir produktiva dag ett i stället för att återupptäcka allas lärdomar.' },
          { name: 'Utse en förkämpe', tagline: 'Någon äger att göra det bättre', description: 'Utrullningar stannar av utan en ägare. En entusiastisk person som kurerar biblioteket, svarar på "hur skulle du prompta det här?" och delar segrar gör mer än något direktiv. Gör det till en synlig del av rollen, inte en hobby vid sidan av.' },
          { name: 'Lätt styrning', tagline: 'Tydliga linjer, inte en tjock regelbok', description: 'Folk behöver känna till de få skarpa linjerna — vilken data som aldrig får hamna i ett verktyg, var mänskligt godkännande krävs, vilka verktyg som är godkända. Håll det kort nog att alla faktiskt läser det; en vägg av policy driver bara fram skuggjanvändning.' },
          { name: 'Mät tid sparad', tagline: 'Bevisa det, annars stryks det', description: 'Spåra den ärliga siffran: timmar tillbaka per vecka, snabbare leveranstid, mer hanterat utan fler anställda. Konkreta före/efter-segrar finansierar nästa steg och skyddar budgeten. "Det känns snabbare" överlever inte en kostnadsgranskning.' },
        ],
        bridgeBlurb: 'Teamvanor är där individuell produktivitet möter organisatorisk förändring. Se vad det verkligen krävs för att en organisation ska vara redo för AI.',
      },
      // MT
      promptLibrary: {
        title: '4. Ditt första promptbibliotek',
        intro:
          'Ett promptbibliotek låter storslaget; det är ett anteckningsdokument. Börja med de här tre — skriv var och en en gång, återanvänd den varje vecka. Kopiera, fyll i parenteserna, spara den ifyllda versionen.',
        templateTitleA: 'Veckostatusrapport',
        templateTitleB: 'Möte → beslut och åtgärder',
        templateTitleC: 'Kundsvar, med din röst',
        tipsTitle: 'Proffstips',
        tips: [
          {
            name: 'Spara den i samma stund som den funkar',
            body: 'Den bästa tiden att lägga till i ditt bibliotek är sekunden en prompt ger något du skulle leverera. "Senare" kommer aldrig.',
          },
          {
            name: 'Spara briefen tillsammans med ett exempelresultat',
            body: 'Framtida-du behöver minnas hur "bra" såg ut, inte bara vad du bad om. Behåll ett fantastiskt resultat bredvid varje sparad prompt.',
          },
          {
            name: 'Ett dokument, inte ett system',
            body: 'En enda fäst anteckning slår en taggad databas du aldrig kommer att underhålla. Gå över till projekt eller mappar först när dokumentet blir trångt.',
          },
        ],
        takeaway:
          'Tre sparade briefer är redan ett system. De flesta människors AI-användning är fem återkommande uppgifter — ett ensidigt bibliotek täcker större delen av din vecka.',
      },
    },
    // MT
    agenticcoding: {
      different: {
        title: '1. Vad som gör en kodningsagent annorlunda',
        intro:
          'En autokomplettering avslutar din rad. En chattassistent svarar i ett fönster. En kodningsagent gör inget av det — den arbetar i ditt repo som en kollega skulle: planerar, redigerar över flera filer, kör saker, kontrollerar resultatet. Fyra förmågor skiljer den från mängden. Klicka på varje.',
        items: [
          {
            name: 'Uppgiftsnedbrytning',
            tagline: 'Gör ett mål till en plan',
            description:
              'Du säger "lägg till hastighetsbegränsning på det publika API:et". Agenten bryter ner det i steg — hitta middleware-lagret, lägg till en limiter, koppla in den i routsen, lägg till ett test, kör sviten — och betar av planen, i stället för att spotta ur sig en klump kod och hoppas.',
          },
          {
            name: 'Kodbaskontext',
            tagline: 'Läser innan den skriver',
            description:
              'Den greppar, öppnar filer och spårar hur saker hänger ihop — så att dess ändringar följer dina konventioner och passar in i den befintliga strukturen. Det är därför den kan redigera ett repo den aldrig sett, och varför en chattassistent (som bara ser det du klistrar in) inte kan.',
          },
          {
            name: 'Verktygsanvändning & MCP',
            tagline: 'Agerar, föreslår inte bara',
            description:
              'Agenten kör kommandon, kör tester, läser deras utdata och når via MCP (Model Context Protocol) externa verktyg — din databas, ärendehanterare, dokumentation. Verktygsanvändning är det som förvandlar "här är lite kod" till "jag gjorde ändringen och testerna går igenom".',
          },
          {
            name: 'Verifieringsloopen',
            tagline: 'Kontrollerar sitt eget arbete',
            description:
              'Efter att ha agerat inspekterar den resultatet — kör testet, läser felet, läser om filen — och anpassar sig. Den här cykeln tänk → agera → verifiera är hjärtat i agentisk kodning: det är vad som låter dig granska utfall vid kontrollpunkter i stället för att övervaka varje tangenttryckning.',
          },
        ],
        takeaway:
          'Autokomplettering förutsäger, chatt råder, en agent agerar och verifierar. Skiftet går från att få kod till att delegera en kodningsuppgift — vilket innebär att ditt jobb flyttas från att skriva till att specificera och granska.',
      },
      realSession: {
        title: '2. Styr en verklig session',
        intro:
          'Här är samma funktion — lägg till hastighetsbegränsning i ett API — implementerad av två kodagenter. Växla mellan Claude Code och Kiro CLI, kör sessionen och se repot ändras till höger. Samma resultat, två metoder.',
        workspaceTitle: 'claude-code — add rate limiting',
        terminalTitle: 'claude-code',
        stepNote:
          'Stega igenom varje varv. Claude Code kör en direkt verktygsloop — läs, redigera, testa, verifiera. Kiro arbetar spec-först och skriver krav, design och uppgifter i .kiro/specs/ innan den rör koden.',
        cliToggleLabel: 'Välj CLI: Claude Code eller Kiro',
        snapshotInitial: 'Utgångsläge: ett litet Express-API utan hastighetsbegränsning.',
        snapshotMiddlewareSeen: 'Agenten har läst strukturen och hittat var middleware kopplas in.',
        snapshotKiroSpec: 'Kiro skrev specen först — krav, design och uppgifter under .kiro/specs/ innan koden rördes.',
        snapshotMiddlewareAdded: 'Ny rateLimiter-middlewarefil skapad — ännu inte inkopplad i routsen.',
        snapshotEdited: 'rateLimiter är nu inkopplad i den publika routern.',
        snapshotTested: 'Ett regressionstest lades till och sviten går igenom.',
        takeaway:
          'Du levererade en mening med intention och granskade vid kontrollpunkter; agenten gjorde sökningen, redigeringarna, testet och verifieringen. Den arbetsfördelningen — du specificerar och granskar, den utför och bevisar — är hur det känns att arbeta med en kodningsagent.',
        selfExplainPrompt:
          'I sessionen ovan skrev agenten ett test innan den sa att den var klar. Varför är just det verifieringssteget det som gör det säkert att delegera till en kodningsagent?',
        selfExplainAnswer:
          'Eftersom verifiering förvandlar en trolig-ser-ut diff till en kontrollerad. Ett godkänt regressionstest betyder att du kan granska utfallet ("gör det här det jag bad om, och är det fortfarande grönt?") i stället för att läsa om varje rad och gissa om det fungerar. Utan verifieringssteget ärver du all risk och ingen av tidsbesparingen — du skulle behöva manuellt kontrollera allt agenten rört. Testet är agenten som bevisar sitt arbete, vilket är vad som låter dig arbeta på kontrollpunktsnivå.',
      },
      effectively: {
        title: '3. Att arbeta effektivt med en kodningsagent',
        intro:
          'Verktyget är kapabelt; att få fantastiska resultat ur det är en färdighet. Fyra vanor skiljer dem som slåss mot sin kodningsagent från dem som levererar med den. Klicka på varje.',
        items: [
          {
            name: 'Avgränsa som en tech lead',
            tagline: 'Ge den en uppgift, inte en önskan',
            description:
              'Den bäst dimensionerade uppgiften är en du skulle kunna ge en kompetent ingenjör med ett stycke text: tydligt utfall, de begränsningar som spelar roll, hur man vet att den är klar. "Gör appen bättre" misslyckas; "lägg till retry/backoff i S3-klienten, max 3 försök, behåll det befintliga gränssnittet, lägg till ett test för timeout-vägen" lyckas.',
          },
          {
            name: 'Ge den varaktig kontext',
            tagline: 'Skriv AGENTS.md en gång',
            description:
              'Stack, konventioner, testkommandon, fallgropar — lägg dem i en AGENTS.md i repots rot så att varje session börjar förbriefad i stället för gissande. Kontext du skriver om gång på gång är kontext som hör hemma i en fil som agenten läser automatiskt.',
          },
          {
            name: 'Granska vid kontrollpunkter',
            tagline: 'Utfall, inte tangenttryckningar',
            description:
              'Låt den slutföra en sammanhängande enhet — en funktion, en fix, ett godkänt test — och granska sedan det, så som du skulle granska en kollegas PR. Att titta på varje token är långsammare än att bara skriva koden; att granska diffen är där din bedömning faktiskt tillför värde.',
          },
          {
            name: 'Vet när du ska ta ratten',
            tagline: 'Stoppa loopen när den snurrar',
            description:
              'Om agenten kör fast — två misslyckade försök på samma fel, redigeringar som driver bort från målet — stoppa och ingrip. Lägg till den saknade kontexten, korrigera planen eller ta den biten själv. En bra operatör styr om tidigt i stället för att låta en agent gräva en djupare grop.',
          },
        ],
        bridgeBlurb:
          'Du har styrt en kodningsagent. Titta nu under huven: hur verktygsanvändning, funktionsanrop, MCP och designmönster för agenter faktiskt fungerar — maskineriet under sessionen du just körde.',
      },
      // MT
      spinUpTools: {
        title: '4. Från att redigera kod till att snabbt skapa verktyg',
        intro:
          'Du har styrt en agent genom ett befintligt repo. Samma agent är precis lika bra på noll-till-ett — och det ändrar tyst dina utgångslägen. Kostnaden för ett litet internt verktyg, skript eller en dashboard har kollapsat, så frågan skiftar från "är det här värt att bygga?" till "vad skulle jag bygga om det vore nästan gratis?" Klicka på varje skifte.',
        items: [
          {
            name: 'Noll-till-ett, inte bara redigeringar',
            tagline: 'Greenfield är nu billigt',
            description:
              'Agenter scaffoldar en fungerande app från ett stycke lika gärna som de refaktorerar en gammal. Det interna verktyget du levt utan — felsorteraren för loggar, jourdashboarden, datatuggar-UI:t — är nu en eftermiddag, inte ett kvartal. Bygg den sak du tidigare skulle ha hoppat över.',
          },
          {
            name: 'Dimensionera stacken rätt',
            tagline: 'Matcha ceremoni mot livslängd',
            description:
              'Ett verktyg som ingen utanför teamet kommer att se behöver inte ditt produktionsramverk. En enkelfilsapp, ett skript eller en no-code/low-code-byggare slår ofta ett fullt projekt. Reservera den tunga stacken för det som levereras till användare; låt slit-och-släng-verktyg vara just det.',
          },
          {
            name: 'Ett litet verktyg är en liten spec',
            tagline: 'Samma avgränsningsdisciplin',
            description:
              'Att beställa ett verktyg av en agent använder exakt vanorna från förra avsnittet: ett tydligt utfall, de begränsningar som spelar roll, en definition av klart. "Bygg en CLI som följer de här loggarna, grupperar fel efter stacksignatur och skriver ut topp 10" är en komplett brief — avgränsa den en gång, låt den köra, granska resultatet.',
          },
          {
            name: 'Känn no-code-gränsen',
            tagline: 'Ibland är du fel byggare',
            description:
              'Inte varje internt verktyg bör vara kod du underhåller. För ett formulär en icke-teknisk kollega kommer att äga, eller ett engångs-UI, ger en AI-appbyggare dem något de kan ändra själva — ingen pull request, ingen du i loopen. Att veta när man ska lämna över till no-code är ett eget tekniskt omdöme.',
          },
        ],
        takeaway:
          'Agenten som redigerar ditt repo kollapsar också kostnaden för att bygga från grunden. Sänk din ribba för vad som är värt att göra, dimensionera stacken efter verktygets livslängd, och vet när det bättre svaret är en no-code-byggare som din kollega äger i stället för kod du underhåller.',
        selfExplainPrompt:
          'Nämn ett litet internt verktyg du velat ha men aldrig byggt eftersom det inte var värt tiden. Vad är den enstyckes-spec du nu skulle lämna en agent — och skulle du bygga det som kod du äger eller som en no-code-app en kollega äger?',
        selfExplainAnswer:
          'Exempel: "En dashboard som pollar vår CI och flaggar tester som flaxat mer än två gånger den här veckan. Spec: läs de senaste 200 körningarna från CI-API:t, gruppera misslyckanden efter testnamn, lista alla tester med ≥2 icke-deterministiska misslyckanden, sorterat efter frekvens, uppdaterat vid laddning. Jag skulle bygga det som en enkelfilsapp jag äger, eftersom det rör vår CI-token och jag vill ha det i vårt repo — men triagenoterna som QA-ledaren vill ha fästa vid varje flax, dem skulle jag lämna över till en no-code-byggare så att de kan ändra fälten utan mig."',
      },
      // MT
      stealThisSetup: {
        title: '5. Snor den här uppsättningen',
        intro:
          'Skillnaden mellan att slåss mot en kodningsagent och att leverera med den är sällan modellen — det är uppsättningen. Kopiera den här start-AGENTS.md till roten av ditt repo, fyll i parenteserna, och snor sedan vanorna nedan.',
        templateTitle: 'AGENTS.md-start — lägg i roten av repot',
        tipsTitle: 'Proffstips',
        tips: [
          {
            name: 'Be om planen före koden',
            body: '"Berätta din plan först — skriv ingen kod än." Att granska en plan på 5 rader är tio gånger billigare än att granska en diff på 500 rader.',
          },
          {
            name: 'Gör checkpoints av commits',
            body: 'Låt agenten committa efter varje fungerande steg. Ett dåligt steg blir en git revert, inte en arkeologisk utgrävning genom en jättediff.',
          },
          {
            name: 'Klistra in det riktiga felet',
            body: 'Den ordagranna stacktracen, den faktiska felande utmatningen. "Den kastar något om autentisering" skickar agenten på gissningsfärd; tracen skickar den till raden.',
          },
          {
            name: 'Skydda testerna',
            body: 'Om ett test misslyckas, säg "fixa koden, inte testet" — en agent under press ändrar gärna assertionen. Namnge de beteenden som är bärande.',
          },
          {
            name: 'En uppgift, en session',
            body: 'Långa blandade sessioner samlar på sig inaktuell kontext. Bli klar, committa, rensa, börja på nytt — med en AGENTS.md introduceras agenten på nytt på sekunder.',
          },
        ],
        takeaway:
          'En bra AGENTS.md plus de här fem vanorna är det mesta som skiljer team som levererar med agenter från team som gav upp efter en vecka.',
      },
    },
    // MT
    agenticwork: {
      whatItIs: {
        title: '1. Vad agentiskt arbete faktiskt är',
        intro:
          'En chattassistent svarar; en app för agentiskt arbete agerar. Du ger den en uppgift i flera steg — tvärs över dina dokument, kalkylblad och appar — och den planerar, utför stegen och rapporterar tillbaka, medan du sitter kvar i regissörsstolen. Klicka på varje del.',
        items: [
          {
            name: 'Assistent kontra agent',
            tagline: 'Att svara kontra att göra',
            description:
              'En chattassistent ger dig ord tillbaka: ett utkast, ett svar, en sammanfattning som du sedan agerar på. En agent utför — den öppnar filerna, fyller raderna, skriver utkastet till mejlet, rör sig genom ett arbetsflöde. Skillnaden är inte intelligens; det är huruvida arbetet landar i dina system eller bara i chatten.',
          },
          {
            name: 'Vad som gör en uppgift delegerbar',
            tagline: 'Flera steg, kontrollerbar, återställbar',
            description:
              'Bra kandidater har flera steg (värt att sätta upp), en tydlig definition av klart (så att du kan kontrollera den) och är återställbara om de blir fel (ett utkast, inte ett skickat kontrakt). "Sammanställ veckans pipeline-rapport från dessa källor" passar; "besluta vem som ska sägas upp" gör det inte.',
          },
          {
            name: 'Verktygen',
            tagline: 'Quick Desktop, Cowork och deras släkt',
            description:
              'Amazon Quick Desktop och Claude Cowork är appar för agentiskt arbete: du delegerar kontorsuppgifter och övervakar medan de arbetar tvärs över filer och appar. De är affärssidans motsvarighet till vad kodningsagenter gör i ett repo — samma loop, riktad mot dokument och arbetsflöden i stället för kod.',
          },
          {
            name: 'Din nya roll',
            tagline: 'Regissör, inte utförare',
            description:
              'När utförandet är delegerat flyttas ditt värde till att briefa väl, besluta vad som spelar roll och granska resultatet — en chefs arbete, inte en enskild medarbetares. De team som vinner med agenter är de vars människor gör det här skiftet medvetet.',
          },
        ],
        bridgeBlurb:
          'De här assistenterna-som-agerar har riktigt maskineri under sig — verktygsanvändning, funktionsanrop, agentloopen. Se hur en AI faktiskt går från att svara till att vidta åtgärd.',
      },
      delegateSupervise: {
        title: '2. Delegera och övervaka',
        intro:
          'Att delegera till en agent är en färdighet som liknar att leda en skarp junior medarbetare. Stega igenom en verklig delegering i flera steg och lägg märke till exakt var du stannar kvar i loopen.',
        appToggleLabel: 'Välj app: Amazon Quick Desktop eller Claude Cowork',
        stepLabel: 'Steg',
        steps: [
          {
            label: 'Du briefar uppgiften',
            content:
              '"Stäm av den här månadens utläggsrapport mot vår resepolicy. Flagga varje utlägg som bryter mot en regel, med regeln det bryter mot och beloppet över. Mata ut en tabell jag kan granska, plus en sammanfattning på en rad."',
            note: 'En delegerbar brief namnger indata, regeln som ska tillämpas och den exakta leveransen — precis som att briefa en person.',
          },
          {
            label: 'Agenten föreslår en plan',
            content:
              'Den läser policyn och utläggsbladet och föreslår: tolka 240 utläggsrader → matcha var och en mot relevant policyregel → flagga överträdelser med beloppet över → bygg granskningstabellen → skriv sammanfattningen. Den frågar en sak: "Ska saknade kvitton behandlas som en överträdelse eller som en separat lista \'behöver uppföljning\'?"',
            note: 'Planen + den klargörande frågan är din första kontrollpunkt — billigt att styra nu, dyrt efter att den har kört.',
          },
          {
            label: 'Den arbetar tvärs över dina filer',
            content:
              'Du väljer "separat uppföljningslista". Agenten bearbetar alla 240 rader, tillämpar policyn regel för regel och visar framsteg — utan att vänta på att du ska klistra in något. Den flaggar 11 överträdelser och 6 poster med saknade kvitton.',
            note: 'Till skillnad från en chattassistent arbetar den direkt på kalkylbladet och policydokumentet — det är den agentiska delen.',
          },
          {
            label: 'Du övervakar vid kontrollpunkten',
            content:
              'De 11 flaggorna kommer med regeln och övertrasseringen för var och en. Du upptäcker två som faktiskt är inom policyn (ett dagtraktamente som agenten läste för strikt) och säger det. Den korrigerar regeltolkningen och kör om de berörda raderna — 9 verkliga överträdelser kvarstår.',
            note: 'Granskning är jobbet nu. Du kontrollerar bedömningsfrågor, inte gör om aritmetiken.',
          },
          {
            label: 'Den levererar — du förblir ansvarig',
            content:
              'Slutlig tabell med 9 överträdelser + 6 uppföljningar + en sammanfattning på en rad, redo att skickas till ekonomi. Tjugo minuters briefning och granskning ersatte en eftermiddag av rad-för-rad-kontroll — och beslutet att skicka är fortfarande ditt.',
            note: 'Arbetet delegerades; ansvaret gjorde det inte. Den uppdelningen är hela disciplinen.',
          },
        ],
        takeaway:
          'Delegera uppgiften, övervaka vid kontrollpunkter, äg utfallet. Agenten gör volymen; din bedömning är fortfarande grinden innan något levereras.',
        selfExplainPrompt:
          'Välj en uppgift i flera steg på ditt bord den här veckan. Skriv den brief du skulle ge en app för agentiskt arbete — indata, regeln eller målet, leveransen — och namnge den enda kontrollpunkt där du skulle insistera på att granska innan den fortsätter.',
        selfExplainAnswer:
          'Exempel: "Uppgift: triagera den här veckans 80 inkommande supportärenden. Brief — indata: ärendeexporten; regel: tagga varje efter brådska (P1–P3) med våra SLA-definitioner och gruppera per produktområde; leverans: en sorterad tabell plus P1-listan överst. Kontrollpunkt: jag granskar P1-listan innan något auto-eskaleras, eftersom en felaktig P1 väcker någon klockan 02 på natten." Kontrollpunkten sitter exakt där ett fel skulle vara kostsamt eller svårt att vända.',
      },
      delegateInExcel: {
        title: '3. Se det i Excel',
        intro:
          'Du gick precis igenom en delegering i det abstrakta. Här är samma sorts uppgift i verktyget som miljoner människor redan lever i — ett kalkylblad. Se Claude för Excel stämma av en utläggsrapport mot en resepolicy: den arbetar i rutnätet, flaggar det som bryter mot reglerna och citerar de exakta cellerna. Klicka på vilken cell som helst för att inspektera den; tryck på Kör för att se Claude arbeta.',
        workbookTitle: 'expenses-march.xlsx',
        columns: ['Datum', 'Anställd', 'Kategori', 'Belopp'],
        statusHeader: 'Status',
        statusOk: 'OK',
        statusOver: 'OVER',
        flaggedLabel: 'Flaggade rader',
        prompt:
          'Stäm av den här utläggsrapporten mot vår resepolicy: måltider upp till $75, hotell upp till $300. Standardisera kolumnen Belopp till valuta, lägg till en Status-kolumn som markerar varje rad OK eller OVER, flagga raderna som bryter mot policyn och ge mig antalet.',
        overwriteWarning: 'Claude kommer att skriva över de befintliga värdena i D2:D12.',
        messages: [
          'Jag stämmer av alla 11 rader mot policyn — måltider upp till $75, hotell upp till $300. Först lägger jag till en Status-kolumn [E1].',
          'Standardiserar kolumnen Belopp till valutaformat. Detta skriver om värdena i kolumn D.',
          'Markerar raderna som följer policyn som OK.',
          'Fem rader överskrider gränserna — se [D4], [D6], [D8], [D11] och [D12]. Markerar dem OVER och flaggar raderna.',
          'Lägger till antalet flaggade rader i [E13] med en formel, så att det förblir korrekt om data ändras.',
        ],
        takeaway:
          'Lägg märke till vad som förblev ditt: policyn, beslutet att skicka, den slutliga granskningen. Claude gjorde läsningen och flaggningen tvärs över varje rad och visade sitt arbete cell för cell — du övervakade. Det är delegering, i verktyget du redan använder.',
        selfExplainPrompt:
          'Claude flaggade fem rader och citerade de exakta cellerna (D4, D6, D8, D11, D12). Varför spelar det större roll att citera de specifika cellerna än att bara rapportera "5 rader är över policyn"?',
        selfExplainAnswer:
          'Eftersom en citering förvandlar ett påstående du måste lita på till ett du kan kontrollera på några sekunder. "5 rader är över" ber dig ta Claude på orden; "se D4, D6, D8, D11, D12" låter dig klicka rakt till var och en, bekräfta beloppet mot regeln och fånga en felbedömning innan den når ekonomi. Spårbarhet är det som gör granskningen av utfallet snabb nog för att delegering faktiskt ska spara tid — utan den skulle du kontrollera alla 240 raderna igen själv, vilket är just det arbete du försökte delegera.',
      },
      guardrails: {
        title: '4. Sätt skyddsräcken',
        intro:
          'En agent som agerar behöver gränser, på samma sätt som du inte skulle ge en nyanställd företagets kreditkort dag ett. Fyra skyddsräcken håller delegeringen säker. Klicka på varje.',
        items: [
          {
            name: 'Omfångsgränser',
            tagline: 'Vad den får röra',
            description:
              'Var tydlig med vilka filer, system och data en agent kan läsa och ändra. "Den här mappen och det här bladet" slår "den delade enheten". Snävt omfång begränsar misstag och håller känslig data utom räckhåll som standard.',
          },
          {
            name: 'Tak för spenderande & åtgärder',
            tagline: 'Gränser för konsekvensbärande drag',
            description:
              'Där en agent kan spendera pengar eller vidta utåtriktade åtgärder (ge återbetalningar, skicka till kunder, lägga beställningar) — sätt hårda tak och hastighetsgränser. Ett tak är nödvändigt men inte tillräckligt — para ihop det med regeln nedan.',
          },
          {
            name: 'Människa i loopen',
            tagline: 'Godkännande för det oåterkalleliga',
            description:
              'Allt som är svårt att ångra eller utåt synligt — att skicka till en kund, radera poster, slutföra en betalning — bör kräva ett mänskligt OK. Låt agenten förbereda och köa åtgärden; en människa trycker på skicka. Utkast är gratis; skickat är för evigt.',
          },
          {
            name: 'Granskningslogg',
            tagline: 'Vet vad den gjorde och varför',
            description:
              'Logga agentens åtgärder, indata och beslut så att du kan granska, felsöka och svara på "varför gjorde den så?". En granskningslogg förvandlar ett överraskande utfall till ett spårbart — och är ofta ett efterlevnadskrav, inte en lyx.',
          },
        ],
        failureLabel: 'En lucka i skyddsräcket, konkret:',
        failure:
          'En agent som får återbetala upp till $1,000 självständigt får en uppenbart bedräglig begäran på $950 — och betalar den, eftersom ett spendertak inte är en bedrägerikontroll. Det saknade skyddsräcket var inte ett lägre tak; det var en regel om människa i loopen för återbetalningar över en riskgräns. Tak begränsar storlek; de tillhandahåller inte omdöme.',
        bridgeBlurb:
          'Skyddsräcken på en agent är början. Den större frågan — roller, beslutsrätt och varför ~40 % av agentinitiativen kör fast på icke-tekniska frågor — är organisatorisk. Gå dit.',
      },
      // MT
      taskToTool: {
        title: '5. När en uppgift vill bli ett verktyg',
        intro:
          'Att delegera ger en agent ett jobb en gång. Men när samma jobb återkommer varje vecka kan du nu göra något som förut krävde en utvecklare och en budget: be AI bygga dig ett litet verktyg — ett formulär, en spårare, en kalkylator, en enkelsidig app — som du och ditt team återanvänder. Färdigheten är samma briefing du just lärt dig; leveransen är bara större. Klicka på varje idé.',
        items: [
          {
            name: 'Att delegera kontra att beställa',
            tagline: 'Ett jobb gjort en gång kontra ett verktyg du behåller',
            description:
              'Delegering får en uppgift gjord: "stäm av den här månadens utlägg." Att beställa ger dig den sak som gör det varje månad: "bygg mig en utläggskontrollör jag kan släppa in nästa månads blad i." När en delegering fortsätter att upprepa sig är det signalen att den vill bli ett verktyg.',
          },
          {
            name: 'Vad "no-code" faktiskt betyder nu',
            tagline: 'Beskriv det, bygg det inte',
            description:
              'Du behöver inte längre skriva mjukvara eller anlita någon för att få ett litet internt verktyg. Du beskriver vad du vill ha i vanligt språk — fälten, regeln, utmatningen — och en AI-appbyggare producerar en fungerande app du kan klicka i. Det är samma drag som att briefa en uppgift; utmatningen råkar bara vara mjukvara.',
          },
          {
            name: 'Att se en verktygsformad uppgift',
            tagline: 'Återkommande + manuell + strukturerad',
            description:
              'En uppgift vill bli ett verktyg när tre saker stämmer: du gör den om och om igen, den är pillig för hand, och den har struktur — samma fält och steg varje gång. Intagsformuläret du knappar in på nytt, veckobladet du bygger om, checklistan du kopierar och justerar — de är verktyg som väntar på att bli efterfrågade, lika gärna på en klinik, en restaurang, ett skolkontor eller en ekonomiavdelning.',
          },
          {
            name: 'Din roll ändras inte',
            tagline: 'Du styr och granskar fortfarande',
            description:
              'Att beställa ett verktyg är samma disciplin som att delegera en uppgift: en tydlig brief, en kontrollpunkt där du provar det den byggt, och du som äger resultatet innan någon förlitar sig på det. Du blir inte programmerare — du blir någon som kan få mjukvara gjord. Rädslan att "det här är för tekniska personer" tar slut precis här.',
          },
        ],
        walkthroughTitle: 'Från en daglig slit till ett verktyg du äger',
        stepLabel: 'Steg',
        steps: [
          {
            label: 'Den återkommande smärtan',
            content:
              'En klinikreception knappar in varje ny patients uppgifter från ett pappersformulär till tre olika skärmar och skriver sedan en kort sammanfattning för hand. Tjugo minuter per patient, dussintals gånger i veckan — samma fält, varje enda gång.',
            note: 'Det här är inte en uppgift att delegera; den upprepar sig för evigt. Det är ledtråden.',
          },
          {
            label: 'Du känner igen formen',
            content:
              'Återkommande, manuell och strukturerad — samma nio fält och samma sammanfattning, om och om igen. Det är en verktygsformad uppgift. Du slutar tänka "vem kan jag lämna det här till?" och börjar tänka "vad skulle bara kunna göra det här?"',
            note: 'Igenkänningen är färdigheten. Byggandet är nu den enkla delen.',
          },
          {
            label: 'Du beskriver verktyget',
            content:
              '"Bygg ett enkelt intagsformulär med de här nio fälten. Validera telefonnumret och ID-formatet. När jag skickar in, visa mig en sammanfattning på ett stycke plus en ren rad jag kan klistra in i vårt blad. Håll allt på sidan — ingen data lämnar den." Du briefar, du kodar inte.',
            note: 'Samma fyrdelade brief som en delegering: kontext, vad du vill ha, formatet, begränsningarna.',
          },
          {
            label: 'Du granskar det den byggt',
            content:
              'Minuter senare finns ett fungerande formulär. Du provar det med ett verkligt (anonymiserat) fall, fixar en fältetikett som löd fel, och ber om att sammanfattningen blir två meningar kortare. Det uppdateras. Du granskade utmatningen precis så som du granskar ett delegerat utkast.',
            note: 'Kontrollpunkten är oförändrad — du råkar bara granska en app i stället för ett dokument.',
          },
          {
            label: 'Teamet använder det',
            content:
              'Receptionen fyller nu i ett formulär i stället för att knappa in tre skärmar. Tjugo minuter blev två. Du beställde det på en eftermiddag, utan utvecklare och utan budgetbegäran — och du kan ändra det imorgon genom att be om det.',
            note: 'En restaurangägare kunde göra detsamma för leverantörsbeställningar; ett skolkontor för medgivandelappar. Mönstret reser.',
          },
        ],
        takeaway:
          'Stegen har fyra pinnar: använd AI väl, spara dina bästa prompter, delegera hela uppgifter och — när en uppgift fortsätter att återkomma — beställ ett litet verktyg som gör den åt dig. Varje pinne är samma färdighet (en tydlig brief och en verklig granskning), riktad mot en större leverans.',
        selfExplainPrompt:
          'Tänk på en uppgift du eller ditt team gör om för hand varje vecka och som har samma form varje gång. Beskriv, i vanligt språk, det lilla verktyg du skulle be en AI bygga åt den — indata, regeln eller stegen, och utmatningen du vill ha tillbaka.',
        selfExplainAnswer:
          'Exempel: "Varje fredag stämmer vår restaurang av veckans leverantörsleveranser mot orderbladet för att fånga brister. Verktyg: en sida där jag klistrar in orderlistan och följesedlarna; den matchar dem rad för rad, flaggar allt som är kort eller överdebiterat med differensen, och ger mig en sammanfattning på en rad plus en lista att skicka leverantören. Inget lämnar sidan." Indata, en tydlig regel, en kontrollerbar utmatning — det är en beställningsfärdig brief, och det är samma brief du skulle skriva för att delegera uppgiften, du ber bara om verktyget i stället för resultatet.',
      },
      // MT
      briefLibrary: {
        title: '6. En brief du kan snor',
        intro:
          'Du behöver inte uppfinna delegering från grunden. Kopiera den här brief-mallen, fyll i parenteserna, och placera kontrollpunkten där ett misstag faktiskt skulle kosta dig.',
        templateTitle: 'Delegeringsbriefen — fyll i parenteserna',
        exampleTitle: 'Samma brief, ifylld',
        tipsTitle: 'Proffstips',
        tips: [
          {
            name: 'Placera kontrollpunkten där misstag blir dyra',
            body: 'Innan något skickas, betalas, raderas eller publiceras — det är dit "visa mig först" hör. Allt före det kan köra obevakat.',
          },
          {
            name: 'Fråga vad den behöver',
            body: 'Avsluta briefen med "Vad saknas i den här briefen?" Agenter är bra på att upptäcka sina egna blockerare innan de stöter på dem.',
          },
          {
            name: 'Definiera klart, annars blir det aldrig klart',
            body: '"En tabell jag kan granska" slår "titta på utgifterna". Om du inte kan kontrollera leveransen på två minuter har du inte definierat den än.',
          },
          {
            name: 'Namnge eskaleringen',
            body: '"Om en regel är tvetydig, lista den under \'behöver människa\' i stället för att besluta" — en rad som förhindrar självsäkra felbeslut.',
          },
        ],
        takeaway:
          'En återanvändbar brief förvandlar delegering från en skrivövning till en fyll-i-luckorna-vana — och kontrollpunktsraden är den del som håller det säkert.',
      },
    },
    // MT
    genaibeyondtext: {
      modalitiesModels: {
        title: '1. Modaliteterna och deras modeller',
        intro:
          'Bortom text spänner generativ AI över fyra modaliteter, var och en med sin egen modellfamilj och sina egenheter. Klicka på var och en för att se hur den fungerar under huven och vilka modeller som är representativa 2026.',
        modelsLabel: 'Representativa modeller:',
        items: [
          {
            name: 'Bild',
            tagline: 'Diffusionsmodeller',
            description:
              'Text-till-bild-modeller arbetar genom avbrusning: de startar från slumpmässigt brus och förfinar det iterativt mot en bild som matchar prompten, styrda av en textkodare. De kan styras via prompter, referensbilder, masker (inpainting) och strukturkartor. Snabba, billiga, mogna.',
            models: 'Stable Diffusion 3.5, FLUX, Amazon Nova Canvas, Google Imagen, GPT Image',
          },
          {
            name: 'Röst & ljud',
            tagline: 'TTS, STT och tal-till-tal',
            description:
              'Tre uppgifter: text-till-tal (TTS) syntetiserar naturliga röster; tal-till-text (STT) transkriberar; och nyare tal-till-tal-modeller konverserar direkt i ljud med låg latens och bevarad tonfall. Röstkloning är en TTS-funktion — och ett rättsligt minfält.',
            models: 'Whisper (STT), ElevenLabs (TTS/klon), Amazon Nova Sonic, OpenAI Realtime',
          },
          {
            name: 'Video',
            tagline: 'Diffusion över tid',
            description:
              'Videomodeller utvidgar bilddiffusion till tidsdimensionen och genererar sammanhängande bildrutor från en text- eller bildprompt. Fortfarande den mest beräkningskrävande och minst styrbara modaliteten — kliplängderna är korta och konsistens mellan tagningar är det svåra problemet.',
            models: 'OpenAI Sora, Google Veo, Runway Gen-3, Amazon Nova Reel',
          },
          {
            name: 'Multimodal',
            tagline: 'En modell, många in- och utdata',
            description:
              'Frontlinjens LLM:er accepterar bilder (och alltmer ljud/video) tillsammans med text och resonerar tvärs över dem — "vad är fel i det här diagrammet?", "sammanfatta den här skärmdumpen." Samma modell som chattar kan se. Det är här mest affärsvärde landar, eftersom det inte kräver någon ny pipeline.',
            models: 'GPT-5.x (omni), Gemini 3.x, Claude (vision), Llama 4 (vision)',
          },
        ],
        takeaway:
          'Bild och röst är mogna och billiga; video är frontlinjen; multimodal förståelse (en chattmodell som kan se och höra) är i det tysta det mest användbara i vardagen. Matcha modaliteten till uppgiften innan du börjar shoppa efter en modell.',
      },
      multimodalAPI: {
        title: '2. Att anropa en multimodal modell',
        intro:
          'Under produkternas gränssnitt är detta vanliga HTTP-API:er: du skickar innehållsblock och får innehåll (eller en referens) tillbaka. Kör sessionen för att se hur förfrågan/svar ser ut för ett vision-anrop och ett bildgenererings-anrop.',
        stepNote:
          'Två anrop: först läser en vision-modell en bild och returnerar strukturerad JSON; sedan returnerar en text-till-bild-modell en bildreferens. Notera raden om kostnad/latens — mediaanrop är dyrare och långsammare än text.',
        takeaway:
          'Multimodalt är "bara ett API": innehållsblock in, innehåll eller en referens ut, debiterat per bild/sekund/token. När du väl ser förfrågans form är det samma ingenjörsarbete att integrera bild eller vision som du redan gör för text — plus uppmärksamhet på kostnad, latens och att lagra den binära utdatan.',
        selfExplainPrompt:
          'Din app låter användare fotografera ett kvitto och få radposterna som strukturerad data. Vilken modalitet och ungefär vilken API-form skulle du använda, och vad skulle du vara vaksam på gällande kostnad och tillförlitlighet?',
        selfExplainAnswer:
          'En multimodal/vision-modell: skicka bilden plus en prompt som ber om radposterna som JSON (helst med ett strikt schema / läge för strukturerad utdata), få JSON tillbaka. Var vaksam på: kostnad och latens per bild (cacha eller batcha där det går), felmoder vid suddiga/roterade foton (validera JSON:en, be om konfidens, fall tillbaka på en uppmaning att fota om), och lita aldrig blint på extraktionen för något ekonomiskt — visa användaren det tolkade resultatet ovanpå bilden för en snabb bekräftelse. Det är samma förfrågan/svar-ingenjörsarbete som ett textanrop, med bild som indata och striktare validering av utdata.',
      },
      choosingIntegrating: {
        title: '3. Att välja och integrera',
        intro:
          'Att välja och leverera en kapacitet för generativ media har avvägningar som text inte har. Klicka på varje övervägande.',
        items: [
          {
            name: 'Hostat API kontra egen drift',
            tagline: 'Hyr frontlinjen, eller kör öppna vikter',
            description:
              'Hostade API:er (Bedrock, OpenAI, fal) ger dig de bästa modellerna utan drift och med betalning per användning; öppna vikter (SD, Flux, Whisper) körs på dina egna GPU:er för datakontroll och volymekonomi. De flesta team börjar hostat och driftar bara de högvolymsmässiga, stabila arbetslasterna själva.',
          },
          {
            name: 'Latens, kostnad, kvalitet',
            tagline: 'Välj två, justera den tredje',
            description:
              'Ett fyra sekunder långt videoklipp kan kosta dollar och ta minuter; en bild kostar ören och tar sekunder; vision-på-text ligger nära chattkostnad. Budgetera per tillgång, cacha aggressivt, generera i den minsta storlek/längd som fungerar och reservera de dyra modellerna för de stunder som betyder något.',
          },
          {
            name: 'Säkerhet & ursprung',
            tagline: 'Vattenmärk och märk ut',
            description:
              'Generativ media behöver ursprungsspårning: C2PA-innehållsmärkning och osynliga vattenmärken (t.ex. SynthID) markerar AI-ursprung, och de flesta leverantörer fäster dem. Du ansvarar för att informera, för att inte generera otillåtet innehåll och för att respektera rättigheter till utseende/röst.',
          },
          {
            name: 'Utvärdering är svårare',
            tagline: 'Ingen enda korrekt utdata',
            description:
              'Det finns inget exaktmatchande mått för "en bra bild" eller "en naturlig röst." Luta dig mot mänsklig granskning för kvalitet, automatiska kontroller för policy/säkerhet och A/B- eller preferenstester för modellval. Behandla utvärdering som något kontinuerligt, inte ett engångsbenchmark.',
          },
        ],
        bridgeBlurb:
          'Du känner till modaliteterna och hur man anropar dem. Zooma ut till aktörerna: vilka bygger dessa bild-, röst- och videomodeller, öppet kontra slutet, och hur ekosystemet hänger ihop.',
      },
      modalityUses: {
        title: '1. Vad varje modalitet är till för',
        intro:
          'Generativ AI är inte bara chatt. Fyra modaliteter låser var och en upp olika arbete — knepet är att veta vilken uppgift var och en är bra på. Klicka på var och en.',
        exampleLabel: 'Till exempel:',
        items: [
          {
            name: 'Bild',
            tagline: 'Visuellt på begäran',
            description:
              'Generera och redigera bilder utifrån en beskrivning: marknadsföringsmaterial, sociala inlägg, produktmockuper, presentationsgrafik, annonsvarianter. Mogen och billig — ofta det första stället där ett team ser verklig tidsbesparing.',
            example: 'Snickra ihop 20 varumärkesanpassade annonsvarianter för A/B-testning på minuter, i stället för en dag med en designer.',
          },
          {
            name: 'Röst & ljud',
            tagline: 'Tala och lyssna i stor skala',
            description:
              'Förvandla text till naturligt tal (berättarröst, IVR, tillgänglighet) och tal till text (mötesanteckningar, samtalsutskrifter, undertexter). Nyare verktyg för röstkonversationer i realtid för support.',
            example: 'Lägg till en naturligt klingande berättarröst på en utbildningsvideo på åtta språk utan en studio.',
          },
          {
            name: 'Video',
            tagline: 'Rörliga bilder från en prompt',
            description:
              'Generera korta klipp, animera stillbilder eller klipp ihop långt material till höjdpunkter. Kraftfullt men fortfarande den skrovligaste kanten — bäst för korta sociala/marknadsklipp och utkast, med en människa som färdigställer klippningen.',
            example: 'Förvandla ett en timme långt webbinarium till tio sociala klipp på 30 sekunder med undertexter, redo för granskning.',
          },
          {
            name: 'Multimodal',
            tagline: 'AI som ser och hör',
            description:
              'En chattassistent som också tar emot bilder, ljud och dokument: fotografera en whiteboard och få anteckningarna, släpp in en skärmdump och fråga vad som är fel, ge den en samtalsinspelning och få åtgärdspunkterna.',
            example: 'Fotografera en konkurrents hylla och be om en prydlig tabell över deras produkter och priser.',
          },
        ],
        takeaway:
          'Bild och röst är redo för vardagsarbete; video är utmärkt för utkast; multimodal "AI som kan se" är den tysta arbetshästen. Börja med den modalitet som passar en uppgift du redan gör ofta.',
      },
      pickTheTool: {
        title: '2. Välj rätt verktyg för uppgiften',
        intro:
          'Fyra verkliga förfrågningar. För var och en: vilken modalitet, vilken sorts verktyg och den enda sak att vara vaksam på. Stega igenom.',
        recommendLabel: 'Bäst lämpat:',
        watchLabel: 'Se upp:',
        scenarios: [
          {
            request: '"Vi behöver 30 produktbilder i olika miljöer till lanseringssidan — snabbt och varumärkesanpassat."',
            pick: 'Bildgenerering (eller bakgrundsredigering/inpainting)',
            why: 'Bildverktyg genererar och redigerar varumärkesanpassade bilder på minuter till nästan noll kostnad — idealiskt för volym och varianter.',
            watch: 'Kontrollera varumärkesriktigheten och undvik att antyda riktiga foton av en fysisk produkt du ännu inte levererat; informera om AI-bilder där det krävs.',
          },
          {
            request: '"Förvandla vår 60 minuter långa webbinarieinspelning till korta klipp för LinkedIn."',
            pick: 'Videoverktyg (höjdpunktsextraktion + undertextning)',
            why: 'Videoverktyg kan hitta höjdpunkter och klippa undertextade klipp, vilket förvandlar en eftermiddags redigering till en granskningsrunda.',
            watch: 'En människa bör godkänna klippen — automatiska höjdpunkter missar nyanser och kan klippa ett citat ur sitt sammanhang.',
          },
          {
            request: '"Vi vill ha en naturlig berättarröst till våra hjälpvideor på engelska, spanska och tyska."',
            pick: 'Text-till-tal (flerspråkig)',
            why: 'Modern TTS producerar naturlig flerspråkig berättarröst utan en studio och är lätt att generera om när manus ändras.',
            watch: 'Klona bara en specifik persons röst med deras samtycke; för varumärkesröster, använd licensierade/syntetiska röster och håll rättigheterna tydliga.',
          },
          {
            request: '"Personalen fotograferar papperskvitton; vi vill ha beloppen och datumen som ett kalkylblad."',
            pick: 'Multimodal / vision-modell',
            why: 'En vision-modell läser fotona och returnerar strukturerad data — ingen ny app, bara assistenten ditt team redan använder.',
            watch: 'Verifiera extraherade siffror innan de når ekonomi; suddiga eller sneda foton orsakar fel, så behåll ett mänskligt bekräftelsesteg.',
          },
        ],
        selfExplainPrompt:
          'Välj en uppgift ditt team gör som involverar bilder, ljud eller video. Vilken modalitet passar, vilken sorts verktyg skulle du sträcka dig efter, och vad är den enda sak du skulle dubbelkolla innan du litar på utdatan?',
        selfExplainAnswer:
          'Exempel: "Vi skriver manuellt alt-text och sociala bildtexter för varje produktbild. Modalitet: multimodal/vision — ge bilden till en AI som kan se och be om alt-text plus tre bildtextalternativ i vår ton. Verktyg: vår befintliga multimodala assistent, inget nytt system. Dubbelkoll: riktighet och varumärkeston på ett urval innan vi kör i stor skala, och att inget hittar på en produktegenskap som bilden faktiskt inte visar."',
      },
      useResponsibly: {
        title: '3. Använd det ansvarsfullt',
        intro:
          'Generativ media skapar risker som text sällan gör — utseende, vilseledning, varumärke. Fyra vanor håller dig trygg. Klicka på var och en.',
        items: [
          {
            name: 'Informera & märk ut',
            tagline: 'Säg när det är AI',
            description:
              'Märk AI-genererad media där din publik eller lagen förväntar sig det, och behåll ursprungsspårningen (C2PA-innehållsmärkning) intakt i stället för att skala bort den. Tyst AI-bild i ett nyhets- eller förtroendesammanhang är en ryktesrisk som bara väntar på att inträffa.',
          },
          {
            name: 'Respektera rättigheter & utseende',
            tagline: 'Klona inte det du inte äger',
            description:
              'Generera inte en verklig persons ansikte eller klona en röst utan samtycke, och var uppmärksam på anspråk kring träningsdata/stil. Använd licensierade eller syntetiska röster och modeller med tydliga kommersiella villkor — "det var AI" är inte ett försvar.',
          },
          {
            name: 'Granska för varumärke & riktighet',
            tagline: 'En människa godkänner',
            description:
              'Generativa verktyg producerar självsäkert felaktiga händer, förvanskad text-i-bilder eller ton som inte stämmer med varumärket. Behåll ett mänskligt godkännandesteg innan något kundvänt levereras — samma granskningsnivå som du skulle tillämpa på ett byråutkast.',
          },
          {
            name: 'Tänk på kostnaden',
            tagline: 'Video och ljud blir dyrt',
            description:
              'Bild är billigt, men videogenerering och stora batchjobb blir snabbt dyra. Sätt budgetar, generera i den storlek/längd du faktiskt behöver och mät kostnad per tillgång så att ett "snabbt experiment" inte blir en överraskningsfaktura.',
          },
        ],
        bridgeBlurb:
          'Du vet vad dessa verktyg gör och hur man använder dem väl. Nyfiken på vem som faktiskt bygger bild-, röst- och videomodellerna bakom dem — och hur företagen står sig? Se kartan.',
      },
    },
  },
}
