import type { WhatAreAgentsContent } from './whatAreAgents.en'

export const content: WhatAreAgentsContent = {
  sectionTitle: '1. Vad är AI-agenter?',
  intro: 'De flesta AI-verktyg idag är som **en väldigt smart kollega du kan smsa** — de svarar på frågor, men de kan inte faktiskt *göra* något. En AI-agent är annorlunda: den är mer som **en personlig assistent som kan agera å dina vägnar**.',
  introSub: 'Tänk på skillnaden mellan att fråga någon "vilken tid är mötet?" och "flytta mitt möte till torsdag och meddela alla."',
  demoTitle: 'Från chattbot till agent',
  demoDescription: 'Klicka dig igenom för att se hur AI-kapaciteten utvecklas — från en kollega som svarar på frågor till en assistent som hanterar uppgifter.',
  levels: [
    {
      level: 'Chattbot',
      analogy: 'Som att smsa en kunnig vän',
      description: 'Du ställer en fråga, du får ett svar. Det är allt. AI:n kan inte kolla upp något, söka efter information eller göra något åt dig. Den vet bara det den tränats på.',
      everyday: 'Tänk dig att du frågar en kollega något på Slack — de svarar ur minnet, men de kan inte öppna ditt kalkylblad eller kolla din kalender åt dig.',
      limit: 'Om svaret kräver aktuell information eller att något görs, får du göra det själv.',
    },
    {
      level: 'AI + Sökning',
      analogy: 'Som en kollega som kan googla saker',
      description: 'AI:n kan söka information innan den svarar — söka i företagets dokument, kolla en kunskapsbas eller surfa på webben. Detta kallas RAG (Retrieval-Augmented Generation).',
      everyday: 'Som att fråga din kollega något och de säger "vänta, jag kollar den delade mappen" — och sedan kommer tillbaka med ett svar som refererar till faktiska dokument.',
      limit: 'Den kan hitta information, men kan fortfarande inte agera. Den kan berätta att mötet är kl 15, men kan inte boka om det.',
    },
    {
      level: 'AI-agent',
      analogy: 'Som en personlig assistent som får saker gjorda',
      description: 'AI:n kan tänka ut vad som behöver hända, utföra handlingar (skicka e-post, uppdatera kalkylblad, boka möten, söka i databaser), kontrollera resultaten och fortsätta tills uppgiften är klar.',
      everyday: 'Som att säga till din assistent "flytta mina torsdagsmöten till nästa vecka och maila deltagarna." De listar ut stegen, gör dem, hanterar eventuella problem och rapporterar tillbaka.',
      limit: 'Kraftfullare men behöver skyddsräcken — du vill godkänna stora beslut innan assistenten agerar.',
    },
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
    {
      scenario: 'Kundsupport',
      without: 'Agenten svarar på frågan från ett manus. Kunden måste fortfarande navigera webbplatsen själv för att ändra sitt abonnemang.',
      with: 'Agenten slår upp kundens konto, kontrollerar faktureringen, ändrar abonnemanget, skickar ett bekräftelsemail — allt i en konversation.',
    },
    {
      scenario: 'Utläggsrapporter',
      without: 'AI:n kan förklara utläggspolicyn. Medarbetaren fyller fortfarande i formuläret manuellt.',
      with: 'Medarbetaren vidarebefordrar ett kvitto. Agenten läser det, fyller i utläggsformuläret, kategoriserar det korrekt och skickar in det för godkännande.',
    },
    {
      scenario: 'Mötesförberedelser',
      without: 'AI:n sammanfattar ett dokument du klistrar in. Du måste fortfarande hitta rätt dokument själv.',
      with: 'Du säger "förbered mig inför kundsamtalet kl 14." Agenten hämtar kundens senaste e-post, förra mötesanteckningarna, öppna offerter och skapar en sammanfattning på en sida.',
    },
  ],
  withoutLabel: 'Utan agent',
  withLabel: 'Med agent',
  everydayLabel: 'Vardaglig jämförelse',
  limitLabel: 'Begränsning:',
  selfExplainPrompt: 'Förklara med egna ord skillnaden mellan en chattbot och en agent för en kollega som aldrig hört talas om AI-agenter. Använd en vardaglig jämförelse.',
  selfExplainAnswer: 'En chattbot är som att smsa en väldigt kunnig vän — de kan svara på dina frågor, men de kan inte göra något åt dig. En agent är som att ha en personlig assistent — du kan säga "boka en flygresa till London nästa tisdag, under 5000 kr, gångplats" och de söker faktiskt efter flyg, jämför alternativ, bokar det och skickar dig bekräftelsen. Den avgörande skillnaden är handling: en chattbot pratar, en agent gör.',
}
