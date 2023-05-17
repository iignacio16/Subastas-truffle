module.exports = async function main (callback) {
    try{
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

        const Subasta = artifacts.require("Subasta");
        const subasta = await Subasta.deployed();

        const iniciarSubasta = await subasta.iniciarSubasta("Prueba",  "P", "Articulo de prueba", 100, 10, {from: accounts[0]});
        console.log(iniciarSubasta);

            const apostar = await subasta.apostar(6, {from: accounts[1], value: 2000});
            console.log(apostar);
        //     const apostar2 = await subasta.apostar(2, {from: accounts[2], value: 3000});
        //     console.log(apostar2);
            // const apostar3 = await subasta.apostar(0, {from: accounts[3], value: 4000});
            // console.log(apostar3);
          
        setTimeout(async () => {
            const finalizarSubasta = await subasta.finalizacionSubasta(6, {from: accounts[0]});
            console.log(finalizarSubasta);
           
            
            const eventos = await subasta.getPastEvents({fromBlock: 0, toBlock: "latest"});
            console.log(eventos);
            callback(0);
        }, 10);
    } catch(error){
        console.error(error);
        callback(1);
    }
};