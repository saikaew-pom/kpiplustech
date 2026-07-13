import { Check, Clock3, KeyRound, Sparkles } from "lucide-react";

export function CheckinVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`checkin-visual ${compact ? "checkin-visual-compact" : ""}`}>
      <div className="visual-glow" aria-hidden="true" />

      <div className="dashboard-frame">
        <div className="window-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <p>Guest arrivals</p>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-topline">
            <div>
              <span className="micro-label">TODAY · 14 JUL</span>
              <h2>Good afternoon, Front Desk</h2>
            </div>
            <span className="live-pill"><i /> Live</span>
          </div>

          <div className="metric-row">
            <div>
              <span>Arrivals</span>
              <strong>24</strong>
              <small>8 checked in</small>
            </div>
            <div>
              <span>Ready</span>
              <strong>16</strong>
              <small>All details complete</small>
            </div>
            <div>
              <span>Needs attention</span>
              <strong>3</strong>
              <small>Review required</small>
            </div>
          </div>

          <div className="arrival-card">
            <div className="avatar">AM</div>
            <div className="arrival-person">
              <strong>Alex Morgan</strong>
              <span>Deluxe King · 3 nights</span>
            </div>
            <div className="arrival-progress" aria-label="Check-in 75% complete">
              <span><i style={{ width: "75%" }} /></span>
              <small>75%</small>
            </div>
            <span className="status-ready"><Check size={14} /> Ready</span>
          </div>

          <div className="activity-list">
            <div><Check size={15} /><span>Guest details confirmed</span><small>10:42</small></div>
            <div><Check size={15} /><span>Registration signed</span><small>10:44</small></div>
            <div><Clock3 size={15} /><span>Room access scheduled</span><small>14:00</small></div>
          </div>
        </div>
      </div>

      <div className="floating-card floating-card-top">
        <span className="floating-icon"><KeyRound size={17} /></span>
        <div><strong>Room access ready</strong><small>Sent automatically</small></div>
      </div>

      <div className="floating-card floating-card-bottom">
        <span className="floating-icon floating-icon-dark"><Sparkles size={17} /></span>
        <div><strong>Guest checked in</strong><small>Front desk notified</small></div>
      </div>
    </div>
  );
}
