export default function ModelsTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card/30 p-6 backdrop-blur-md space-y-4">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          CONNECTED LOCAL LLM INSTANCES
        </h3>
        <p className="text-sm text-muted-foreground">
          Voideditor targets offline development environments. Here you can
          monitor status of local models configured on your system.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card/20">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Model Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              <tr>
                <td className="px-4 py-3.5 font-mono text-xs font-semibold">
                  qwen2.5-coder:7b
                </td>
                <td className="px-4 py-3.5 text-muted-foreground">
                  Autocomplete & Chat
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-emerald-500 font-semibold text-xs">
                    Ready
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3.5 font-mono text-xs font-semibold">
                  deepseek-coder:6.7b
                </td>
                <td className="px-4 py-3.5 text-muted-foreground">
                  Inline Refactoring
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-emerald-500 font-semibold text-xs">
                    Ready
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3.5 font-mono text-xs font-semibold">
                  llama3.2:3b
                </td>
                <td className="px-4 py-3.5 text-muted-foreground">
                  Agent Planner
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-muted-foreground text-xs">Offline</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
