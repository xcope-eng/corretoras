# Plataforma de Corretagem de Seguros

Esta plataforma permite aos corretores de seguros inserir dados de clientes uma única vez e visualizar ofertas simuladas de diferentes seguradoras para seguros de vida, saúde e viagem.

## Estrutura do Projeto

### Arquivos HTML
- `index.html` - Página principal da aplicação que contém toda a estrutura da interface

### Diretórios CSS
- `css/styles.css` - Estilos principais da aplicação
- `css/responsive.css` - Estilos específicos para responsividade em diferentes dispositivos

### Diretórios JavaScript
- `js/main.js` - Lógica principal da aplicação, incluindo manipulação de eventos e renderização de ofertas
- `js/create_logos.js` - Script para gerar logotipos das seguradoras

### Diretório de Dados
- `data/client_model.js` - Modelo de dados para clientes
- `data/insurance_offer_model.js` - Modelo de dados para ofertas de seguros
- `data/api_simulation.js` - Simulação de chamadas de API para seguradoras

### Diretório de Imagens
- `img/logos/` - Logotipos das seguradoras gerados dinamicamente

## Descrição dos Arquivos

### HTML

#### index.html
Contém toda a estrutura da aplicação, incluindo:
- Barra lateral de navegação
- Dashboard com estatísticas
- Formulário de entrada de dados do cliente
- Seção de exibição de ofertas de seguros com abas para diferentes tipos
- Templates para cartões de ofertas

### CSS

#### styles.css
Define todos os estilos visuais da aplicação:
- Layout da barra lateral
- Estilos de cartões e tabelas
- Cores e tipografia
- Estilos para formulários e botões
- Estilos específicos para cartões de ofertas de seguros

#### responsive.css
Contém regras de mídia para garantir que a aplicação funcione bem em diferentes tamanhos de tela:
- Ajustes para dispositivos móveis
- Ajustes para tablets
- Ajustes para desktops grandes
- Correções específicas para garantir que todo o texto seja visível

### JavaScript

#### main.js
Contém toda a lógica principal da aplicação:
- Inicialização da aplicação
- Manipulação de eventos de navegação
- Validação de formulários
- Geração dinâmica de ofertas de seguros
- Filtragem e ordenação de ofertas
- Carregamento de dados simulados
- Gerenciamento de histórico de simulações

#### create_logos.js
Script utilitário para gerar logotipos para as seguradoras:
- Cria SVGs coloridos para cada seguradora
- Salva os logotipos no diretório img/logos/

### Modelos de Dados

#### client_model.js
Define a estrutura de dados para clientes:
- Propriedades do cliente (nome, idade, gênero, etc.)
- Validação de dados
- Funções para calcular perfil de risco

#### insurance_offer_model.js
Define a estrutura de dados para ofertas de seguros:
- Propriedades das ofertas (seguradora, produto, prêmio, coberturas)
- Funções para formatar valores
- Funções para comparar e ordenar ofertas

#### api_simulation.js
Simula chamadas de API para seguradoras:
- Funções para gerar ofertas simuladas baseadas nos dados do cliente
- Cálculo de prêmios baseado no perfil do cliente
- Simulação de diferentes produtos por seguradora
- Simulação de diferentes coberturas por produto

## Como Executar o Projeto

1. Descompacte os arquivos em um servidor web
2. Abra o arquivo index.html em um navegador
3. A aplicação estará pronta para uso

## Arquitetura para Integração Futura

A plataforma foi projetada para permitir fácil integração com APIs reais de seguradoras no futuro:

1. As chamadas simuladas em `api_simulation.js` podem ser substituídas por chamadas reais
2. A estrutura de dados em `insurance_offer_model.js` é compatível com o que seria retornado por APIs reais
3. O código em `main.js` está estruturado para processar respostas de API de forma assíncrona

## Recursos Adicionais

- A plataforma usa Bootstrap 5 para o layout básico
- Ícones são fornecidos pelo Bootstrap Icons
- A fonte Inter é usada para tipografia
