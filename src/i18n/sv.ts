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
  },
}
