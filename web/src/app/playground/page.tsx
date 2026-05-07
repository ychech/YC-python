import { Card } from "@/components/Card/Card";
import { CommandBar } from "@/components/CommandBar/CommandBar";
import { NeonButton } from "@/components/NeonButton/NeonButton";
import styles from "./page.module.css";

export default function PlaygroundPage() {
  return (
    <div className={styles.page}>
      <CommandBar />
      <div className={styles.shell}>
        <div className={styles.left}>
          <Card>
            <Card.Header>
              <div className={styles.panelTitle}>说明</div>
              <div className={styles.panelSub}>这里先做 UI 骨架，后续接 Docker/Judge0 执行。</div>
            </Card.Header>
            <Card.Body>
              <div className={styles.desc}>
                <div className={styles.tipRow}>
                  <span className={styles.tipKey}>Run</span>
                  <span className={styles.tipText}>执行当前代码</span>
                </div>
                <div className={styles.tipRow}>
                  <span className={styles.tipKey}>Reset</span>
                  <span className={styles.tipText}>恢复示例模板</span>
                </div>
                <div className={styles.tipRow}>
                  <span className={styles.tipKey}>Save</span>
                  <span className={styles.tipText}>保存为代码片段</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className={styles.center}>
          <Card tone="solid">
            <Card.Header>
              <div className={styles.editorHeader}>
                <div>
                  <div className={styles.editorTitle}>Playground</div>
                  <div className={styles.editorMeta}>Python · sandbox pending</div>
                </div>
                <div className={styles.actions}>
                  <NeonButton tone="ghost">Reset</NeonButton>
                  <NeonButton>Run</NeonButton>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div className={styles.editorGrid}>
                <div className={styles.editorPane}>
                  <div className={styles.paneLabel}>editor.py</div>
                  <textarea
                    className={styles.textarea}
                    defaultValue={`name = "Python"
print("Hello,", name)

nums = [1, 2, 3]
print(sum(nums))`}
                    spellCheck={false}
                  />
                </div>
                <div className={styles.outputPane}>
                  <div className={styles.paneLabel}>output</div>
                  <pre className={styles.output}>
                    <code>{`Hello, Python
6`}</code>
                  </pre>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

