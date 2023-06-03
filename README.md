# NodeJS
## MapCidade - Um futuro melhor para sua cidade

# 📌 Tópicos

- [Visão geral](#visao-geral)
- [Pré-requisitos](#pre-requisito)
- [Instalação](#instalacao)
- [Exemplar de Usuario](#exemplar)
- [Endpoints](#endpoints)
- [Suporte](#suporte)
- [Histórico de versões](#versoes)

### Visão geral<a name="visao-geral"></a>

Solução inovadora desenvolvida para ajudar as prefeituras a identificar, monitorar e resolver problemas relacionados a infraestrutura urbana. Seu objetivo principal é fornecer uma plataforma eficiente para que os cidadãos possam relatar questões relacionadas ao calçamento de ruas e problemas de saneamento básico em suas comunidades.

### Pré-requisitos<a name="pre-requisito"></a>
- NPM instalado
- NodeJS instalado
- IDE: você precisará de uma IDE (ambiente de desenvolvimento integrado)

### Instalação<a name="instalacao"></a>
- Execute o comando `npm install` para restaurar as dependências do projeto. Isso baixará e instalará todas as bibliotecas e pacotes necessários para a aplicação funcionar corretamente.

Finalmente, execute o comando `node index.js` para iniciar a aplicação. Isso iniciará o servidor da aplicação e você poderá acessar a aplicação no seu navegador web em http://localhost..., onde poderá fazer consultas ao banco MYSQL como está configurado.

### Exemplar de Usuario<a name="exemplar"></a>
```
{
      email: "carvalhoo@gmail.com",
      nome: "Bruno Carvalho",
      sobrenome: "Silva Araujo",
      data_de_nascimento: "11/11/1995",
      cpf: "0876400000",
      cep: "451123123",
      senha: "12345",
      chamados: [
        {
          logradouro: "BR-550 - Ribeirinhos",
          complemento: "Próximo ao Marçal",
          bairro: "Osório Dantra",
          registro: "localhost/3000/string/passeio_escolar.png",
          descricao: "uma cratera está atrapalhando a entrada na escola",
          status: "analise",
          data_atualizada: "2023-05-24 23:38:10",
        }
      ]
}
 
```

### Endpoints<a name="endpoints"></a>
`POST` - /mapcidade/v1/usuarios                         `Cadastrar Usuários` <br>
`GET` - /mapcidade/v1/usuarios?email=&senha=            `Verificar Usuário Existente` <br>
`GET` - /mapcidade/v1/usuarios?email=                   `Detalhar Usuário` <br>
`POST` - /mapcidade/v1/chamados?email=                  `Cadastrar Chamados` <br>
`GET` - /mapcidade/v1/chamados?email=                   `Listar Chamados do Usuário` <br>

### Suporte<a name="suporte"></a>
[Linkedin](https://www.linkedin.com/in/ryanpsa/)

### Histórico de versões<a name="versoes"></a>
- Versão 2 - 03/06/2023
