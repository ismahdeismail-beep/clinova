import React, { useMemo, useState } from 'react'
import { ClipboardList, Save, RotateCcw, CheckCircle2, FileJson, Printer } from 'lucide-react'
import {
  FormRenderer,
  validateForm,
  type ClinicalFormSchema,
  type FormValues,
} from '../components/forms'
import { CLINICAL_FORMS } from '../components/forms/presets'
import { PageHeader, Card, EmptyState } from '../components/clinical'

function emptyValues(schema: ClinicalFormSchema): FormValues {
  const v: FormValues = {}
  for (const s of schema.sections) for (const f of s.fields) v[f.name] = f.type === 'list' || f.type === 'multiselect' ? [] : ''
  return v
}

export default function FormBuilderScreen() {
  const [activeId, setActiveId] = useState(CLINICAL_FORMS[0].id)
  const [values, setValues] = useState<FormValues>(() => emptyValues(CLINICAL_FORMS[0]))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)

  const schema = useMemo(
    () => CLINICAL_FORMS.find((f) => f.id === activeId) ?? CLINICAL_FORMS[0],
    [activeId],
  )

  const selectForm = (id: string) => {
    const next = CLINICAL_FORMS.find((f) => f.id === id) ?? CLINICAL_FORMS[0]
    setActiveId(id)
    setValues(emptyValues(next))
    setErrors({})
    setSaved(false)
  }

  const handleChange = (name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
    setSaved(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validateForm(schema, values)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      setSaved(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleReset = () => {
    setValues(emptyValues(schema))
    setErrors({})
    setSaved(false)
  }

  const handlePrint = () => window.print()

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ form: schema.id, values }, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${schema.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <PageHeader
        title="Clinical Form Builder"
        subtitle="Standardized clinical documentation forms — SOAP, ADR, medication reconciliation, pharmacotherapy review."
        icon={<ClipboardList size={22} />}
        actions={
          <button
            type="button"
            onClick={exportJson}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--surface-dim)] text-[var(--text)] hover:bg-[var(--surface-hover)] text-sm font-medium border border-[var(--border)] transition-colors"
          >
            <FileJson size={16} /> Export JSON
          </button>
        }
      />

      {saved && (
        <div className="mb-4 p-3.5 rounded-xl bg-[var(--success-container)] border border-[var(--success)]/30 flex items-center gap-2 text-sm text-[var(--success)]">
          <CheckCircle2 size={16} /> Form validated and saved locally.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {CLINICAL_FORMS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => selectForm(f.id)}
            className={`flex flex-col items-start gap-1.5 p-3.5 rounded-xl border text-left transition-all ${
              activeId === f.id
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-sm'
                : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:border-[var(--primary)]'
            }`}
          >
            <span className={activeId === f.id ? 'text-[var(--primary-foreground)]' : 'text-[var(--primary)]'}>
              {f.icon}
            </span>
            <span className="text-sm font-semibold leading-tight">{f.title}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormRenderer schema={schema} values={values} errors={errors} onChange={handleChange} />

        <Card className="p-4 flex flex-wrap items-center gap-2.5 justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[var(--surface-dim)] text-[var(--text)] hover:bg-[var(--surface-hover)] text-sm font-medium border border-[var(--border)] transition-colors"
          >
            <RotateCcw size={16} /> Reset
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[var(--surface-dim)] text-[var(--text)] hover:bg-[var(--surface-hover)] text-sm font-medium border border-[var(--border)] transition-colors"
          >
            <Printer size={16} /> Print
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-95 text-sm font-semibold shadow-md transition-all"
          >
            <Save size={16} /> Save {schema.title}
          </button>
        </Card>
      </form>

      <div className="mt-10">
        <EmptyState
          icon={<ClipboardList size={20} />}
          title="Extensible form library"
          hint="Add new clinical forms by registering a ClinicalFormSchema in src/components/forms/presets.tsx."
        />
      </div>
    </div>
  )
}
