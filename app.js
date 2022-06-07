const autos = require('./autos');
const personas = require('./personas');

const concesionaria = {
    autos,
    buscarAuto : function(patente) {
        let auto = this.autos.find(auto => auto.patente === patente);

        return auto ? auto : null;
    },
    venderAuto : function(patente) {
        let auto = this.buscarAuto(patente);
        
        auto.vendido = auto && true;
    
        return "Auto vendido!!"
    },
    autosParaLaVenta : function(){
        return this.autos.filter(auto => !auto.vendido)
    },
    autosNuevos : function(){
        const autos = this.autosParaLaVenta();
        return this.autos.filter(auto => auto.km < 100)
    },
    listaDeVentas : function(){
      let autoVendidos = this.autos.filter(auto => auto.vendido);
      return autoVendidos.map(auto => auto.precio)
    },
    totalDeVentas : function(){
        let precios = this.listaDeVentas();
        return precios.length !== 0 ? precios.reduce((acum, num) => acum + num) : 0
    },
    puedeComprar : function(auto,persona){
        if(persona.capacidadDePagoTotal >= auto.precio 
            && persona.capacidadDePagoEnCuotas >= auto.precio / auto.cuotas){
                return true
            }
            return false
    }
}

console.log(concesionaria.puedeComprar(autos[1], personas[3]))