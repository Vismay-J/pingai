import React from 'react'
import './ValueTeam.css'

function ValueTeam() {
  return (
    <section className="value-team section">
      <div className="container">
        <div className="value-team-content">
          <div className="value-block">
            <h2 className="block-title">Why Ping works</h2>
            <p className="block-text">
              Ping isn't another planner—it's the accuracy and action layer over the planners you already use. We keep your plan correct automatically and let you finish tasks by text.
            </p>
          </div>
          <div className="team-block">
            <h2 className="block-title">Built by a campus-ready team</h2>
            <p className="block-text">
              Product designers, full-stack engineers, and growth operators who've shipped campus tools. We stand up a text-powered pilot in days and iterate on live usage. Source-linked updates, quiet hours by default, and accuracy guardrails—no guessing, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValueTeam


