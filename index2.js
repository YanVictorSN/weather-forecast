const select = document.querySelector('select');

const result = document.getElementById('result');

const button = document.getElementById('test');

const createSelect = document.createElement('select');

const bodyIndex = document.querySelector('body');

const mainPage = document.querySelector('main');

select.addEventListener('change', selectedState);

async function selectedState() {

    const selectValue = select.value

        let promisseSelecteState = await new Promise((resolve, reject) => {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectValue}/municipios`)
            .then((response) => {
                if (response.status === 200) {                  
                    return response.json();
                } else {
                    return reject('Falha na leitura dos dados. Tente novamente mais tarde.')
                }
            })
            .then((data) => {

                    data.forEach((item) => {
                        const createOption = document.createElement('option');
                        createOption.setAttribute('value', `${item.id}`)
                        createOption.innerHTML = `${item.nome}`;
                        createSelect.appendChild(createOption);        
                    });
                        bodyIndex.appendChild(createSelect);
            })
    })
    return promisseSelecteState
}


let getIdCity  = createSelect.addEventListener("change", (e) => {
    let cityId = e.target.value
    return weather(cityId)
})

async function weather(cityId) {

   return promisseSelecteCity = await new Promise((resolve, reject) => {
        fetch(`https://apiprevmet3.inmet.gov.br/previsao/${cityId}`)
        .then((response) => {
            if (response.status === 200) {                  
                return response.json();
            } else {
                return reject('Falha na leitura dos dados. Tente novamente mais tarde.')
            }
        })
        .then((data)=> {
            const  date = new Date();
            const  dateFormated = date.toLocaleDateString();
            const  dayDate = date.getUTCDate();
            const  secondDay = dayDate + 1;
            const  trithDay = secondDay + 1;
            const  monthDate = date.getUTCMonth();
            const  yearDate = date.getUTCFullYear();

            const dateOne = `${dayDate}/${String(monthDate + 1).padStart(2,'0')}/${yearDate}`;
            const dateTwo = `${secondDay}/${String(monthDate + 1).padStart(2,'0')}/${yearDate}`;
            const dateTree = `${trithDay}/${String(monthDate + 1).padStart(2,'0')}/${yearDate}`;


            const dateString = String(dateFormated);

            console.log(dateOne,dateTwo,dateTree);
            const morning = 'manha';
            const afternoon = 'tarde';
            const night = 'noite';
            const weekDay = 'dia_semana';
            const resume = 'resumo';
            const max = 'temp_max';
            const min = 'temp_min';
            const icon = 'icone'
            console.log(dateFormated,dateOne, dateTwo);
            const dataWeather = [
                // First Atual
                {
                    // Morning
                    date:dateOne,
                    weekDay:data[cityId][dateFormated][morning][weekDay],
                    resume:data[cityId][dateFormated][morning][resume],
                    icon:data[cityId][dateFormated][morning][icon],
                    min:data[cityId][dateFormated][morning][min],
                    max:data[cityId][dateFormated][morning][max],
                },
                {   //Afternoon
                    date:dateOne,
                    weekDay:data[cityId][dateFormated][afternoon][weekDay],
                    resume:data[cityId][dateFormated][afternoon][resume],
                    icon:data[cityId][dateFormated][afternoon][icon],
                    min:data[cityId][dateFormated][afternoon][min],
                    max:data[cityId][dateFormated][afternoon][max],
                },  
                {
                    // Night
                    date:dateOne,
                    weekDay:data[cityId][dateFormated][night][weekDay],
                    resume:data[cityId][dateFormated][night][resume],
                    icon:data[cityId][dateFormated][night][icon],
                    min:data[cityId][dateFormated][night][min],
                    max:data[cityId][dateFormated][night][max],
                },

                //SecondDay
                {
                    date:dateTwo,
                    weekDay:data[cityId][dateTwo][morning][weekDay],
                    resume:data[cityId][dateTwo][morning][resume],
                    icon:data[cityId][dateTwo][morning][icon],
                    min:data[cityId][dateTwo][morning][min],
                    max:data[cityId][dateTwo][morning][max],
                },
                //TreeDay

                {
                    date:dateTree,
                    weekDay:data[cityId][dateTree][weekDay],
                    resume:data[cityId][dateTree][resume],
                    icon:data[cityId][dateTree][icon],
                    min:data[cityId][dateTree][min],
                    max:data[cityId][dateTree][max],
                }  
            ]
       
            return dataWeather;
            // console.log(data[cityId]);
            // console.log(data[cityId][dateFormated]);
            // console.log(data[cityId][dateFormated][morning][weekDay]);
            // console.log(data[cityId][dateFormated][morning][resume]);
            // console.log(data[cityId][dateFormated][morning][max]);
            // console.log(data[cityId][dateFormated][morning][min]);
            // console.log(test);
           
        })
       .then((dataWeather) => {
        
            result.innerHTML = ` <div>
        <p>Manhã</p>
                <p>Data: ${dataWeather[0]['date']}</p>
                <p>Dia: ${dataWeather[0]['weekDay']}</p>
                <img src=${dataWeather[0]['icon']}></img>
                <p>Previsão: ${dataWeather[0]['resume']}</p>
                <p>Temperatura Máxima:${dataWeather[0]['max']}</p>
                <p>Temperatura Mínnina:${dataWeather[0]['min']}</p>
         <p>Tarde</p>
                <p>Dia: ${dataWeather[1]['date']}</p>
                <p>Dia: ${dataWeather[1]['weekDay']}</p>
                <img src=${dataWeather[1]['icon']}></img>
                <p>Previsão: ${dataWeather[1]['resume']}</p>
                <p>Temperatura Máxima:${dataWeather[1]['max']}</p>
                <p>Temperatura Mínina:${dataWeather[1]['min']}</p>
         <p>Noite</p>
            <p>Data: ${dataWeather[2]['date']}</p>
            <p>Dia: ${dataWeather[2]['weekDay']}</p>
            <img src=${dataWeather[2]['icon']}></img>
            <p>Previsão: ${dataWeather[2]['resume']}</p>
            <p>Temperatura Máxima:${dataWeather[2]['max']}</p>
            <p>Temperatura Mínina:${dataWeather[2]['min']}</p>
        </div>
        <div>
            <p>Data: ${dataWeather[3]['date']}</p>
             <p>Dia: ${dataWeather[3]['weekDay']}</p>
             <img src=${dataWeather[3]['icon']}></img>
             <p>Previsão: ${dataWeather[3]['resume']}</p>
             <p>Temperatura Máxima:${dataWeather[3]['max']}</p>
            <p>Temperatura Mínina:${dataWeather[3]['min']}</p>
        </div>
        <div>
            <p>Data: ${dataWeather[4]['date']}</p>
             <p>${dataWeather[4]['weekDay']}</p>
             <img src=${dataWeather[4]['icon']}></img>
             <p>${dataWeather[4]['resume']}</p>
             <p>Temperatura Máxima:${dataWeather[4]['max']}</p>
            <p>Temperatura Mínina:${dataWeather[4]['min']}</p>
        </div>`
       })
        })
}

