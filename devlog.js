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
        category: 'shipped',
        date: { pt: '24 AGO 2026', en: '24 AUG 2026' },
        tag: 'FazendaRPG v1.4',
        title: {
            pt: 'FazendaRPG 1.4: Nova Economia Agrícola e Clima',
            en: 'FazendaRPG 1.4: Agricultural Economy & Climate Engine'
        },
        excerpt: {
            pt: 'Rebalanceamento total dos <span class="text-hl">ciclos de colheita</span>, eventos dinâmicos de <span class="text-hl">estação</span> e migração para persistência assíncrona a <span class="text-hl">60 FPS</span>.',
            en: 'Complete rebalance of <span class="text-hl">harvest cycles</span>, dynamic <span class="text-hl">seasonal weather</span>, and asynchronous state storage running at <span class="text-hl">60 FPS</span>.'
        },
        texto: {
            pt: `
                <p>Liberamos hoje a versão <span class="text-hl">v1.4 do FazendaRPG</span>. O foco principal foi reestruturar completamente a matemática de progressão agrícola e a resposta em tempo de execução.</p>
                <p>Implementei um sistema procedural de clima que calcula variações de chuva, seca e fertilidade do solo sem sobrecarregar a thread principal do navegador. Os testes com milhares de ciclos mantiveram estabilidade total.</p>
                <p>A camada de persistência local agora opera de forma 100% assíncrona, eliminando qualquer micro-engasgo durante autosaves periódicos.</p>
            `,
            en: `
                <p>Shipped version <span class="text-hl">v1.4 of FazendaRPG</span> today. The core focus was overhauling the agricultural progression math and runtime performance.</p>
                <p>Engineered a procedural weather loop calculating precipitation, drought, and soil fertility without blocking the main browser thread.</p>
                <p>The client persistence layer is now completely asynchronous, preventing any frame drops during periodic autosaves.</p>
            `
        }
    },
    {
        id: 'log-2',
        badge: { pt: 'SISTEMA', en: 'SYSTEM' },
        badgeClass: 'badge-cyan',
        category: 'systems',
        date: { pt: '18 AGO 2026', en: '18 AUG 2026' },
        tag: 'Hacker0s Build 2.1',
        title: {
            pt: 'Hacker0s 2.1: Módulos de Terminal & Desafios Cripto',
            en: 'Hacker0s 2.1: Terminal Shell & Cryptographic Trials'
        },
        excerpt: {
            pt: 'Novo shell cibernético com ferramentas de <span class="text-hl-cyan">inspeção de pacotes</span>, 12 nós de rede com puzzles de <span class="text-hl-cyan">invasão lógica</span> e renderização CRT.',
            en: 'New cybernetic shell featuring <span class="text-hl-cyan">packet inspection tools</span>, 12 encrypted nodes with <span class="text-hl-cyan">logic infiltration puzzles</span>, and CRT rendering.'
        },
        texto: {
            pt: `
                <p>A build <span class="text-hl-cyan">2.1 do Hacker0s</span> traz um ambiente de linha de comando muito mais tático e responsivo.</p>
                <p>Adicionei utilitários de inspeção de pacotes simulados e algoritmos de decifração hash em tempo real. Foram criados 12 novos nós de rede criptografados que exigem raciocínio lógico e engenharia reversa para serem ultrapassados.</p>
                <p>A camada gráfica simula o efeito clássico de fósforo âmbar e fósforo verde com varredura CRT em hardware sem depender de bibliotecas externas.</p>
            `,
            en: `
                <p>Build <span class="text-hl-cyan">2.1 of Hacker0s</span> introduces a much more responsive, tactical command-line simulation.</p>
                <p>Implemented real-time packet inspection routines and hash cracking modules across 12 newly encrypted network nodes.</p>
                <p>The visual rendering pipeline delivers authentic CRT amber and emerald phosphor scanlines directly via pure CSS and canvas shaders.</p>
            `
        }
    },
    {
        id: 'log-3',
        badge: { pt: 'PESQUISA', en: 'RESEARCH' },
        badgeClass: 'badge-purple',
        category: 'research',
        date: { pt: '10 AGO 2026', en: '10 AUG 2026' },
        tag: 'The Lab // R&D',
        title: {
            pt: 'Protocolo Aetheria: Testes com Física Procedural',
            en: 'Protocol Aetheria: Experiments in Procedural Physics'
        },
        excerpt: {
            pt: 'Primeiros marcos de um motor de <span class="text-hl-purple">física procedural ultraleve</span> e ambiência sonora sintetizada em tempo real via <span class="text-hl-purple">Web Audio Core</span>.',
            en: 'Early milestones in lightweight <span class="text-hl-purple">procedural physics</span> and dynamic audio synthesis running on <span class="text-hl-purple">Web Audio Core</span>.'
        },
        texto: {
            pt: `
                <p>Tenho dedicado os finais de semana a prototipar um motor de <span class="text-hl-purple">geração procedural ultraleve</span> para os futuros mundos interativos da Gennisys.</p>
                <p>O foco é gerar relevo, mapas e ecossistemas complexos com zero latência de carregamento e sem carregar bundles pesados de engines tradicionais. A resposta tem sido surpreendentemente rápida.</p>
                <p>Também comecei a sintetizar paisagens sonoras adaptativas diretamente via Web Audio API, gerando frequências que reagem ao estado da aplicação.</p>
            `,
            en: `
                <p>Spending my evenings prototyping a lightweight <span class="text-hl-purple">procedural generation engine</span> for upcoming experimental environments.</p>
                <p>The goal is streaming meshes and ecosystems instantly with zero load times while avoiding heavy external engine runtimes.</p>
                <p>Also synthesizing adaptive atmospheric audio directly via the Web Audio API, generating soundscapes that respond dynamically to runtime events.</p>
            `
        }
    },
    {
        id: 'log-4',
        badge: { pt: 'LANÇAMENTO', en: 'SHIPPED' },
        badgeClass: 'badge-emerald',
        category: 'shipped',
        date: { pt: '02 AGO 2026', en: '02 AUG 2026' },
        tag: 'PacketClicker v2.0',
        title: {
            pt: 'PacketClicker MMO: Clusters Quânticos & Roteamento',
            en: 'PacketClicker MMO: Quantum Clusters & Throughput'
        },
        excerpt: {
            pt: 'Expansão maciça com nova camada de <span class="text-hl">clusters quânticos</span>, mais de 25 upgrades e algoritmo de <span class="text-hl">cálculo offline determinístico</span>.',
            en: 'Major expansion adding <span class="text-hl">quantum server clusters</span>, 25+ progression upgrades, and deterministic <span class="text-hl">offline calculation math</span>.'
        },
        texto: {
            pt: `
                <p>Subi a versão 2.0 do <strong>PacketClicker</strong>, nosso simulador incremental de tráfego de redes.</p>
                <p>Foram implementados novos tiers de hardware capazes de processar Petabytes por segundo de dados de forma autônoma, além de uma árvore de habilidades tecnológicas com mais de 25 upgrades de compressão e balanceamento de carga.</p>
                <p>O cálculo de rendimento em segundo plano foi recalculado para garantir progressão precisa e sem desvios matemáticos.</p>
            `,
            en: `
                <p>Shipped version 2.0 of <strong>PacketClicker</strong>, our incremental network simulation project.</p>
                <p>Deployed new hardware tiers handling multi-petabyte autonomous throughput alongside a 25-node skill progression tree for compression and load balancing.</p>
                <p>Recalibrated background execution calculations for precise offline mathematical progression.</p>
            `
        }
    },
    {
        id: 'log-5',
        badge: { pt: 'SEGURANÇA', en: 'SECURITY' },
        badgeClass: 'badge-cyan',
        category: 'systems',
        date: { pt: '25 JUL 2026', en: '25 JUL 2026' },
        tag: 'PassMap Core',
        title: {
            pt: 'PassMap: Arquitetura Zero-Knowledge & AES-GCM',
            en: 'PassMap: Zero-Knowledge Architecture & AES-GCM'
        },
        excerpt: {
            pt: 'Aprimoramento do cofre local com <span class="text-hl-cyan">criptografia AES-GCM / PBKDF2</span>, análise de entropia e integridade por <span class="text-hl-cyan">checksum SHA-256</span>.',
            en: 'Vault security upgrades with client-side <span class="text-hl-cyan">AES-GCM / PBKDF2 encryption</span>, live entropy auditing, and <span class="text-hl-cyan">SHA-256 verification</span>.'
        },
        texto: {
            pt: `
                <p>Atualizei o núcleo de segurança do <strong>PassMap</strong> com foco em privacidade intransigente e controle soberano de credenciais.</p>
                <p>A arquitetura opera no modelo <span class="text-hl-cyan">Zero-Knowledge estrito</span>: as chaves e dados nunca saem da memória do dispositivo sem criptografia AES-GCM de 256 bits com derivação por PBKDF2.</p>
                <p>Adicionei também um analisador de força de senha em tempo real e exportação de backups assinados por hash criptográfico.</p>
            `,
            en: `
                <p>Updated the core security architecture of <strong>PassMap</strong>, emphasizing absolute client-side sovereignty.</p>
                <p>The vault operates on a strict <span class="text-hl-cyan">Zero-Knowledge model</span>: confidential keys and records never leave local memory without 256-bit AES-GCM encryption derived via PBKDF2.</p>
                <p>Added real-time credential entropy analysis and master backup export signed with cryptographic checksums.</p>
            `
        }
    },
    {
        id: 'log-6',
        badge: { pt: 'SISTEMA', en: 'SYSTEM' },
        badgeClass: 'badge-purple',
        category: 'systems',
        date: { pt: '14 JUL 2026', en: '14 JUL 2026' },
        tag: 'GenCalc // Utils',
        title: {
            pt: 'GenCalc & BudgetBox: Precisão IEEE-754 e Atalhos',
            en: 'GenCalc & BudgetBox: IEEE-754 Precision & Shortcuts'
        },
        excerpt: {
            pt: 'Tratamento de arredondamento em <span class="text-hl-purple">ponto flutuante</span>, suporte completo a <span class="text-hl-purple">navegação via teclado</span> e visualizadores de caixa.',
            en: 'Resolved <span class="text-hl-purple">floating-point rounding</span> anomalies, integrated comprehensive <span class="text-hl-purple">keyboard shortcut workflows</span>, and cashflow charts.'
        },
        texto: {
            pt: `
                <p>Nossos utilitários de produtividade diária receberam uma revisão profunda de algoritmo e ergonomia.</p>
                <p>Eliminei as clássicas anomalias de arredondamento de <span class="text-hl-purple">ponto flutuante IEEE-754</span>, garantindo precisão absoluta em operações financeiras e contábeis.</p>
                <p>Toda a navegação agora é acelerada por atalhos de teclado, permitindo operar cálculos complexos sem tocar no mouse.</p>
            `,
            en: `
                <p>Refactored our everyday productivity suite with a focus on mathematical accuracy and keyboard ergonomics.</p>
                <p>Eliminated standard <span class="text-hl-purple">IEEE-754 floating-point</span> rounding drift to guarantee verified calculation integrity.</p>
                <p>The entire workflow is now keyboard-accelerated, enabling high-speed calculations without mouse dependency.</p>
            `
        }
    }
];
