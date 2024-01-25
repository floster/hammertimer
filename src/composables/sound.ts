import workSfx from '@/sounds/work.mp3'
import breakSfx from '@/sounds/break.mp3'

export const useAudio = () => {
  // create audio objects
  const audioWork = new Audio(workSfx)
  const audioBreak = new Audio(breakSfx)

  const playWork = () => audioWork.play()
  const playBreak = () => audioBreak.play()
  return { playWork, playBreak }
}
