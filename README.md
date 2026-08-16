# Painel dos Pets 🐾

Painel simples para controlar **veterinário, vacinas, vermífugo, medicações, ração e outros** registros de Kyra, Maurício e Farofa. É um site estático — não precisa de servidor — com sincronização opcional entre dispositivos.

## Estrutura dos arquivos

```
├── index.html          → o painel em si (estrutura, estilo e funcionamento)
├── pets-config.js       → dados dos pets (nome, raça, nascimento, foto) — edite aqui
├── firebase-config.js   → chave da sincronização entre dispositivos — edite aqui
├── assets/
│   ├── kyra.jpg
│   ├── mauricio.jpg
│   └── farofa.jpg
└── README.md
```

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser privado).
2. Suba estes itens (`index.html`, `pets-config.js`, `firebase-config.js`, a pasta `assets/` e este `README.md`) para a raiz do repositório — pelo site do GitHub em **"Add file → Upload files"**, ou via `git`.
3. Vá em **Settings → Pages**.
4. Em **"Build and deployment"**, escolha **Source: Deploy from a branch**, branch **main**, pasta **/ (root)**, e clique em **Save**.
5. Em alguns minutos o GitHub mostra o link do site:
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`

## Sincronização entre dispositivos

Por padrão o painel salva os registros só no navegador onde foi usado. Para ver os mesmos dados no celular e no computador, ative a sincronização gratuita com o **Firebase** (serviço do Google, plano gratuito é bem generoso para este uso). Leva uns 10 minutos, uma vez só:

1. Acesse **https://console.firebase.google.com** e faça login com uma conta Google.
2. Clique em **"Criar projeto"**, dê um nome (ex.: `painel-pets`) e siga o assistente até criar (pode desativar o Google Analytics, não é necessário).
3. Dentro do projeto, clique no ícone **`</>`** ("Web") para adicionar um app da Web. Dê um apelido, **não** marque "Configurar também o Firebase Hosting", e clique em registrar.
4. O Firebase mostra um bloco de código com `const firebaseConfig = { apiKey: ..., ... }`. Copie esses dados.
5. Abra o arquivo **`firebase-config.js`** do painel (pelo GitHub mesmo, ícone de lápis) e substitua o conteúdo pelos dados copiados, no formato:
   ```js
   const FIREBASE_CONFIG = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
6. No menu lateral do console Firebase, vá em **Compilação → Firestore Database → Criar banco de dados**. Escolha uma região (ex.: `southamerica-east1`) e comece em modo produção.
7. Ainda no menu lateral, vá em **Compilação → Authentication → Sign-in method** e ative o provedor **"Anônimo"**.
8. No Firestore, vá na aba **"Regras"** e substitua pelo conteúdo abaixo, depois clique em **"Publicar"**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /painel-pets/{docId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
9. Salve o `firebase-config.js` (commit no GitHub). Em alguns minutos o site atualiza sozinho e o rodapé do painel passa a mostrar **"🔄 Sincronizado entre dispositivos"**.

A partir daí, qualquer registro adicionado em um aparelho aparece automaticamente nos outros, em tempo real, sem precisar atualizar a página.

**Sobre privacidade:** a chave (`apiKey`) do Firebase não é secreta — ela só identifica o projeto, não dá acesso por si só. Quem realmente controla o acesso são as "Regras" do passo 8: com a regra acima, qualquer pessoa que descubra a URL do site *e* saiba entrar anonimamente também conseguiria ler/editar os dados (não é exigido login com senha). Para um painel de cuidados com pets isso costuma ser aceitável, mas se quiser mais privacidade dá para restringir ainda mais as regras — é só pedir ajuda.

## Como editar as informações dos pets

Abra o arquivo **`pets-config.js`** direto pelo GitHub e ajuste os dados: nome, raça, sexo, data de nascimento ou cor. Cada campo tem um comentário explicando o que é. Depois de editar, clique em **"Commit changes"**.

Para trocar a foto de um pet, envie uma nova imagem para `assets/` com o mesmo nome do arquivo atual, ou com outro nome ajustando o campo `photo` em `pets-config.js`.

Para adicionar um pet novo, copie um bloco inteiro (de `{` até `},`) dentro de `pets-config.js`, ajuste os dados e envie a foto para `assets/`.

## Como funcionam os registros do dia a dia

Vacinas, consultas, medicações, compras de ração e vermífugos são adicionados direto pela tela, no botão **"+ Novo registro"** de cada aba — não é preciso mexer em código para isso.

- **Sem sincronização configurada:** os registros ficam salvos no `localStorage` do navegador. Cada navegador/dispositivo guarda os seus próprios dados, e limpar o cache do site apaga os registros.
- **Com sincronização configurada:** os registros ficam salvos no Firestore (na nuvem) e aparecem automaticamente em qualquer dispositivo aberto na mesma URL.

## Abas disponíveis

- **Veterinário** — consultas, motivo, clínica/profissional e retorno se houver
- **Vacinas** — aplicação e próximo reforço
- **Vermífugo** — aplicação e próxima dose
- **Medicações** — tratamento, dose/frequência e fim/retorno
- **Ração** — compras, quantidade, valor e previsão de acabar (com totais automáticos)
- **Outros** — qualquer outro evento (banho e tosa, exames, etc.)

Cada registro com uma data futura preenchida ganha automaticamente um status: **Em dia**, **Atenção** (até 14 dias) ou **Atrasado**, tanto no card do registro quanto na "Central de alertas" da barra lateral.
