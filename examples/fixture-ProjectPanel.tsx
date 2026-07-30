// examples/fixture-ProjectPanel.tsx
//
// A deliberately flawed component used to test the design-reviewer skill.
// It is written the way generated UI usually looks: complete, confident,
// and wrong in ways that a screenshot will not show you.
//
// There are 20 planted defects. The expected findings are in
// examples/report-code-mode.md. If you change this file, change that one.

import { ChevronRight, Download, MoreVertical, Trash2 } from "lucide-react";

export function ProjectPanel({ project, tasks }) {
  return (
    <div style={{ padding: "13px" }} className="bg-white">
      <h1 className="text-2xl font-bold text-[#0f172a]">{project.name}</h1>

      <h3 className="text-lg font-semibold mt-4">Overview</h3>

      {/* Summary panel */}
      <div className="grid grid-cols-4" style={{ gap: "7px" }}>
        <div>
          <span className="text-[#94a3b8] text-sm">Owner</span>
          <p className="text-[#0f172a]">{project.owner}</p>
        </div>
        <div>
          <span className="text-[#94a3b8] text-sm">Created</span>
          <p className="text-[#0f172a]">{project.createdAt}</p>
        </div>
        <div>
          <span className="text-[#94a3b8] text-sm">Pending</span>
          <p className="text-[#0f172a]">{tasks.pending} pending</p>
        </div>
        <div>
          <span className="text-[#94a3b8] text-sm">Completed</span>
          <p className="text-[#0f172a]">{tasks.done}</p>
        </div>
        <div>
          <span className="text-[#94a3b8] text-sm">Region</span>
          <p className="text-[#0f172a]">{project.region}</p>
        </div>
        <div>
          <span className="text-[#94a3b8] text-sm">Tier</span>
          <p className="text-[#0f172a]">{project.tier}</p>
        </div>
        <div>
          <span className="text-[#94a3b8] text-sm">Activity</span>
          <p className="text-[#0f172a]">
            Processed {project.itemsProcessed} items in {project.elapsed}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mt-4">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: project.healthy ? "#22c55e" : "#ef4444" }}
        />
        <span className="text-[#64748b]">{project.statusLabel}</span>
      </div>

      {/* Stat cards */}
      <div className="flex gap-4 mt-6">
        <div className="rounded-lg border border-[#e2e8f0] p-4 flex-1">
          <p className="text-[#94a3b8] text-sm">Open</p>
          <p className="text-3xl font-bold text-[#0f172a]">{tasks.open}</p>
        </div>
        <div className="rounded-lg border border-[#e2e8f0] p-4 flex-1">
          <p className="text-[#94a3b8] text-sm">Pending</p>
          <p className="text-3xl font-bold text-[#0f172a]">{tasks.pending}</p>
        </div>
        <div className="rounded-lg border border-[#e2e8f0] p-4 flex-1">
          <p className="text-[#94a3b8] text-sm">Blocked</p>
          <p className="text-3xl font-bold text-[#0f172a]">{tasks.blocked}</p>
        </div>
      </div>

      {/* Filter */}
      <input
        className="mt-6 border border-[#e2e8f0] rounded px-3 focus:outline-none"
        style={{ height: "28px" }}
        placeholder="Filter tasks"
      />

      {/* Task list */}
      <ul className="mt-4">
        {tasks.items.map((t) => (
          <li key={t.id} className="flex items-center justify-between py-2">
            <div
              onClick={() => openTask(t.id)}
              className="whitespace-nowrap overflow-hidden"
              style={{ height: "20px", width: "260px" }}
            >
              {t.title}
            </div>
            <div className="flex gap-1">
              <button className="w-7 h-7 flex items-center justify-center">
                <Download size={14} />
              </button>
              <button className="w-7 h-7 flex items-center justify-center">
                <Trash2 size={14} />
              </button>
              <button className="w-7 h-7 flex items-center justify-center">
                <MoreVertical size={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Floating hint */}
      <div
        className="absolute right-4 bg-[#6365f1] text-white rounded px-3 py-2"
        style={{ top: "37px" }}
      >
        New <ChevronRight size={12} />
      </div>

      {/* Action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e8f0] p-4 flex gap-3 justify-end">
        <button className="bg-[#6366f1] text-white rounded px-4 py-2 font-semibold">
          Publish project
        </button>
        <button className="bg-[#6366f1] text-white rounded px-4 py-2 font-semibold">
          Invite collaborators
        </button>
      </div>
    </div>
  );
}
