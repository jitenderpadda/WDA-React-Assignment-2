import React, {Component} from 'react';
import {apiurl} from '../helpers/constants';
import {Row, Col} from 'react-flexbox-grid';
import firebase from 'firebase';
import {
    RaisedButton,
} from 'material-ui';

import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import {darkBlack} from 'material-ui/styles/colors';

class Helpdesk extends Component {
    state = {
        tickets: [],
        selectedTicket: null,
        techUsers: [],
        selectedTech: null,
        selectedPriority: null,
        selectedEscalationLevel: null
    }

    /* Once component has mounted, fetch from API + firebase */
    componentDidMount() {
        /* Fetch all tickets and check which tickets have
            an assigned tech
         */
        fetch(apiurl + '/api/tickets')
            .then((response) => response.json())
            .then((responseJson) => {
                const pendingTickets = [];
                for (const ele in responseJson) {
                    firebase.database().ref('ticket/' + responseJson[ele].id).on('value', (snapshot) => {
                        if (snapshot.val() === null) {
                            pendingTickets.push(responseJson[ele]);

                            /* Force the view to re-render (async problem) */
                            this.forceUpdate();
                        }
                    })
                }
                return pendingTickets;
            })
            .then((tickets) => {
                this.setState({
                    tickets: tickets
                });
            })

        /* Creates a firebase listener which will automatically
            update the list of tech users every time a new tech
            registers into the system
         */
        const users = firebase.database().ref('user/')
        users.on('value', (snapshot) => {
            const tempTech = [];
            for (const ele in snapshot.val()) {
                if (snapshot.val()[ele].type === 'tech') {
                    tempTech.push(snapshot.val()[ele]);
                }
            }
            this.setState({
                techUsers: tempTech
            });
        })
    }

    /* Close button for dialog */
    closeDialogClick = () => {
        this.setState({
            selectedTicket: null
        });
        this.forceUpdate();
    }

    /* Update the selected tech from dropdown box */
    handleTechChange = (e) => {
        this.setState({
            selectedTech: e.target.value
        });
    }
    /* Update the selected priority from dropdown box */
    handlePriorityChange = (e) => {
        this.setState({
            selectedPriority: e.target.value
        });
    }
    /* Update the selected escalation level from dropdown box */
    handleEscalationChange = (e) => {
        this.setState({
            selectedEscalationLevel: e.target.value
        });
    }

    /* Click assign button */
    assignTicketToTech = () => {
        if (this.state.selectedTech === null) {
            return;
        }
        if (this.state.selectedPriority === null) {
            return;
        }
        if (this.state.selectedEscalationLevel === null) {
            return;
        }

        /* Add assigned ticket+tech into database*/
        const data = {};
        data['ticket/' + this.state.selectedTicket.id] = {
            ticket_id: this.state.selectedTicket.id,
            user_id: this.state.selectedTech, // store Tech ID
            priority: this.state.selectedPriority, //store ticket priority
            escalation_level: this.state.selectedEscalationLevel //store escalation level
        };
        firebase.database().ref().update(data)
        alert('Tech successfully assigned to ticket!');
        window.location.reload();
    }

    /* Toggle the ticket dialog */
    ticketDetailsClick = (ticket) => {
        const {selectedTicket} = this.state;
        this.setState({
            selectedTicket: (selectedTicket !== null && selectedTicket.id === ticket.id ? null : ticket)
        });
    }

    render() {
        const vm = this
        const {selectedTicket, tickets, techUsers, selectedPriority, selectedEscalationLevel} = this.state

        return (
            <div>
                {/*helpdesk tickets display-->*/}
                <Row>
                    <Col md={(selectedTicket !== null ? 7 : 12)}>
                        <div>
                            {this.state.tickets.length < 1 && (
                                <p className="">There are no tickets to display.</p>
                            )}
                            <List style={{backgroundColor: darkBlack}}>
                                <Subheader style={{fontSize: 25}}>Tickets</Subheader>
                                {this.state.tickets.map((ticket, i) => (
                                    <ListItem key={i} onClick={() => this.ticketDetailsClick(ticket)}
                                              primaryText={ticket.software_issue}
                                              secondaryText={
                                                  <p>
                                                      {ticket.comment}
                                                  </p>
                                              }
                                              secondaryTextLines={2}
                                    />
                                ))}
                            </List>
                        </div>
                    </Col>
                    {selectedTicket !== null && (
                        <div>
                            <RaisedButton
                                label="Close Dialog"
                                secondary={true}
                                onTouchTap={() => this.closeDialogClick()}
                            />
                            <h3 className="text-uppercase">Ticket Details</h3>
                            <p><b>ID: </b>{selectedTicket.id}</p>
                            <p><b>Name: </b><br/>{selectedTicket.name}</p>
                            <p><b>Email: </b><br/>{selectedTicket.email}</p>
                            <p><b>Title: </b><br/>{selectedTicket.software_issue}</p>
                            <p><b>Operating System: </b><br/>{selectedTicket.operating_system}</p>
                            <p><b>Comment: </b><br/>{selectedTicket.comment}</p>
                            <p><b>Created On: </b><br/>{selectedTicket.created_at}</p>
                            {techUsers.length > 0 && (
                                <div>
                                    <hr/>
                                    <h3 className="text-uppercase">Assign to tech</h3>
                                    <select className="form-control" onChange={this.handleTechChange} defaultValue="-1">
                                        <option value="-1" defaultValue disabled>Select a tech user</option>
                                        {techUsers.map((user, i) => (
                                            <option key={i} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                    <h3 className="text-uppercase">Set Ticket Priority</h3>
                                    <select className="form-control" onChange={this.handlePriorityChange}
                                            defaultValue="-1">
                                        <option value="-1" defaultValue disabled>Select priority</option>
                                        <option key="1" value="Low">Low</option>
                                        <option key="2" value="Moderate">Moderate</option>
                                        <option key="3" value="High">High</option>
                                    </select>
                                    <h3 className="text-uppercase">Set Escalation Level</h3>
                                    <select className="form-control" onChange={this.handleEscalationChange}
                                            defaultValue="-1">
                                        <option value="-1" defaultValue disabled>Select escalation level</option>
                                        <option key="1" value="1">1</option>
                                        <option key="2" value="2">2</option>
                                        <option key="3" value="3">3</option>
                                    </select>
                                    {selectedTicket !== null && selectedEscalationLevel != null && selectedPriority != null && (
                                        <div className="clearfix"><br/>
                                            <RaisedButton
                                                label="Assign"
                                                primary={true}
                                                onTouchTap={() => this.assignTicketToTech()}
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                            }
                        </div>
                    )}
                </Row>
            </div>
        );
    }
}

export default Helpdesk;