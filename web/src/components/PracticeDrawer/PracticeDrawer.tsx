"use client";

import { useMemo, useState } from "react";
import { cx } from "@/lib/cx";
import { NeonButton } from "@/components/NeonButton/NeonButton";
import styles from "./PracticeDrawer.module.css";

type Q = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  analysis: string;
};

export function PracticeDrawer({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const questions: Q[] = useMemo(
    () => [
      {
        id: "q1",
        prompt: "下面哪句话最贴近 Python 变量的本质？",
        options: ["变量有类型，值没有类型", "变量像标签，名字指向对象", "变量是内存地址的别名", "变量只存储引用，不能存储值"],
        answer: 1,
        analysis: "在 Python 中类型属于对象。名字只是引用（指向对象）。",
      },
      {
        id: "q2",
        prompt: "执行后输出是什么？ x=1; y=x; x=x+1; print(y)",
        options: ["0", "1", "2", "报错"],
        answer: 1,
        analysis: "y 仍指向旧的 int 对象 1；x 重新绑定到新对象 2。",
      },
      {
        id: "q3",
        prompt: "关于 == 和 is，正确的是：",
        options: ["is 比 == 更快，建议都用 is", "== 比较值，is 比较是否同一对象", "is 比较类型，== 比较引用", "两者完全等价"],
        answer: 1,
        analysis: "== 调用 __eq__ 做相等判断；is 判断 identity。",
      },
    ],
    []
  );

  const q = questions[idx]!;
  const correct = picked === q.answer;

  function resetQuestion() {
    setPicked(null);
    setChecked(false);
  }

  function next() {
    const n = Math.min(idx + 1, questions.length - 1);
    setIdx(n);
    resetQuestion();
  }

  function prev() {
    const n = Math.max(idx - 1, 0);
    setIdx(n);
    resetQuestion();
  }

  return (
    <>
      <NeonButton
        tone="ghost"
        onClick={() => {
          setOpen(true);
        }}
      >
        打开练习抽屉
      </NeonButton>

      <div className={cx(styles.overlay, open && styles.overlayOpen)} aria-hidden={!open}>
        <div
          className={cx(styles.drawer, open && styles.drawerOpen)}
          role="dialog"
          aria-modal="true"
          aria-label="练习抽屉"
        >
          <div className={styles.top}>
            <div>
              <div className={styles.kicker}>PRACTICE</div>
              <div className={styles.title}>{title}</div>
              <div className={styles.meta}>
                {idx + 1}/{questions.length} · 选项题 · 自动判分
              </div>
            </div>
            <button className={styles.close} onClick={() => setOpen(false)} aria-label="关闭">
              ×
            </button>
          </div>

          <div className={styles.body}>
            <div className={styles.q}>{q.prompt}</div>
            <div className={styles.opts}>
              {q.options.map((o, i) => (
                <button
                  key={o}
                  className={cx(
                    styles.opt,
                    picked === i && styles.optPicked,
                    checked && i === q.answer && styles.optCorrect,
                    checked && picked === i && picked !== q.answer && styles.optWrong
                  )}
                  onClick={() => setPicked(i)}
                  disabled={checked}
                >
                  <span className={styles.optKey}>{String.fromCharCode(65 + i)}</span>
                  <span className={styles.optText}>{o}</span>
                </button>
              ))}
            </div>

            <div className={styles.actions}>
              <button className={styles.nav} onClick={prev} disabled={idx === 0}>
                ← 上一题
              </button>
              <div className={styles.mid}>
                <button
                  className={styles.check}
                  onClick={() => setChecked(true)}
                  disabled={picked === null || checked}
                >
                  提交判分
                </button>
                <button className={styles.reset} onClick={resetQuestion} disabled={!picked && !checked}>
                  重置
                </button>
              </div>
              <button className={styles.nav} onClick={next} disabled={idx === questions.length - 1}>
                下一题 →
              </button>
            </div>

            {checked ? (
              <div className={styles.result}>
                <div className={cx(styles.resultBadge, correct ? styles.ok : styles.bad)}>
                  {correct ? "通过" : "未通过"}
                </div>
                <div className={styles.analysis}>{q.analysis}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

