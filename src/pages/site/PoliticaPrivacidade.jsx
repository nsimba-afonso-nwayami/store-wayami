import WhatsAppButton from "../../components/WhatsAppButton";

export default function PoliticaPrivacidade() {
  return (
    <>
      <title>Política de Privacidade | Nwayami Store</title>

      <section className="w-full bg-neutral-100 pt-47 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-8">
            Termos e Condições
          </h1>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow text-neutral-700 space-y-6 text-sm leading-relaxed">
            <p>
              Estes Termos e Condições regulam o acesso e a utilização da loja
              online da empresa{" "}
              <strong>N.WAYAMI COMÉRCIO GERAL E PRESTAÇÃO DE SERVIÇOS</strong>,
              NIF: 5002061422, com sede em Luanda, Centralidade do Kilamba,
              Quarteirão F, Apartamento 91, 9º andar. Ao utilizar o site{" "}
              <strong>www.store.nwayami.com</strong>, o Cliente concorda com os
              termos descritos neste documento.
            </p>

            <h2 className="text-lg font-semibold text-neutral-800">
              A. Informação Geral sobre os Produtos
            </h2>

            <p>
              <strong>1. Imagens:</strong> As imagens são ilustrativas e podem
              existir diferenças entre a imagem e o produto real.
            </p>

            <p>
              <strong>2. Descrições:</strong> Baseadas nas informações dos
              fabricantes. A Nwayami não se responsabiliza por imprecisões.
            </p>

            <p>
              <strong>3. Fichas técnicas:</strong> Responsabilidade dos
              fabricantes, podendo sofrer alterações sem aviso.
            </p>

            <p>
              <strong>4. Políticas dos fabricantes:</strong> Podem ser alteradas
              a qualquer momento sem responsabilidade da Nwayami.
            </p>

            <p>
              <strong>5. Manuais:</strong> Fornecidos pelos fabricantes, sem
              garantia de ausência de erros.
            </p>

            <h2 className="text-lg font-semibold text-neutral-800">
              B. Condições Gerais de Venda
            </h2>

            <p>
              Estas condições regulam o uso dos serviços do site
              <strong> www.store.nwayami.com</strong>, incluindo a venda de
              produtos eletrônicos, informática, eletrodomésticos, áudio, vídeo
              e telemóveis.
            </p>

            <h3 className="font-semibold text-neutral-800">
              Processo de Compra
            </h3>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                O cliente seleciona os produtos e define morada e pagamento.
              </li>
              <li>Após o pagamento, recebe confirmação por e-mail.</li>
              <li>Encomendas dependem da validação do pagamento.</li>
              <li>Em falta de stock, o reembolso é feito até 20 dias.</li>
            </ul>

            <h3 className="font-semibold text-neutral-800">
              Preços e Pagamento
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Preços em AKZ com impostos incluídos.</li>
              <li>Transferência ou depósito bancário.</li>
              <li>Pagamento via Multicaixa.</li>
              <li>A encomenda só é validada após confirmação do pagamento.</li>
            </ul>

            <h3 className="font-semibold text-neutral-800">Entrega</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Até 3 dias úteis para Luanda.</li>
              <li>Entrega no endereço indicado pelo cliente.</li>
              <li>
                Atrasos superiores a 20 dias dão direito a cancelamento e
                reembolso.
              </li>
            </ul>

            <h3 className="font-semibold text-neutral-800">
              Garantia e Devoluções
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Garantia conforme legislação e fabricante.</li>
              <li>Devolução até 7 dias após recebimento.</li>
              <li>Produto deve estar sem uso e na embalagem original.</li>
              <li>
                Exceções: produtos higiênicos, softwares abertos e itens
                personalizados.
              </li>
            </ul>

            <h3 className="font-semibold text-neutral-800">
              Direitos e Obrigações
            </h3>
            <p>
              O cliente deve fornecer dados corretos. A Nwayami pode cancelar
              encomendas por falta de stock ou pagamento.
            </p>

            <h3 className="font-semibold text-neutral-800">Jurisdição</h3>
            <p>
              Estes termos são regidos pela lei angolana. Litígios serão
              resolvidos no Tribunal Judicial de Luanda.
            </p>

            <h2 className="text-lg font-semibold text-neutral-800">Contato</h2>
            <p>
              Email: info@store.nwayami.com
              <br />
              WhatsApp: (+244) 972 614 886
              <br />
              Telefone: (+244) 921 909 103
            </p>
          </div>
        </div>
      </section>

      {/* Botão WhatsApp fixo */}
      <WhatsAppButton phone="244972614886" size={64} />
    </>
  );
}
