export default function Sucesso() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center px-4">
        <h1 className="text-2xl font-bold mb-3">Verifique seu e-mail 📩</h1>
        <p className="mb-1">
          Enviamos um link para você confirmar sua vaga no beta do
          {" "}
          <strong>Investidor Atento</strong>.
        </p>
        <p className="text-gray-300 text-sm mt-2">
          Se o e-mail não aparecer em alguns minutos, confira também a caixa de
          spam ou promoções.
        </p>
      </div>
    </main>
  );
}