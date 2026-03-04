const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "guerrillamail.com", "throwaway.email",
  "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la",
  "dispostable.com", "mailnesia.com", "maildrop.cc", "trashmail.com",
  "trashmail.net", "trashmail.org", "10minutemail.com", "tempail.com",
  "fakeinbox.com", "mailcatch.com", "temp-mail.org", "mintemail.com",
  "discard.email", "mailsac.com", "mytemp.email", "mohmal.com",
  "getnada.com", "emailondeck.com", "tempinbox.com", "burnermail.io",
  "mailtemp.net", "harakirimail.com", "jetable.org", "spamgourmet.com",
  "trash-mail.com", "tempr.email", "crazymailing.com", "tmail.ws",
  "tempmailo.com", "emailfake.com", "inboxbear.com", "mailforspam.com",
  "safetymail.info", "filzmail.com", "mailnull.com", "spamfree24.org",
  "binkmail.com", "spaml.com", "uggsrock.com", "mailexpire.com",
  "tempsky.com", "tempomail.fr", "courrieltemporaire.com", "fakemail.fr",
  "maildrop.cc", "throwam.com", "wegwerfmail.de", "wegwerfmail.net",
  "einrot.com", "0-mail.com", "disposeamail.com", "mailzilla.com",
  "anonmails.de", "trashymail.com", "rcpt.at", "rmqkr.net",
  "sharklasers.com", "spam4.me", "grr.la", "guerrillamail.info",
  "guerrillamail.biz", "guerrillamail.de", "guerrillamail.net",
  "guerrillamail.org", "guerrillamailblock.com", "pokemail.net",
  "tempail.com", "boun.cr", "bouncr.com", "disbox.net", "disbox.org",
  "mailme.lv", "mobi.web.id", "sogetthis.com", "thankyou2010.com",
]);

const FAKE_LOCAL_PARTS = new Set([
  "test", "fake", "asdf", "aaa", "bbb", "xxx", "abc", "none",
  "noreply", "no-reply", "noemail", "nobody", "null",
]);

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  const [local, domain] = trimmed.split("@");

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { valid: false, error: "Please use your real email — we'll send your results there" };
  }

  if (FAKE_LOCAL_PARTS.has(local) || local.length < 2) {
    return { valid: false, error: "Please use your real email — we'll send your results there" };
  }

  return { valid: true };
}
