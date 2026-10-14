import { useEffect, useState } from 'react'
import './App.css'

const CONFIG = {
  // Número com código do país + DDD, sem espaços ou símbolos
  whatsapp: '5562991610097',
  mensagem: 'Olá! Vi o anúncio da casa e gostaria de mais informações. Podemos agendar uma visita?',

  titulo: 'Casa moderna com luz natural em todos os ambientes',
  local: 'Morada do Morro, Senador Canedo – GO',
  descricao:
    '✨ Uma casa que combina conforto, funcionalidade e ambientes planejados, com uma área gourmet ideal para confraternizar e aproveitar bons momentos sem sair de casa.',

  specs: [
    { valor: '3', rotulo: 'suítes' },
    { valor: '172 m²', rotulo: 'área construída' },
    { valor: '250 m²', rotulo: 'terreno' },
    { valor: '4', rotulo: 'vagas' },
  ],

  fotos: [
    { src: '/assets/frente.jpg', alt: 'Fachada da casa' },
    { src: '/assets/fachada.jpg', alt: 'Fachada da casa' },
    { src: '/assets/sala.jpg', alt: 'Sala de estar integrada' },
    { src: '/assets/cozinha.jpg', alt: 'Cozinha com ilha central' },
    { src: '/assets/master.jpg', alt: 'Suíte master' },
    { src: '/assets/suite.jpg', alt: 'Baneheiro da Suíte' },
    { src: '/assets/quarto1.jpg', alt: 'Quarto 1' },
    { src: '/assets/banheiro_americano.jpg', alt: 'Banheiro americano' },
    { src: '/assets/quarto2.jpg', alt: 'Quarto 2' },
    { src: '/assets/ara_gourmet.jpg', alt: 'Área Gourmet' },
    { src: '/assets/banheiro_social.jpg', alt: 'Banheiro social' },
  ],

  // tipo: 'arquivo' (mp4 em public/videos) ou 'youtube' (informe só o ID do vídeo)
  video: {
    tipo: 'arquivo',
    src: '/assets/tour.mp4',
    poster: '/assets/frente.jpg',
    // tipo: 'youtube', id: 'dQw4w9WgXcQ',
  },

  detalhes: [
    {
      titulo: 'Destaques do imóvel',
      itens: [
        '🚗 Garagem coberta com espaço para 1 carro, além de área frontal com capacidade para estacionar mais 3 veículos.',
        '🍖 Varanda gourmet com churrasqueira, cozinha e armários planejados, perfeita para reunir família e amigos e aproveitar momentos especiais.',
        '🍽️ Cozinha interna totalmente planejada, com armários que aliam funcionalidade e organização.',
        '🛋️ Sala com pé-direito alto, proporcionando amplitude e sofisticação, além de painel planejado',
        '🛏️ 3 quartos, sendo 1 suíte, oferecendo conforto e privacidade para toda a família.',
        '🚿 3 banheiros no total, garantindo mais praticidade no dia a dia.',
        '☀️ Infraestrutura para aquecimento solar já instalada, com 4 pontos de saída: 3 para os banheiros e 1 para a cozinha. Falta somente a instalação das placas solares para completar o sistema.',
      ],
    },
  ],

  localizacao:
    'Região tranquila e arborizada, perto de escolas, mercados, academias e vias de acesso rápido ao centro.',

  mapa: { lat: -16.687417, lng: -49.114667 },
  }

const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
  CONFIG.mensagem,
)}`

const mapaUrl = `https://www.google.com/maps?q=${CONFIG.mapa.lat},${CONFIG.mapa.lng}`
const mapaEmbedUrl = `https://maps.google.com/maps?q=${CONFIG.mapa.lat},${CONFIG.mapa.lng}&z=16&output=embed`

  /* Envia os cliques no WhatsApp para o Google Analytics e o Google Ads */
  function trackWhatsapp(posicao) {
    if (typeof window.gtag !== 'function') return

    // Evento para relatórios (Google Analytics / GA4)
    window.gtag('event', 'click_whatsapp', {
      posicao_botao: posicao, // topo, rodape, flutuante
      link_url: whatsappUrl,
      transport_type: 'beacon',
    })

    // Conversão "Contato Whatsapp" (Google Ads)
    window.gtag('event', 'conversion', {
      send_to: 'AW-18509361446/e2EcCL27yZsdEKbi-flE',
      value: 1.0,
      currency: 'BRL',
    })
  }

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.08.88.9-3-.2-.31a8.2 8.2 0 1 1 6.88 3.76Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.22-.09-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.85.83-.85 2.03s.87 2.36.99 2.52c.12.17 1.71 2.6 4.14 3.65 1.54.66 2.14.72 2.91.6.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}

function WhatsappButton({ posicao, children, className = '' }) {
  return (
    <a
      className={`btn-whats ${className}`}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsapp(posicao)}
    >
      <WhatsappIcon />
      {children}
    </a>
  )
}

function VideoBlock({ video }) {
  if (video.tipo === 'youtube') {
    return (
      <iframe
        className="video-frame"
        src={`https://www.youtube.com/embed/${video.id}`}
        title="Vídeo da casa"
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    )
  }
  return (
    <video
      className="video-frame"
      src={video.src}
      poster={video.poster}
      controls
      playsInline
      preload="metadata"
    />
  )
}

function App() {
  const [fotoAberta, setFotoAberta] = useState(null)

  // Fecha o visualizador de foto com a tecla Esc
  useEffect(() => {
    if (fotoAberta === null) return
    const onKey = (e) => e.key === 'Escape' && setFotoAberta(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fotoAberta])

  return (
    <>
      {/* Topo */}
      <header className="hero">
        <img className="hero-img" src={CONFIG.fotos[0].src} alt={CONFIG.fotos[0].alt} />
        <div className="hero-card">
          <p className="hero-local">{CONFIG.local}</p>
          <h1>{CONFIG.titulo}</h1>
          <p className="hero-desc">{CONFIG.descricao}</p>
          <WhatsappButton posicao="topo">Agendar visita pelo WhatsApp</WhatsappButton>
        </div>
      </header>

      {/* Informações principais */}
      <section className="specs" aria-label="Informações principais">
        <dl>
          {CONFIG.specs.map((s) => (
            <div key={s.rotulo}>
              <dt>{s.rotulo}</dt>
              <dd>{s.valor}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Fotos */}
      <section className="section" id="fotos">
        <h2>Conheça os ambientes</h2>
        <div className="gallery">
          {CONFIG.fotos.map((foto, i) => (
            <button
              key={foto.src}
              type="button"
              className="gallery-item"
              onClick={() => setFotoAberta(i)}
              aria-label={`Ampliar foto: ${foto.alt}`}
            >
              <img src={foto.src} alt={foto.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {/* Vídeo */}
      <section className="section section-alt" id="video">
        <div className="section-inner">
          <h2>Veja por dentro</h2>
          <VideoBlock video={CONFIG.video} />
        </div>
      </section>

      {/* Detalhes */}
      <section className="section" id="detalhes">
        <h2>Detalhes da casa</h2>
        <div className="details">
          {CONFIG.detalhes.map((grupo) => (
            <div key={grupo.titulo}>
              <h3>{grupo.titulo}</h3>
              <ul>
                {grupo.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Localização */}
    <section className="section section-alt" id="localizacao">
      <div className="section-inner">
        <h2>Localização</h2>
        <p className="local-texto">{CONFIG.localizacao}</p>
        <iframe
          className="mapa"
          src={mapaEmbedUrl}
          title="Mapa com a localização da casa"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          className="btn-mapa"
          href={mapaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            window.gtag?.('event', 'click_mapa', { transport_type: 'beacon' })
          }
        >
          Abrir no Google Maps
        </a>
      </div>
    </section>

      {/* Chamada final */}
      <section className="cta-final">
        <h2>Quer conhecer pessoalmente?</h2>
        <p>Chame no WhatsApp e escolha o melhor dia e horário para a visita.</p>
        <WhatsappButton posicao="rodape">Falar no WhatsApp</WhatsappButton>
      </section>

      {/* Botão flutuante */}
      <WhatsappButton posicao="flutuante" className="btn-float">
        WhatsApp
      </WhatsappButton>

      {/* Visualizador de fotos */}
      {fotoAberta !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
          onClick={() => setFotoAberta(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setFotoAberta(null)}
            aria-label="Fechar foto"
          >
            ×
          </button>
          <img
            src={CONFIG.fotos[fotoAberta].src}
            alt={CONFIG.fotos[fotoAberta].alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

export default App