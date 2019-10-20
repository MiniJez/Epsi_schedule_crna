import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import WeekView, { addLocale } from 'react-native-week-view';
import { getDateOfISOWeek, getWeekNumber } from '../../utils/utils';
import {connect} from 'react-redux'
import moment from 'moment'

addLocale('fr', {
    months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
    monthsShort: 'Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.'.split('_'),
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'Dim._Lun._Mar._Mer._Jeu._Ven._Sam.'.split('_'),
});

class ScheduleItemWeek extends React.Component {

    handleNavSingleItem = (event) => {
        this.props.navigation.navigate('SingleItem', {item: event})
    }

    render() {

        let firstDay = getDateOfISOWeek(getWeekNumber(new Date(this.props.dateReducer.date)), new Date(this.props.dateReducer.date).getFullYear())

        const events = this.props.schedule.map((item, id) => {
            item.debut = `${item.debut.slice(0, 2)}:${item.debut.slice(3, 5)}:00`
            item.fin = `${item.fin.slice(0, 2)}:${item.fin.slice(3, 5)}:00`

            let startDate = new Date(item.ISOdate.slice(0, 11) + item.debut)
            startDate.setHours(startDate.getUTCHours(), startDate.getUTCMinutes())
            let endDate = new Date(item.ISOdate.slice(0, 11) + item.fin)
            endDate.setHours(endDate.getUTCHours(), endDate.getUTCMinutes())

            return {
                id: id,
                description: item.matiere,
                matiere: item.matiere,
                salle: item.salle,
                prof: item.prof,
                debut: item.debut.slice(0, 5),
                fin: item.fin.slice(0, 5),
                startDate: startDate,
                endDate: endDate,
                color: '#7cacd0'
            }
        })

        return(
            <WeekView
            events={events}
            selectedDate={firstDay}
            numberOfDays={5}
            onEventPress={(event) => this.handleNavSingleItem(event)}
            headerStyle={styles.headerStyle}
            formatDateHeader="ddd DD MMM"
            locale="fr"
            />
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const styles = StyleSheet.create({
    headerStyle: {
      backgroundColor: '#3d7ba9',
    },
});

export default connect(mapStateToProps)(ScheduleItemWeek)