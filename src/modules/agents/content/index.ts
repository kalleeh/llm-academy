import type { Language } from '../../../i18n'
import type { WhatAreAgentsContent } from './whatAreAgents.en'
import { content as en } from './whatAreAgents.en'
import { content as sv } from './whatAreAgents.sv'
import { content as ko } from './whatAreAgents.ko'

const all: Record<Language, WhatAreAgentsContent> = { en, sv, ko }

export function getWhatAreAgentsContent(lang: Language): WhatAreAgentsContent {
  return all[lang] ?? all.en
}
