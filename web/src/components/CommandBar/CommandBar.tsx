import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./CommandBar.module.css";

export function CommandBar() {
  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link className={styles.brand} href="/">
            <span className={styles.brandMark} />
            <span className={styles.brandText}>YC Python</span>
          </Link>
          <div className={styles.searchShell}>
            <span className={styles.searchIcon} aria-hidden="true">
              ⌕
            </span>
            <input
              className={styles.search}
              placeholder="搜索知识点 / 题目 / 项目"
              aria-label="搜索"
            />
            <span className={styles.searchHint}>Ctrl K</span>
          </div>
        </div>

        <nav className={styles.right} aria-label="主导航">
          <Link className={cx(styles.navLink, styles.dim)} href="/challenges">
            Challenges
          </Link>
          <Link className={cx(styles.navLink, styles.dim)} href="/playground">
            Playground
          </Link>
          <Link className={cx(styles.navLink, styles.dim)} href="/learn/types">
            继续学习
          </Link>
          <button className={styles.avatar} aria-label="用户">
            <span className={styles.avatarText}>U</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
