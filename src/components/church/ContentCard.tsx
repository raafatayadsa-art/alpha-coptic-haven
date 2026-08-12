import type { ReactNode } from "react";

import { ChevronRight, HeartIcon } from "@/components/church/icons";
import {
  ClockIcon,
  DownloadIcon,
  LockIcon,
  PagesIcon,
  PlayIcon,
} from "@/components/church/media-icons";

export type Visibility = "public" | "members" | "private";

const visibilityLabel: Record<Visibility, string> = {
  public: "عام · للمستخدمين الموثقين",
  members: "أعضاء الكنيسة فقط",
  private: "خاص",
};

export function VisibilityChip({ value }: { value: Visibility }) {
  const tone =
    value === "public"
      ? "bg-parchment text-ink/55"
      : value === "members"
        ? "bg-lavender/45 text-ink/70"
        : "bg-ink/8 text-ink/60";

  return (
    <span
      className={`font-arabic inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium leading-none ${tone}`}
    >
      {value !== "public" && <LockIcon className="size-3" />}
      {visibilityLabel[value]}
    </span>
  );
}

export type ContentItem = {
  cover: string;
  title: string;
  publisher: string;
  kind: string;
  meta?: string;
  metaIcon?: "clock" | "pages";
  likes: number;
  liked?: boolean;
  downloadable?: boolean;
  visibility: Visibility;
};

/** Unified premium content card — tile variant (carousels & grids). */
export function ContentCard({ item }: { item: ContentItem }) {
  const MetaIcon = item.metaIcon === "pages" ? PagesIcon : ClockIcon;

  return (
    <article className="press glass-card w-[176px] shrink-0 overflow-hidden rounded-[26px] p-2.5 text-right">
      <div className="relative overflow-hidden rounded-[20px]">
        <img
          src={item.cover}
          alt={item.title}
          loading="lazy"
          width={352}
          height={264}
          className="h-[118px] w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
        <span className="font-arabic absolute right-2 top-2 rounded-full bg-ivory/85 px-2 py-0.5 text-[9.5px] font-medium text-ink/70 backdrop-blur-md">
          {item.kind}
        </span>
        {item.meta && (
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-ink/45 px-2 py-0.5 text-[9.5px] font-medium text-ivory backdrop-blur-md">
            <MetaIcon className="size-3" />
            {item.meta}
          </span>
        )}
      </div>

      <h3 className="font-arabic mt-2.5 line-clamp-2 px-0.5 text-[13px] font-semibold leading-snug">
        {item.title}
      </h3>
      <p className="font-arabic mt-1 px-0.5 text-[10.5px] leading-snug text-ink/45">{item.publisher}</p>

      <div className="mt-2.5 flex items-center justify-between border-t border-ink/6 px-0.5 pt-2">
        <span className="inline-flex items-center gap-1 text-[10.5px] text-ink/50">
          <HeartIcon className={`size-3.5 ${item.liked ? "text-gold" : ""}`} />
          {item.likes}
        </span>
        {item.downloadable ? (
          <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-ink/55">
            <DownloadIcon className="size-3.5" />
            تحميل
          </span>
        ) : (
          <span className="font-arabic text-[10px] text-ink/30">التحميل غير متاح</span>
        )}
      </div>
    </article>
  );
}

/** Unified premium content card — row variant (audio / lecture lists). */
export function ContentRow({
  item,
  action,
}: {
  item: ContentItem;
  action?: ReactNode;
}) {
  const MetaIcon = item.metaIcon === "pages" ? PagesIcon : ClockIcon;

  return (
    <article className="press glass-card flex items-center gap-3 rounded-[24px] p-2.5 text-right">
      <div className="relative size-[62px] shrink-0 overflow-hidden rounded-[18px]">
        <img
          src={item.cover}
          alt={item.title}
          loading="lazy"
          width={124}
          height={124}
          className="size-full object-cover"
        />
        <span className="absolute inset-0 grid place-items-center bg-ink/25 text-ivory">
          {action ?? <PlayIcon className="size-5" />}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-arabic truncate text-[13.5px] font-semibold leading-tight">{item.title}</h3>
        <p className="font-arabic mt-1 truncate text-[10.5px] text-ink/45">{item.publisher}</p>
        <div className="mt-1.5 flex items-center gap-2.5 text-[10px] text-ink/45">
          <span className="font-arabic">{item.kind}</span>
          {item.meta && (
            <span className="inline-flex items-center gap-1">
              <MetaIcon className="size-3" />
              {item.meta}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <HeartIcon className={`size-3 ${item.liked ? "text-gold" : ""}`} />
            {item.likes}
          </span>
        </div>
      </div>

      <ChevronRight className="size-4 shrink-0 text-ink/25" />
    </article>
  );
}
