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
  },
}
