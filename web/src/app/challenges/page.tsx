import Link from "next/link";
import { Card } from "@/components/Card/Card";
import { CommandBar } from "@/components/CommandBar/CommandBar";
import { Container } from "@/components/Container/Container";
import styles from "./page.module.css";

const tiers = [
  {
    id: "t1",
    title: "新手区",
    desc: "5 分钟一关，打通基础肌肉记忆",
    items: [
      { id: "c1", title: "变量与类型", meta: "10 题 · 通过率 62%", status: "doing", href: "/learn/types" },
      { id: "c2", title: "输入输出", meta: "10 题 · 待开始", status: "todo", href: "/learn/io" },
      { id: "c3", title: "运算符速刷", meta: "12 题 · 未解锁", status: "locked", href: "/learn/ops" },
    ],
  },
  {
    id: "t2",
    title: "进阶区",
    desc: "更像面试题：理解 + 推导 + 解释",
    items: [
      { id: "c4", title: "可变与不可变", meta: "8 题 · 未解锁", status: "locked", href: "/learn/data-structures" },
      { id: "c5", title: "浅拷贝与深拷贝", meta: "6 题 · 未解锁", status: "locked", href: "/learn/data-structures" },
    ],
  },
];

function statusText(status: string) {
  if (status === "done") return "已通关";
  if (status === "doing") return "进行中";
  if (status === "locked") return "未解锁";
  return "待开始";
}

export default function ChallengesPage() {
  return (
    <div className={styles.page}>
      <CommandBar />
      <Container className={styles.container}>
        <div className={styles.header}>
          <div className={styles.kicker}>CHALLENGE MODE</div>
          <div className={styles.title}>挑战关卡</div>
          <div className={styles.sub}>把题库变成一张地图：一关一反馈，一错一复盘。</div>
        </div>

        <div className={styles.tiers}>
          {tiers.map((t) => (
            <Card key={t.id}>
              <Card.Header>
                <div className={styles.tierTitle}>{t.title}</div>
                <div className={styles.tierSub}>{t.desc}</div>
              </Card.Header>
              <Card.Body>
                <div className={styles.grid}>
                  {t.items.map((it) => (
                    <Link
                      key={it.id}
                      className={styles.item}
                      href={it.status === "locked" ? "#" : it.href}
                      aria-disabled={it.status === "locked"}
                    >
                      <div className={styles.itemTop}>
                        <div className={styles.itemTitle}>{it.title}</div>
                        <div className={styles.pill} data-status={it.status}>
                          {statusText(it.status)}
                        </div>
                      </div>
                      <div className={styles.itemMeta}>{it.meta}</div>
                      <div className={styles.itemCta}>
                        <span className={styles.itemCtaText}>进入</span>
                        <span className={styles.itemCtaArrow}>→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

