const selectSerie = document.getElementById('serie');
const blocoLingua = document.getElementById('bloco-segunda-lingua');
const radiosLingua = document.querySelectorAll('input[name="segunda_lingua"]'); 

selectSerie.addEventListener('change', function() { // Caso selecione a quinta série, entrega um bloco para selecionar uma segunda língua
    if (this.value === '5ano'){
        blocoLingua.style.display = 'block';
    }else{
        blocoLingua.style.display = 'none';
        radiosLingua.forEach(r => r.checked = false);
    }
});

const verificarTurno = document.getElementsByName('turno');
const blocoTelefone = document.getElementById('bloco-telefone-tarde');

verificarTurno.forEach(radio => { // Caso selecione o turno da tarde, entrega um bloco para inserir número de telefone
    radio.addEventListener('change', function () {
    if (this.checked && this.value === 'tarde'){
        blocoTelefone.style.display = 'block';
    }else{
        blocoTelefone.style.display = 'none';
    }})});

document.getElementById('nascimento').addEventListener('change', function(){
    const nascimento = new Date(this.value);
    const hoje = new Date();

    if(!this.value){
        document.getElementById('idade').value = '';
    }
    
    // Fazer com que o contador de idade considere os meses e dias 

    let anos = hoje.getFullYear() - nascimento.getFullYear();

    document.getElementById('idade').value = `${anos} anos`;
});

const campoCep = document.getElementById('cep');

campoCep.addEventListener('input', function () {
    let valor = this.value.replace(/\D/g,'');

    if(valor.length > 5) {

        valor = valor.slice(0,5) + '-' + valor.slice(5,8); // Adiciona o hífen ao CEP
    }

    this.value = valor;
});

const campoCpf = document.getElementById('cpf');

campoCpf.addEventListener('input', function (){
   let valor = this.value.replace(/\D/g,'');

    if(valor.length > 9){

        valor = valor.slice(0,3) + '.' + valor.slice (3,6) + '.' + valor.slice(6,9) + '-' + valor.slice(9,11);
    }

    this.value = valor
});

 /*document.getElementById('cpf').addEventListener('input', function(e){ // Outro método de adicionar os pontos e hífens ao CPF, com REGEX (testando)
    let value = e.target.value.replace(/\D/g, '');

    if(value.length <=11){
        valor = valor
            .replace(/\(\d{3})(\d)/, '$1.$2')
            .replace(/\(\d{3})(\d)/, '$1.$2')
            .replace(/\(\d{3})(\d{1,2})/, '$1-$2');
    }

    e.target.value = value; 
});*/

const campoMatricula = document.getElementById('matricula'); // Adiciona ponto e hífen à matricula

campoMatricula.addEventListener('input', function (){
   let valor = this.value.replace(/\D/g,'');

    if(valor.length >2){

        valor = valor.slice(0,2) + '.' + valor.slice (2,4) + '-' + valor.slice(4,6);
    }

    this.value = valor
});

const campoTel = document.getElementById('telefone');   

campoTel.addEventListener('input', function(){
    let valor = this.value.replace(/\D/g, '');

    if(valor.length > 2){

        valor = '(' + valor.slice(0,2) + ')' + valor.slice(2,7) + '-' + valor.slice(7,11);
    }

    this.value = valor
});

/*document.getElementById('telefone').addEventListener('input', function(e){ // Método de adicionar os parênteses e hífens ao telefone, com REGEX (testando)
    let value= e.target.value.replace(/\D/g, '');

    if(value.length <=12){
        valor = valor
            .replace(/\(\d{2})(\d)/, '$1($2', '$3)$4')
            .replace(/\(\d{5})(\d)/, '$1-$2');
    }

    e.target.value = valor;
})*/

campoCep.addEventListener('blur', function(){
const cepLimpo = this.value.replace(/\D/g, '');

if(cepLimpo.length !== 8){
    if(cepLimpo.length > 0){
        alert('CEP digitado é inválido.');
    }
    return;
}   

fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`) 
    .then(r => {
        if(!r.ok) throw new Error('Erro na Rede!');
        return r.json();
    })
    .then(dados => {
        if(dados.erro){
            alert('CEP não encontrado!')
            return;
        }   // Buscar o CEP e retornar endereço

        console.log(dados);

        document.getElementById('logradouro').value = dados.logradouro || '';
        document.getElementById('bairro').value = dados.bairro || '';
        document.getElementById('cidade').value = dados.localidade || '';
        document.getElementById('estado').value = dados.uf || '';
        document.getElementById('ibge').value = dados.ibge || '';

        document.getElementById('numero').focus;
    })
});
