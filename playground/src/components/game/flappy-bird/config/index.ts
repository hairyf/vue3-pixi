import { Audio } from 'ts-audio'
const paths = import.meta.glob<string>('../assets/audio/*.wav', { eager: true })

for (const key of Object.keys(paths)) {
  const path = paths[key]
  const name = key
    .replace('../assets/audio/', '')
    .replace('.wav', '')
  delete paths[key]
  paths[name] = (path as any).default
}

export const audios = {
  die: Audio({ file: paths.die }),
  hit: Audio({ file: paths.hit }),
  point: Audio({ file: paths.point }),
  swoosh: Audio({ file: paths.swoosh }),
  wing: Audio({ file: paths.wing }),
}
