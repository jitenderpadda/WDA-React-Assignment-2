import React, { Component } from 'react';
import Editor from "../Editor";
import { apiurl } from "../helpers/constants";
import firebase from 'firebase';
import {
    List,
    ListItem,
    RaisedButton,
    Subheader
} from 'material-ui';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {Row, Col } from 'react-flexbox-grid';


class Tech extends Component {
    state = {
        tickets: [],
        selectedTicket: null
    }
    /* Toggle the ticket dialog */
    ticketDetailsClick = (ticket) => {
        const {selectedTicket} = this.state;
        this.setState({
            selectedTicket: (selectedTicket !== null && selectedTicket.id === ticket.id ? null : ticket)
        });
    }
    /* Close button for dialog */
    closeDialogClick = () => {
        this.setState({
            selectedTicket: null
        });
        this.forceUpdate();
    }

    componentDidMount() {
        {/* Fetch all tickets and check which tickets have
            been assigned to this tech user
         */}
        fetch(apiurl + '/api/tickets')
            .then((response) => response.json())
            .then((responseJson) => {
                const myTickets = [];
                for(const ele in responseJson) {
                    firebase.database().ref('ticket/'+responseJson[ele].id).on('value', (snapshot) => {
                        if(snapshot.val() !== null && snapshot.val().user_id === this.props.user.uid) {
                            myTickets.push(responseJson[ele]);

                            {/* Force the view to re-render (async problem) */}
                            this.forceUpdate();
                        }
                    })
                }
                return myTickets;
            })
            .then((tickets) => {
                this.setState({
                    tickets: tickets
                });
            })
    }

    render () {
        const { tickets,selectedTicket } = this.state;
        return (
            <div>
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
                    <Col>
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
                                <div>
                                    {/*Editor*/}
                                    <Editor/>
                                </div>
                            </div> )}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Tech;
