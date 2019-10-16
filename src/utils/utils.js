export function getFormatedDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth()+1; 
    let yyyy = date.getFullYear();

    if(dd<10) dd = '0' + dd;

    if(mm<10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd
}

export function getLongDate(date) {
    var options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

export function getWeekNumber(date) {
    var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
  };