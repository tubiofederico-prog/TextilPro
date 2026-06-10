"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

const ROLES = [
  { role: "Administrador", desc: "Acceso total al sistema", color: "bg-brand-500" },
  { role: "Supervisor", desc: "Control de planta y producción", color: "bg-emerald-500" },
  { role: "Vendedor", desc: "Pedidos y clientes", color: "bg-violet-500" },
  { role: "Operario", desc: "Vista simplificada de tareas", color: "bg-amber-500" },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("Supervisor");
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink-900 p-12 lg:flex">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-400/10 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-lg font-black text-white">T</div>
          <div>
            <p className="text-lg font-bold text-white">TextilPro</p>
            <p className="text-xs uppercase tracking-wider text-ink-400">Torre de Control de Producción</p>
          </div>
        </div>
        <div className="relative">
          <h1 className="text-4xl font-bold leading-tight text-white">
            El gerente de planta<br />digital para tu fábrica de blancos.
          </h1>
          <p className="mt-4 max-w-md text-ink-300">
            Controlá pedidos personalizados, producción por etapas, inventario, trazabilidad
            completa y el historial de cada cliente — todo en un solo lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["Trazabilidad total", "Cola tipo aeropuerto", "Fichas técnicas", "Control de stock"].map((f) => (
              <span key={f} className="chip bg-white/10 text-brand-100"><Sparkles size={13} /> {f}</span>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-ink-500">Prototipo de demostración · Datos simulados · © 2026 TextilPro</p>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center bg-ink-50 p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 font-black text-white">T</div>
            <p className="text-lg font-bold">TextilPro</p>
          </div>
          <h2 className="text-2xl font-bold text-ink-900">Bienvenido de vuelta</h2>
          <p className="mt-1 text-sm text-ink-500">Ingresá para acceder a la torre de control.</p>

          <form
            onSubmit={(e) => { e.preventDefault(); router.push(role === "Operario" ? "/operarios" : "/dashboard"); }}
            className="mt-8 space-y-4"
          >
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" defaultValue="sofia@textilpro.com" />
            </div>
            <div>
              <label className="label">Contraseña</label>
              <input className="input" type="password" defaultValue="demo1234" />
            </div>

            <div>
              <label className="label">Ingresar como (rol simulado)</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <button
                    type="button"
                    key={r.role}
                    onClick={() => setRole(r.role)}
                    className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-sm transition ${
                      role === r.role ? "border-brand-400 bg-brand-50 ring-2 ring-brand-100" : "border-ink-200 bg-white hover:border-ink-300"
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${r.color}`} />
                    <span className="font-semibold text-ink-700">{r.role}</span>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-2.5">
              <ShieldCheck size={17} /> Ingresar al sistema
            </button>
            <Link href="/dashboard" className="block text-center text-xs font-semibold text-ink-400 hover:text-brand-600">
              Entrar como invitado (demo) →
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
