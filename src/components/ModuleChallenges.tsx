import { CHALLENGE_CATALOG } from '../challenges/catalog'
import { Challenge } from './Challenge'

interface ModuleChallengesProps {
  /** The KnowledgeCheck-style moduleId, e.g. 'prompting' or 'prompting-business'. */
  moduleId: string
}

/**
 * Renders every catalogued challenge for a given module/track, stacked the way
 * KnowledgeCheck sits at the end of a module. Renders nothing when the module
 * has no challenges, so it is safe to drop into every module unconditionally.
 */
export const ModuleChallenges: React.FC<ModuleChallengesProps> = ({ moduleId }) => {
  const challenges = CHALLENGE_CATALOG[moduleId]
  if (!challenges || challenges.length === 0) return null
  return (
    <>
      {challenges.map((challenge) => (
        <Challenge key={challenge.id} moduleId={moduleId} challenge={challenge} />
      ))}
    </>
  )
}
