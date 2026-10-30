"use client";

import { useEffect } from "react";

// Enquiry toast — appears when the visitor submits the contact enquiry.
// Theme-matched to the Daruma panel: white card, gold avatar circle with the
// real Daruma mark, gold progress bar. Auto-dismisses after 5s, × closes early.
export default function EnquiryToast({ onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="enq-toast" role="status">
      <div className="enq-toast-row">
        <div className="enq-toast-ava">
          <img src="/assets/icon.svg" alt="" aria-hidden="true" />
        </div>
        <div className="enq-toast-text">
          <b className="enq-toast-title">Enquiry raised</b>
          <p>Thank you for choosing us. We will be in touch <b>within next 24 hours</b>. Till then keep exploring and sharing</p>
        </div>
        <button className="enq-toast-close" onClick={onClose} aria-label="Close notification">×</button>
      </div>
      <div className="enq-toast-bar" />
    </div>
  );
}
