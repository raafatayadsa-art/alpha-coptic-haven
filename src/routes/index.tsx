import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import alphaVerse from "@/assets/alpha-verse.jpg";
import alphaSaint from "@/assets/alpha-saint.jpg";
import alphaPrayer from "@/assets/alpha-prayer.jpg";
import alphaReading from "@/assets/alpha-reading.jpg";
import churchCrest from "@/assets/church-crest.png";
import churchCover from "@/assets/church-cover.jpg";
import contentBook from "@/assets/content-book.jpg";
import contentAudio from "@/assets/content-audio.jpg";
import contentVideo from "@/assets/content-video.jpg";
import priest1 from "@/assets/priest-1.jpg";
import priest2 from "@/assets/priest-2.jpg";
import priest3 from "@/assets/priest-3.jpg";
import oliveBranch from "@/assets/olive-branch.png";

import { Rail, SectionHead, Tappable, useOpen } from "@/components/alpha/primitives";
import {
  BookmarkIcon,
  CandleIcon,
  ConnectIcon,
  HaloIcon,
  JourneyIcon,
  SearchGlyph,
  SeedIcon,
  ShareIcon,
  SparkIcon,
  SunriseIcon,
  ArrowLeftIcon,
} from "@/components/alpha/icons";
import {
  AgpeyaIcon,
  BellIcon,
  BibleIcon,
  CommunityIcon,
  CopticCross,
  KatamerosIcon,
  KhoulagyIcon,
  MyChurchIcon,
  SynaxariumIcon,
  VerifiedIcon,
} from "@/components/church/icons";
import { AudioIcon, PlayIcon, VideoIcon } from "@/components/church/media-icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ألفا — رفيقك الروحي اليومي" },
      {
        name: "description",
        content:
          "الشاشة الرئيسية لتطبيق ألفا القبطي الأرثوذكسي: آية اليوم، قديس اليوم، صلاة اليوم، رحلة القراءة، الكتاب المقدس والأجبية والمكتبة الروحية وكنيستك في مكان واحد هادئ.",
      },
      { property: "og:title", content: "ألفا — رفيقك الروحي اليومي" },
      {
        property: "og:description",
        content: "يومك الروحي يبدأ من هنا: آية، قديس، صلاة، ورحلة قراءة تكمل ما بدأته.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AlphaHome,
});

/* Presentation-only sample content. */
const hub = [
  { title: "الكتاب المقدس", hint: "٦٦ سفرًا", icon: <BibleIcon className="size-6" /> },
  { title: "الأجبية", icon: <AgpeyaIcon className="size-6" />, hint: "٧ صلوات" },
  { title: "القطمارس", icon: <KatamerosIcon className="size-6" />, hint: "قراءات اليوم" },
  { title: "السنكسار", icon: <SynaxariumIcon className="size-6" />, hint: "٩ مسرى" },
  { title: "الخولاجي", icon: <KhoulagyIcon className="size-6" />, hint: "القداس الباسيلي" },
];

const library = [
  {
    kind: "كتاب",
    title: "حياة الصلاة الأرثوذكسية",
    meta: "البابا شنودة الثالث · ١٤٢ صفحة",
    image: contentBook,
    icon: <BookmarkIcon className="size-4" />,
  },
  {
    kind: "عظة صوتية",
    title: "المزمور الخمسون",
    meta: "أبونا بيشوي صموئيل · ٢٨ دقيقة",
    image: contentAudio,
    icon: <AudioIcon className="size-4" />,
  },
  {
    kind: "فيديو",
    title: "شرح إنجيل يوحنا",
    meta: "سلسلة · ٦ حلقات",
    image: contentVideo,
    icon: <VideoIcon className="size-4" />,
  },
];

const fathers = [
  { name: "أبونا بيشوي صموئيل", role: "كاهن الكنيسة", photo: priest1 },
  { name: "أبونا مينا إسحق", role: "قمص", photo: priest2 },
  { name: "أبونا كيرلس مرقس", role: "كاهن مساعد", photo: priest3 },
];

const upcoming = [
  { when: "اليوم · ٧:٠٠ م", title: "عشية العذراء مريم", place: "كنيسة الشهيدين" },
  { when: "غدًا · ٦:٣٠ م", title: "اجتماع الشباب", place: "قاعة القديس مرقس" },
  { when: "٩ مسرى", title: "بدء صوم العذراء", place: "تقويم ألفا" },
];

function AlphaHome() {
  const open = useOpen();

  return (
    <div
      dir="rtl"
      className="font-arabic mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-ivory text-ink selection:bg-gold/20"
    >
      {/* ───────── 1 · Dawn panel: greeting + verse of the day ───────── */}
      <section className="relative overflow-hidden rounded-b-[42px] bg-ink pb-16 text-ivory">
        <img
          src={alphaVerse}
          alt=""
          width={1200}
          height={1504}
          className="absolute inset-0 size-full object-cover opacity-[0.42]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" />

        <header className="relative flex items-center justify-between px-5 pt-[max(16px,env(safe-area-inset-top))]">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-ivory/10 ring-1 ring-ivory/20 backdrop-blur-md">
              <CopticCross className="size-[18px] text-gold" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight">صباح النور، مينا</span>
              <span className="mt-1.5 text-[10px] font-medium tracking-[0.1em] text-ivory/45">
                ٩ مسرى ١٧٤٢ للشهداء
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="بحث في ألفا"
              onClick={() => open("البحث في ألفا")}
              className="press grid size-10 place-items-center rounded-full bg-ivory/10 text-ivory/80 ring-1 ring-ivory/15 backdrop-blur-md"
            >
              <SearchGlyph className="size-[18px]" />
            </button>
            <button
              type="button"
              aria-label="الإشعارات"
              onClick={() => open("الإشعارات")}
              className="press relative grid size-10 place-items-center rounded-full bg-ivory/10 text-ivory/80 ring-1 ring-ivory/15 backdrop-blur-md"
            >
              <BellIcon className="size-[18px]" />
              <span className="absolute left-2.5 top-2.5 size-1.5 rounded-full bg-gold" />
            </button>
          </div>
        </header>

        {/* Verse of the day — the emotional entry point */}
        <div className="animate-float-up relative mt-9 px-6">
          <span className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.16em] text-gold">
            <SunriseIcon className="size-4" />
            آية اليوم
          </span>
          <p className="font-arabic mt-5 text-[21px] font-medium leading-[1.85] text-ivory/95 text-pretty">
            «اسكنوا فيَّ وأنا فيكم. مَن يثبت فيَّ وأنا فيه فهذا يأتي بثمر كثير.»
          </p>
          <span className="mt-4 block text-[11px] font-semibold text-gold/85">يوحنا ١٥ : ٤ – ٥</span>

          <div className="mt-7 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => open("تأمل آية اليوم")}
              className="press flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gold text-[12.5px] font-bold text-ink"
            >
              <SparkIcon className="size-4" />
              اقرأ التأمل
            </button>
            <button
              type="button"
              aria-label="حفظ الآية"
              onClick={() => open("حفظ في المفضلة")}
              className="press grid size-11 place-items-center rounded-full bg-ivory/10 text-ivory/75 ring-1 ring-ivory/15"
            >
              <BookmarkIcon className="size-[17px]" />
            </button>
            <button
              type="button"
              aria-label="مشاركة الآية"
              onClick={() => open("مشاركة الآية")}
              className="press grid size-11 place-items-center rounded-full bg-ivory/10 text-ivory/75 ring-1 ring-ivory/15"
            >
              <ShareIcon className="size-[17px]" />
            </button>
          </div>
        </div>
      </section>

      <main className="pb-14">
        {/* ───────── 2 · Continue reading — lifted over the panel edge ───────── */}
        <section className="animate-float-up relative -mt-10 px-4 [animation-delay:120ms]">
          <button
            type="button"
            onClick={() => open("متابعة القراءة — سفر المزامير")}
            className="press glass-card block w-full overflow-hidden rounded-[30px] p-3.5 text-right"
          >
            <div className="flex items-center gap-3.5">
              <span className="relative size-[62px] shrink-0 overflow-hidden rounded-[20px]">
                <img
                  src={alphaReading}
                  alt=""
                  width={1200}
                  height={912}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold tracking-[0.14em] text-gold">
                  متابعة القراءة
                </span>
                <span className="mt-1.5 block truncate text-[14.5px] font-bold">
                  المزامير · مزمور ٩١
                </span>
                <span className="mt-1 block text-[10.5px] text-ink/45">توقفتَ عند العدد ٤ · أمس</span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-ivory">
                <PlayIcon className="size-4" />
              </span>
            </div>
            <span className="mt-4 block h-[5px] w-full overflow-hidden rounded-full bg-ink/8">
              <span className="block h-full w-[46%] rounded-full bg-gold" />
            </span>
            <span className="mt-2 flex items-center justify-between text-[10px] text-ink/40">
              <span>٤٦٪ من رحلة «المزامير في ٣٠ يومًا»</span>
              <span>١٤ / ٣٠</span>
            </span>
          </button>
        </section>

        {/* ───────── 3 · Today's pair: saint + prayer ───────── */}
        <section className="mt-11">
          <SectionHead
            eyebrow="يومك"
            title="مع القديسين والصلاة"
            action="التقويم"
            onAction={() => open("تقويم ألفا")}
          />
          <Rail className="mt-5">
            <button
              type="button"
              onClick={() => open("قديس اليوم — البابا أثناسيوس الرسولي")}
              className="press relative h-[220px] w-[262px] flex-none snap-center overflow-hidden rounded-[28px] text-right ring-1 ring-ink/8"
            >
              <img
                src={alphaSaint}
                alt="أيقونة قبطية للبابا أثناسيوس الرسولي"
                width={912}
                height={1200}
                loading="lazy"
                className="size-full object-cover object-top"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
              <span className="absolute inset-x-4 bottom-4 text-ivory">
                <span className="flex items-center gap-1.5 text-[9.5px] font-semibold tracking-[0.16em] text-gold">
                  <HaloIcon className="size-3.5" />
                  قديس اليوم
                </span>
                <span className="mt-2 block text-[16px] font-bold leading-snug">
                  البابا أثناسيوس الرسولي
                </span>
                <span className="mt-1 block text-[10.5px] text-ivory/65">حامي الإيمان · ٧ بشنس</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => open("صلاة اليوم — صلاة باكر من الأجبية")}
              className="press relative h-[220px] w-[262px] flex-none snap-center overflow-hidden rounded-[28px] text-right ring-1 ring-ink/8"
            >
              <img
                src={alphaPrayer}
                alt="شمعة مضاءة في هدوء الكنيسة"
                width={1200}
                height={912}
                loading="lazy"
                className="size-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <span className="absolute inset-x-4 bottom-4 text-ivory">
                <span className="flex items-center gap-1.5 text-[9.5px] font-semibold tracking-[0.16em] text-gold">
                  <CandleIcon className="size-3.5" />
                  صلاة اليوم
                </span>
                <span className="mt-2 block text-[16px] font-bold leading-snug">صلاة باكر</span>
                <span className="mt-1 block text-[10.5px] text-ivory/65">من الأجبية · ٩ دقائق</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => open("قراءات القطمارس لليوم")}
              className="press h-[220px] w-[190px] flex-none snap-center rounded-[28px] border border-lavender bg-lavender/30 p-5 text-right"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-ivory/70 ring-1 ring-white/70">
                <KatamerosIcon className="size-5 text-ink/65" />
              </span>
              <span className="mt-5 block text-[15px] font-bold leading-snug">قراءات اليوم</span>
              <span className="mt-2 block text-[10.5px] leading-relaxed text-ink/50">
                مزمور وإنجيل القداس، البولس والكاثوليكون والإبركسيس.
              </span>
              <span className="mt-4 flex items-center gap-1 text-[10.5px] font-bold text-gold">
                افتح القطمارس
                <ArrowLeftIcon className="size-3.5" />
              </span>
            </button>
          </Rail>
        </section>

        {/* ───────── 4 · Reading journey progress ───────── */}
        <section className="mt-12 px-4">
          <div className="relative overflow-hidden rounded-[32px] bg-parchment p-6 ring-1 ring-ink/5">
            <span className="absolute -left-12 -top-12 size-40 rounded-full bg-gold/12 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-gold">
                  <JourneyIcon className="size-4" />
                  رحلة القراءة
                </span>
                <h2 className="mt-3 text-[19px] font-bold leading-snug">١٤ يومًا متواصلة</h2>
                <p className="mt-2 text-[11.5px] leading-relaxed text-ink/50">
                  ثبات صغير كل يوم يصنع ثمرًا كثيرًا. باقي ١٦ يومًا لإتمام الرحلة.
                </p>
              </div>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-ivory ring-1 ring-gold/25">
                <img
                  src={oliveBranch}
                  alt=""
                  width={512}
                  height={512}
                  loading="lazy"
                  className="size-8 object-contain"
                />
              </span>
            </div>

            <div className="relative mt-6 flex items-center justify-between gap-1.5">
              {["س", "أ", "ث", "ر", "خ", "ج", "س"].map((d, i) => (
                <span key={`${d}-${i}`} className="flex flex-1 flex-col items-center gap-2">
                  <span
                    className={`grid h-10 w-full place-items-center rounded-2xl text-[11px] font-bold ${
                      i < 5
                        ? "bg-gold/15 text-gold ring-1 ring-gold/25"
                        : i === 5
                          ? "bg-ink text-ivory"
                          : "bg-ivory text-ink/25 ring-1 ring-ink/5"
                    }`}
                  >
                    {i < 5 ? "✓" : d}
                  </span>
                  <span className="text-[9px] text-ink/35">{d}</span>
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => open("رحلة القراءة")}
              className="press mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink text-[12.5px] font-bold text-ivory"
            >
              <SeedIcon className="size-4 text-gold" />
              أكمل قراءة اليوم
            </button>
          </div>
        </section>

        {/* ───────── 5 · Spiritual hub ───────── */}
        <section className="mt-14">
          <SectionHead
            eyebrow="المركز الروحي"
            title="كتبك بين يديك"
            action="الكل"
            onAction={() => open("المركز الروحي")}
          />
          <div className="mt-5 grid grid-cols-2 gap-3 px-5">
            <HubTile item={hub[0]!} featured onClick={() => open(hub[0]!.title)} />
            <div className="grid gap-3">
              <HubTile item={hub[1]!} onClick={() => open(hub[1]!.title)} />
              <HubTile item={hub[2]!} onClick={() => open(hub[2]!.title)} />
            </div>
            <HubTile item={hub[3]!} onClick={() => open(hub[3]!.title)} />
            <HubTile item={hub[4]!} onClick={() => open(hub[4]!.title)} />
          </div>
        </section>

        {/* ───────── 6 · Library ───────── */}
        <section className="mt-14">
          <SectionHead
            eyebrow="المكتبة"
            title="مختار لك اليوم"
            action="المكتبة"
            onAction={() => open("المكتبة الروحية")}
          />
          <Rail className="mt-5">
            {library.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => open(item.title)}
                className="press w-[176px] flex-none snap-center rounded-[26px] border border-ink/5 bg-white/80 p-3 text-right shadow-soft"
              >
                <span className="block overflow-hidden rounded-[20px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={900}
                    height={1200}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </span>
                <span className="mt-3 flex items-center gap-1.5 px-1 text-[9.5px] font-semibold tracking-[0.1em] text-gold">
                  {item.icon}
                  {item.kind}
                </span>
                <span className="mt-1.5 block px-1 text-[13px] font-bold leading-snug">
                  {item.title}
                </span>
                <span className="mt-1 mb-1 block px-1 text-[10px] leading-relaxed text-ink/45">
                  {item.meta}
                </span>
              </button>
            ))}
          </Rail>
        </section>

        {/* ───────── 7 · Fathers ───────── */}
        <section className="mt-14">
          <SectionHead
            eyebrow="قسم الآباء"
            title="كلمة من أبٍ"
            action="الآباء"
            onAction={() => open("قسم الآباء")}
          />
          <div className="mt-5 px-4">
            <div className="rounded-[30px] border border-ink/5 bg-parchment/70 p-5">
              <p className="text-[14px] font-medium leading-[1.9] text-ink/75 text-pretty">
                «لا تخف من الغد. الذي أعطاك اليوم هو نفسه الذي يُعِدُّ لك غدًا.»
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-ink/8 pt-4">
                <img
                  src={priest1}
                  alt="أبونا بيشوي صموئيل"
                  width={600}
                  height={800}
                  loading="lazy"
                  className="size-11 rounded-full object-cover ring-1 ring-gold/25"
                />
                <span className="flex flex-col leading-tight">
                  <span className="text-[12.5px] font-bold">أبونا بيشوي صموئيل</span>
                  <span className="mt-1 text-[10px] text-ink/45">تأملات يومية</span>
                </span>
                <button
                  type="button"
                  onClick={() => open("متابعة أبونا بيشوي صموئيل")}
                  className="press mr-auto rounded-full bg-ink px-4 py-2 text-[10.5px] font-bold text-ivory"
                >
                  استمع
                </button>
              </div>
            </div>
          </div>

          <Rail className="mt-4">
            {fathers.map((f) => (
              <button
                key={f.name}
                type="button"
                onClick={() => open(f.name)}
                className="press w-[104px] flex-none snap-center text-center"
              >
                <img
                  src={f.photo}
                  alt={f.name}
                  width={600}
                  height={800}
                  loading="lazy"
                  className="mx-auto size-[74px] rounded-full object-cover ring-1 ring-ink/8"
                />
                <span className="mt-2.5 block text-[11px] font-bold leading-snug">{f.name}</span>
                <span className="mt-1 block text-[9.5px] text-ink/40">{f.role}</span>
              </button>
            ))}
          </Rail>
        </section>

        {/* ───────── 8 · Church + Connect + Community ───────── */}
        <section className="mt-14">
          <SectionHead eyebrow="انتماؤك" title="كنيستك ومجتمعك" />
          <div className="mt-5 px-4">
            <Tappable
              to="/church"
              label="كنيستي"
              className="press relative block h-[178px] overflow-hidden rounded-[30px] text-right ring-1 ring-ink/10"
            >
              <img
                src={churchCover}
                alt="كنيسة الشهيدين مار مرقس والسيدة العذراء"
                width={800}
                height={1200}
                loading="lazy"
                className="size-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <img
                src={churchCrest}
                alt=""
                width={512}
                height={512}
                loading="lazy"
                className="absolute right-5 top-5 size-11 object-contain drop-shadow"
              />
              <span className="absolute inset-x-5 bottom-5 text-ivory">
                <span className="flex items-center gap-1.5 text-[9.5px] font-semibold tracking-[0.16em] text-gold">
                  <MyChurchIcon className="size-3.5" />
                  كنيستي
                  <VerifiedIcon className="size-3.5" />
                </span>
                <span className="mt-2 block text-[16.5px] font-bold leading-snug">
                  كنيسة السيدة العذراء ومار مرقس
                </span>
                <span className="mt-1.5 block text-[10.5px] text-ivory/70">
                  شبرا، القاهرة · ٣ أخبار جديدة
                </span>
              </span>
            </Tappable>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => open("ألفا كونكت")}
                className="press rounded-[26px] border border-lavender bg-lavender/35 p-4 text-right"
              >
                <span className="grid size-10 place-items-center rounded-2xl bg-ivory/70 ring-1 ring-white/70">
                  <ConnectIcon className="size-5 text-ink/65" />
                </span>
                <span className="mt-4 block text-[13.5px] font-bold">ألفا كونكت</span>
                <span className="mt-1 block text-[10px] leading-relaxed text-ink/45">
                  تواصل مع خدّامك وأصدقائك
                </span>
              </button>
              <button
                type="button"
                onClick={() => open("مجتمعي")}
                className="press rounded-[26px] border border-ink/5 bg-parchment p-4 text-right"
              >
                <span className="grid size-10 place-items-center rounded-2xl bg-gold/12 ring-1 ring-gold/20">
                  <CommunityIcon className="size-5 text-gold" />
                </span>
                <span className="mt-4 block text-[13.5px] font-bold">مجتمعي</span>
                <span className="mt-1 block text-[10px] leading-relaxed text-ink/45">
                  مجموعات ومشاركات روحية
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ───────── 9 · Upcoming ───────── */}
        <section className="mt-14 px-5">
          <SectionHead eyebrow="قريبًا" title="ما ينتظرك" />
          <ul className="mt-5 space-y-2.5">
            {upcoming.map((e, i) => (
              <li key={e.title}>
                <button
                  type="button"
                  onClick={() => open(e.title)}
                  className="press flex w-full items-center gap-3.5 rounded-[24px] border border-ink/5 bg-white/75 p-3.5 text-right"
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-2xl ${
                      i === 0 ? "bg-gold/12 text-gold ring-1 ring-gold/20" : "bg-parchment text-ink/50"
                    }`}
                  >
                    <CopticCross className="size-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold leading-snug">{e.title}</span>
                    <span className="mt-1 block text-[10px] text-ink/45">{e.place}</span>
                  </span>
                  <span
                    className={`shrink-0 text-[10px] font-semibold ${i === 0 ? "text-gold" : "text-ink/35"}`}
                  >
                    {e.when}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────── 10 · Footer ───────── */}
        <footer className="mt-16 px-8 pb-4 text-center">
          <span className="mx-auto grid size-10 place-items-center rounded-full bg-gold/10 ring-1 ring-gold/25">
            <CopticCross className="size-4 text-gold" />
          </span>
          <p className="mt-5 text-[13px] font-medium leading-relaxed text-ink/40">
            «ثبات صغير كل يوم… يصنع ثمرًا كثيرًا.»
          </p>
          <p className="mt-3 text-[9.5px] tracking-[0.18em] text-ink/25">ألفا · تطبيقك الروحي</p>
        </footer>
      </main>
    </div>
  );
}

function HubTile({
  item,
  featured = false,
  onClick,
}: {
  item: { title: string; hint?: string; icon: ReactNode };
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press flex flex-col rounded-[26px] border text-right ${
        featured
          ? "row-span-1 justify-between border-gold/25 bg-gold/10 p-5"
          : "border-ink/5 bg-parchment p-4"
      }`}
    >
      <span
        className={`grid place-items-center rounded-2xl ${
          featured
            ? "size-12 bg-ivory text-gold ring-1 ring-gold/25"
            : "size-10 bg-ivory/70 text-ink/60 ring-1 ring-ink/5"
        }`}
      >
        {item.icon}
      </span>
      <span className={featured ? "mt-6" : "mt-3.5"}>
        <span className={`block font-bold leading-snug ${featured ? "text-[17px]" : "text-[13px]"}`}>
          {item.title}
        </span>
        {item.hint ? (
          <span className="mt-1 block text-[10px] text-ink/40">{item.hint}</span>
        ) : null}
      </span>
    </button>
  );
}
