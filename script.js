async function buscaEndereco(cep) {
  let mensagemErro = document.getElementById('erro')
  mensagemErro.innerHTML= ''
  try {
    let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    let consultaCepConvertida = await consultaCep.json()
    if (consultaCepConvertida.erro) {
      throw Error('Cep não existe')
    }

    completaCampos(consultaCepConvertida.localidade, consultaCepConvertida.uf, consultaCepConvertida.bairro, consultaCepConvertida.logradouro)

    console.log(consultaCepConvertida)
    return consultaCepConvertida
  } catch (erro) {
    console.log(erro)
    mensagemErro.innerHTML = '<p>CEP inexistente.</p>'
  }
}

function completaCampos(cidade, estado, bairro, endereco) {
  document.getElementById('cidade').value = cidade
  document.getElementById('estado').value = estado
  document.getElementById('bairro').value = bairro
  document.getElementById('endereco').value = endereco
}

let cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))