![CPF](./docs/cpf.jpg)

# Todos os CPFs possíveis do Brasil

Estou liberando este código com os hacks utilizados para adquirir todos os CPFs possíveis do Brasil.

### Rodando o script

Gera um arquivo `cpfs.txt` com todos os CPFs possíveis (inclusive CPFs inválidos, como `111.111.111-11` e `000.000.000-00`).

```bash
npm run generate
```

### Executando os testes

Há apenas um teste para calcular se os dígitos verificadores são válidos.

```bash
npm run test
```

### Dividindo o arquivo em partes

O comando `split` deve estar disponível no seu sistema operacional. No caso do Windows, você pode usar o WSL.

```bash
split -C 20m --numeric-suffixes cpfs.txt cpf
```
