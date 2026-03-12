const selectSerie = document.getElementById('serie');
const blocoLingua = document.getElementById('bloco-segunda-lingua');
const radiosLingua = document.querySelectorAll('input[name="segunda_lingua"]');

selectSerie.addEventListener('change', function() {
    if (this.value === '5ano'){
        blocoLingua.style.display = 'block';
    }else{
        blocoLingua.style.display = 'none';
        radiosLingua.forEach(r => r.checked = false);
    }
});

const verificarTurno = document.getElementsByName('turno');
const blocoTelefone = document.getElementById('bloco-telefone-tarde');

verificarTurno.forEach(radio => {
    radio.addEventListener('change', function () {
    if (this.checked && this.value === 'tarde'){
        blocoTelefone.style.display = 'block';
    }else{
        blocoTelefone.style.display = 'none';
    }})});
