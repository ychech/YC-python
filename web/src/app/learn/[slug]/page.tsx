import Link from "next/link";
import { AppShell } from "@/components/AppShell/AppShell";
import { Card } from "@/components/Card/Card";
import { CommandBar } from "@/components/CommandBar/CommandBar";
import { NeonButton } from "@/components/NeonButton/NeonButton";
import { PracticeDrawer } from "@/components/PracticeDrawer/PracticeDrawer";
import { SidebarTree } from "@/components/SidebarTree/SidebarTree";
import { findKnowledgeBySlug } from "@/lib/knowledge";
import styles from "./page.module.css";

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const node = findKnowledgeBySlug(slug);
  const title = node?.title ?? "知识点";

  return (
    <div className={styles.page}>
      <CommandBar />
      <AppShell
        sidebar={<SidebarTree />}
        rail={
          <div className={styles.rail}>
            <Card>
              <Card.Header>
                <div className={styles.railTitle}>本节要点</div>
              </Card.Header>
              <Card.Body>
                <ul className={styles.bullets}>
                  <li>先理解概念，再写 3 个例子。</li>
                  <li>把“常见坑”写进自己的笔记。</li>
                  <li>做完练习题再标记已学。</li>
                </ul>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <div className={styles.railTitle}>快捷动作</div>
              </Card.Header>
              <Card.Body>
                <div className={styles.railActions}>
                  <Link href="/playground">
                    <NeonButton tone="ghost">在 Playground 试一试</NeonButton>
                  </Link>
                  <NeonButton>标记已学</NeonButton>
                </div>
              </Card.Body>
            </Card>
          </div>
        }
      >
        <Card>
          <Card.Header>
            <div className={styles.headerRow}>
              <div>
                <div className={styles.breadcrumb}>
                  <Link className={styles.crumb} href="/">
                    首页
                  </Link>
                  <span className={styles.sep}>/</span>
                  <span className={styles.crumbDim}>知识点</span>
                </div>
                <div className={styles.title}>{title}</div>
                <div className={styles.meta}>预计 12 分钟 · 难度：基础 · 标签：核心</div>
              </div>
              <div className={styles.headerActions}>
                <Link href="/playground">
                  <NeonButton tone="ghost">运行示例</NeonButton>
                </Link>
                <PracticeDrawer title={title} />
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div className={styles.content}>
              <section className={styles.section}>
                <h2>目标</h2>
                <p>
                  用最少的概念，建立可复盘的心智模型：你能解释清楚“是什么 / 为什么 / 什么时候用”，并能写出
                  3 个不依赖复制粘贴的例子。
                </p>
              </section>

              <section className={styles.section}>
                <h2>核心概念</h2>
                <div className={styles.callout}>
                  <div className={styles.calloutTitle}>一句话</div>
                  <div className={styles.calloutBody}>
                    Python 的变量更像“贴标签”：名字指向对象，对象才有类型。
                  </div>
                </div>
                <p>
                  先记住这句：<span className={styles.inlineCode}>x = 1</span> 不是“x 是 int”，而是“x 指向一个 int
                  对象”。
                </p>
              </section>

              <section className={styles.section}>
                <h2>示例代码</h2>
                <pre className={styles.code}>
                  <code>{`x = 1
y = x
x = x + 1
print("x:", x)
print("y:", y)`}</code>
                </pre>
                <div className={styles.note}>练习：把 x 改成 list，再观察 y 的变化。</div>
              </section>

              <section className={styles.section}>
                <h2>常见坑</h2>
                <ul className={styles.bullets}>
                  <li>把“变量类型”当成“对象类型”，导致解释不清浅拷贝/深拷贝。</li>
                  <li>对可变对象进行原地修改（append / update），忘了引用共享。</li>
                  <li>用 == 与 is 混用。</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>面试题</h2>
                <div className={styles.q}>
                  <div className={styles.qTitle}>Q1：Python 是静态类型还是动态类型？</div>
                  <div className={styles.qBody}>
                    动态类型：运行时决定对象类型；但也可以通过类型注解做静态分析。
                  </div>
                </div>
              </section>
            </div>
          </Card.Body>
        </Card>
      </AppShell>
    </div>
  );
}
