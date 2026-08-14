import { useState, type CSSProperties } from "react";

import { KdCross, KdDove, KdSparkle, KdStar } from "@/components/kids/kids-icons";
import {
  L,
  ageHue,
  ages,
  parentControls,
  pick,
  type AgeKey,
  type Lang,
} from "@/lib/kids-data";

/**
 * «وضع الآباء» — parent mode sheet: PIN gate, content controls,
 * age stage lock and screen-time budget. Presentation only.
 */

const PIN = "1234";
const limits = [15, 30, 45, 60];

export function ParentMode({
  lang,
  isArabic,
  age,
  onAge,
  onClose,
}: {
  lang: Lang;
  isArabic: boolean;
  age: AgeKey;
  onAge: (a: AgeKey) => void;
  onClose: () => void;
}) {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(parentControls.map((c) => [c.id, c.on])),
  );
  const [limit, setLimit] = useState(30);

  const press = (d: string) => {
    const next = (pin + d).slice(0, 4);
    setPin(next);
    setWrong(false);
    if (next.length === 4) {
      if (next === PIN) setUnlocked(true);
      else {
        setWrong(true);
        setTimeout(() => setPin(""), 420);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label={isArabic ? "إغلاق" : "Close"}
        onClick={onClose}
        className="absolute inset-0 bg-kdink/55 backdrop-blur-sm"
      />
      <div className="animate-fade-in relative max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-t-[34px] border border-kdhoney/35 bg-kdcream px-4 pt-3 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="mx-auto mb-3 block h-1.5 w-12 rounded-full bg-kdink/15" />

        <header className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-kdgrape/30 text-kdink/75">
            <KdCross className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-manrope text-[9.5px] font-bold tracking-[0.18em] text-kdcoral uppercase">
              {isArabic ? "للأهل فقط" : "Parents only"}
            </p>
            <h3 className="font-display text-[19px] font-semibold text-kdink">
              {isArabic ? "وضع الآباء" : "Parent Mode"}
            </h3>
          </div>
        </header>

        {!unlocked ? (
          <section className="mt-4">
            <p className="text-center font-manrope text-[11.5px] text-kdink/50">
              {isArabic ? "اكتب الرقم السري لفتح الإعدادات" : "Enter the PIN to open settings"}
            </p>

            <div
              className={`mt-3 flex items-center justify-center gap-2.5 ${
                wrong ? "animate-fade-in" : ""
              }`}
            >
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`size-3.5 rounded-full border transition-all ${
                    wrong
                      ? "border-kdcoral/60 bg-kdcoral/45"
                      : pin.length > i
                        ? "border-kdhoney/60 bg-kdhoney/70"
                        : "border-kdink/15 bg-kdpaper"
                  }`}
                />
              ))}
            </div>

            <div className="mx-auto mt-4 grid max-w-[280px] grid-cols-3 gap-2.5">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((d, i) =>
                d === "" ? (
                  <span key={i} />
                ) : (
                  <button
                    key={i}
                    type="button"
                    onClick={() => (d === "⌫" ? setPin((p) => p.slice(0, -1)) : press(d))}
                    className="press grid h-12 place-items-center rounded-[20px] border border-kdink/10 bg-kdpaper/75 font-display text-[17px] font-semibold text-kdink/75"
                  >
                    {d}
                  </button>
                ),
              )}
            </div>

            <p className="mt-3 text-center font-manrope text-[10px] text-kdink/35">
              {isArabic ? "نموذج تجريبي: الرقم ١٢٣٤" : "Prototype PIN: 1234"}
            </p>
          </section>
        ) : (
          <div className="animate-fade-in mt-4 space-y-3">
            {/* age stage lock */}
            <section
              className="kd-card rounded-[26px] p-3.5"
              style={{ "--hue": "var(--kd-mint)" } as CSSProperties}
            >
              <h4 className="font-display text-[14px] font-semibold text-kdink">
                {isArabic ? "المرحلة العمرية المسموحة" : "Allowed age stage"}
              </h4>
              <p className="mt-0.5 font-manrope text-[10.5px] text-kdink/50">
                {isArabic
                  ? "المحتوى الأعلى من المرحلة يتقفل تلقائيًا."
                  : "Content above the stage is locked automatically."}
              </p>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {ages.map((a) => {
                  const on = age === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => onAge(a)}
                      className={`press rounded-[18px] px-2 py-2 text-center transition-all ${
                        on ? "border border-kdink/15" : "border border-kdink/8 bg-kdpaper/55"
                      }`}
                      style={
                        on
                          ? { background: `color-mix(in oklab, ${ageHue[a]} 34%, transparent)` }
                          : undefined
                      }
                    >
                      <p className="font-display text-[12px] font-semibold text-kdink">
                        {pick(L.ages[a], lang)}
                      </p>
                      <p className="font-manrope text-[9px] text-kdink/45">
                        {pick(L.ageYears[a], lang)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* content toggles */}
            <section className="rounded-[26px] border border-kdink/8 bg-kdpaper/70 p-2">
              {parentControls.map((c) => {
                const on = toggles[c.id];
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="switch"
                    aria-checked={on}
                    onClick={() => setToggles((t) => ({ ...t, [c.id]: !t[c.id] }))}
                    className="press flex w-full items-center gap-3 rounded-[20px] px-2.5 py-2.5 text-start"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-[14px] bg-kdsky/25 text-kdink/70">
                      <KdSparkle className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[13px] font-semibold text-kdink">
                        {pick(c.title, lang)}
                      </span>
                      <span className="block font-manrope text-[10px] text-kdink/45">
                        {pick(c.line, lang)}
                      </span>
                    </span>
                    <span
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        on ? "bg-kdmint/70" : "bg-kdink/12"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 size-5 rounded-full bg-kdpaper shadow transition-all ${
                          on ? "start-[22px]" : "start-0.5"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </section>

            {/* screen time */}
            <section
              className="kd-card rounded-[26px] p-3.5"
              style={{ "--hue": "var(--kd-honey)" } as CSSProperties}
            >
              <h4 className="font-display text-[14px] font-semibold text-kdink">
                {isArabic ? "وقت الاستخدام اليومي" : "Daily screen time"}
              </h4>
              <div className="mt-2.5 grid grid-cols-4 gap-2">
                {limits.map((m) => {
                  const on = limit === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setLimit(m)}
                      className={`press rounded-[16px] py-2 font-manrope text-[11.5px] font-extrabold transition-all ${
                        on
                          ? "border border-kdhoney/55 bg-kdhoney/35 text-kdink"
                          : "border border-kdink/10 bg-kdpaper/65 text-kdink/45"
                      }`}
                    >
                      {m} {isArabic ? "د" : "m"}
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="kd-pop press inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 font-manrope text-[12px] font-extrabold text-kdink"
              >
                <KdStar className="size-3.5" />
                {isArabic ? "حفظ وإغلاق" : "Save & close"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setUnlocked(false);
                  setPin("");
                }}
                className="press rounded-full border border-kdink/12 bg-kdpaper/75 px-3.5 py-2.5 font-manrope text-[11px] font-bold text-kdink/55"
              >
                {isArabic ? "قفل" : "Lock"}
              </button>
            </div>

            <p className="flex items-center justify-center gap-1.5 font-manrope text-[10px] font-semibold text-kdink/40">
              <KdDove className="size-3.5 text-kdsky" />
              {pick(L.safe, lang)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
