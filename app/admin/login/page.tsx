'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Lock, LoaderCircle } from 'lucide-react';
import { login, type ActionState } from '../actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-bold text-ink-950 transition hover:brightness-110 disabled:opacity-60"
    >
      {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
      {pending ? 'Kontrol ediliyor…' : 'Giriş Yap'}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState<ActionState, FormData>(login, {});

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-800 p-8"
      >
        <div className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold">
          <Lock className="h-5 w-5" />
        </div>

        <h1 className="mt-5 text-xl font-bold">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-zinc-400">Devam etmek için şifrenizi girin.</p>

        <input
          type="password"
          name="password"
          autoFocus
          autoComplete="current-password"
          placeholder="Şifre"
          className="mt-6 w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-600 focus:border-gold/60"
        />

        {state.error && (
          <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {state.error}
          </p>
        )}

        <SubmitButton />
      </form>
    </main>
  );
}
