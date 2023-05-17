import { Audio } from 'ts-audio'
const paths = import.meta.glob<string>('../assets/audio/*.ogg', { eager: true })

for (const key of Object.keys(paths)) {
  const path = paths[key]
  const name = path
    .replace('../assets/audio/', '')
    .replace('.ogg', '')
  delete paths[key]
  paths[name] = path
}

export const audios = {
  die: Audio({ file: paths.die }),
  hit: Audio({ file: paths.hit }),
  point: Audio({ file: paths.point }),
  swoosh: Audio({ file: paths.swoosh }),
  wing: Audio({ file: paths.wing }),
}
