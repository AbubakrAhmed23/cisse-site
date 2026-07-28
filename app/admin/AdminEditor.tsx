'use client';

import { useState, useTransition } from 'react';
import {
  Check,
  ExternalLink,
  GripVertical,
  LoaderCircle,
  LogOut,
  Plus,
  Star,
  Trash2,
  TriangleAlert,
} from 'lucide-react';
import { saveContent, logout } from './actions';

/* ---------------------------------------------------------------- tipler */

export type Plan = {
  name: string;
  tagline: string;
  price: string;
  oldPrice: string;
  features: string[];
};

export type Testimonial = { quote: string; name: string; role: string };

export type EditableLocale = {
  packages: {
    popularKey: string;
    perMonth: string;
    starter: Plan;
    growth: Plan;
    pro: Plan;
  };
  testimonials: { items: Testimonial[] };
  about: {
    statYears: string;
    statYearsLabel: string;
    statStudents: string;
    statStudentsLabel: string;
    statRating: string;
    statRatingLabel: string;
  };
  whatsapp: { number: string };
  social: { instagram: string; youtube: string };
};

export type EditableDoc = { tr: EditableLocale; en: EditableLocale };

type Locale = 'tr' | 'en';
type Tab = 'packages' | 'testimonials' | 'stats';

const PLAN_KEYS = ['starter', 'growth', 'pro'] as const;
type PlanKey = (typeof PLAN_KEYS)[number];

/* ------------------------------------------------------- küçük parçalar */

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  wide,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  wide?: boolean;
}) {
  return (
    <label className={wide ? 'block sm:col-span-2' : 'block'}>
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm outline-none transition placeholder:text-zinc-600 focus:border-gold/60"
      />
      {hint && <span className="mt-1 block text-xs text-zinc-600">{hint}</span>}
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <textarea
        value={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full resize-y rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm outline-none transition focus:border-gold/60"
      />
    </label>
  );
}

function Card({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-ink-800 p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-bold">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

/* --------------------------------------------------------------- editör */

export default function AdminEditor({
  initial,
  configured,
}: {
  initial: EditableDoc;
  configured: boolean;
}) {
  const [doc, setDoc] = useState<EditableDoc>(initial);
  const [locale, setLocale] = useState<Locale>('tr');
  const [tab, setTab] = useState<Tab>('packages');
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const L = doc[locale];

  /** Aktif dilin verisini günceller. */
  function update(fn: (draft: EditableLocale) => void) {
    setDoc((prev) => {
      const copy: EditableDoc = JSON.parse(JSON.stringify(prev));
      fn(copy[locale]);
      return copy;
    });
    setDirty(true);
    setMessage(null);
  }

  function handleSave() {
    startTransition(async () => {
      const res = await saveContent(doc);
      if (res.error) {
        setMessage({ kind: 'error', text: res.error });
      } else {
        setDirty(false);
        setMessage({ kind: 'ok', text: 'Kaydedildi — site güncellendi.' });
      }
    });
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: 'packages', label: 'Paketler' },
    { id: 'testimonials', label: 'Yorumlar' },
    { id: 'stats', label: 'İstatistikler & İletişim' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 py-8">
      {/* üst bar */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Yönetim Paneli</h1>
          <p className="text-sm text-zinc-500">Cissesthenics site içeriği</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/tr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-300 transition hover:border-white/25"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Siteyi gör
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-400 transition hover:border-red-500/40 hover:text-red-400"
            >
              <LogOut className="h-3.5 w-3.5" />
              Çıkış
            </button>
          </form>
        </div>
      </header>

      {!configured && (
        <p className="mt-5 flex items-start gap-2 rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          Supabase bağlantısı yapılandırılmamış. Değişiklikler kaydedilemez.
        </p>
      )}

      {/* dil seçimi */}
      <div className="mt-6 inline-flex rounded-xl border border-white/10 bg-ink-800 p-1">
        {(['tr', 'en'] as Locale[]).map((l) => (
          <button
            key={l}
            onClick={() => setLocale(l)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              locale === l ? 'bg-gold text-ink-950' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {l === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-zinc-600">
        Her dil ayrı düzenlenir. Türkçeyi değiştirdikten sonra İngilizceyi de güncellemeyi
        unutmayın.
      </p>

      {/* sekmeler */}
      <nav className="mt-6 flex gap-1 border-b border-white/10">
        {TABS.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition ${
              tab === tb.id
                ? 'border-gold text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tb.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 space-y-5 pb-32">
        {/* ---------------------------------------------------- paketler */}
        {tab === 'packages' && (
          <>
            <Card title="Genel">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Fiyat son eki"
                  value={L.packages.perMonth}
                  onChange={(v) => update((d) => void (d.packages.perMonth = v))}
                  hint="Fiyatın yanında görünür, örn. /ay"
                />
                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    &quot;En Popüler&quot; rozeti
                  </span>
                  <select
                    value={L.packages.popularKey}
                    onChange={(e) => update((d) => void (d.packages.popularKey = e.target.value))}
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5 text-sm outline-none focus:border-gold/60"
                  >
                    {PLAN_KEYS.map((k) => (
                      <option key={k} value={k}>
                        {L.packages[k].name || k}
                      </option>
                    ))}
                    <option value="none">Hiçbiri</option>
                  </select>
                </label>
              </div>
            </Card>

            {PLAN_KEYS.map((key: PlanKey, idx) => {
              const plan = L.packages[key];
              const isPopular = L.packages.popularKey === key;

              return (
                <Card
                  key={key}
                  title={`${idx + 1}. Kart — ${plan.name || '(isimsiz)'}`}
                  right={
                    isPopular ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-ink-950">
                        <Star className="h-3 w-3 fill-ink-950" />
                        En Popüler
                      </span>
                    ) : null
                  }
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Paket adı"
                      value={plan.name}
                      onChange={(v) => update((d) => void (d.packages[key].name = v))}
                    />
                    <Field
                      label="Açıklama"
                      value={plan.tagline}
                      onChange={(v) => update((d) => void (d.packages[key].tagline = v))}
                    />
                    <Field
                      label="Fiyat"
                      value={plan.price}
                      onChange={(v) => update((d) => void (d.packages[key].price = v))}
                      placeholder="₺499"
                    />
                    <Field
                      label="Eski fiyat (üstü çizili)"
                      value={plan.oldPrice}
                      onChange={(v) => update((d) => void (d.packages[key].oldPrice = v))}
                      placeholder="₺799"
                      hint="Boş bırakılırsa indirim gösterilmez."
                    />
                  </div>

                  <div className="mt-6">
                    <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      Paket içeriği
                    </span>
                    <ul className="mt-2 space-y-2">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 shrink-0 text-zinc-700" />
                          <input
                            value={f}
                            onChange={(e) =>
                              update((d) => void (d.packages[key].features[i] = e.target.value))
                            }
                            className="w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2 text-sm outline-none transition focus:border-gold/60"
                          />
                          <button
                            onClick={() =>
                              update((d) => void d.packages[key].features.splice(i, 1))
                            }
                            aria-label="Maddeyi sil"
                            className="shrink-0 rounded-lg p-2 text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => update((d) => void d.packages[key].features.push(''))}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-2 text-sm text-zinc-400 transition hover:border-gold/50 hover:text-gold"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Madde ekle
                    </button>
                  </div>
                </Card>
              );
            })}
          </>
        )}

        {/* ---------------------------------------------------- yorumlar */}
        {tab === 'testimonials' && (
          <>
            {L.testimonials.items.map((item, i) => (
              <Card
                key={i}
                title={`Yorum ${i + 1}`}
                right={
                  <button
                    onClick={() => update((d) => void d.testimonials.items.splice(i, 1))}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Sil
                  </button>
                }
              >
                <div className="space-y-4">
                  <TextArea
                    label="Yorum metni"
                    value={item.quote}
                    onChange={(v) => update((d) => void (d.testimonials.items[i].quote = v))}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="İsim"
                      value={item.name}
                      onChange={(v) => update((d) => void (d.testimonials.items[i].name = v))}
                      placeholder="Mert E."
                    />
                    <Field
                      label="Alt bilgi"
                      value={item.role}
                      onChange={(v) => update((d) => void (d.testimonials.items[i].role = v))}
                      placeholder="Online Plus"
                    />
                  </div>
                </div>
              </Card>
            ))}

            <button
              onClick={() =>
                update((d) => void d.testimonials.items.push({ quote: '', name: '', role: '' }))
              }
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/15 py-4 text-sm text-zinc-400 transition hover:border-gold/50 hover:text-gold"
            >
              <Plus className="h-4 w-4" />
              Yeni yorum ekle
            </button>

            <p className="text-xs text-zinc-600">
              Sitede yorumlar 3&apos;lü ızgarada gösterilir — en düzgün görünüm için 3, 6 veya
              9 yorum girin.
            </p>
          </>
        )}

        {/* ----------------------------------------- istatistik/iletişim */}
        {tab === 'stats' && (
          <>
            <Card title="Hakkımızda bölümü rakamları">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Deneyim"
                  value={L.about.statYears}
                  onChange={(v) => update((d) => void (d.about.statYears = v))}
                  placeholder="5+"
                />
                <Field
                  label="Deneyim etiketi"
                  value={L.about.statYearsLabel}
                  onChange={(v) => update((d) => void (d.about.statYearsLabel = v))}
                  placeholder="Yıl deneyim"
                />
                <Field
                  label="Öğrenci sayısı"
                  value={L.about.statStudents}
                  onChange={(v) => update((d) => void (d.about.statStudents = v))}
                  placeholder="200+"
                />
                <Field
                  label="Öğrenci etiketi"
                  value={L.about.statStudentsLabel}
                  onChange={(v) => update((d) => void (d.about.statStudentsLabel = v))}
                  placeholder="Mutlu öğrenci"
                />
                <Field
                  label="Puan"
                  value={L.about.statRating}
                  onChange={(v) => update((d) => void (d.about.statRating = v))}
                  placeholder="4.9"
                />
                <Field
                  label="Puan etiketi"
                  value={L.about.statRatingLabel}
                  onChange={(v) => update((d) => void (d.about.statRatingLabel = v))}
                  placeholder="Ortalama puan"
                />
              </div>
            </Card>

            <Card title="İletişim">
              <Field
                label="WhatsApp numarası"
                value={L.whatsapp.number}
                onChange={(v) => update((d) => void (d.whatsapp.number = v))}
                placeholder="0552 123 45 67"
                hint="Sitedeki tüm WhatsApp butonları bu numaraya gider. İstediğiniz formatta yazabilirsiniz."
                wide
              />
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Instagram"
                  value={L.social.instagram}
                  onChange={(v) => update((d) => void (d.social.instagram = v))}
                  placeholder="https://www.instagram.com/kullanici"
                  hint="Boş bırakılırsa ikon gizlenir."
                />
                <Field
                  label="YouTube"
                  value={L.social.youtube}
                  onChange={(v) => update((d) => void (d.social.youtube = v))}
                  placeholder="https://www.youtube.com/@kanal"
                  hint="Boş bırakılırsa ikon gizlenir."
                />
              </div>
            </Card>
          </>
        )}
      </div>

      {/* kaydet çubuğu */}
      <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-ink-900/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-4">
          <div className="min-w-0 text-sm">
            {message ? (
              <span
                className={
                  message.kind === 'ok'
                    ? 'inline-flex items-center gap-1.5 text-emerald-400'
                    : 'inline-flex items-center gap-1.5 text-red-400'
                }
              >
                {message.kind === 'ok' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <TriangleAlert className="h-4 w-4" />
                )}
                {message.text}
              </span>
            ) : dirty ? (
              <span className="text-amber-400">Kaydedilmemiş değişiklikler var</span>
            ) : (
              <span className="text-zinc-600">Tüm değişiklikler kayıtlı</span>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={pending || !dirty || !configured}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-ink-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {pending ? 'Kaydediliyor…' : 'Kaydet ve Yayınla'}
          </button>
        </div>
      </div>
    </div>
  );
}
