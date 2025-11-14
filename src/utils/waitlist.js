export async function submitWaitlistEntry(entry) {
    const endpoint = import.meta.env.VITE_WAITLIST_WEBHOOK_URL || '/.netlify/functions/waitlist'
    if (!endpoint) {
        throw new Error('Missing VITE_WAITLIST_WEBHOOK_URL')
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    })

    // Some providers (e.g., Formspree) may return 200/202 on success
    if (!response.ok && response.status !== 202) {
        const message = await safeReadText(response)
        throw new Error(message || `Request failed with ${response.status}`)
    }

    return true
}

async function safeReadText(response) {
    try {
        return await response.text()
    } catch (e) {
        return ''
    }
}


