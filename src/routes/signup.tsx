import { Link, createFileRoute } from "@tanstack/react-router";

import intro1 from "@/assets/intro/intro-1-home.jpg";
import { Screen } from "@/components/layout/Screen";
import { useLang } from "@/lib/i18n";

/** Alpha — sign-up screen (visual prototype only, no auth logic). */
export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "انشئ حسابك في ألفا | البيت الرقمي المسيحي" },
      {
        name: "description",
        content: "أنشئ حسابك في ألفا لتبدأ رحلتك اليومية: كلمة الله، صلواتك، كنيستك ومجتمعك في مكان واحد.",
      },
      { property: "og:title", content: "انشئ حسابك في ألفا" },
      { property: "og:description", content: "ابدأ رحلتك المسيحية اليومية مع ألفا." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupScreen,
});

function SignupScreen() {
  const { lang } = useLang();
  const ar = lang === "ar";

  const fields = ar
    ? [
        { l: "الاسم", p: "اسمك كما تحب أن نناديك" },
        { l: "البريد الإلكتروني", p: "name@example.com" },
        { l: "كلمة المرور", p: "••••••••" },
      ]
    : [
        { l: "Name", p: "How should we call you?" },
        { l: "Email", p: "name@example.com" },
        { l: "Password", p: "••••••••" },
      ];

  return (
    <Screen withBottomNav={false} className="bg-[oklch(0.988_0.008_85)]">
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden">
        <img
          src={intro1}
          alt="نور الفجر داخل الكنيسة"
          width={1024}
          height={1280}
          className="absolute inset-x-0 top-0 h-[34%] w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-transparent to-[oklch(0.988_0.008_85)]" />

        <div className="relative px-6 pt-[26%] pb-6">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[oklch(0.735_0.096_84/0.5)] bg-white/60 shadow-[0_16px_40px_-18px_oklch(0.735_0.096_84/0.6)] backdrop-blur-xl">
            <span className="font-display text-[24px] text-[oklch(0.46_0.07_78)]">ⲁ</span>
          </div>

          <h1 className="mt-5 text-center font-display text-[26px] font-semibold text-[oklch(0.245_0.026_293)]">
            {ar ? "أهلًا بك في ألفا" : "Welcome to Alpha"}
          </h1>
          <p className="mt-2 text-center font-manrope text-[12.5px] leading-relaxed text-[oklch(0.45_0.02_293)]">
            {ar
              ? "أنشئ حسابك لتبدأ رحلتك اليومية مع كلمة الله وكنيستك."
              : "Create your account to begin your daily journey."}
          </p>

          <div className="glass-card mt-6 space-y-3 rounded-[26px] border border-white/70 bg-white/80 p-5 backdrop-blur-xl">
            {fields.map((f) => (
              <label key={f.l} className="block">
                <span className="font-manrope text-[11px] font-semibold text-[oklch(0.42_0.02_293)]">{f.l}</span>
                <span className="mt-1.5 block rounded-2xl border border-[oklch(0.918_0.012_85)] bg-white px-4 py-3 font-manrope text-[12.5px] text-[oklch(0.6_0.02_293)]">
                  {f.p}
                </span>
              </label>
            ))}

            <button
              type="button"
              className="press mt-2 w-full rounded-2xl border border-[oklch(0.735_0.096_84/0.55)] bg-[oklch(0.245_0.026_293)] py-3.5 font-manrope text-[13.5px] font-semibold text-[oklch(0.988_0.008_85)]"
            >
              {ar ? "إنشاء الحساب" : "Create account"}
            </button>

            <div className="flex items-center gap-3 pt-1">
              <span className="h-px flex-1 bg-[oklch(0.918_0.012_85)]" />
              <span className="font-manrope text-[10px] tracking-[0.18em] text-[oklch(0.6_0.02_293)] uppercase">
                {ar ? "أو" : "or"}
              </span>
              <span className="h-px flex-1 bg-[oklch(0.918_0.012_85)]" />
            </div>

            {[ar ? "المتابعة بحساب Google" : "Continue with Google", ar ? "المتابعة بحساب Apple" : "Continue with Apple"].map(
              (t) => (
                <button
                  key={t}
                  type="button"
                  className="press w-full rounded-2xl border border-[oklch(0.918_0.012_85)] bg-white py-3 font-manrope text-[12.5px] font-semibold text-[oklch(0.3_0.02_293)]"
                >
                  {t}
                </button>
              ),
            )}

            {/* Guest entry — explore Alpha without an account */}
            <Link
              to="/"
              className="press flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[oklch(0.735_0.096_84/0.6)] bg-[oklch(0.735_0.096_84/0.1)] py-3 font-manrope text-[12.5px] font-semibold text-[oklch(0.42_0.06_78)]"
            >
              <span aria-hidden="true" className="font-display text-[14px] leading-none">
                ⲁ
              </span>
              {ar ? "الدخول كضيف" : "Continue as guest"}
            </Link>
            <p className="text-center font-manrope text-[10px] text-[oklch(0.55_0.02_293)]">
              {ar ? "تستطيع إنشاء حسابك في أي وقت لاحقًا." : "You can create your account later."}
            </p>
          </div>


          <p className="mt-5 text-center font-manrope text-[11.5px] text-[oklch(0.45_0.02_293)]">
            {ar ? "لديك حساب بالفعل؟ " : "Already have an account? "}
            <Link to="/" className="font-semibold text-[oklch(0.46_0.07_78)]">
              {ar ? "تسجيل الدخول" : "Sign in"}
            </Link>
          </p>

          <p className="mt-6 text-center font-manrope text-[8.5px] font-semibold tracking-[0.2em] text-[oklch(0.5_0.02_293/0.6)] uppercase">
            <span aria-hidden="true" className="font-display">
              ⲁ
            </span>{" "}
            {ar ? "— البيت القبطي الأرثوذكسي الرقمي —" : "— The Coptic Orthodox Digital Home —"}{" "}
            <span aria-hidden="true" className="font-display">
              ⲱ
            </span>
          </p>
        </div>
      </div>
    </Screen>
  );
}
