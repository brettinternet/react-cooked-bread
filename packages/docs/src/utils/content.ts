import { capitalize } from 'lodash'

const sentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Vitae nunc sed velit dignissim sodales.',
  'Quis lectus nulla at volutpat.',
  'Dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc.',
  'Magna sit amet purus gravida quis blandit turpis cursus in.',
  'Massa eget egestas purus viverra accumsan.',
  'Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque.',
  'Id semper risus in hendrerit gravida rutrum.',
  'Amet dictum sit amet justo donec enim diam vulputate ut.',
  'Elit eget gravida cum sociis natoque.',
  'Arcu non sodales neque sodales ut etiam sit.',
  'Lacinia quis vel eros donec ac odio tempor.',
  'Massa tincidunt nunc pulvinar sapien.',
  'Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.',
  'Eget dolor morbi non arcu risus. Cursus risus at ultrices mi tempus imperdiet. Nibh mauris cursus mattis molestie a iaculis at.',
  'Neque gravida in fermentum et. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Morbi leo urna molestie at. Tincidunt arcu non sodales neque sodales ut etiam sit. Ipsum consequat nisl vel pretium lectus quam id. Gravida neque convallis a cras semper auctor.',
  'Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla. Nisl nunc mi ipsum faucibus vitae aliquet. Sed nisi lacus sed viverra. At elementum eu facilisis sed odio.',
  'Ac tortor dignissim convallis aenean. At augue eget arcu dictum varius duis. Vulputate dignissim suspendisse in est ante.',
  'A arcu cursus vitae congue mauris rhoncus aenean. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Diam sit amet nisl suscipit adipiscing.',
  'At tellus at urna condimentum mattis pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Amet nisl purus in mollis nunc.',
]

export const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
export const getRandomPhrase = () => getRandom(sentences)
export const getRandomShortPhrase = () => getRandomPhrase().split(' ').slice(0, 2).join(' ')
export const getRandomWord = () =>
  capitalize(getRandom(getRandomPhrase().split(' '))).replace(/\./g, '')
