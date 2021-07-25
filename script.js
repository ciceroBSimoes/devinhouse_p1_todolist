//Event listeners
document.getElementById('btAdicionar').addEventListener('click', adicionarItem);

function adicionarItem(){
    var inputTarefa = document.getElementById('inputTarefa');
    var textoInput = inputTarefa.value;
    var lista = document.querySelector('#tarefas');

    if (textoInput == ''){
        alert("Tarefa em branco!");
    }else{

        var tamLista = document.querySelectorAll('#tarefas li').length;
        var cod_id;

        if(tamLista == 0){
            cod_id = 0;
        }else{
            cod_id = parseInt(lista.lastChild.firstChild.id) + 1;
        }

        incrementaLista(cod_id, textoInput);
        salvaItemLs(cod_id, false, textoInput);
        
        inputTarefa.value = '';
        inputTarefa.focus();
    }
}

function incrementaLista(itemId, textoItem){
    var lista = document.querySelector('#tarefas');
    var li = document.createElement('li');

    var strHtml = '<div id="'+itemId+'" class="itemLst"><input type="checkbox" id ="check'+itemId+'" onchange="atualizaStatus(this)">'+
                '<label for="check'+itemId+'">'+textoItem+'</label><button id="btExcluir" onclick="excluirItem(this)"><ion-icon name="trash-outline"></ion-icon></button></div>';
            
    li.innerHTML = strHtml;
    lista.appendChild(li);
}

function excluirItem(btn){
    if(confirm('Excluir essa tarefa?')){
        btn.parentElement.parentElement.remove();
        removerItemLs(btn.parentElement.id);
    }
}

function removerItemLs(item_id){
    var listaLS = JSON.parse(localStorage.getItem('lista'));

    for (var i=0; i < listaLS.tarefas.length; i++){
        if(listaLS.tarefas[i].id == item_id){
            var itemPos = listaLS.tarefas.indexOf(listaLS.tarefas[i]);
            listaLS.tarefas.splice(itemPos, 1);
         
            if(listaLS.tarefas.length == 0){
                localStorage.clear();
            }else{
                localStorage.setItem('lista', JSON.stringify(listaLS));
            }
        }
    }
}

function atualizaStatus(checkBox){
    
    var id = checkBox.parentElement.id;
    var listaLS = JSON.parse(localStorage.getItem('lista'));

    for (var i=0; i < listaLS.tarefas.length; i++){
 
        if(listaLS.tarefas[i].id == id){
            if(checkBox.checked == true){
                checkBox.nextSibling.style.textDecoration = 'line-through';
                listaLS.tarefas[i].status = true;    
            }else{
                checkBox.nextSibling.style.textDecoration = 'none';
                listaLS.tarefas[i].status = false;
            }
            
            localStorage.setItem('lista', JSON.stringify(listaLS));
        }
    }
}

function salvaItemLs(item_id, sts, texto){
    var lista;

    if(localStorage.getItem('lista') == null){
        lista = {'tarefas':[]};
        lista.tarefas.push({'id':item_id, 'status':sts, 'texto':texto});
        localStorage.setItem('lista', JSON.stringify(lista));    
    }else{
        lista = JSON.parse(localStorage.getItem('lista'));
        lista.tarefas.push({'id':item_id, 'status':sts, 'texto':texto});
        localStorage.setItem('lista', JSON.stringify(lista));    
    }
}

function carregaListaLs(){
    var tarefasLS = JSON.parse(localStorage.getItem('lista'));
        
    if(tarefasLS != null){
        for (var i=0; i < tarefasLS.tarefas.length; i++){
            incrementaLista(tarefasLS.tarefas[i].id, tarefasLS.tarefas[i].texto);

            if(tarefasLS.tarefas[i].status == true){
                var checkB = document.getElementById(tarefasLS.tarefas[i].id).firstChild;
                checkB.checked = true;
                checkB.nextSibling.style.textDecoration = 'line-through';
            }
        }
    }
}

