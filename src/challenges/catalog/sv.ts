interface ChallengeText {
  title?: string
  instructions?: string
  hints?: string[]
  placeholder?: string
  criteria?: Record<string, string>
}

export const challengeSvCatalog: Record<string, ChallengeText> = {
  'prompting-rubric-classify': {
    title: 'Skriv en klassificeringsprompt',
    instructions:
      'Skriv en system-prompt som får en LLM att klassificera ett inkommande kundmejl i exakt en av: Fakturering, Teknisk support eller Allmän fråga. Du har inga märkta exempel, så var tydlig. En stark prompt ger modellen en roll, definierar varje kategori, anger utdataformatet och hanterar tvetydiga fall.',
    hints: [
      'Börja med en roll: "Du är en klassificerare som…"',
      'Definiera varje kategori med ett kriterium, inte bara dess namn.',
      'Ange exakt vilket format svaret ska ha (t.ex. enbart kategorinamnet).',
      'Tala om för modellen vad den ska göra när mejlet inte passar någon kategori.',
    ],
    placeholder: 'Du är en…',
    criteria: {
      role: 'Ger modellen en tydlig roll',
      categories: 'Namnger alla tre kategorierna',
      'output-format': 'Anger ett utdataformat',
      ambiguity: 'Hanterar tvetydiga eller okända fall',
      'no-hedging': 'Undviker vaga, undflyende instruktioner',
      length: 'Tillräckligt detaljerad',
    },
  },
  'prompting-rubric-fewshot': {
    title: 'Lär genom exempel (few-shot)',
    instructions:
      'Skriv en prompt som använder few-shot-exempel för att få en LLM att extrahera sentimentet (positivt / negativt / neutralt) i en produktrecension. Inkludera minst två genomarbetade exempel i din prompt, där vart och ett visar en recension som indata och dess märkta utdata, och lämna sedan den sista indatan för modellen att slutföra.',
    hints: [
      'Visa, säg inte bara — inkludera par av indata→utdata.',
      'Håll formatet identiskt för varje exempel så att mönstret blir uppenbart.',
      'Täck mer än en etikett över dina exempel.',
    ],
    placeholder: 'Klassificera sentimentet i varje recension.\n\nRecension: "…"\nSentiment: …',
    criteria: {
      examples: 'Innehåller genomarbetade exempel',
      labels: 'Visar mer än en etikett',
      'consistent-format': 'Använder ett konsekvent indata-/utdataformat',
      length: 'Tillräckligt detaljerad',
    },
  },
  'prompting-rubric-json': {
    title: 'Tvinga fram strukturerad JSON-utdata',
    instructions:
      'Skriv en prompt som får en LLM att returnera ENDAST giltig JSON för ett efterföljande API: extrahera en persons namn, e-post och prioritet (en av low/medium/high) ur ett supportmeddelande. Ange det exakta schemat och förbjud all extra text runt JSON-en.',
    hints: [
      'Namnge varje fält och dess typ eller tillåtna värden.',
      'Förbjud uttryckligen markdown-staket eller förklarande text.',
      'Begränsa prioritet till dess tre tillåtna värden.',
    ],
    placeholder: 'Extrahera följande fält och returnera endast JSON…',
    criteria: {
      json: 'Begär JSON-utdata',
      fields: 'Namnger alla tre fälten',
      enum: 'Begränsar prioritet till tillåtna värden',
      'only-json': 'Förbjuder extra text runt JSON-en',
    },
  },
  'prompting-biz-rubric-brief': {
    title: 'Briefa AI:n som en kollega',
    instructions:
      'Ditt första försök med "skriv ett mejl åt mig" gav ett generiskt, oanvändbart resultat. Skriv om begäran som en ordentlig brief för ett uppföljningsmejl till en kund som inte svarat på två veckor. Tala om för AI:n vem den är, vem mejlet är till, vilket resultat du vill ha, tonen och längden.',
    hints: [
      'Säg vem AI:n ska vara (dess roll) och vem mejlet är till.',
      'Ange målet med mejlet, inte bara "skriv ett mejl".',
      'Lås fast ton och längd så att det inte kan glida mot det generiska.',
    ],
    placeholder: 'Du är min assistent. Skriv ett uppföljningsmejl till…',
    criteria: {
      role: 'Anger en roll eller målgrupp',
      constraints: 'Ger ramar (ton/längd)',
      tone: 'Anger en ton',
      goal: 'Anger mejlets mål',
      'not-vague': 'Undviker vagt fyllnadsspråk',
      length: 'Tillräckligt detaljerad',
    },
  },
  'aiproblem-biz-rubric-memo': {
    title: 'Rekommendera rätt verktyg',
    instructions:
      'Ett team lägger tre timmar om dagen på att sortera inkommande mejl i kategorier. Skriv en kort beslutspromemoria som rekommenderar ett tillvägagångssätt. Ange om detta kräver regelbaserad mjukvara, klassisk ML eller en LLM, motivera varför, och peka ut en risk eller felmod att hålla koll på.',
    hints: [
      'Välj ett tillvägagångssätt uttryckligen — vela inte mellan alla tre.',
      'Motivera valet mot uppgiften (repetitiv, mönsterbaserad, gott om exempel).',
      'Namnge en konkret felmod (t.ex. felklassificering, drift).',
    ],
    placeholder: 'Rekommendation: …\nVarför: …\nRisk att bevaka: …',
    criteria: {
      approach: 'Namnger ett specifikt tillvägagångssätt',
      justify: 'Motiverar valet',
      risk: 'Namnger en risk eller felmod',
      'no-hedge': 'Tar ställning till en rekommendation',
      length: 'Tillräckligt detaljerad',
    },
  },
  'training-rubric-loss': {
    title: 'Förklara vad loss egentligen betyder',
    instructions:
      'En kollega ser tränings-loss falla från 10.0 till 2.4 och drar slutsatsen "modellen är nu 75 % korrekt". Förklara vad cross-entropy-loss faktiskt mäter och varför den slutsatsen är fel. Var precis kring skillnaden mellan loss och träffsäkerhet.',
    hints: [
      'Definiera loss i termer av sannolikhet, inte en procentpoäng.',
      'Förklara varför ett lägre loss inte översätts till en "% korrekt".',
      'Nämn att loss och träffsäkerhet är olika storheter.',
    ],
    placeholder: 'Loss mäter…',
    criteria: {
      probability: 'Ramar in loss via sannolikhet / likelihood',
      'not-accuracy': 'Skiljer loss från träffsäkerhet',
      'no-percent-claim': 'Undviker att upprepa felet med 75 % korrekt',
      length: 'Tillräckligt detaljerad',
    },
  },
  'llmdata-rubric-pipeline': {
    title: 'Designa en pipeline för datarensning',
    instructions:
      'Designa en pipeline för datarensning av träningsdata som skrapats från webbforum. Beskriv stegen i ordning och motivera vart och ett. Ett starkt svar täcker deduplicering, kvalitetsfiltrering och minst ett domänspecifikt beslut om vad som ska inkluderas eller exkluderas.',
    hints: [
      'Ordningen spelar roll — beskriv stegen som en sekvens.',
      'Inkludera deduplicering och ett kvalitetsfilter uttryckligen.',
      'Gör en bedömning specifik för forumdata (spam, PII, lågkvalitativa inlägg).',
    ],
    placeholder: 'Steg 1: …\nSteg 2: …',
    criteria: {
      dedup: 'Innehåller deduplicering',
      quality: 'Innehåller kvalitetsfiltrering',
      domain: 'Tar ett domänspecifikt beslut',
      sequence: 'Beskriver ordnade steg',
      length: 'Tillräckligt detaljerad',
    },
  },
  'alignment-rubric-safety': {
    title: 'Skriv en säkerhets-system-prompt',
    instructions:
      'Skriv en system-prompt som styr en kundsupportassistent att hålla sig säker och på ämnet UTAN att låta förmanande. Den ska ange en roll, ge tydliga "gör inte"-ramar (t.ex. inga juridiska/medicinska råd, dela inte intern data) och tala om för modellen hur den ska tacka nej på ett smidigt sätt.',
    hints: [
      'Ge den en konkret roll och domän.',
      'Använd uttryckliga ramar — "gör inte", "aldrig", "endast".',
      'Säg hur den ska avböja eller omdirigera i stället för att bara avböja.',
    ],
    placeholder: 'Du är en supportassistent för…',
    criteria: {
      role: 'Anger en tydlig roll',
      constraints: 'Innehåller uttryckliga ramar',
      decline: 'Förklarar hur man avböjer smidigt',
      'not-preachy': 'Undviker förmanande, predikande språk',
      length: 'Tillräckligt detaljerad',
    },
  },
  'evaluation-rubric-evalrubric': {
    title: 'Designa en utvärderingsrubrik',
    instructions:
      'Designa en utvärderingsrubrik för att poängsätta svaren från en kundsupport-Q&A-bot. Inkludera minst tre distinkta dimensioner (t.ex. faktakorrekthet, källhänvisning/grundning, säkerhet, ton) och ge var och en ett konkret framgångskriterium — inte ett vagt "är det bra".',
    hints: [
      'Välj minst tre olika dimensioner.',
      'Skriv ett konkret godkänt-villkor för varje, inte "bra/dåligt".',
      'Undvik att luta dig mot en enda generisk benchmark-poäng.',
    ],
    placeholder: 'Dimension 1 — Faktakorrekthet: godkänns om…',
    criteria: {
      dimensions: 'Namnger flera utvärderingsdimensioner',
      criteria: 'Ger konkreta framgångskriterier',
      'not-vague': 'Undviker vagt "är det bra"',
      length: 'Tillräckligt detaljerad',
    },
  },
  'solution-rubric-buildbuy': {
    title: 'Argumentera bygga vs. köpa',
    instructions:
      'En startup behöver en AI-funktion inom två veckor, hanterar icke-känslig data och har inget ML-team. Skriv en rekommendation om huruvida de ska använda en API-tjänst (köpa) eller hosta själva/finjustera (bygga). Motivera den mot tidsram, team, kostnad och datakänslighet.',
    hints: [
      'Ta ställning till köpa eller bygga — stå inte med en fot i varje läger.',
      'Knyt valet till tidsram, teamets kapacitet och kostnad.',
      'Ta upp datakänslighet uttryckligen.',
    ],
    placeholder: 'Rekommendation: …',
    criteria: {
      decision: 'Tar ett tydligt beslut om bygga eller köpa',
      tradeoffs: 'Väger tidsram / team / kostnad',
      data: 'Adresserar datakänslighet',
      'no-straddle': 'Väljer ett alternativ (ingen vacklan)',
      length: 'Tillräckligt detaljerad',
    },
  },
  'embeddings-rubric-chunking': {
    title: 'Välj en chunking-strategi',
    instructions:
      'Du bygger RAG över en 100-sidig teknisk manual full av korsreferenser och tabeller. Rekommendera en chunking-strategi. Täck chunk-storlek, överlapp och hur du skulle hålla relaterat innehåll (eller långväga referenser) samlat.',
    hints: [
      'Säg något konkret om chunk-storlek.',
      'Nämn överlapp och varför det hjälper.',
      'Adressera semantiska gränser eller korsreferenser.',
    ],
    placeholder: 'Jag skulle chunka efter…',
    criteria: {
      size: 'Adresserar chunk-storlek',
      overlap: 'Nämner överlapp',
      boundaries: 'Hanterar semantiska gränser / referenser',
      length: 'Tillräckligt detaljerad',
    },
  },
  'agents-rubric-react': {
    title: 'Skriv en ReAct-resonemangsspårning',
    instructions:
      'Skriv en ReAct-spårning för en agent som besvarar "Hur är vädret i staden där vårt huvudkontor ligger?" Visa cykeln Thought → Action → Observation: minst en Thought, en Action som namnger ett verktyg med dess indata, och en Observation, innan ett slutligt svar.',
    hints: [
      'Märk stegen uttryckligen: Thought, Action, Observation.',
      'Action ska namnge ett verktyg och dess argument.',
      'Avsluta med ett slutligt svar som använder observationen.',
    ],
    placeholder: 'Thought: …\nAction: …\nObservation: …\nAnswer: …',
    criteria: {
      thought: 'Innehåller ett Thought-steg',
      action: 'Innehåller en Action som namnger ett verktyg',
      observation: 'Innehåller en Observation',
      answer: 'Avslutas med ett slutligt svar',
    },
  },
  'agents-biz-rubric-governance': {
    title: 'Hitta den saknade skyddsspärren',
    instructions:
      'En AI-agent godkände en återbetalning på $500 på ett bedrägligt ärende, allt inom dess tillåtna utgiftsgräns. Enbart en utgiftsgräns räckte uppenbart inte. Identifiera minst två styrningskontroller som saknades och förklara hur var och en skulle ha fångat detta.',
    hints: [
      'En utgiftsgräns är ett hårt tak — vilka kontextuella kontroller saknades?',
      'Tänk detektion (bedrägerisignaler) och eskalering (mänsklig granskning).',
      'Namnge minst två distinkta kontroller.',
    ],
    placeholder: 'Saknad kontroll 1: …',
    criteria: {
      controls: 'Namnger styrningskontroller',
      'beyond-cap': 'Inser att en utgiftsgräns är otillräcklig',
      how: 'Förklarar hur varje kontroll skulle fånga det',
      length: 'Tillräckligt detaljerad',
    },
  },
  'ai-in-org-rubric-autonomy': {
    title: 'Matcha autonomi mot risk',
    instructions:
      'För en uppgift med höga insatser — en agent som utfärdar kundåterbetalningar — föreslå rätt nivå av autonomi och tillsynen runt den. Ange autonominivån, motivera den mot risken och beskriv den övervakning eller eskalering som håller den säker.',
    hints: [
      'Hög risk betyder oftast lägre autonomi / en mänsklig kontrollpunkt.',
      'Motivera nivån mot konsekvenserna av ett misstag.',
      'Beskriv övervakning eller en eskaleringsväg.',
    ],
    placeholder: 'Autonominivå: …\nVarför: …\nTillsyn: …',
    criteria: {
      level: 'Anger en autonominivå',
      risk: 'Knyter nivån till risk',
      oversight: 'Beskriver övervakning eller eskalering',
      length: 'Tillräckligt detaljerad',
    },
  },
  'toolsland-rubric-scope': {
    title: 'Avgränsa ett uppdrag för en kodningsagent',
    instructions:
      'Skriv den brief du skulle ge ett agentiskt kodningsverktyg för att byta namn på en konfigurationsnyckel som förekommer i ~40 filer och uppdatera testerna. En bra brief anger resultatet, de ramar som spelar roll (bevara det publika gränssnittet, håll testerna gröna) och hur "klart" verifieras.',
    hints: [
      'Ange det konkreta resultatet, inte bara "fixa konfigurationen".',
      'Namnge ramarna: gränssnitt att bevara, tester att hålla godkända.',
      'Definiera klart — t.ex. "alla tester passerar och lint är ren".',
    ],
    placeholder: 'Byt namn på konfigurationsnyckeln … genom hela repot.',
    criteria: {
      outcome: 'Anger ett tydligt resultat',
      constraints: 'Namnger ramar att bevara',
      verify: 'Definierar hur klart verifieras',
      'not-vague': 'Undviker vagt fyllnadsspråk',
      length: 'Tillräckligt detaljerad',
    },
  },
  'toolsland-biz-rubric-delegate': {
    title: 'Delegera en återkommande uppgift',
    instructions:
      'Ditt driftsteam bygger om ett veckovis statussammandrag från fem kalkylark och en mejlmapp varje måndag. Skriv en brief som delegerar detta till en agentisk arbetsapp. Täck uppgiftens omfattning, indata/källor, det exakta leveransformatet och var en människa granskar innan det går ut.',
    hints: [
      'Lista källorna som agenten ska hämta från.',
      'Lås fast leveransformatet (t.ex. en sammanfattning på en sida, punktade avsnitt).',
      'Lägg till en mänsklig granskningspunkt innan det skickas.',
    ],
    placeholder: 'Varje måndag, sammanställ…',
    criteria: {
      sources: 'Namnger indata / källor',
      format: 'Anger leveransformatet',
      checkpoint: 'Innehåller en mänsklig granskningspunkt',
      'not-vague': 'Undviker vagt fyllnadsspråk',
      length: 'Tillräckligt detaljerad',
    },
  },
  'workai-rubric-instructions': {
    title: 'Skriv anpassade instruktioner',
    instructions:
      'Skriv de anpassade instruktioner du skulle sätta en gång för en kodningsassistent som arbetar i ditt projekt, så att du aldrig behöver förklara kontexten på nytt. Inkludera stacken/tekniken, kodstilen eller konventionerna, testkommandot och en regel för hur den ska bete sig (t.ex. fråga innan stora refaktoreringar).',
    hints: [
      'Ange teknikstacken så att den slutar gissa.',
      'Ge en stil-/konventionsregel och testkommandot.',
      'Lägg till en beteenderegel — vad den ska göra eller undvika som standard.',
    ],
    placeholder: 'Jag arbetar i… Gör alltid…',
    criteria: {
      stack: 'Namnger teknikstacken',
      conventions: 'Ger stil / konventioner',
      test: 'Anger hur tester körs',
      rule: 'Lägger till en beteenderegel',
      length: 'Tillräckligt detaljerad',
    },
  },
  'workai-biz-rubric-refine': {
    title: 'Förvandla en vag begäran till en brief',
    instructions:
      'En kollega skrev "skriv en produktuppdatering" och fick något generiskt. Skriv om det som en stark brief. Ange vem den är till för (målgrupp), målet, tonen, formatet och eventuell måste-med-detalj — så att AI:n inte kan falla tillbaka på ett generiskt medelvärde.',
    hints: [
      'Namnge målgruppen och målet först.',
      'Lås ton och format så att resultatet inte kan glida mot det generiska.',
      'Lägg till ett faktum eller en ram som måste vara med.',
    ],
    placeholder: 'Skriv en produktuppdatering för…',
    criteria: {
      audience: 'Namnger målgruppen',
      'tone-format': 'Anger ton och format',
      context: 'Tillhandahåller kontext',
      'not-vague': 'Undviker vagt fyllnadsspråk',
      length: 'Tillräckligt detaljerad',
    },
  },
  'optwf-rubric-template': {
    title: 'Förvandla en engångsgrej till en återanvändbar mall',
    instructions:
      'Du bygger om samma veckorapport från grunden i chatten varje måndag. Skriv en återanvändbar prompt-mall som gör det till ett system. Markera vad som ligger fast varje vecka (den stående kontexten, källorna, formatet) och lämna en tydlig plats för det som ändras (denna veckas data).',
    hints: [
      'Skilj de stående instruktionerna från den veckovisa variabeln.',
      'Baka in källorna och utdataformatet en gång.',
      'Använd en platshållare (t.ex. [denna veckas siffror]) för det som ändras.',
    ],
    placeholder: 'Du är min veckorapportassistent. Varje vecka…',
    criteria: {
      fixed: 'Fångar den stående kontexten',
      slot: 'Lämnar en plats för det som ändras',
      format: 'Bakar in källor eller format',
      length: 'Tillräckligt detaljerad',
    },
  },
  'optwf-biz-rubric-template': {
    title: 'Förvandla en engångsgrej till ett återanvändbart system',
    instructions:
      'Du bygger om samma veckorapport i chatten varje måndag och lägger 90 minuter på det. Skriv briefen du skulle spara och återanvända för att göra det till ett 5-minutersjobb. Skilj det som är samma varje vecka (källorna, formatet, reglerna) från det som ändras (denna veckas data) — beskriv resultatet på vanligt språk, ingen teknisk syntax behövs.',
    hints: [
      'Skriv uppgiften så att en kollega kan köra den utan att fråga dig något.',
      'Lista källorna (kalkylblad, mejl, filer) som är samma varje vecka.',
      'Beskriv utdataformatet så att resultatet alltid blir förutsägbart.',
      'Visa var denna veckas nya data eller siffror hör hemma.',
    ],
    placeholder: 'Varje måndag, samla in…',
    criteria: {
      fixed: 'Fångar den stående kontexten',
      variable: 'Markerar det som ändras varje cykel',
      sources: 'Namnger källorna',
      format: 'Beskriver utdataformatet',
      'not-vague': 'Undviker vagt fyllnadsspråk',
      length: 'Tillräckligt detaljerad',
    },
  },
  'agcode-rubric-agentsmd': {
    title: 'Skriv en AGENTS.md',
    instructions:
      'Skriv en AGENTS.md för ett Python Flask-projekt så att en kodningsagent startar förbriefad. Täck kommandona för setup/körning/test, konventionerna att följa (t.ex. type hints, felhantering), en notis om var nyckelkoden finns och en tydlig definition av klart.',
    hints: [
      'Lista kommandona för att installera, köra och testa.',
      'Ange konventioner som agenten måste följa.',
      'Avsluta med en definition av klart (tester passerar, lint är ren).',
    ],
    placeholder: '## Setup\n…\n## Konventioner\n…\n## Definition av klart\n…',
    criteria: {
      commands: 'Innehåller kommandon för setup / körning / test',
      conventions: 'Anger konventioner',
      done: 'Definierar klart',
      structure: 'Organiserad i sektioner',
      length: 'Tillräckligt detaljerad',
    },
  },
  'agcode-rubric-taskbrief': {
    title: 'Briefa en agent om en funktion',
    instructions:
      'Skriv den brief du skulle ge en kodningsagent för uppgiften "lägg till OAuth2-inloggning i auth-modulen". Avgränsa den som en brief till en duktig ingenjör: resultatet, ramarna (bevara det befintliga gränssnittet, lägg till tester), var relaterad kod finns och definitionen av klart.',
    hints: [
      'Ange resultatet och modulen det berör.',
      'Namnge ramarna: behåll det befintliga gränssnittet, lägg till tester.',
      'Peka på var relaterad kod finns, och definiera klart.',
    ],
    placeholder: 'Lägg till OAuth2-inloggning i auth-modulen. …',
    criteria: {
      outcome: 'Anger resultatet',
      constraints: 'Namnger ramar',
      done: 'Definierar klart / verifiering',
      'not-vague': 'Undviker vagt fyllnadsspråk',
      length: 'Tillräckligt detaljerad',
    },
  },
  'agwork-rubric-brief': {
    title: 'Skriv en delegerbar brief',
    instructions:
      'Skriv en brief som delegerar "månatlig avstämning av leverantörsfakturor mot inköpsorder" till en agentisk arbetsapp. Täck uppgiftens omfattning, indata, policyn/reglerna att tillämpa, den exakta leveransen och kontrollpunkten där en människa granskar innan något slutförs.',
    hints: [
      'Beskriv vad agenten gör, steg för steg på en hög nivå.',
      'Ange reglerna/policyn den måste tillämpa.',
      'Lägg till en mänsklig kontrollpunkt innan något slutförs.',
    ],
    placeholder: 'Stäm av denna månads leverantörsfakturor mot…',
    criteria: {
      inputs: 'Namnger indata',
      rules: 'Anger reglerna / policyn',
      checkpoint: 'Innehåller en mänsklig kontrollpunkt',
      'not-vague': 'Undviker vagt fyllnadsspråk',
      length: 'Tillräckligt detaljerad',
    },
  },
  'agwork-rubric-guardrails': {
    title: 'Sätt skyddsspärrar för en agent',
    instructions:
      'En agent ska godkänna kundåterbetalningar upp till $500 på egen hand. Skriv de skyddsspärrar som håller detta säkert. Täck godkännandetröskeln, vad som utlöser mänsklig granskning, en kontroll för avvikelser/bedrägeri och kravet på ett spårbarhetslogg.',
    hints: [
      'Sätt tröskeln över vilken en människa måste godkänna.',
      'Lägg till en avvikelse-/bedrägerikontroll, inte bara ett dollartak.',
      'Kräv ett spårbarhetslogg över varje beslut.',
    ],
    placeholder: 'Skyddsspärrar:\n- Återbetalningar över $… kräver…',
    criteria: {
      threshold: 'Sätter en godkännandetröskel',
      human: 'Utlöser mänsklig granskning',
      anomaly: 'Kontrollerar avvikelser / bedrägeri',
      audit: 'Kräver ett spårbarhetslogg',
      length: 'Tillräckligt detaljerad',
    },
  },
  'genai-rubric-vision': {
    title: 'Prompta en vision-modell',
    instructions:
      'Skriv den prompt du skulle skicka till en vision-modell för att extrahera strukturerad data ur en inskannad fakturabild. Ange fälten som ska extraheras, begär JSON-utdata och säg vad som ska hända om ett fält är oläsligt eller saknas.',
    hints: [
      'Lista fälten du behöver från bilden.',
      'Be om strukturerad JSON, inte löpande text.',
      'Säg vad som ska göras när ett värde är oläsligt.',
    ],
    placeholder: 'Från den bifogade fakturabilden, extrahera…',
    criteria: {
      fields: 'Namnger fält att extrahera',
      json: 'Begär strukturerad utdata',
      fallback: 'Hanterar oläsliga / saknade värden',
      length: 'Tillräckligt detaljerad',
    },
  },
  'genai-biz-rubric-imagebrief': {
    title: 'Briefa ett bildgenereringsverktyg',
    instructions:
      'Marknad vill ha 50 varumärkesenliga produktbilder för sociala medier, snabbt. Skriv en brief för ett bildgenereringsverktyg. Täck motivet och stilen, kraven på varumärkeskonsekvens, en granskningspunkt innan publicering och en notis om kostnad eller batch-storlek.',
    hints: [
      'Beskriv motivet och den visuella stilen.',
      'Peka ut kraven på varumärkeskonsekvens.',
      'Lägg till ett granskningssteg innan något publiceras.',
    ],
    placeholder: 'Generera produktbilder som…',
    criteria: {
      style: 'Beskriver motiv och stil',
      consistency: 'Kräver varumärkeskonsekvens',
      review: 'Lägger till en granskningspunkt',
      length: 'Tillräckligt detaljerad',
    },
  },
}
