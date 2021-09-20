
const priceApi = () => {
    const priceurl = "https://api.coindesk.com/v1/bpi/currentprice.json";
    return fetch(priceurl);
}

export default priceApi;