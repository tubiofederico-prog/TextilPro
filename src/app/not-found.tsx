import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-900 px-4 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/5 text-brand-400">
        <Compass size={30} />
      </div>
      <p className="mt-6 text-7xl font-black tracking-tight text-white">404</p>
      <h1 className="mt-2 text-xl font-bold text-white">Página no encontrada</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-400">
        La sección que buscás no existe o fue movida. Volvé a la torre de control para seguir operando.
      </p>
      <Link href="/dashboard" className="btn-primary mt-6">
        <ArrowLeft size={16} /> Volver al Dashboard
      </Link>
    </div>
  );
}
