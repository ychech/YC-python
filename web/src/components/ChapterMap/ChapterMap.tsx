import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./ChapterMap.module.css";

export type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  status: "locked" | "todo" | "doing" | "done";
  prompt: string;
};

function imgUrl(prompt: string, size: string) {
  return (
    "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=" +
    encodeURIComponent(prompt) +
    "&image_size=" +
    size
  );
}

function statusText(status: Chapter["status"]) {
  if (status === "done") return "已通关";
  if (status === "doing") return "进行中";
  if (status === "locked") return "未解锁";
  return "待开始";
}

export function ChapterMap({ chapters }: { chapters: Chapter[] }) {
  return (
    <section className={styles.root} aria-label="关卡地图">
      <div className={styles.header}>
        <div className={styles.hKicker}>CHAPTER MAP</div>
        <div className={styles.hTitle}>关卡地图</div>
        <div className={styles.hSub}>每章一张场景图，按路径推进解锁。</div>
      </div>

      <div className={styles.map}>
        <div className={styles.spine} aria-hidden="true" />
        {chapters.map((c, idx) => {
          const href = c.status === "locked" ? "#" : `/learn/${c.slug}`;
          const size = idx % 2 === 0 ? "landscape_4_3" : "landscape_16_9";
          const url = imgUrl(c.prompt, size);
          return (
            <div key={c.id} className={cx(styles.node, idx % 2 === 0 ? styles.left : styles.right)}>
              <div className={cx(styles.badge, styles[`badge_${c.status}`])}>
                <span className={styles.dot} />
                <span className={styles.badgeText}>{statusText(c.status)}</span>
              </div>
              <Link className={cx(styles.card, c.status === "locked" && styles.cardLocked)} href={href}>
                <div className={styles.cardTop}>
                  <div className={styles.cardTitle}>{c.title}</div>
                  <div className={styles.cardSub}>{c.subtitle}</div>
                </div>
                <div className={styles.scene}>
                  <Image
                    className={styles.sceneImg}
                    src={url}
                    alt={`${c.title} 场景`}
                    width={960}
                    height={720}
                  />
                  <div className={styles.sceneOverlay} />
                </div>
                <div className={styles.ctaRow}>
                  <span className={styles.cta}>进入关卡</span>
                  <span className={styles.ctaHint}>→</span>
                </div>
              </Link>
              <div className={styles.spark} aria-hidden="true" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

