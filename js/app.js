// CONSTRUCTOR
function travel (destination, dyas, user, hosting, type) {
    this.destination = destination; 
    this.dyas = dyas; 
    this.user = user; 
    this.hosting = hosting; 
    this.type = type; 
}

travel.prototype.quoteTravel = function() {
    let quantity = 0;

    switch (this.destination) {
        case 'europa':
            quantity += 100;
            break;
        case 'asia':
            quantity += 80;
            break;
        case 'america':
            quantity += 70;
            break;
        case 'africa':
            quantity += 90;
            break;
    
        default:
            break;
    }

    switch (this.hosting) {
        case 'lujo':
            quantity += 150;
            break;
        case 'economico':
            quantity += 50;
            break;
        case 'casa':
            quantity += 100;
            break;
    
        default:
            break;
    }

    let typeMoney = 0; 
    switch (this.type) {
        case 'basico':
            typeMoney = 50;
            break;
        case 'completo':
            typeMoney = 100;
            break;
    
        default:
            break;
    }

    const total = ((quantity * this.dyas) * this.user ) + typeMoney;

    return total;
}



function UI() {}

UI.prototype.message = function(type, msg) {
    this.type = type;
    this.msg = msg;

    const element = document.createElement('p');
    element.classList.add('message');
    element.textContent = msg;
    const snipper = document.querySelector('.snipperDiv');

    if(this.type == 'error') {
        element.classList.add('error');
    } else {
        element.classList.add('correct');
        snipper.hidden = false;
    }

    const cotiza = document.querySelector('#cotiza');
    cotiza.insertBefore(element, document.querySelector('#resultado'));

    setTimeout(() => {
        element.remove()
        snipper.hidden = true;
    }, 3000)
}

UI.prototype.showResult = function(datos, total) {

}

// ASIGNAR
const interface = new UI();

// CARGA EVENTOS
loadEvents()
function loadEvents() {
    const form = document.querySelector('#form');

    form.addEventListener('submit', validate);

    // valida formulario
    function validate(event) {
        event.preventDefault();

        const destination = form.querySelector('#destino').value;
        const dyas = form.querySelector('#dias').value;
        const user = form.querySelector('#personas').value;
        const hosting = form.querySelector('#alojamiento').value;
        const type = form.querySelector('input[name="seguro"]:checked').value;

        //muestra mensaje de error si algún campo está vacío
        if(destination == '' || dyas == '' || user == '' || hosting == '' || type == '') {
            interface.message('error', 'Campos incompletos. Verifique e intente de nuevo, por favor. ')
            return;
        }

        // muestra mensaje de éxito
        interface.message('correcto', 'Estamos cotizando su viaje...')

        //obtine los datos del formulario
        const quote = new travel(destination, dyas, user, hosting, type);

        const total = quote.quoteTravel();

        //muestra los resultados
        interface.showResult(quote, total)
    }

}
