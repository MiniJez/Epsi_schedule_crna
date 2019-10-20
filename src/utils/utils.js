export function getFormatedDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth()+1; 
    let yyyy = date.getFullYear();

    if(dd<10) dd = '0' + dd;

    if(mm<10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd
}

export function getLongDate(date) {
    var days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    var month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    var dayName = days[date.getDay()];
    var monthName = month[date.getMonth()]

    return `${dayName} ${date.getDate()} ${monthName}`
}

export function getWeekNumber(date) {
    var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

export function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    
    return ISOweekStart;
}

export function getAllWeekDays(date) {
    let firstDay = getDateOfISOWeek(getWeekNumber(new Date(date)), new Date(date).getFullYear())
    allDays = [
        {
            day: 'Lundi',
            date: firstDay.getDate(),
            month: firstDay.getMonth() + 1
        },
        {
            day: 'Mardi',
            date: firstDay.getDate(firstDay.setDate(firstDay.getDate() + 1)),
            month: firstDay.getMonth() + 1
        },
        {
            day: 'Mercredi',
            date: firstDay.getDate(firstDay.setDate(firstDay.getDate() + 1)),
            month: firstDay.getMonth() + 1
        },
        {
            day: 'Jeudi',
            date: firstDay.getDate(firstDay.setDate(firstDay.getDate() + 1)),
            month: firstDay.getMonth() + 1
        },
        {
            day: 'Vendredi',
            date: firstDay.getDate(firstDay.setDate(firstDay.getDate() + 1)),
            month: firstDay.getMonth() + 1
        }
    ]

    return allDays
}