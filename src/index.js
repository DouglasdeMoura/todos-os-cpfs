import fs from 'node:fs'
import stream from 'node:stream'
import util from 'node:util'
import { once } from 'events'

/**
 * Calculate the verification digit of a CPF number
 * 
 * @param {string} numbers 
 * @returns {string}
 */
export function calculateVerificationDigit(numbers) {
  const CONSTANT = 11

  const mod = (x) => x % CONSTANT
  const getDigit = (r) => r > 1 ? CONSTANT - r : 0

  const splittedNumbers = numbers.split('')

  let { firstDigit, secondDigit } = splittedNumbers
    .reduce((accumulator, currentValue, currentIndex, array) => {
      const nextIndex = currentIndex + 1

      let firstDigit = accumulator.firstDigit + (currentValue * accumulator.multiplier)
      let secondDigit = nextIndex < array.length ?
        accumulator.secondDigit + (array[nextIndex] * accumulator.multiplier) :
        accumulator.secondDigit

      if (nextIndex === array.length) {
        firstDigit = getDigit(mod(firstDigit))
      }

      return {
        multiplier: accumulator.multiplier - 1,
        firstDigit,
        secondDigit,
      }
    }, { multiplier: 10, firstDigit: 0, secondDigit: 0 })

  secondDigit = getDigit(mod(secondDigit + (firstDigit * 2)))

  return `${firstDigit}${secondDigit}`
}

/**
 * Generate combinations of numbers, base on the desired length
 * 
 * @param {string} prefix 
 * @param {number} length 
 * @returns {string}
 */
function* generateCombinations(prefix, length) {
  if (prefix.length === length) {
    yield `${prefix}${calculateVerificationDigit(prefix)}`
    return
  }

  for (let i = 0; i <= 9; i++) {
    yield* generateCombinations(prefix + i, length)
  }
}

function* getAllCombinations(length) {
  yield* generateCombinations('', length)
}

const finished = util.promisify(stream.finished)

/**
 * Write an iterable to a file.
 * 
 * @param {import('stream').Readable} iterable 
 * @param {string} filePath 
 */
async function writeIterableToFile(iterable, filePath) {
  const writable = fs.createWriteStream(filePath, { encoding: 'utf8' });
  for await (const chunk of iterable) {
    if (!writable.write(`${chunk}\n`)) {
      // Handle backpressure
      await once(writable, 'drain');
    }
  }
  writable.end()
  // Wait until done. Throws if there are errors.
  await finished(writable)
}

await writeIterableToFile(
  stream.Readable.from(getAllCombinations(9)),
  'cpfs.txt'
)