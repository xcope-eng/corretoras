import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="Xcope Logo"
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>
      <h1 className="text-4xl font-bold mb-8">Bem vindo a Xcope</h1>
      <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        <Link href="/dashboard">Entrar</Link>
      </button>
    </div>
  );
}
