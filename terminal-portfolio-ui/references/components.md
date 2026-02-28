# Terminal Portfolio UI Components

This document provides reference implementations for the terminal-like metallic UI components.

## 1. Terminal Window Card

A reusable wrapper for creating a terminal window appearance.

```tsx
<div className="metallic-card rounded-xl p-1 overflow-hidden shadow-2xl">
  {/* Terminal Header */}
  <div className="flex items-center gap-2 bg-black/40 px-5 py-3 border-b border-white/[0.05]">
    <div className="flex gap-2">
      <div className="h-3 w-3 rounded-full bg-white/20" />
      <div className="h-3 w-3 rounded-full bg-white/20" />
      <div className="h-3 w-3 rounded-full bg-white/20" />
    </div>
    <span className="ml-3 font-mono text-xs text-foreground/40">bash - user@portfolio:~</span>
  </div>
  {/* Terminal Body */}
  <div className="p-8 bg-[#050505]/80 font-mono text-sm md:text-base text-foreground/70">
    {/* Content goes here */}
  </div>
</div>
```

## 2. Command Prompt Text

Used for section headers or interactive elements.

```tsx
<div className="flex items-center gap-2 mb-2">
  <span className="text-green-400">user@portfolio</span>:<span className="text-blue-400">~</span>$ <span className="text-foreground">whoami</span>
</div>
```

## 3. Section Header with Line

```tsx
<div className="flex items-center gap-4 mb-8">
  <h2 className="font-mono text-2xl font-semibold tracking-tight text-foreground">
    <span className="text-green-400">user@portfolio</span>:<span className="text-blue-400">~</span>$ <span className="text-foreground">ls -l ./projects</span>
  </h2>
  <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent" />
</div>
```

## 4. Bento Grid Project Card

```tsx
<article className="metallic-card group relative flex flex-col justify-between gap-6 p-1 rounded-xl overflow-hidden md:col-span-2 md:row-span-2">
  <div className="flex items-center gap-2 bg-black/40 px-4 py-2 border-b border-white/[0.05]">
    <span className="font-mono text-[10px] text-foreground/40">cat project-name.md</span>
  </div>
  <div className="p-6 bg-[#050505]/80 flex-1 flex flex-col justify-between">
    <div className="space-y-3">
      <h3 className="font-heading text-lg font-semibold text-foreground">
        Project Title
      </h3>
      <p className="font-mono text-xs leading-6 text-foreground/45">
        Project description goes here.
      </p>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {['React', 'Next.js'].map((tech) => (
          <span
            className="bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 font-mono text-[10px] text-foreground/50 rounded-sm"
            key={tech}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
    <Link
      className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-medium text-foreground/50 transition-all duration-200 group-hover:gap-3 group-hover:text-foreground"
      href={`/projects/slug`}
    >
      ./view_details.sh
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
        &rarr;
      </span>
    </Link>
  </div>
</article>
```

## 5. Terminal-style Form Input

```tsx
<div className="space-y-2">
  <label className="flex items-center gap-2 text-foreground/70" htmlFor="name">
    <span className="text-blue-400">?</span> Name:
  </label>
  <input 
    id="name" 
    name="name" 
    placeholder="Type your name..." 
    className="flex h-11 w-full border border-border bg-black/50 px-3 py-2 font-mono text-sm text-foreground/80 placeholder:text-foreground/30 outline-none transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-white/20 rounded-none"
  />
</div>
```

## 6. Block-based Progress Bar (Skills)

```tsx
<div className="flex items-center gap-1">
  <div className="flex gap-0.5 flex-1">
    {Array.from({ length: 20 }).map((_, i) => {
      const isActive = i < (level / 5); // level is 0-100
      return (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-sm transition-all duration-500 ${
            isActive 
              ? "bg-foreground/70 shadow-[0_0_5px_rgba(226,232,240,0.3)]" 
              : "bg-white/[0.05]"
          }`}
        />
      );
    })}
  </div>
  <span className="ml-3 w-8 text-right font-mono text-[10px] text-foreground/50">
    {level}%
  </span>
</div>
```
