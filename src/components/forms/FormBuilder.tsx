import React from 'react'
import clsx from 'clsx'
import { Plus, X, AlertCircle } from 'lucide-react'

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'checkbox'
  | 'list'
  | 'medicine'

export interface FieldOption {
  value: string
  label: string
}

export interface FormFieldSchema {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: FieldOption[]
  helpText?: string
  min?: number
  max?: number
  columns?: 1 | 2
}

export interface FormSectionSchema {
  id: string
  title: string
  description?: string
  fields: FormFieldSchema[]
}

export interface ClinicalFormSchema {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  sections: FormSectionSchema[]
}

export type FormValues = Record<string, unknown>

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-[var(--danger)]">
      <AlertCircle size={12} /> {message}
    </p>
  )
}

const inputBase =
  'w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text)] ' +
  'placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 ' +
  'outline-none transition-all'

export function FormField({
  field,
  value,
  error,
  onChange,
}: {
  field: FormFieldSchema
  value: unknown
  error?: string
  onChange: (name: string, value: unknown) => void
}) {
  const id = `field-${field.name}`

  const renderControl = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            rows={4}
            value={(value as string) ?? ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={clsx(inputBase, 'resize-y')}
          />
        )
      case 'number':
        return (
          <input
            id={id}
            type="number"
            value={(value as string | number) ?? ''}
            min={field.min}
            max={field.max}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={inputBase}
          />
        )
      case 'date':
        return (
          <input
            id={id}
            type="date"
            value={(value as string) ?? ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={inputBase}
          />
        )
      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-[var(--text)]">
            <input
              id={id}
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
            {field.placeholder ?? 'Yes'}
          </label>
        )
      case 'select':
        return (
          <select
            id={id}
            value={(value as string) ?? ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={clsx(inputBase, 'cursor-pointer')}
          >
            <option value="">{field.placeholder ?? 'Select…'}</option>
            {field.options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )
      case 'multiselect': {
        const selected = Array.isArray(value) ? (value as string[]) : []
        const toggle = (v: string) =>
          onChange(
            field.name,
            selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v],
          )
        return (
          <div className="flex flex-wrap gap-2">
            {field.options?.map((o) => {
              const active = selected.includes(o.value)
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => toggle(o.value)}
                  className={clsx(
                    'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                    active
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                      : 'bg-[var(--surface-dim)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)]',
                  )}
                >
                  {o.label}
                </button>
              )
            })}
          </div>
        )
      }
      case 'list': {
        const items = Array.isArray(value) ? (value as string[]) : []
        const [draft, setDraft] = React.useState('')
        const add = () => {
          const v = draft.trim()
          if (!v) return
          onChange(field.name, [...items, v])
          setDraft('')
        }
        return (
          <div>
            <ul className="space-y-1.5 mb-2">
              {items.map((it, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-[var(--text)] bg-[var(--surface-dim)] rounded-lg px-3 py-1.5"
                >
                  <span className="flex-1 truncate">{it}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${it}`}
                    onClick={() => onChange(field.name, items.filter((_, idx) => idx !== i))}
                    className="text-[var(--text-muted)] hover:text-[var(--danger)]"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input
                value={draft}
                placeholder={field.placeholder ?? 'Add item…'}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    add()
                  }
                }}
                className={inputBase}
              />
              <button
                type="button"
                onClick={add}
                className="px-3 py-2.5 rounded-xl bg-[var(--primary-container)] text-[var(--primary)] hover:opacity-90 text-sm font-medium shrink-0"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        )
      }
      case 'medicine':
        return (
          <input
            id={id}
            type="text"
            value={(value as string) ?? ''}
            placeholder={field.placeholder ?? 'e.g. Amlodipine 5mg OD'}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={clsx(inputBase, 'cl-med-input')}
          />
        )
      case 'text':
      default:
        return (
          <input
            id={id}
            type="text"
            value={(value as string) ?? ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={inputBase}
          />
        )
    }
  }

  return (
    <div className={clsx(field.type === 'checkbox' ? 'pt-1' : '')}>
      {field.type !== 'checkbox' && (
        <label htmlFor={id} className="block text-xs font-semibold text-[var(--text)] mb-1.5">
          {field.label}
          {field.required && <span className="text-[var(--danger)] ml-0.5">*</span>}
        </label>
      )}
      {renderControl()}
      {field.helpText && <p className="mt-1 text-xs text-[var(--text-muted)]">{field.helpText}</p>}
      <FieldError message={error} />
    </div>
  )
}

export function FormSection({
  section,
  values,
  errors,
  onChange,
}: {
  section: FormSectionSchema
  values: FormValues
  errors: Record<string, string>
  onChange: (name: string, value: unknown) => void
}) {
  return (
    <section className="cl-card p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[var(--text)]">{section.title}</h3>
        {section.description && (
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{section.description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.fields.map((f) => (
          <div key={f.name} className={clsx(f.columns === 2 ? 'md:col-span-2' : 'md:col-span-1')}>
            <FormField
              field={f}
              value={values[f.name]}
              error={errors[f.name]}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export function FormRenderer({
  schema,
  values,
  errors,
  onChange,
}: {
  schema: ClinicalFormSchema
  values: FormValues
  errors: Record<string, string>
  onChange: (name: string, value: unknown) => void
}) {
  return (
    <div className="space-y-4">
      {schema.sections.map((s) => (
        <FormSection key={s.id} section={s} values={values} errors={errors} onChange={onChange} />
      ))}
    </div>
  )
}

export function validateForm(schema: ClinicalFormSchema, values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const section of schema.sections) {
    for (const field of section.fields) {
      if (!field.required) continue
      const v = values[field.name]
      const empty =
        v === undefined ||
        v === null ||
        v === '' ||
        (Array.isArray(v) && v.length === 0) ||
        (field.type === 'checkbox' && v !== true)
      if (empty) errors[field.name] = `${field.label} is required`
    }
  }
  return errors
}
