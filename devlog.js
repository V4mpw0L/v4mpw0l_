/* ==========================================================================
   V4MPW0L // TIAGO CARDOSO — DEVLOGS & TRANSMISSIONS (devlog.js)
   - Adicione novos devlogs no topo da lista abaixo.
   - excerpt: Resumo que aparece no card da página inicial com destaques.
   - texto: Transmissão completa aberta no modal de leitura.
   ========================================================================== */

window.DEVLOG_DATA = [
    {
        id: 'log-1',
        badge: { pt: 'LANÇAMENTO', en: 'SHIPPED' },
        badgeClass: 'badge-emerald',
        author: 'Tiago Cardoso',
        category: 'shipped',
        date: { pt: '05 SET 2026', en: '05 SEP 2026' },
        tag: 'PassMap v2.11',
        title: {
            pt: 'PassMap 2.11 no Ar: A Saga dos Mapas Offline e 60 FPS no Celular',
            en: 'PassMap 2.11 Shipped: Offline Maps & 60 FPS Mobile Polish'
        },
        excerpt: {
            pt: 'Reconstruí o motor do <span class="text-hl">PassMap</span> nos últimos dias. O maior desafio foi fazer o cache de tiles funcionar 100% offline com renderização lisa e sem engasgos no mobile.',
            en: 'Overhauled <span class="text-hl">PassMap</span>’s core engine over the past days. The biggest hurdle was seamless tile caching for true offline navigation with 60 FPS mobile panning.'
        },
        texto: {
            pt: `
                <p>Finalmente liberei a versão <span class="text-hl">v2.11 do PassMap</span>. Esse projeto começou de uma necessidade pessoal minha: eu queria um app de mapas que não engasgasse no smartphone, que não consumisse bateria à toa e que funcionasse mesmo quando estou totalmente sem sinal de internet.</p>
                <p>Passei horas ajustando o pipeline de renderização da interface cartográfica para garantir 60 FPS estáveis ao rotacionar e dar zoom. Além disso, reestruturei o motor de cache de tiles em IndexedDB, permitindo salvar áreas inteiras para exploração offline sem depender de servidores remotos.</p>
                <p>Outro detalhe que me deu bastante trabalho (mas valeu a pena) foi calibrar o comportamento edge-to-edge em telas com safe area (como a barra inferior no iOS WebKit e no Android). A experiência agora parece de um app nativo de verdade.</p>
            `,
            en: `
                <p>Officially pushed <span class="text-hl">PassMap v2.11</span> live. This tool was born out of my own frustration with mainstream map apps: I wanted lightning-fast panning, zero battery drain, and complete autonomy when cell signal drops to zero.</p>
                <p>Spent intense sessions tuning the cartographic rendering loop to maintain 60 FPS during pinch, zoom, and dynamic rotation. Re-architected tile caching into local IndexedDB chunks so entire regions can be navigated fully disconnected.</p>
                <p>Calibrating edge-to-edge viewports across mobile browsers (handling viewport height, home bars, and safe-area insets seamlessly on iOS WebKit and Android) was tricky, but the app now feels indistinguishable from a native build.</p>
            `
        }
    },
    {
        id: 'log-2',
        badge: { pt: 'ARQUITETURA', en: 'ARCHITECTURE' },
        badgeClass: 'badge-cyan',
        author: 'Tiago Cardoso',
        category: 'systems',
        date: { pt: '28 AGO 2026', en: '28 AUG 2026' },
        tag: 'Engenharia & Privacidade',
        title: {
            pt: 'Por Que Decidi Fazer o PassMap 100% Local-First e Sem Telemetria',
            en: 'Why I Built PassMap Around a Local-First, Zero-Telemetry Ethos'
        },
        excerpt: {
            pt: 'Minhas reflexões como desenvolvedor sobre privacidade: seus pontos favoritos, coordenadas e rotas pertencem ao <span class="text-hl-cyan">armazenamento local do seu aparelho</span>, e não a servidores de terceiros.',
            en: 'My thoughts as an engineer on data privacy: your saved pins, coordinates, and notes belong to your <span class="text-hl-cyan">local device storage</span>, not remote corporate servers.'
        },
        texto: {
            pt: `
                <p>Sempre me incomodou como os grandes serviços de mapas tratam cada passo do usuário como telemetria monetizável. Ao planejar o <span class="text-hl-cyan">PassMap</span>, decidi seguir na contramão: arquitetura <strong>Local-First intransigente</strong>.</p>
                <p>Todos os marcadores, listas personalizadas de POIs e anotações ficam salvos em IndexedDB com criptografia local. Não temos servidores rastreando por onde você anda, nem rotas enviadas para a nuvem sem você querer.</p>
                <p>Desenvolver dessa forma dá trabalho porque não posso terceirizar a lógica para um backend centralizado, mas a paz de espírito e a velocidade instantânea de carregamento compensam cada linha de código.</p>
            `,
            en: `
                <p>It always bothered me how major map providers treat every route and pin as monetizable telemetry. When designing <span class="text-hl-cyan">PassMap</span>, I chose the opposite path: uncompromising <strong>Local-First engineering</strong>.</p>
                <p>All custom POIs, categorized lists, and geographical annotations live in on-device IndexedDB with local encryption. We maintain zero tracking backends collecting user footsteps or routes.</p>
                <p>Building this way requires extra discipline because you can’t lean on server-side shortcuts, but the resulting instantaneous load times and true privacy make every refactor worthwhile.</p>
            `
        }
    },
    {
        id: 'log-3',
        badge: { pt: 'EXPERIMENTOS', en: 'EXPERIMENTS' },
        badgeClass: 'badge-purple',
        author: 'Tiago Cardoso',
        category: 'research',
        date: { pt: '18 AGO 2026', en: '18 AUG 2026' },
        tag: 'PassMap Telemetria',
        title: {
            pt: 'Telemetria em Tempo Real: Integrando Clima e Qualidade do Ar (AQI)',
            en: 'Realtime Telemetry: Integrating Weather & Air Quality (AQI) on Maps'
        },
        excerpt: {
            pt: 'Implementei um widget ambiental no cabeçalho do PassMap que calcula em tempo real o <span class="text-hl-purple">índice de qualidade do ar (AQI)</span>, temperatura e vento a partir de coordenadas globais.',
            en: 'Engineered an environmental telemetry widget in PassMap’s header correlating live coordinates with <span class="text-hl-purple">air quality index (AQI)</span>, temperature, and wind.'
        },
        texto: {
            pt: `
                <p>Uma funcionalidade que eu queria muito no PassMap era ver de relance as condições atmosféricas do local onde estou ou para onde estou planejando ir. Criei um módulo de <strong>telemetria ambiental hiperlocal</strong>.</p>
                <p>O widget faz requisições otimizadas para endpoints de dados meteorológicos abertos e correlaciona a latitude e longitude com medições oficiais de <span class="text-hl-purple">AQI (Índice de Qualidade do Ar)</span>, velocidade do vento e temperatura.</p>
                <p>Para evitar requisições desnecessárias quando o usuário apenas passeia pelo mapa, apliquei um algoritmo de debouncing e cache inteligente com base no raio de deslocamento.</p>
            `,
            en: `
                <p>A capability I really wanted inside PassMap was glancing at atmospheric conditions right at my target destination. I built an ultra-lightweight <strong>hyperlocal environmental telemetry widget</strong>.</p>
                <p>The module queries open meteorological endpoints, correlating geographic coordinates with official <span class="text-hl-purple">AQI (Air Quality Index)</span> measurements, wind velocity, and ambient temperature.</p>
                <p>To preserve network bandwidth while panning, I built a smart debouncing and spatial threshold cache that only refreshes when significant distance thresholds are crossed.</p>
            `
        }
    },
    {
        id: 'log-4',
        badge: { pt: 'BASTIDORES', en: 'DEVLOG' },
        badgeClass: 'badge-emerald',
        author: 'Tiago Cardoso',
        category: 'shipped',
        date: { pt: '08 AGO 2026', en: '08 AUG 2026' },
        tag: 'Roadmap Mobile',
        title: {
            pt: 'O Próximo Passo: Empacotando o PassMap Nativo para iOS e Android',
            en: 'The Next Milestone: Packaging PassMap Natively for iOS & Android'
        },
        excerpt: {
            pt: 'Com o PWA rodando redondo, comecei os testes para empacotar o <span class="text-hl">PassMap com casca nativa</span> para as lojas oficiais, aproveitando aceleração de hardware e sensores de bússola.',
            en: 'With our PWA running smooth, I am preparing the native compilation pipeline for <span class="text-hl">PassMap on the App Store & Google Play</span>, tapping into hardware compass and native acceleration.'
        },
        texto: {
            pt: `
                <p>O ecossistema PWA do PassMap está extremamente sólido, mas há barreiras do ecossistema web móvel (como travas de orientação no WebKit do iOS e limitações de sensores em segundo plano) que só uma compilação nativa resolve de forma definitiva.</p>
                <p>Comecei a estruturar o pipeline de empacotamento para a <span class="text-hl">Apple App Store</span> e a <span class="text-hl">Google Play Store</span>. A meta é manter a base de código 100% autônoma, adicionando pontes nativas apenas para sensores biométricos, bússola giroscópica e sincronização local offline.</p>
                <p>Seguimos firmes no compromisso de construir software independente com alma, sem código genérico de template.</p>
            `,
            en: `
                <p>PassMap’s PWA shell is rock-solid, but mobile web browsers introduce constraints (such as iOS WebKit orientation lock limitations and background sensor throttling) that only a native runtime solves cleanly.</p>
                <p>I have begun laying out the native deployment pipeline for both the <span class="text-hl">Apple App Store</span> and <span class="text-hl">Google Play Store</span>. The goal is maintaining our lean, autonomous codebase while unlocking native gyrocompass access and biometric unlock.</p>
                <p>Continuing our philosophy: handcrafted independent software with soul, zero generic boilerplates.</p>
            `
        }
    }
];
