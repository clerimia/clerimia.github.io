import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

type Tone = 'fg' | 'muted' | 'primary' | 'ok' | 'err' | 'warn';

interface Line {
  kind: 'in' | 'out';
  text: string;
  tone?: Tone;
}

export interface TerminalProps {
  lang?: 'zh-CN' | 'en';
  user?: string;
  host?: string;
  cwd?: string;
  bannerTitle?: string;
  bannerSub?: string;
  authorName?: string;
  authorDesc?: string;
  /** 可 cd 的栏目：{ blog: '/blog', ... } */
  routes?: Record<string, string>;
  social?: Record<string, string>;
}

export default function Terminal({
  lang = 'zh-CN',
  user = 'user',
  host = 'localhost',
  cwd = '~',
  bannerTitle = 'wterm v0.1',
  bannerSub = '',
  authorName = '',
  authorDesc = '',
  routes = {},
  social = {},
}: TerminalProps) {
  const zh = lang === 'zh-CN';

  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [typed, setTyped] = useState('');
  const [histIdx, setHistIdx] = useState(-1);

  const historyRef = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const welcome = zh
    ? `你好，我是 ${authorName || '这里的主人'}。输入 help 查看可用命令。`
    : `Hi, I'm ${authorName || 'the author'}. Type "help" to see available commands.`;

  // 展开时的打字机欢迎语
  useEffect(() => {
    if (!open) return;
    setTyped('');
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(welcome.slice(0, i));
      if (i >= welcome.length) window.clearInterval(timer);
    }, 26);
    return () => window.clearInterval(timer);
  }, [open, welcome]);

  // 展开后聚焦输入框
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // 输出变化后自动滚到底部
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typed]);

  // 全局 ` 键打开终端
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '`' || open) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      e.preventDefault();
      setOpen(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const out = (text: string, tone: Tone = 'fg'): Line => ({ kind: 'out', text, tone });
      const emit = (arr: Line[]) => setLines((prev) => [...prev, ...arr]);

      emit([{ kind: 'in', text: cmd }]);
      if (!cmd) return;

      const [name, ...rest] = cmd.split(/\s+/);
      const arg = rest.join(' ').trim();
      const key = name.toLowerCase();

      switch (key) {
        case 'help': {
          const rows = zh
            ? [
                '可用命令：',
                '  help                     显示帮助',
                '  whoami                   关于我',
                '  ls                       列出站点栏目',
                '  cd <栏目>                跳转（如 cd blog）',
                '  theme [dark|light|system] 切换主题',
                '  social                   社交与联系方式',
                '  date                     当前时间',
                '  echo <文本>              回显文本',
                '  clear                    清屏',
              ]
            : [
                'Available commands:',
                '  help                     show this help',
                '  whoami                   about me',
                '  ls                       list sections',
                '  cd <section>             navigate (e.g. cd blog)',
                '  theme [dark|light|system] switch theme',
                '  social                   social links',
                '  date                     current time',
                '  echo <text>              echo text',
                '  clear                    clear screen',
              ];
          emit(rows.map((r) => out(r, 'muted')));
          break;
        }

        case 'whoami': {
          emit([out(authorName || '-', 'primary'), out(authorDesc || '-', 'muted')]);
          break;
        }

        case 'ls': {
          const keys = Object.keys(routes);
          if (!keys.length) {
            emit([out(zh ? '没有可跳转的栏目。' : 'No sections available.', 'muted')]);
          } else {
            emit([
              out(keys.join('    '), 'primary'),
              out(zh ? '提示：使用 cd <栏目> 跳转' : 'Hint: use cd <section> to navigate', 'muted'),
            ]);
          }
          break;
        }

        case 'cd': {
          if (!arg) {
            emit([out(zh ? '用法：cd <栏目>' : 'usage: cd <section>', 'warn')]);
            break;
          }
          const target = routes[arg.replace(/^\//, '')];
          if (target) {
            emit([out(zh ? `正在跳转到 ${target} ...` : `Navigating to ${target} ...`, 'ok')]);
            window.setTimeout(() => {
              window.location.href = target;
            }, 350);
          } else {
            emit([out(zh ? `没有这个栏目：${arg}` : `no such section: ${arg}`, 'err')]);
          }
          break;
        }

        case 'theme': {
          const mode = arg.toLowerCase();
          const root = document.documentElement;
          if (mode === 'dark') root.classList.add('dark');
          else if (mode === 'light') root.classList.remove('dark');
          else if (mode === 'system') {
            const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', dark);
          } else {
            root.classList.toggle('dark');
          }
          const nowDark = root.classList.contains('dark');
          try {
            localStorage.setItem('theme', nowDark ? 'dark' : 'light');
          } catch {
            /* ignore */
          }
          emit([out(zh ? `已切换到${nowDark ? '暗色' : '亮色'}主题` : `Theme: ${nowDark ? 'dark' : 'light'}`, 'ok')]);
          break;
        }

        case 'social': {
          const entries = Object.entries(social);
          if (!entries.length) {
            emit([out(zh ? '未配置社交链接。' : 'No social links configured.', 'muted')]);
          } else {
            emit(entries.map(([k, v]) => out(`${k.padEnd(8)} ${v}`, 'primary')));
          }
          break;
        }

        case 'date':
          emit([out(new Date().toLocaleString(zh ? 'zh-CN' : 'en-US'), 'fg')]);
          break;

        case 'echo':
          emit([out(arg || '', 'fg')]);
          break;

        case 'clear':
          setLines([]);
          break;

        case 'sudo':
          emit([out(zh ? '你已经是这里的主人了，不需要 sudo。' : "You already own this place. No sudo needed.", 'warn')]);
          break;

        default:
          emit([
            out(zh ? `command not found: ${name}` : `command not found: ${name}`, 'err'),
            out(zh ? '输入 help 查看可用命令' : 'Type "help" for available commands', 'muted'),
          ]);
      }
    },
    [zh, routes, social, authorName, authorDesc],
  );

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = input;
      if (value.trim()) historyRef.current.push(value);
      setHistIdx(-1);
      run(value);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const h = historyRef.current;
      if (!h.length) return;
      const idx = histIdx < 0 ? h.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(h[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const h = historyRef.current;
      if (histIdx < 0) return;
      const idx = histIdx + 1;
      if (idx >= h.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(idx);
        setInput(h[idx]);
      }
    }
  };

  const prompt = (
    <span className="wt-prompt">
      <span className="wt-prompt-user">{user}</span>
      <span className="wt-prompt-at">@</span>
      <span className="wt-prompt-host">{host}</span>
      <span className="wt-prompt-cwd"> {cwd}</span>
      <span className="wt-prompt-sigil">$</span>
    </span>
  );

  return (
    <div
      className={`wt-shell${open ? '' : ' wt-shell--collapsed'}`}
      role={open ? undefined : 'button'}
      tabIndex={open ? undefined : 0}
      aria-expanded={open}
      onClick={() => {
        if (!open) setOpen(true);
      }}
      onKeyDown={(e) => {
        if (!open && (e.key === 'Enter' || e.key === ' ')) setOpen(true);
      }}
    >
      <div className="wt-titlebar">
        <div className="wt-lights" aria-hidden="true">
          <button
            type="button"
            className="wt-light wt-light--r"
            tabIndex={-1}
            aria-label={open ? 'collapse' : 'open'}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          />
          <button
            type="button"
            className="wt-light wt-light--y"
            tabIndex={-1}
            aria-label="open"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
          <button
            type="button"
            className="wt-light wt-light--g"
            tabIndex={-1}
            aria-label="open"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
        </div>

        <div className="wt-title">
          {open ? (
            <>
              <span className="wt-tone-muted">
                {user}@{host}
              </span>
              <span className="wt-tone-muted"> — {bannerTitle}</span>
            </>
          ) : (
            <>
              <span className="wt-prompt-sigil">$</span>
              <span className="wt-caret wt-caret--idle" />
            </>
          )}
        </div>

        <div className="wt-hint">
          {open ? (
            typed ? (
              <span className="wt-tone-muted">{zh ? '输入 help 开始' : 'type help to start'}</span>
            ) : null
          ) : (
            <>
              {zh ? '点击或按 ' : 'click or '}
              <span className="wt-kbd">`</span>
              {zh ? ' 打开' : ' to open'}
            </>
          )}
        </div>
      </div>

      <div className="wt-body" ref={bodyRef}>
        {open && (
          <>
            <div className="wt-banner">
              <span className="wt-banner-title">{bannerTitle}</span>
              {bannerSub && <span className="wt-banner-sub">{bannerSub}</span>}
            </div>

            <div className="wt-output">
              <span className="wt-line wt-tone-muted">
                {typed}
                {typed.length < welcome.length && <span className="wt-caret" />}
              </span>

              {lines.map((l, i) =>
                l.kind === 'in' ? (
                  <span className="wt-line wt-entry" key={i}>
                    {prompt}
                    <span className="wt-tone-fg">{l.text}</span>
                  </span>
                ) : (
                  <span className={`wt-line wt-tone-${l.tone ?? 'fg'}`} key={i}>
                    {l.text}
                  </span>
                ),
              )}
            </div>

            <div className="wt-input-row" onClick={() => inputRef.current?.focus()}>
              {prompt}
              <span className="wt-input-display">
                <span className="wt-tone-fg">{input}</span>
                <span className="wt-caret" />
                {!input && (
                  <span className="wt-input-hint">
                    {zh ? (
                      <>
                        类型 <span className="wt-tone-primary">help</span> 查看命令
                      </>
                    ) : (
                      <>
                        type <span className="wt-tone-primary">help</span> for commands
                      </>
                    )}
                  </span>
                )}
              </span>
              <input
                ref={inputRef}
                className="wt-input-hidden"
                value={input}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                aria-label="terminal input"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
