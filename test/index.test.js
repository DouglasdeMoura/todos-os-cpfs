import { test } from 'node:test'
import assert from 'node:assert/strict'

import { calculateVerificationDigit } from '../src/index.js'

test('calculate the verification digit', () => {
  assert.equal(calculateVerificationDigit('280012389'), '38')
  assert.equal(calculateVerificationDigit('000000001'), '91')
})