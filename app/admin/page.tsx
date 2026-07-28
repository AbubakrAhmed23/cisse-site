import { getOverridesFresh, deepMerge } from '@/lib/content';
import trDefaults from '@/messages/tr.json';
import enDefaults from '@/messages/en.json';
import AdminEditor, { type EditableDoc, type EditableLocale } from './AdminEditor';

// Panel her zaman güncel veriyi göstermeli — önbelleğe alınmaz.
export const dynamic = 'force-dynamic';

/** Birleştirilmiş mesajlardan sadece panelde düzenlenen alanları ayıklar. */
function pick(messages: any): EditableLocale {
  const p = messages.packages;
  const plan = (k: string) => ({
    name: p[k].name ?? '',
    tagline: p[k].tagline ?? '',
    price: p[k].price ?? '',
    oldPrice: p[k].oldPrice ?? '',
    features: [...(p[k].features ?? [])],
  });

  return {
    packages: {
      popularKey: p.popularKey ?? 'growth',
      perMonth: p.perMonth ?? '',
      starter: plan('starter'),
      growth: plan('growth'),
      pro: plan('pro'),
    },
    testimonials: {
      items: (messages.testimonials.items ?? []).map((i: any) => ({
        quote: i.quote ?? '',
        name: i.name ?? '',
        role: i.role ?? '',
      })),
    },
    about: {
      statYears: messages.about.statYears ?? '',
      statYearsLabel: messages.about.statYearsLabel ?? '',
      statStudents: messages.about.statStudents ?? '',
      statStudentsLabel: messages.about.statStudentsLabel ?? '',
      statRating: messages.about.statRating ?? '',
      statRatingLabel: messages.about.statRatingLabel ?? '',
    },
    whatsapp: {
      // İçerikte numara yoksa env'deki mevcut numarayı göster.
      number: messages.whatsapp.number || (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''),
    },
    social: {
      instagram: messages.social?.instagram ?? '',
      youtube: messages.social?.youtube ?? '',
    },
  };
}

export default async function AdminPage() {
  const overrides = await getOverridesFresh();

  const initial: EditableDoc = {
    tr: pick(deepMerge(trDefaults, overrides.tr)),
    en: pick(deepMerge(enDefaults, overrides.en)),
  };

  const configured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

  return <AdminEditor initial={initial} configured={configured} />;
}
