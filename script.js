function adicionar(){
    var texto = document.getElementById('inputTarefa').value;
    if (texto == ''){
        alert("Tarefa em branco!");
    }else{
        var lista = document.querySelector('#tarefas');
        var li = document.createElement('li');
        var cod_id = document.querySelectorAll('#tarefas li').length;
        console.log(cod_id);
        li.innerHTML = '<div class="itemPendente" id="'+cod_id+'"><input type="checkbox" onchange=concluido(this)>'+
            '<label>'+texto+'</label><button onclick="removerItem('+cod_id+')">BT</button></div>';
        lista.appendChild(li);

        //limpar o input
        document.getElementById('inputTarefa').value = '';
    }
}

function removerItem(teste){
    op = confirm('Tem certeza?');
    if(op){
        document.getElementById(teste).parentElement.remove();
    }    
}

function concluido(checkboxItem) {
    if (checkboxItem.checked) {
        checkboxItem.parentElement.className = "itemFeito";
    }else{
        checkboxItem.parentElement.className = "itemPendente";
    }
  }