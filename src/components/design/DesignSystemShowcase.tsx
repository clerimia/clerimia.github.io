import { cn } from '@/lib/utils'
import { ArrowRight, ArrowUpRight, CircleAlert, Info, Mail, Plus, Trash2 } from 'lucide-react'
import type { ReactNode } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'

const neutralSteps = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '450',
  '500',
  '550',
  '600',
  '650',
  '700',
  '750',
  '800',
  '850',
  '900',
  '950'
]
const greenSteps = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '650',
  '700',
  '800',
  '850',
  '900',
  '950'
]
const wineSteps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

const typeRows = [
  ['display', '48 / 1.20 / 600', 'text-display', '一边创作，一边成为自己。'],
  ['page title', '36 / 1.25 / 600', 'text-page-title', '文章标题可以很长，也要保持呼吸。'],
  ['section', '24 / 1.35 / 600', 'text-section', '最近写下的'],
  ['item title', '18 / 1.45 / 600', 'text-item-title', '为什么想要写博客'],
  ['lead', '18 / 1.75 / 400', 'text-lead', '一段引言，解释这篇文章为什么值得读下去。'],
  [
    'reading',
    '16 / 1.80 / 400',
    'text-reading',
    '正文以舒适为先。中英文混排、代码与引用都在同一条阅读节奏里。'
  ],
  ['ui', '14 / 1.60 / 400', 'text-ui', '阅读文章 · 搜索站点 · 切换主题'],
  ['meta', '12 / 1.50 / 400', 'text-meta', '2026.11.08 · 设计']
] as const

const radiusRows = [
  ['sm', '4.8', 'rounded-sm'],
  ['md', '6.4', 'rounded-md'],
  ['lg', '8', 'rounded-lg'],
  ['xl', '11.2', 'rounded-xl'],
  ['2xl', '14.4', 'rounded-2xl'],
  ['3xl', '17.6', 'rounded-3xl'],
  ['4xl', '20.8', 'rounded-4xl']
] as const

const spaceRows = ['1', '2', '3', '4', '5', '6', '8', '12', '18'] as const
const controlRows = [
  ['sm', '32', 'h-(--control-height-sm)'],
  ['default', '36', 'h-(--control-height)'],
  ['lg', '40', 'h-(--control-height-lg)'],
  ['touch', '44', 'h-11']
] as const

function Section({
  id,
  index,
  title,
  note,
  children
}: {
  id: string
  index: string
  title: string
  note: string
  children: ReactNode
}) {
  return (
    <section id={id} className='border-t border-border py-12 first:border-t-0 first:pt-0'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='font-mono text-[11px] tracking-[0.12em] text-primary'>{index}</p>
          <h2 className='mt-2 text-section'>{title}</h2>
        </div>
        <p className='font-mono text-[10px] text-muted-foreground'>{note}</p>
      </div>
      <div className='mt-8'>{children}</div>
    </section>
  )
}

function Ramp({
  title,
  note,
  prefix,
  steps
}: {
  title: string
  note: string
  prefix: string
  steps: readonly string[]
}) {
  return (
    <div className='grid gap-4 border-b border-border/70 py-5 last:border-b-0 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6'>
      <div>
        <p className='text-sm font-semibold'>{title}</p>
        <p className='mt-1 text-xs leading-relaxed text-muted-foreground'>{note}</p>
      </div>
      <div className='grid grid-cols-4 gap-1.5 sm:grid-cols-8'>
        {steps.map((step) => (
          <div key={step} className='min-w-0'>
            <div
              className='h-11 rounded-sm border border-border/30'
              style={{ background: `hsl(var(${prefix}-${step}))` }}
            />
            <p className='mt-1 truncate font-mono text-[9px] text-muted-foreground'>{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TokenCard({
  surface,
  foreground,
  label
}: {
  surface: string
  foreground: string
  label: string
}) {
  return (
    <div className='rounded-lg border bg-card p-3'>
      <div
        className='flex h-12 items-center rounded-md border border-border/40 px-3 text-[13px] font-medium'
        style={{ background: `hsl(var(--${surface}))`, color: `hsl(var(--${foreground}))` }}
      >
        {label}
      </div>
      <div className='mt-2 flex items-center justify-between gap-3 font-mono text-[10px] text-muted-foreground'>
        <span className='truncate'>--{surface}</span>
        <span className='truncate'>/ --{foreground}</span>
      </div>
    </div>
  )
}

function StatusCard() {
  const states = [
    ['info', '信息'],
    ['success', '成功'],
    ['warning', '警告'],
    ['error', '错误']
  ] as const

  return (
    <div className='rounded-lg border bg-card p-3'>
      <div className='grid h-12 grid-cols-4 gap-1'>
        {states.map(([name, label]) => (
          <div
            key={name}
            className='flex items-center justify-center rounded-md text-[10px] font-medium'
            style={{
              background: `hsl(var(--status-${name}-surface))`,
              color: `hsl(var(--status-${name}))`
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <div className='mt-2 flex items-center justify-between gap-3 font-mono text-[10px] text-muted-foreground'>
        <span>--status-*</span>
        <span>/ --status-*-surface</span>
      </div>
    </div>
  )
}

export default function DesignSystemShowcase() {
  return (
    <div className='mx-auto w-full max-w-[1120px] pb-20'>
      <header className='py-8'>
        <p className='flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground'>
          <span className='size-2 rounded-full bg-primary' aria-hidden='true' />
          CLERIMIA · DESIGN SYSTEM
        </p>
        <h1 className='mt-5 text-balance text-display'>安静，但有自己的声音。</h1>
        <p className='mt-5 max-w-[760px] text-pretty text-lead text-muted-foreground'>
          以 shadcn/ui
          的语义令牌为骨架，用中性画布、身份绿与夜间酒红表达两套主题。这里是原语、语义变量、排版、尺度与组件的唯一来源。
        </p>
        <div className='mt-6 flex flex-wrap items-center gap-2'>
          <Badge variant='outline'>v0.1 · foundation</Badge>
          <Badge variant='outline'>shadcn/ui contract</Badge>
          <Badge variant='outline'>Light / Dark</Badge>
        </div>
      </header>

      <Section
        id='primitives'
        index='01 / PRIMITIVES'
        title='原语色板'
        note='原始色值 · 组件不直接使用'
      >
        <div>
          <Ramp
            title='Canvas neutral'
            note='画布、文字、表面与边界'
            prefix='--primitive-neutral'
            steps={neutralSteps}
          />
          <Ramp
            title='Identity green'
            note='跨主题的共同身份'
            prefix='--primitive-green'
            steps={greenSteps}
          />
          <Ramp
            title='Night wine'
            note='夜间行动与情绪'
            prefix='--primitive-wine'
            steps={wineSteps}
          />
        </div>
        <div className='mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {[
            ['Info / Blue', ['50', '200', '600', '850']],
            ['Warning / Amber', ['50', '200', '600', '850']],
            ['Error / Red', ['50', '200', '600', '950']]
          ].map(([name, steps]) => (
            <div key={name as string} className='rounded-lg border bg-card p-3'>
              <p className='font-mono text-[10px] text-muted-foreground'>{name as string}</p>
              <div className='mt-2 flex gap-1'>
                {(steps as string[]).map((step) => (
                  <span
                    key={step}
                    className='h-6 flex-1 rounded-sm border border-border/30'
                    style={{
                      background: `hsl(var(--primitive-${(name as string).split(' / ')[1].toLowerCase()}-${step}))`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className='rounded-lg border bg-card p-3'>
            <p className='font-mono text-[10px] text-muted-foreground'>Chart / Violet + Rose</p>
            <div className='mt-2 flex gap-1'>
              {[
                '--primitive-violet-200',
                '--primitive-violet-600',
                '--primitive-rose-200',
                '--primitive-rose-600'
              ].map((token) => (
                <span
                  key={token}
                  className='h-6 flex-1 rounded-sm border border-border/30'
                  style={{ background: `hsl(var(${token}))` }}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        id='semantic'
        index='02 / SEMANTIC'
        title='语义令牌'
        note='surface / foreground 成对出现'
      >
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          <TokenCard surface='background' foreground='foreground' label='背景 / 正文' />
          <TokenCard surface='card' foreground='card-foreground' label='卡片 / 内容' />
          <TokenCard surface='popover' foreground='popover-foreground' label='浮层 / 内容' />
          <TokenCard surface='primary' foreground='primary-foreground' label='主要行动' />
          <TokenCard surface='secondary' foreground='secondary-foreground' label='次要行动' />
          <TokenCard surface='muted' foreground='muted-foreground' label='弱化内容' />
          <TokenCard surface='accent' foreground='accent-foreground' label='悬停与选中' />
          <TokenCard surface='destructive' foreground='destructive-foreground' label='破坏性操作' />
          <TokenCard surface='brand' foreground='background' label='身份绿 / 信号' />
        </div>
        <div className='mt-3 grid gap-3 sm:grid-cols-2'>
          <div className='rounded-lg border bg-card p-3'>
            <div className='flex h-12 gap-2'>
              {['border', 'input', 'ring'].map((token) => (
                <span
                  key={token}
                  className='h-full flex-1 rounded-md border border-border/30'
                  style={{ background: `hsl(var(--${token}))` }}
                />
              ))}
            </div>
            <div className='mt-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground'>
              <span>--border / --input / --ring</span>
              <span>边界与焦点</span>
            </div>
          </div>
          <StatusCard />
        </div>
      </Section>

      <Section id='type' index='03 / TYPE' title='排版' note='Web: Satoshi / Microsoft YaHei'>
        <div>
          {typeRows.map(([name, spec, className, sample]) => (
            <div
              key={name}
              className='grid items-baseline gap-3 border-b border-border/70 py-4 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6'
            >
              <div>
                <p className='font-mono text-[10px] text-foreground'>
                  --font-{name.replace(' ', '-')}
                </p>
                <p className='mt-1 font-mono text-[9px] text-muted-foreground'>{spec}</p>
              </div>
              <p className={cn(className, 'text-foreground')}>{sample}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id='scale' index='04 / SCALE' title='圆角与间距' note='4px 基线 · radius 8px 为基准'>
        <div className='grid grid-cols-4 gap-3 sm:grid-cols-8'>
          {radiusRows.map(([name, value, className]) => (
            <div key={name} className='flex flex-col items-center gap-2'>
              <div className={cn('size-14 border bg-muted', className)} />
              <p className='font-mono text-[9px] text-foreground'>{name}</p>
              <p className='font-mono text-[8px] text-muted-foreground'>{value}</p>
            </div>
          ))}
        </div>
        <div className='mt-8 flex items-end gap-3 overflow-x-auto pb-2'>
          {spaceRows.map((step) => (
            <div key={step} className='flex shrink-0 flex-col gap-1.5'>
              <div
                className='h-2 rounded-full bg-primary'
                style={{ width: `var(--space-${step})` }}
              />
              <p className='font-mono text-[8px] text-foreground'>space-{step}</p>
            </div>
          ))}
        </div>
        <div className='mt-8 grid grid-cols-4 gap-3'>
          {controlRows.map(([name, value, className]) => (
            <div key={name} className='flex flex-col gap-2'>
              <div className={cn('rounded-md border bg-muted', className)} />
              <p className='font-mono text-[8px] text-foreground'>control-{name}</p>
              <p className='font-mono text-[8px] text-muted-foreground'>{value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id='components'
        index='05 / COMPONENTS'
        title='基础组件'
        note='shadcn/ui 变体 · 全部使用语义令牌'
      >
        <div className='flex flex-col gap-8'>
          <div>
            <p className='mb-3 font-mono text-[10px] text-muted-foreground'>Buttons</p>
            <div className='flex flex-wrap items-center gap-2.5'>
              <Button>
                <Plus data-icon='inline-start' /> 主要行动
              </Button>
              <Button variant='secondary'>次要行动</Button>
              <Button variant='outline'>描边</Button>
              <Button variant='ghost'>幽灵</Button>
              <Button variant='destructive'>
                <Trash2 data-icon='inline-start' /> 删除
              </Button>
              <Button asChild variant='link'>
                <a href='#components'>
                  文字链接 <ArrowRight data-icon='inline-end' />
                </a>
              </Button>
            </div>
            <div className='mt-3 flex flex-wrap items-end gap-2.5'>
              <Button size='sm'>Small · 32</Button>
              <Button>Default · 36</Button>
              <Button size='lg'>Large · 40</Button>
              <Button size='icon' aria-label='更多'>
                <Plus />
              </Button>
            </div>
          </div>

          <div>
            <p className='mb-3 font-mono text-[10px] text-muted-foreground'>Pagination</p>
            <Pagination className='justify-start'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink href='#components' size='default'>
                    上一页
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#components'>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#components' isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#components'>3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href='#components' size='default'>
                    下一页
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <div>
            <p className='mb-3 font-mono text-[10px] text-muted-foreground'>Badges</p>
            <div className='flex flex-wrap items-center gap-2'>
              <Badge>默认</Badge>
              <Badge variant='secondary'>次要</Badge>
              <Badge variant='outline'>描边</Badge>
              <Badge variant='info'>信息</Badge>
              <Badge variant='success'>成功</Badge>
              <Badge variant='warning'>警告</Badge>
              <Badge variant='error'>错误</Badge>
            </div>
          </div>

          <div className='grid gap-4 lg:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>为什么想要写博客</CardTitle>
                <CardDescription>
                  写作不是把想清楚的东西写下来，而是在写的过程中逐渐想清楚。
                </CardDescription>
                <CardAction>
                  <Button variant='ghost' size='icon-sm' aria-label='打开文章'>
                    <ArrowUpRight />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className='flex flex-wrap gap-1.5'>
                <Badge>写作</Badge>
                <Badge variant='secondary'>设计</Badge>
              </CardContent>
              <CardFooter className='justify-between border-t pt-4'>
                <span className='font-mono text-[10px] text-muted-foreground'>
                  2026.11.08 · 阅读 8 分钟
                </span>
                <Button asChild variant='link' size='sm'>
                  <a href='#components'>
                    阅读文章 <ArrowRight data-icon='inline-end' />
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>订阅新文章</CardTitle>
                <CardDescription>不定期写一些关于 AI、全栈与设计的笔记。</CardDescription>
                <CardAction>
                  <Button variant='ghost' size='icon-sm' aria-label='订阅'>
                    <Mail />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <InputGroup>
                  <InputGroupInput aria-label='邮箱' placeholder='you@example.com' />
                  <InputGroupButton type='button' variant='default' size='sm'>
                    订阅
                  </InputGroupButton>
                </InputGroup>
              </CardContent>
              <CardFooter>
                <p className='text-xs text-muted-foreground'>不会发送垃圾邮件，随时可以退订。</p>
              </CardFooter>
            </Card>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='design-title'>标题</FieldLabel>
              <Input id='design-title' placeholder='输入内容' />
            </Field>
            <Field>
              <FieldLabel htmlFor='design-summary'>摘要</FieldLabel>
              <Textarea id='design-summary' placeholder='写下你的想法…' />
            </Field>
          </FieldGroup>

          <div className='grid gap-4 lg:grid-cols-2'>
            <Alert variant='info'>
              <Info />
              <AlertTitle>信息提示</AlertTitle>
              <AlertDescription>这是一条说明当前状态的信息，不打断阅读。</AlertDescription>
            </Alert>
            <Alert variant='error'>
              <CircleAlert />
              <AlertTitle>无法保存</AlertTitle>
              <AlertDescription>请检查网络后重试。错误用文字说明，不只依赖颜色。</AlertDescription>
            </Alert>
          </div>

          <div className='flex flex-wrap items-center gap-6'>
            <Avatar size='lg'>
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <Separator orientation='vertical' className='h-10' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-2.5 w-44' />
              <Skeleton className='h-2.5 w-28' />
            </div>
          </div>
        </div>
      </Section>

      <Section
        id='contract'
        index='06 / CONTRACT'
        title='使用约定'
        note='安静是默认，表达发生在必要之处'
      >
        <div className='grid gap-3 sm:grid-cols-3'>
          {[
            ['三层令牌', ['Primitive · 原始色值', 'Semantic · 角色配对', 'Component · 只消费语义']],
            ['对比度目标', ['正文 4.5:1', '大号文字 3:1', '必要边界 3:1']],
            ['唯一来源', ['src/styles/tokens.css', 'DESIGN.md 记录理由', 'shadcn/ui 命名与半径']]
          ].map(([title, lines]) => (
            <Card key={title as string}>
              <CardHeader>
                <CardTitle className='text-sm'>{title as string}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='flex flex-col gap-1 font-mono text-[11px] text-muted-foreground'>
                  {(lines as string[]).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='mt-8 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] text-muted-foreground'>
          <span>clerimia · 2026</span>
          <span className='text-foreground'>一边创作，一边成为自己。</span>
        </div>
      </Section>
    </div>
  )
}
