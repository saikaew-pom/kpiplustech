import { Check, KeyRound, ShieldCheck } from "lucide-react";

export function GuestPhone() {
  return (
    <div className="phone-stage">
      <div className="phone-halo" aria-hidden="true" />
      <div className="phone-shell">
        <div className="phone-speaker" />
        <div className="phone-screen">
          <div className="hotel-wordmark">YOUR HOTEL</div>
          <span className="phone-step">CHECK-IN COMPLETE</span>
          <div className="phone-success"><Check size={28} strokeWidth={2.5} /></div>
          <h2>You&apos;re ready to arrive</h2>
          <p>Everything is confirmed. Your room access will be ready from 2:00 PM.</p>
          <div className="room-card">
            <span>ROOM</span>
            <strong>1208</strong>
            <small>Deluxe King · 12th floor</small>
          </div>
          <button type="button"><KeyRound size={17} /> View room access</button>
          <span className="secured"><ShieldCheck size={14} /> Details securely verified</span>
        </div>
      </div>
      <div className="phone-note phone-note-one"><Check size={15} /> ID verified</div>
      <div className="phone-note phone-note-two"><Check size={15} /> Registration signed</div>
    </div>
  );
}
