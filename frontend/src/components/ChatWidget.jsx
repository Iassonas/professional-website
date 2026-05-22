import { useState, useRef, useEffect } from 'react'
import styles from './ChatWidget.module.css'

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Iassonas's AI assistant. Ask me about his work, docusearch.eu, or how he could help on your project." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      const data = await res.json()

      if (res.ok) {
        setMessages([...updatedMessages, { role: 'assistant', content: data.reply }])
      } else {
        setMessages([...updatedMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
      }
    } catch {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Network error. Please try again.' }])
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
