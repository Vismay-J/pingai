const { neon } = require('@netlify/neon')

// CORS helper
function corsHeaders(origin) {
    return {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }
}

exports.handler = async function(event, context) {
    const headers = corsHeaders(event.headers && event.headers.origin)

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers }
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method Not Allowed' }
    }

    try {
        const body = JSON.parse(event.body || '{}')
        const emailOrPhone = (body.emailOrPhone || '').trim()
        const name = (body.name || '').trim()
        const source = (body.source || 'website-waitlist').trim()
        const consent = body.consent === true

        if (!emailOrPhone) {
            return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'emailOrPhone is required' }) }
        }

        if (!consent) {
            return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'Consent is required' }) }
        }

        const sql = neon()

        // Ensure extension and table exist (idempotent)
        await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto;`
        await sql`
            CREATE TABLE IF NOT EXISTS waitlist (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email_or_phone TEXT NOT NULL,
                name TEXT,
                source TEXT,
                consent BOOLEAN NOT NULL DEFAULT false,
                user_agent TEXT,
                ip_address TEXT,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `
        
        // Add consent column if it doesn't exist (for existing tables)
        await sql`
            DO $$ 
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name = 'waitlist' AND column_name = 'consent'
                ) THEN
                    ALTER TABLE waitlist ADD COLUMN consent BOOLEAN NOT NULL DEFAULT false;
                END IF;
            END $$;
        `

        // Insert entry
        const userAgent = event.headers && (event.headers['user-agent'] || event.headers['User-Agent'] || '')
        const ip = (event.headers && (event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'] || ''))

        await sql`
            INSERT INTO waitlist (email_or_phone, name, source, consent, user_agent, ip_address)
            VALUES (${emailOrPhone}, ${name || null}, ${source || null}, ${consent}, ${userAgent || null}, ${ip || null});
        `

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ ok: true })
        }
    } catch (err) {
        console.error('waitlist function error:', err)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ ok: false, error: 'Server error' })
        }
    }
}


