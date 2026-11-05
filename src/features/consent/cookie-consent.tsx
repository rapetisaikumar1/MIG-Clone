"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { allDenied, allGranted, type ConsentChoices } from "./config";
import { ConsentBanner } from "./consent-banner";
import { useConsent, useIsClient } from "./hooks";
import { PreferencesDialog } from "./preferences-dialog";
import { getConsent, OPEN_SETTINGS_EVENT, saveConsent } from "./store";

/** Sends focus to the page's main landmark without scrolling, so it isn't dropped onto <body>. */
function focusMain() {
  document.getElementById("main")?.focus({ preventScroll: true });
}

/**
 * Cookie consent UI, mounted once in the root layout. Shows the banner until the visitor decides,
 * and the preferences panel when asked (banner button, or `openCookieSettings()` from anywhere).
 * Renders nothing on the server or during hydration, so returning visitors never see a flash.
 */
export function CookieConsent() {
  const isClient = useIsClient();
  const consent = useConsent();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentChoices>(allDenied);
  const bannerRef = useRef<HTMLElement>(null);
  const openerRef = useRef<Element | null>(null);

  const showBanner = isClient && consent === null;

  /** Seeds the switches from the stored choice (all off when undecided) and opens the panel. */
  const openPreferences = () => {
    openerRef.current = document.activeElement;
    setDraft({ ...(getConsent()?.choices ?? allDenied) });
    setDialogOpen(true);
  };

  // A repeat request while the panel is open must not discard unsaved switch changes.
  const onOpenRequest = useEffectEvent(() => {
    if (!dialogOpen) openPreferences();
  });

  useEffect(() => {
    const open = () => onOpenRequest();
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  /** Saves from the banner; if focus was on the banner, hand it to the main content before the banner unmounts. */
  const decideFromBanner = (choices: ConsentChoices) => {
    const hadFocus = !!bannerRef.current?.contains(document.activeElement);
    saveConsent(choices);
    if (hadFocus) focusMain();
  };

  const decideFromDialog = (choices: ConsentChoices) => {
    saveConsent(choices);
    setDialogOpen(false);
  };

  /**
   * Return focus to whatever opened the panel (the panel has no Radix Trigger, so Radix can't). If that
   * element is gone (the banner unmounts once a choice is saved) or was <body>, use the main content.
   */
  const handleCloseAutoFocus = (event: Event) => {
    event.preventDefault();
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener instanceof HTMLElement && opener !== document.body && opener.isConnected) {
      opener.focus({ preventScroll: true });
      if (document.activeElement === opener) return;
    }
    focusMain();
  };

  return (
    <>
      {showBanner ? (
        <ConsentBanner
          ref={bannerRef}
          concealed={dialogOpen}
          onAcceptAll={() => decideFromBanner(allGranted)}
          onRejectAll={() => decideFromBanner(allDenied)}
          onManage={openPreferences}
        />
      ) : null}
      {isClient ? (
        <PreferencesDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          draft={draft}
          onDraftChange={setDraft}
          onSave={() => decideFromDialog(draft)}
          onAcceptAll={() => decideFromDialog(allGranted)}
          onRejectAll={() => decideFromDialog(allDenied)}
          onCloseAutoFocus={handleCloseAutoFocus}
        />
      ) : null}
    </>
  );
}
