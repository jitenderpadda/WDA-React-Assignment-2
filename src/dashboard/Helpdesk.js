import React, {Component} from 'react';
import {apiurl} from '../helpers/constants';
import {Row, Col} from 'react-flexbox-grid';
import firebase from 'firebase';
import {
    Card,
    CardHeader,
    CardText,
    RaisedButton,
    Snackbar
} from 'material-ui';

import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import {darkBlack} from 'material-ui/styles/colors';

class Helpdesk extends Component {
    state = {
        tickets: [],
        techUsers: [],
        selectedTech: null,
        selectedPriority: null,
        selectedEscalationLevel: null,
        open : false
    }
    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
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
                        if (snapshot.val() === null || snapshot.val().status === 'escalated') {
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
    assignTicketToTech = (ticket) => {
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
        data['ticket/' + ticket.id] = {
            ticket_id: ticket.id,
            user_id: this.state.selectedTech, // store Tech ID
            priority: this.state.selectedPriority, //store ticket priority
            escalation_level: this.state.selectedEscalationLevel //store escalation level
        };
        firebase.database().ref().update(data)
        //alert('Tech successfully assigned to ticket!');
        this.setState({
            open: true
        });
        this.forceUpdate();
        //window.location.reload();
    }

    render() {
        const {techUsers, selectedPriority, selectedEscalationLevel} = this.state

        return (
            <div>
                {/*helpdesk tickets display-->*/}
                <Row>
                    <div className="ticket">
                        {this.state.tickets.length < 1 && (
                            <p>There are no tickets to display.</p>
                        )}
                        {this.state.tickets.map((ticket, i) => (
                            <Card key={i}>
                                <CardHeader
                                    title={ticket.software_issue}
                                    subtitle={ticket.email}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                />
                                <CardText expandable={true}>
                                    <Row>
                                        <div className="ticket-details">
                                            <h3 className="text-uppercase">Ticket Details</h3>
                                            <p><b>ID: </b>{ticket.id}</p>
                                            <p><b>Name: </b>{ticket.name}</p>
                                            <p><b>Email: </b>{ticket.email}</p>
                                            <p><b>Title: </b>{ticket.software_issue}</p>
                                            <p><b>Operating System: </b>{ticket.operating_system}</p>
                                            <p><b>Comment: </b>{ticket.comment}</p>
                                            <p><b>Created On: </b>{ticket.created_at}</p>
                                        </div>
                                        <div className="ticket-options">
                                            {techUsers.length > 0 && (
                                                <div>
                                                    <h3 className="text-uppercase">Assign to tech</h3>
                                                    <select className="form-control" onChange={this.handleTechChange}
                                                            defaultValue="-1">
                                                        <option value="-1" defaultValue disabled>Select a tech user
                                                        </option>
                                                        {techUsers.map((user, i) => (
                                                            <option key={i} value={user.id}>{user.name}</option>
                                                        ))}
                                                    </select>
                                                    <h3 className="text-uppercase">Set Ticket Priority</h3>
                                                    <select className="form-control"
                                                            onChange={this.handlePriorityChange}
                                                            defaultValue="-1">
                                                        <option value="-1" defaultValue disabled>Select priority
                                                        </option>
                                                        <option key="1" value="Low">Low</option>
                                                        <option key="2" value="Moderate">Moderate</option>
                                                        <option key="3" value="High">High</option>
                                                    </select>
                                                    <h3 className="text-uppercase">Set Escalation Level</h3>
                                                    <select className="form-control"
                                                            onChange={this.handleEscalationChange}
                                                            defaultValue="-1">
                                                        <option value="-1" defaultValue disabled>Select escalation level
                                                        </option>
                                                        <option key="1" value="1">1</option>
                                                        <option key="2" value="2">2</option>
                                                        <option key="3" value="3">3</option>
                                                    </select>
                                                    {selectedEscalationLevel != null && selectedPriority != null && (
                                                        <div className="clearfix"><br/>
                                                            <RaisedButton
                                                                label="Assign"
                                                                primary={true}
                                                                onTouchTap={() => this.assignTicketToTech(ticket)}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                            }
                                        </div>
                                    </Row>
                                </CardText>
                            </Card>
                        ))}
                    </div>
                    <Snackbar
                        open={this.state.open}
                        message="Ticket has been assigned"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                        bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
                    />
                </Row>
            </div>
        );
    }
}

export default Helpdesk;