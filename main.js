async function getAddressByCep(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        return data;
    } catch (error) {
        alert('CEP mal informado');
    }
}

async function getWeather(lat, long) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`);
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

async function handleClick() {
    const ruaElement = document.getElementById('rua');
    const bairroElement = document.getElementById('bairro');
    const ufElement = document.getElementById('uf');
    const climaElement = document.getElementById('clima');

    const lat = document.getElementById('latitude').value.replace(',', '.');
    const long = document.getElementById('longitude').value.replace(',', '.');
    const cep = document.getElementById('valor_cep').value;

    if (isNaN(lat) || isNaN(long)) {
        alert('Latitude e Longitude devem ser números.');
        return;
    }

    if (lat < -90 || lat > 90 || long < -180 || long > 180) {
        alert('Latitude deve estar entre -90 e 90 e Longitude deve estar entre -180 e 180.');
        return;
    }

    const addressData = await getAddressByCep(cep);
    if (addressData) {
        ruaElement.textContent = addressData.logradouro || 'Não disponível';
        bairroElement.textContent = addressData.bairro || 'Não disponível';
        ufElement.textContent = addressData.uf || 'Não disponível';
    }

    const weatherData = await getWeather(lat, long);
    if (weatherData) {
        const temp = weatherData.hourly.temperature_2m[0];
        climaElement.textContent = `Previsão de tempo de acordo com a região: ${temp}° C` || 'Não disponível';
    }
}