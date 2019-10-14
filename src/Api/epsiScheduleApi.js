
export async function getEpsiScheduleDay(date) {
    const url = `http://eclisson.duckdns.org:3000/schedule/day?date=${date}`
    //return [{"id":"0","date":"Lundi 14 Octobre","matiere":"LANGAGE DE PROGRAMMA","debut":"08:00","fin":"12:00","salle":"CG 213","prof":"MULOT MATHIEU"},{"id":"1","date":"Lundi 14 Octobre","matiere":"LANGAGE DE PROGRAMMA","debut":"13:00","fin":"17:00","salle":"CG 213","prof":"MULOT MATHIEU"}]
    return fetch(url, {method: 'GET'}).then(
        (response) => response.json().then(
            (responseJson) => {return responseJson}
        ),
        (error) => console.log(error)
    )
}

export async function getEpsiScheduleWeek(date) {
    const url = `http://eclisson.duckdns.org:3000/schedule/weekDate?date=${date}`
    //return [{"id":"0","date":"Lundi 14 Octobre","matiere":"LANGAGE DE PROGRAMMA","debut":"08:00","fin":"12:00","salle":"CG 213","prof":"MULOT MATHIEU"},{"id":"1","date":"Lundi 14 Octobre","matiere":"LANGAGE DE PROGRAMMA","debut":"13:00","fin":"17:00","salle":"CG 213","prof":"MULOT MATHIEU"}]
    return fetch(url, {method: 'GET'}).then(
        (response) => response.json().then(
            (responseJson) => {return responseJson}
        ),
        (error) => console.log(error)
    )
}