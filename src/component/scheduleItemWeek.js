import React from 'react'
import { StyleSheet, Modal, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native'
import WeekView, { addLocale } from '../customModule/react-native-week-view';
import { getDateOfISOWeek, getWeekNumber } from '../utils/utils';
import { connect } from 'react-redux'
import { getDateSelector } from '../redux/selector/dateSelector'
import ScheduleItem from './scheduleItem';

addLocale('fr', {
    months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
    monthsShort: 'Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.'.split('_'),
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'Dim._Lun._Mar._Mer._Jeu._Ven._Sam.'.split('_'),
});

class ScheduleItemWeek extends React.Component {

    state = {
        modalVisible: false,
        event: null
    }

    render() {

        const { date } = this.props

        let firstDay = getDateOfISOWeek(getWeekNumber(new Date(date)), new Date(date).getFullYear())

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
                color: '#0075A2'
            }
        })

        return (
            <>
                <WeekView
                    events={events}
                    selectedDate={firstDay}
                    numberOfDays={5}
                    onEventPress={(event) => this.setState({ modalVisible: true, event: event })}
                    headerStyle={styles.headerStyle}
                    formatDateHeader="ddd DD MMM"
                    locale="fr"
                />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <TouchableHighlight 
                        style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => this.setState({modalVisible: false})}
                    >
                        <View style={{ width: '85%'}}>
                            <ScheduleItem item={this.state.event} />
                        </View>
                    </TouchableHighlight>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        date: getDateSelector(state)
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#00E29B',
    },
});

export default connect(mapStateToProps)(ScheduleItemWeek)