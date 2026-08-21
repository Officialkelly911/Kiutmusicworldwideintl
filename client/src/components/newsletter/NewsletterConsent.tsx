interface NewsletterConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string | null;
  /** Base id used for the input and error element. Default: "nl-consent" */
  id?: string;
}

/**
 * Accessible consent checkbox for the newsletter form.
 * Displays an inline error message when `error` is provided.
 */
export function NewsletterConsent({
  checked,
  onChange,
  error,
  id = "nl-consent",
}: NewsletterConsentProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/[0.04] text-gold accent-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        />
        <span className="text-white/45 text-xs leading-relaxed">
          I agree to receive emails from Kiut Music and consent to having my
          information stored in line with the{" "}
          <a
            href="/legal"
            className="text-gold/70 hover:text-gold underline underline-offset-2"
          >
            Privacy Policy
          </a>
          . *
        </span>
      </label>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-red-400 text-xs mt-1.5 pl-7"
        >
          {error}
        </p>
      )}
    </div>
  );
}
