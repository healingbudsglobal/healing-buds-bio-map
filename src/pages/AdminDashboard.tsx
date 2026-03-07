import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Search, Download, Users, TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import hbLogoWhite from "@/assets/hb-logo-white-full.png";

interface Lead {
  id: string;
  created_at: string;
  email: string;
  name: string | null;
  whatsapp: string | null;
  province: string | null;
  matched_strain: string | null;
  compatibility: string | null;
  survey_answers: Record<string, string> | null;
}

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }
      fetchLeads();
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/admin/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLeads(data as Lead[]);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const filteredLeads = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      l.email.toLowerCase().includes(q) ||
      (l.name?.toLowerCase().includes(q) ?? false) ||
      (l.matched_strain?.toLowerCase().includes(q) ?? false) ||
      (l.province?.toLowerCase().includes(q) ?? false)
    );
  });

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "WhatsApp", "Province", "Strain", "Compatibility"];
    const rows = filteredLeads.map((l) => [
      new Date(l.created_at).toLocaleDateString("en-ZA"),
      l.name || "",
      l.email,
      l.whatsapp || "",
      l.province || "",
      l.matched_strain || "",
      l.compatibility || "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `healing-buds-leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const todayCount = leads.filter(
    (l) => new Date(l.created_at).toDateString() === new Date().toDateString()
  ).length;

  const surveyLabels: Record<string, string> = {
    exp_level: "Experience Level",
    primary_vibe: "Desired Vibe",
    specific_benefit: "Primary Benefit",
    body_impact: "Body Impact",
    terpene_pref: "Terpene Preference",
    consumption_format: "Consumption Method",
    time_of_day: "Time of Day",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={hbLogoWhite} alt="Healing Buds" className="h-7" />
            <span className="text-sm font-semibold text-muted-foreground">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Total Leads</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{leads.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Today</span>
            </div>
            <p className="text-2xl font-bold text-[hsl(var(--accent-green))]">{todayCount}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Top Strain</span>
            </div>
            <p className="text-lg font-bold text-[hsl(var(--brand-gold))]">
              {leads.length > 0
                ? Object.entries(
                    leads.reduce((acc, l) => {
                      if (l.matched_strain) acc[l.matched_strain] = (acc[l.matched_strain] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).sort((a, b) => b[1] - a[1])[0]?.[0] || "—"
                : "—"}
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, strain, province…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-input pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchLeads}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">Loading leads…</div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Users className="h-12 w-12 mb-3 opacity-30" />
            <p>{search ? "No leads match your search" : "No leads yet"}</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">WhatsApp</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Province</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Strain</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Match</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-border hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                  >
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("en-ZA", { day: "2-digit", month: "short" })}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{lead.name || "—"}</td>
                    <td className="px-4 py-3 text-[hsl(var(--accent-green))]">{lead.email}</td>
                    <td className="px-4 py-3 text-foreground hidden md:table-cell">{lead.whatsapp || "—"}</td>
                    <td className="px-4 py-3 text-foreground hidden lg:table-cell">{lead.province || "—"}</td>
                    <td className="px-4 py-3 font-semibold text-[hsl(var(--brand-gold))]">{lead.matched_strain || "—"}</td>
                    <td className="px-4 py-3 text-foreground hidden sm:table-cell">{lead.compatibility || "—"}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Lead detail panel */}
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">{selectedLead.name || "Anonymous"}</h3>
                <p className="text-sm text-muted-foreground">{selectedLead.email}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                <p className="text-sm font-medium text-foreground">{selectedLead.whatsapp || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Province</p>
                <p className="text-sm font-medium text-foreground">{selectedLead.province || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Strain</p>
                <p className="text-sm font-bold text-[hsl(var(--brand-gold))]">{selectedLead.matched_strain || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Compatibility</p>
                <p className="text-sm font-bold text-[hsl(var(--accent-green))]">{selectedLead.compatibility || "—"}</p>
              </div>
            </div>
            {selectedLead.survey_answers && Object.keys(selectedLead.survey_answers).length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Survey Answers</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {Object.entries(selectedLead.survey_answers).map(([key, val]) => (
                    <div key={key} className="rounded-lg border border-border bg-muted/30 px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{surveyLabels[key] || key}</p>
                      <p className="text-sm text-foreground">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
