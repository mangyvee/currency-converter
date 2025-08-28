import React, { useEffect, useState } from "react";
import {
  User, Mail, Shield, Globe, Edit3, Lock, CreditCard, Camera,
  Save, X, CheckCircle2
} from "lucide-react";

const CURRENCIES = ["USD", "EUR", "GBP", "KES", "JPY"];
const LANGUAGES = ["English (US)", "English (UK)", "Français", "Swahili (KE)"];
const LS_KEY = "monei.profile";

export default function ProfilePage() {
  // ----- state -----
  const [profile, setProfile] = useState({
    name: "Vivian Marquini",
    email: "vivian@example.com",
    currency: "USD",
    language: "English (US)",
    avatar: "",       // base64 image
    twoFA: false,
  });
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdMsg, setPwdMsg] = useState("");

  // ----- load / persist -----
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const persist = (data) => {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  };

  // ----- handlers -----
  const onField = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

  const onAvatar = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onField("avatar", reader.result);
    reader.readAsDataURL(f);
  };

  const onSave = async () => {
    setSaving(true);
    // simulate async save
    await new Promise((r) => setTimeout(r, 600));
    persist(profile);
    setSaving(false);
    setEdit(false);
  };

  const onCancel = () => {
    const saved = localStorage.getItem(LS_KEY);
    setProfile(saved ? JSON.parse(saved) : profile);
    setEdit(false);
  };

  const toggle2FA = () => {
    const next = { ...profile, twoFA: !profile.twoFA };
    setProfile(next);
    persist(next);
  };

  const changePassword = () => {
    setPwdMsg("");
    if (!pwd.current || !pwd.next || !pwd.confirm) {
      setPwdMsg("Please fill all fields.");
      return;
    }
    if (pwd.next.length < 8) {
      setPwdMsg("New password must be at least 8 characters.");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      setPwdMsg("New password and confirmation do not match.");
      return;
    }
    // pretend success
    setPwd({ current: "", next: "", confirm: "" });
    setPwdMsg("Password updated successfully.");
  };

  // ----- UI helpers -----
  const Label = ({ children }) => (
    <span className="flex items-center gap-2 text-white/70 text-sm">{children}</span>
  );

  const Input = (props) => (
    <input
      {...props}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-400/50"
    />
  );

  const Select = ({ value, onChange, options }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-400/50"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );

  return (
    <div className="space-y-6">
      {/* PROFILE OVERVIEW */}
      <div className="glass p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-3xl font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)]">
            {profile.avatar ? (
              <img src={profile.avatar} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              (profile.name?.[0] || "M")
            )}
          </div>
          {edit && (
            <label className="absolute -bottom-2 -right-2 bg-white/10 border border-white/10 rounded-full p-2 cursor-pointer hover:bg-white/15">
              <Camera size={16} />
              <input type="file" accept="image/*" className="hidden" onChange={onAvatar} />
            </label>
          )}
        </div>

        <div className="flex-1 w-full space-y-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
            <h2 className="text-2xl font-semibold">Profile</h2>
            {!edit ? (
              <button
                onClick={() => setEdit(true)}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition flex items-center gap-2 self-start md:self-auto"
              >
                <Edit3 size={14} /> Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition flex items-center gap-2 disabled:opacity-60"
                >
                  <Save size={14} /> {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/15 transition flex items-center gap-2"
                >
                  <X size={14} /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* editable rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label><User size={16} className="text-white/40" /> Full Name</Label>
              {edit ? (
                <Input value={profile.name} onChange={(e) => onField("name", e.target.value)} />
              ) : (
                <div className="mt-1 text-white/90 text-sm">{profile.name}</div>
              )}
            </div>

            <div>
              <Label><Mail size={16} className="text-white/40" /> Email</Label>
              {edit ? (
                <Input type="email" value={profile.email} onChange={(e) => onField("email", e.target.value)} />
              ) : (
                <div className="mt-1 text-white/90 text-sm">{profile.email}</div>
              )}
            </div>

            <div>
              <Label><Globe size={16} className="text-white/40" /> Default Currency</Label>
              {edit ? (
                <Select value={profile.currency} onChange={(v) => onField("currency", v)} options={CURRENCIES} />
              ) : (
                <div className="mt-1 text-white/90 text-sm">{profile.currency}</div>
              )}
            </div>

            <div>
              <Label><Globe size={16} className="text-white/40" /> Language</Label>
              {edit ? (
                <Select value={profile.language} onChange={(v) => onField("language", v)} options={LANGUAGES} />
              ) : (
                <div className="mt-1 text-white/90 text-sm">{profile.language}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECURITY */}
      <div className="glass p-6">
        <h3 className="text-lg font-semibold mb-4">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-white/70">
              <Shield size={16} className="text-white/40" /> Two-Factor Authentication
            </span>
            <button
              onClick={toggle2FA}
              className={`px-3 py-1 rounded-lg text-xs border transition
              ${profile.twoFA
                ? "bg-emerald-500 text-black border-transparent hover:bg-emerald-400"
                : "bg-white/10 border-white/10 hover:bg-white/15 text-white"
              }`}
            >
              {profile.twoFA ? "Enabled" : "Enable"}
            </button>
          </div>

          {/* Change password */}
          <div className="border-t border-white/10 pt-4">
            <button
              onClick={() => setPwdOpen((s) => !s)}
              className="px-3 py-1 rounded-lg text-xs bg-white/10 border border-white/10 hover:bg-white/15 transition flex items-center gap-2"
            >
              <Lock size={14} /> {pwdOpen ? "Hide" : "Change Password"}
            </button>

            {pwdOpen && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  type="password"
                  placeholder="Current password"
                  value={pwd.current}
                  onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
                />
                <Input
                  type="password"
                  placeholder="New password (min 8 chars)"
                  value={pwd.next}
                  onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
                />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={pwd.confirm}
                  onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
                />
                <div className="md:col-span-3 flex items-center gap-2">
                  <button
                    onClick={changePassword}
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} /> Update Password
                  </button>
                  {pwdMsg && (
                    <span className={`text-sm ${pwdMsg.includes("success") ? "text-emerald-400" : "text-red-400"}`}>
                      {pwdMsg}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PREFERENCES / PAYMENT */}
      <div className="glass p-6">
        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <Label><CreditCard size={16} className="text-white/40" /> Saved Payment Method</Label>
            <span className="text-white/90">Visa **** 1234</span>
          </div>
          <p className="text-white/50 text-xs">
            Payment methods are managed securely. Add or edit in the Payments section (coming soon).
          </p>
        </div>
      </div>
    </div>
  );
}
