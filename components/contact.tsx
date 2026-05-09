'use client'

import { FormEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, MapPin, Check, Send, AlertCircle, X } from 'lucide-react'
import { track } from '@vercel/analytics'
import { Panel, PanelChip } from './panel'
import { profile } from '@/data/profile'

export function Contact() {
  const [data, setData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true); setErr(null); setSent(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error || 'Failed to send message')
      setSent(true)
      setData({ name: '', email: '', message: '' })
      track('contact_form_submit', { status: 'success' })
      setTimeout(() => setSent(false), 8000)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to send message'
      setErr(msg)
      track('contact_form_submit', { status: 'error', error: msg })
    } finally {
      setBusy(false)
    }
  }

  return (
    <Panel
      id="contact"
      title="// contact · prompt"
      actions={<PanelChip>open to roles + freelance</PanelChip>}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {/* Coords card */}
        <div className="rounded-md border border-border bg-bg/40 p-4 font-mono text-[13px] space-y-2.5">
          <a className="flex items-center gap-2.5 text-muted hover:text-accent transition-colors group" href={`mailto:${profile.email}`}>
            <Mail className="h-4 w-4 text-accent shrink-0" />
            <span className="group-hover:text-text">{profile.email}</span>
          </a>
          <a className="flex items-center gap-2.5 text-muted hover:text-accent transition-colors group" href={profile.github} target="_blank" rel="noopener noreferrer"
             onClick={() => track('social_link_click', { platform: 'github', location: 'contact' })}>
            <Github className="h-4 w-4 text-accent shrink-0" />
            <span className="group-hover:text-text">github.com/Hriitz</span>
          </a>
          <a className="flex items-center gap-2.5 text-muted hover:text-accent transition-colors group" href={profile.linkedin} target="_blank" rel="noopener noreferrer"
             onClick={() => track('social_link_click', { platform: 'linkedin', location: 'contact' })}>
            <Linkedin className="h-4 w-4 text-accent shrink-0" />
            <span className="group-hover:text-text">linkedin.com/in/hriitz</span>
          </a>
          <a className="flex items-center gap-2.5 text-muted hover:text-accent transition-colors group" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
            <Phone className="h-4 w-4 text-accent shrink-0" />
            <span className="group-hover:text-text">{profile.phone}</span>
          </a>
          <div className="flex items-center gap-2.5 text-muted">
            <MapPin className="h-4 w-4 text-accent shrink-0" />
            <span>Mumbai, Maharashtra, India · IST</span>
          </div>

          <div className="border-t border-dashed border-border-strong pt-3 mt-3 text-[11.5px] text-muted-2">
            $ uptime — open to <span className="text-accent">founding · platform · staff</span> roles &amp; <span className="text-accent">freelance</span> projects.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-3 font-mono text-[13px]">
          <FormRow label="from">
            <input
              required
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
              placeholder="your name"
              className="w-full bg-transparent border-b border-dashed border-border-strong py-1.5 outline-none focus:border-accent transition-colors"
            />
          </FormRow>
          <FormRow label="reply-to">
            <input
              required type="email"
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
              placeholder="you@domain.com"
              className="w-full bg-transparent border-b border-dashed border-border-strong py-1.5 outline-none focus:border-accent transition-colors"
            />
          </FormRow>
          <FormRow label="subject">
            <span className="text-muted">re: an opportunity, a question, or just saying hi</span>
          </FormRow>
          <div>
            <textarea
              required
              rows={5}
              value={data.message}
              onChange={e => setData({ ...data, message: e.target.value })}
              placeholder="hey hritik, ..."
              className="mt-2 w-full rounded-md border border-dashed border-border-strong bg-bg/40 p-3 outline-none focus:border-accent resize-y transition-colors"
            />
          </div>

          <AnimatePresence>
            {err && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className="rounded-md border border-down/50 bg-down/10 px-3 py-2 text-[12.5px] text-down flex items-start gap-2"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="flex-1">{err}</span>
                <button onClick={() => setErr(null)} aria-label="Dismiss"><X className="h-3.5 w-3.5"/></button>
              </motion.div>
            )}
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className="rounded-md border border-up/50 bg-up/10 px-3 py-2 text-[12.5px] text-up flex items-start gap-2"
              >
                <Check className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="flex-1">Message delivered. Reply queued.</span>
                <button onClick={() => setSent(false)} aria-label="Dismiss"><X className="h-3.5 w-3.5"/></button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={busy || sent}
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-panel-2 px-4 py-2 text-accent hover:bg-panel disabled:opacity-50 transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
            {busy ? 'sending...' : sent ? 'sent ✓' : '⌘ + ↵ send'}
          </button>
        </form>
      </div>
    </Panel>
  )
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-center gap-3">
      <label className="text-muted">{label}:</label>
      <div>{children}</div>
    </div>
  )
}
