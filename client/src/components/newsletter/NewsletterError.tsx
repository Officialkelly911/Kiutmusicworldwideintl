interface NewsletterErrorProps {
  message: string;
  id?: string;
}

/**
 * Accessible inline error message for newsletter form submission failures.
 */
export function NewsletterError({ message, id }: NewsletterErrorProps) {
  return (
    <p
      role="alert"
      id={id}
      className="text-red-400 text-sm font-light leading-snug"
    >
      {message}
    </p>
  );
}
