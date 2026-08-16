/* =========================================================================
   INFORMAÇÕES DOS PETS
   -------------------------------------------------------------------------
   Edite os dados abaixo sempre que precisar (nome, raça, sexo, data de
   nascimento, cor de identificação ou foto). Depois de editar, salve o
   arquivo e suba (commit) no GitHub — não é preciso mexer em mais nada.

   Campos:
     id      -> identificador único, sem espaços ou acentos (não mude
                depois de já ter registros salvos para esse pet)
     name    -> nome exibido no painel
     species -> 'dog' ou 'cat' (uso interno, não aparece na tela)
     breed   -> raça (ex.: 'SRD')
     sex     -> 'F' para fêmea, 'M' para macho
     birth   -> data de nascimento no formato AAAA-MM-DD
                (se não souber o dia exato, use 01; se souber só a idade,
                calcule a partir de hoje)
     color   -> cor de identificação (formato hexadecimal, ex.: '#2E7A61')
     photo   -> caminho da foto dentro da pasta assets/

   Para adicionar um novo pet, copie um bloco inteiro (de { até },) e
   ajuste os valores. Para remover um pet, apague o bloco correspondente.
   ========================================================================= */

const PETS = [
  {
    id: 'kyra',
    name: 'Kyra',
    species: 'dog',
    breed: 'SRD',
    sex: 'F',
    birth: '2024-01-01',
    color: '#2E7A61',
    photo: 'assets/kyra.jpg'
  },
  {
    id: 'mauricio',
    name: 'Maurício',
    species: 'dog',
    breed: 'SRD',
    sex: 'M',
    birth: '2025-01-01',
    color: '#B4842A',
    photo: 'assets/mauricio.jpg'
  },
  {
    id: 'farofa',
    name: 'Farofa',
    species: 'cat',
    breed: 'SRD',
    sex: 'F',
    birth: '2022-08-15',
    color: '#BD432A',
    photo: 'assets/farofa.jpg'
  },
];
