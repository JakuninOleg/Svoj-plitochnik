'use client'

import { useRef, useState } from 'react'

function digitsOnly(value: string) {
  return (value || '').replace(/\D/g, '')
}

function toRuDigits(raw: string) {
  let digits = digitsOnly(raw)
  if (!digits) return ''
  // Pasting an 8-prefixed number into the focused "+7 (" stub briefly
  // produces 12 digits: the stub's 7 plus the pasted 8XXXXXXXXXX.
  if (digits.length > 11 && digits.startsWith('78')) digits = digits.slice(1)
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (digits.startsWith('9')) digits = `7${digits}`
  if (!digits.startsWith('7')) digits = `7${digits}`
  return digits.slice(0, 11)
}

function normalizeRuPhone(value: string) {
  let digits = digitsOnly(value)
  if (!digits) return null
  if (digits.length === 11 && digits.startsWith('8')) digits = `7${digits.slice(1)}`
  if (digits.length === 10 && digits.startsWith('9')) digits = `7${digits}`
  return /^7[3-9]\d{9}$/.test(digits) ? digits : null
}

function formatFromDigits(digits: string) {
  if (!digits || digits === '7') return '+7 ('
  if (digits.length < 4) return `+7 (${digits.slice(1)}`
  if (digits.length === 4) return `+7 (${digits.slice(1, 4)}`
  if (digits.length < 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
  if (digits.length < 9) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`
}

function digitCountBefore(formatted: string, caret: number) {
  let count = 0
  for (let index = 0; index < caret && index < formatted.length; index += 1) {
    if (/\d/.test(formatted[index] || '')) count += 1
  }
  return count
}

function caretAfterDigitCount(formatted: string, digitCount: number) {
  if (digitCount <= 0) {
    const openBracket = formatted.indexOf('(')
    return openBracket >= 0 ? openBracket + 1 : formatted.length
  }
  let count = 0
  for (let index = 0; index < formatted.length; index += 1) {
    if (/\d/.test(formatted[index] || '')) {
      count += 1
      if (count >= digitCount) return index + 1
    }
  }
  return formatted.length
}

export function PhoneInput({ id }: { id?: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [phone, setPhone] = useState('')
  const [formattedPhone, setFormattedPhone] = useState('')

  const apply = (digits: string, caretDigits?: number) => {
    const formatted = digits ? formatFromDigits(digits) : ''
    setPhone(digits)
    setFormattedPhone(formatted)

    const input = inputRef.current
    if (!input || caretDigits === undefined) return
    const position = caretAfterDigitCount(formatted, caretDigits)
    requestAnimationFrame(() => input.setSelectionRange(position, position))
  }

  return (
    <input
      ref={inputRef}
      id={id}
      value={formattedPhone}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      name="phone"
      placeholder="+7 (___) ___-__-__"
      maxLength={18}
      required
      onFocus={() => {
        if (!phone) apply('7', 1)
      }}
      onBlur={() => {
        const raw = phone || toRuDigits(inputRef.current?.value || '')
        const normalized = normalizeRuPhone(raw)
        if (!normalized) {
          if (!raw || raw === '7') apply('')
          return
        }
        apply(normalized)
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Backspace' && event.key !== 'Delete') return

        const input = inputRef.current
        if (!input) return
        const start = input.selectionStart ?? 0
        const end = input.selectionEnd ?? 0
        event.preventDefault()

        if (start !== end) {
          const from = digitCountBefore(formattedPhone, start)
          const to = digitCountBefore(formattedPhone, end)
          const digits = toRuDigits(phone.slice(0, from) + phone.slice(to)) || '7'
          apply(digits, Math.max(1, from))
          return
        }

        if (event.key === 'Backspace') {
          const index = digitCountBefore(formattedPhone, start)
          if (index <= 1) {
            apply('7', 1)
            return
          }
          const digits = phone.slice(0, index - 1) + phone.slice(index)
          apply(digits || '7', index - 1)
          return
        }

        const index = digitCountBefore(formattedPhone, start)
        if (index < 1 || index >= phone.length) return
        const digits = phone.slice(0, index) + phone.slice(index + 1)
        apply(digits || '7', index)
      }}
      onChange={(event) => {
        const input = event.currentTarget
        const caret = input.selectionStart ?? input.value.length
        const typingAtEnd = caret >= input.value.length
        const digitsBefore = digitCountBefore(input.value, caret)
        const digits = toRuDigits(input.value) || '7'
        const caretDigits = typingAtEnd
          ? digits.length
          : Math.max(1, Math.min(digits.length, digitsBefore))
        apply(digits, caretDigits)
      }}
    />
  )
}
