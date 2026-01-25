"use client";

import type { FallbackProps } from "react-error-boundary";

/**
 * Next.js error boundary component.
 * @param props - Component props
 * @returns A full-page error UI with retry button
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */
export default function ErrorMessage({ resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"
      data-testid="error-container"
    >
      <main
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black"
        data-testid="error-main"
      >
        <h1
          className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100"
          data-testid="error-heading"
        >
          Oops! Something went wrong.
        </h1>
        <p
          className="text-gray-700 dark:text-gray-300"
          data-testid="error-message"
        >
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={resetErrorBoundary}
          className="mt-4 btn-primary"
          data-testid="error-retry-button"
        >
          Try again
        </button>{" "}
      </main>
    </div>
  );
}
