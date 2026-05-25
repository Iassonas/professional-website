import { useState, useRef, useEffect } from 'react'
import styles from './ChatWidget.module.css'

const GREETING = { role: 'assistant', content: "Hi! I'm Iassonas's AI assistant. Ask me about his work, docusearch.eu, or how he could help on your project." }
const MAX_MESSAGE_CHARS = 2000

function errorMessageForStatus(status) {
  if (status === 429) return "You're sending messages too fast. Please wait a moment and try again."
  if (status === 422) return "That message couldn't be processed. Please try a shorter one."
  if (status === 503) return "The assistant is temporarily offline. Please use the Contact page to reach Iassonas directly."
  return "Sorry, something went wrong. Please try again."
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const resetConversation = () => {
    if (loading) return
    setMessages([GREETING])
    setInput('')
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const trimmed = input.trim().slice(0, MAX_MESSAGE_CHARS)
    const userMsg = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages.filter(m => m !== GREETING) }),
      })

      if (!res.ok) {
        setMessages([...updatedMessages, { role: 'assistant', content: errorMessageForStatus(res.status) }])
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let assistantContent = ''
      let sawError = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split('\n\n')
        buffer = events.pop()

        for (const event of events) {
          const line = event.split('\n').find(l => l.startsWith('data: '))
          if (!line) continue
          const data = line.slice(6)
          if (data === '[DONE]') continue
          try {
            const parsed = JSON.parse(data)
            if (parsed.delta) {
              assistantContent += parsed.delta
              setMessages([...updatedMessages, { role: 'assistant', content: assistantContent }])
            } else if (parsed.error) {
              sawError = true
            }
          } catch {}
        }
      }

      if (!assistantContent) {
        const fallback = sawError
          ? "I couldn't generate a response. Please try again, or use the Contact page."
          : errorMessageForStatus(500)
        setMessages([...updatedMessages, { role: 'assistant', content: fallback }])
      }
    } catch {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Network error. Please check your connection and try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '\u2715' : '\u{1F4AC}'}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.headerDot} />
            <div className={styles.headerText}>
              <span className={styles.headerTitle}>Ask anything</span>
              <span className={styles.headerSubtitle}>About my work · docusearch.eu</span>
            </div>
            <button
              type="button"
              className={styles.headerClose}
              onClick={resetConversation}
              disabled={loading || messages.length <= 1}
              aria-label="Reset conversation"
              title="Reset conversation"
            >
              ↻
            </button>
            <button
              type="button"
              className={styles.headerClose}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.bubble} ${msg.role === 'user' ? styles.user : styles.assistant}`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className={`${styles.bubble} ${styles.assistant}`}>
                <span className={styles.typing}>
                  <span /><span /><span />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.inputBar} onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatWidget
