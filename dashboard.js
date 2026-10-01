
const urlAPI = "https://coingecko.com";

async function obterPrecos() {
    try {
        const resposta = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=usd&sparkline=true");
        const dados = await resposta.json();
        
        // As suas 4 linhas originais de controle:
        document.querySelector("#btc-card .price").textContent = `$ ${dados.bitcoin.usd.toLocaleString('en-US')}`;
        document.querySelector("#eth-card .price").textContent = `$ ${dados.ethereum.usd.toLocaleString('en-US')}`;
        document.querySelector("#sol-card .price").textContent = `$ ${dados.solana.usd.toLocaleString('en-US')}`;
        document.querySelector("#xrp-card .price").textContent = `$ ${dados.ripple.usd.toLocaleString('en-US')}`;
        
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}

obterPrecos();
setInterval(obterPrecos, 5000);
