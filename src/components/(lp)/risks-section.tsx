import { Button } from "./button";

export default function RisksSection() {
  return (
    <section className="w-full py-6 md:py-12 bg-white">
      <style jsx>{`
        .responsive-image {
          @apply bg-[#d9d9d9] rounded-lg w-full md:min-h-[400px] h-full max-h-[600px] min-h-[300px];
          object-fit: cover;
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Não é brincadeira, empresas sérias monitoram suas marcas
          </h2>
          <p className="text-[#555555] max-w-3xl mx-auto">
            Proteja sua marca e ativos digitais com nossa tecnologia de ponta. Oferecemos soluções integradas para
            enfrentar as ameaças cibernéticas modernas.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* First risk item */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="text-[#56b2f9] text-sm font-medium mb-2">o INPI não te alerta sobre isso...</div>
              <h3 className="text-2xl font-bold mb-4">Você fica exposto a pedidos extraordinários de oposição!</h3>
              <p className="text-[#555555] mb-4">
                80% dos registros são indeferidos devido a práticas indevidas de oposição?
              </p>
              <p className="text-[#555555]">
                Isso significa que, se alguém tentar registrar uma marca semelhante à sua, seu pedido pode ser negado—e,
                na maioria dos casos, você só ficará sabendo dias depois, quando pode ser tarde demais para agir.
              </p>
            </div>
            <video autoPlay loop src="videos/negado.mp4" className="border-solid border-2 border-[#ddd] spect-square md:aspect-video w-full min-h-[400px] rounded-[32px] order-1 md:order-2 responsive-image"></video>
          </div>

          {/* Second risk item */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <video autoPlay loop src="videos/brand-hijacking.mp4" className="border-solid border-2 border-[#ddd] spect-square md:aspect-video w-full min-h-[400px] rounded-[32px] responsive-image"></video>
            <div>
              <h3 className="text-2xl font-bold mb-4">Risco de Apropriação Indevida "Brand Hijacking"</h3>
              <p className="text-[#555555] mb-4">
                Se outra empresa registrar um nome idêntico ou semelhante ao seu, ela pode reivindicar a exclusividade da
                marca e até impedir que você continue usando.
              </p>
              <p className="text-[#555555] mb-4">
                Você pode ser notificado extrajudicialmente para parar de usar sua própria marca.
              </p>
              <p className="text-[#555555]">Isso pode gerar prejuízos financeiros e perda de clientes.</p>
            </div>
          </div>

          {/* Third risk item */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">
                Você perde prazos e isso aumenta suas chances de ter indeferimento no registro
              </h3>
              <p className="text-[#555555] mb-4">
                A verdade que ninguém te conta: a maioria das agências de propriedade intelectual só quer vender o
                registro da sua marca. Mas e depois?
              </p>
              <p className="text-[#555555] mb-4">
                Segundo nossos próprios clientes, a maior reclamação é a falta de aviso e acompanhamento.
              </p>
              <p className="text-[#555555]">
                O resultado? Marcas perdidas, dinheiro desperdiçado e anos de esforço jogados no lixo. Você quer fazer
                parte dessa estatística?
              </p>
            </div>
            <video autoPlay loop src="videos/prazos-indeferimento.mp4" className="border-solid border-2 border-[#ddd] spect-square md:aspect-video w-full min-h-[400px] rounded-[32px] order-1 md:order-2 responsive-image"></video>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-6">
            Você quer ficar exposto a todos esses riscos?
            <br />
            empresa séria monitora.
          </h3>
          <Button size="lg" className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white rounded-full max-md:w-full">
            Quero monitorar minha marca
          </Button>
        </div>
      </div>
    </section>
  )
}

