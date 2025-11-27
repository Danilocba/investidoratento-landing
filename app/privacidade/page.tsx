export const metadata = {
  title: "Privacidade — Investidor Atento",
  description: "Saiba como tratamos seus dados e como garantimos sua segurança.",
};

export default function Privacidade() {
  return (
    <main className="min-h-screen bg-[#06080D] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>

        <p className="text-gray-300 mb-4">
          A sua privacidade é muito importante para nós. Esta política explica
          de forma simples como tratamos as informações coletadas através do
          site <strong>Investidor Atento</strong>, especialmente o seu e-mail
          cadastrado para acesso antecipado ao Beta.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Dados que coletamos</h2>
        <p className="text-gray-300 mb-4">
          O único dado pessoal coletado na nossa landing page é o seu{" "}
          <strong>e-mail</strong>. Ele é utilizado exclusivamente para:
        </p>
        <ul className="list-disc ml-6 text-gray-300 mb-4 space-y-2">
          <li>Confirmar sua inscrição no acesso antecipado;</li>
          <li>Enviar avisos sobre o Beta e novidades do projeto;</li>
          <li>Informar sobre atualizações importantes da plataforma.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Como utilizamos seus dados</h2>
        <p className="text-gray-300 mb-4">
          Seu e-mail é armazenado com segurança em nosso banco de dados e nunca
          será utilizado para finalidades diferentes das informadas acima.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Compartilhamento de informações</h2>
        <p className="text-gray-300 mb-4">
          <strong>Nós não vendemos, não alugamos e não compartilhamos seus dados
          com terceiros.</strong> Suas informações são de uso exclusivo para a
          comunicação entre você e o Investidor Atento.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Segurança</h2>
        <p className="text-gray-300 mb-4">
          Adotamos práticas modernas de segurança e armazenamento, incluindo
          criptografia e ambientes protegidos, garantindo que seus dados sejam
          mantidos de forma confidencial.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Cancelamento</h2>
        <p className="text-gray-300 mb-4">
          Você pode solicitar a remoção do seu e-mail da nossa lista a qualquer
          momento. Basta responder qualquer mensagem enviada ou entrar em
          contato conosco pelo email Contato@InvestidorAtento.com.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Alterações nesta política</h2>
        <p className="text-gray-300 mb-4">
          Esta política pode ser atualizada conforme o avanço do projeto. Caso
          isso aconteça, informaremos você por e-mail.
        </p>

        <p className="text-gray-400 mt-10 text-sm">
          © {new Date().getFullYear()} Investidor Atento — Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}