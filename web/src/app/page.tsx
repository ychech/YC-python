import Link from "next/link";
import { AppShell } from "@/components/AppShell/AppShell";
import { Card } from "@/components/Card/Card";
import { CommandBar } from "@/components/CommandBar/CommandBar";
import { NeonButton } from "@/components/NeonButton/NeonButton";
import { SidebarTree } from "@/components/SidebarTree/SidebarTree";
import styles from "./page.module.css";

const tasks = [
  { id: "t1", title: "变量与数据类型", meta: "预计 12 分钟 · 进行中" },
  { id: "t2", title: "输入输出 print / input", meta: "预计 10 分钟 · 待开始" },
  { id: "t3", title: "程序输出题（结果推导）", meta: "5 道 · 巩固" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <CommandBar />
      <AppShell
        sidebar={<SidebarTree />}
        rail={
          <div className={styles.rail}>
            <Card>
              <Card.Header>
                <div className={styles.railTitle}>快速入口</div>
              </Card.Header>
              <Card.Body>
                <div className={styles.quickList}>
                  <Link className={styles.quickLink} href="/learn/types">
                    继续学习
                  </Link>
                  <Link className={styles.quickLink} href="/playground">
                    在线编辑器
                  </Link>
                  <Link className={styles.quickLink} href="/learn/io">
                    做一组练习
                  </Link>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <div className={styles.railTitle}>错题复盘</div>
              </Card.Header>
              <Card.Body>
                <div className={styles.miniMetric}>
                  <div className={styles.miniValue}>13</div>
                  <div className={styles.miniLabel}>待复习</div>
                </div>
              </Card.Body>
            </Card>
          </div>
        }
      >
        <Card tone="solid">
          <div className={styles.hero}>
            <div>
              <div className={styles.kicker}>SYSTEM LEARNING MODE</div>
              <h1 className={styles.heroTitle}>把 Python 学成一套“可复盘的体系”</h1>
              <p className={styles.heroDesc}>
                知识树、练习、进度、错题复盘全部联动。今天先把“数据类型”打穿。
              </p>
              <div className={styles.heroActions}>
                <Link href="/learn/types">
                  <NeonButton>继续学习</NeonButton>
                </Link>
                <Link href="/playground">
                  <NeonButton tone="ghost">打开 Playground</NeonButton>
                </Link>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.statGrid}>
                <div className={styles.stat}>
                  <div className={styles.statLabel}>连续学习</div>
                  <div className={styles.statValue}>
                    6<span className={styles.statUnit}>天</span>
                  </div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statLabel}>今日任务</div>
                  <div className={styles.statValue}>
                    3<span className={styles.statUnit}>项</span>
                  </div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statLabel}>阶段完成</div>
                  <div className={styles.statValue}>
                    18<span className={styles.statUnit}>%</span>
                  </div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statLabel}>正确率</div>
                  <div className={styles.statValue}>
                    76<span className={styles.statUnit}>%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className={styles.cols}>
          <Card>
            <Card.Header>
              <div className={styles.cardTitle}>今日任务</div>
              <div className={styles.cardSub}>按路径推荐，完成后自动解锁</div>
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
              <div className={styles.cardTitle}>学习热区</div>
              <div className={styles.cardSub}>最近 7 天最容易踩坑的点</div>
            </Card.Header>
            <Card.Body>
              <div className={styles.hotList}>
                <div className={styles.hotItem}>
                  <div className={styles.hotName}>可变 / 不可变</div>
                  <div className={styles.hotHint}>list / dict 与 tuple / str</div>
                </div>
                <div className={styles.hotItem}>
                  <div className={styles.hotName}>浅拷贝 / 深拷贝</div>
                  <div className={styles.hotHint}>引用语义与副作用</div>
                </div>
                <div className={styles.hotItem}>
                  <div className={styles.hotName}>类型转换</div>
                  <div className={styles.hotHint}>int / float / bool 的坑</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </AppShell>
    </div>
  );
}
