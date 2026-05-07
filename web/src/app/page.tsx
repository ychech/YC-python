import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/Card/Card";
import { CommandBar } from "@/components/CommandBar/CommandBar";
import { Container } from "@/components/Container/Container";
import { NeonButton } from "@/components/NeonButton/NeonButton";
import { PathMap, type PathStep } from "@/components/PathMap/PathMap";
import styles from "./page.module.css";

const tasks = [
  { id: "t1", title: "变量与数据类型", meta: "预计 12 分钟 · 进行中" },
  { id: "t2", title: "输入输出 print / input", meta: "预计 10 分钟 · 待开始" },
  { id: "t3", title: "程序输出题（结果推导）", meta: "5 道 · 巩固" },
];

const steps: PathStep[] = [
  { id: "s1", title: "环境安装", slug: "install", status: "done", meta: "已完成" },
  { id: "s2", title: "变量与数据类型", slug: "types", status: "doing", meta: "进行中" },
  { id: "s3", title: "输入输出", slug: "io", status: "todo", meta: "待开始" },
  { id: "s4", title: "运算符", slug: "ops", status: "locked", meta: "解锁条件：完成上一节" },
];

export default async function Home() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";
  let apiOnline = false;
  try {
    const res = await fetch(`${base}/health`, { cache: "no-store" });
    apiOnline = res.ok;
  } catch {
    apiOnline = false;
  }
  const prompt =
    "award-winning editorial 3d render, dark minimal learning platform dashboard, subtle neon accent lines, glassmorphism panels, cinematic lighting, soft grain texture, high contrast, no text, no logos, wide angle, ultra detailed";
  const artUrl =
    "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=" +
    encodeURIComponent(prompt) +
    "&image_size=landscape_16_9";

  return (
    <div className={styles.page}>
      <CommandBar />
      <Container className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.kicker}>PATH MODE · API {apiOnline ? "ONLINE" : "OFFLINE"}</div>
            <h1 className={styles.heroTitle}>把学习变成一条能通关的路线</h1>
            <p className={styles.heroDesc}>
              你只需要做两件事：按关卡推进、把错题复盘到会。系统负责把顺序、进度、题目联起来。
            </p>
            <div className={styles.heroActions}>
              <Link href="/learn/types">
                <NeonButton>继续学习</NeonButton>
              </Link>
              <Link href="/playground">
                <NeonButton tone="ghost">打开 Playground</NeonButton>
              </Link>
            </div>
            <div className={styles.miniStats}>
              <div className={styles.miniStat}>
                <div className={styles.miniLabel}>连续</div>
                <div className={styles.miniValue}>
                  6<span className={styles.miniUnit}>天</span>
                </div>
              </div>
              <div className={styles.miniStat}>
                <div className={styles.miniLabel}>阶段</div>
                <div className={styles.miniValue}>
                  18<span className={styles.miniUnit}>%</span>
                </div>
              </div>
              <div className={styles.miniStat}>
                <div className={styles.miniLabel}>错题</div>
                <div className={styles.miniValue}>
                  13<span className={styles.miniUnit}>题</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.heroArt}>
            <Image
              className={styles.artImg}
              src={artUrl}
              alt="学习平台氛围图"
              width={1024}
              height={576}
              priority
            />
            <div className={styles.artOverlay} />
            <div className={styles.artBadge}>
              <div className={styles.badgeTitle}>今日 Boss</div>
              <div className={styles.badgeValue}>变量与数据类型</div>
            </div>
          </div>
        </section>

        <PathMap title="基础入门 · 关卡进度" steps={steps} />

        <div className={styles.grid}>
          <Card>
            <Card.Header>
              <div className={styles.cardTitle}>今日任务</div>
              <div className={styles.cardSub}>建议按顺序完成，效率最高</div>
            </Card.Header>
            <Card.Body>
              <div className={styles.taskList}>
                {tasks.map((t) => (
                  <Link key={t.id} className={styles.taskRow} href="/learn/types">
                    <div className={styles.taskTitle}>{t.title}</div>
                    <div className={styles.taskMeta}>{t.meta}</div>
                  </Link>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <div className={styles.cardTitle}>快速动作</div>
              <div className={styles.cardSub}>把学习过程做得更顺手</div>
            </Card.Header>
            <Card.Body>
              <div className={styles.actions}>
                <Link className={styles.actionRow} href="/playground">
                  <div className={styles.actionName}>打开 Playground</div>
                  <div className={styles.actionHint}>验证理解 · 运行片段</div>
                </Link>
                <Link className={styles.actionRow} href="/learn/types">
                  <div className={styles.actionName}>刷一组练习</div>
                  <div className={styles.actionHint}>本节 10 题 · 自动判分</div>
                </Link>
                <Link className={styles.actionRow} href="/learn/io">
                  <div className={styles.actionName}>预习下一关</div>
                  <div className={styles.actionHint}>输入输出 · 10 分钟</div>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
