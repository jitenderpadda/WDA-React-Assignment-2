import React, {Component} from 'react';
import {apiurl} from "../helpers/constants";
import firebase from 'firebase';
import {
    Card, CardHeader, CardText,
    RaisedButton,
} from 'material-ui';
import {Row, Col} from 'react-flexbox-grid';
import Editor from "../Editor";

class Tech extends Component {
    state = {
        tickets: []
    }

    componentDidMount() {
        /* Fetch all tickets and check which tickets have
            been assigned to this tech user
         */
        fetch(apiurl + '/api/tickets')
            .then((response) => response.json())
            .then((responseJson) => {
                const myTickets = [];
                for (const ele in responseJson) {
                    firebase.database().ref('ticket/' + responseJson[ele].id).on('value', (snapshot) => {
                        if (snapshot.val() !== null && snapshot.val().user_id === this.props.user.uid) {
                            myTickets.push(responseJson[ele]);

                            /* Force the view to re-render (async problem) */
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

    /* Click assign button */
    assignTicketToHelpdesk = (ticket) => {
        /* Add assigned ticket+tech into database*/
        const data = {};
        data['ticket/' + ticket.id] = {
            ticket_id: ticket.id,
            status: 'escalated',
        };
        firebase.database().ref().update(data)
        alert('Ticket has been assigned to the helpdesk person!');
        window.location.reload();
    }


    render() {
        const {tickets} = this.state;
        return (
            <div>
                <Row>
                    <div className="ticket">
                        {tickets.length < 1 && (
                            <p>You have not been assigned to any tickets.</p>
                        )}
                        {tickets.map((ticket, i) => (
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
                                            <div className="clearfix">
                                                <RaisedButton
                                                    label="Assign To Helpdesk"
                                                    primary={true}
                                                    onTouchTap={() => this.assignTicketToHelpdesk(ticket)}
                                                />
                                            </div>
                                            <br/>
                                            <hr/>
                                            <hr/>
                                            <br/>
                                            <Editor ticket={ticket} user={this.props.user}/>
                                        </div>
                                    </Row>
                                </CardText>
                            </Card>
                        ))}
                    </div>
                </Row>
            </div>
        );
    }
}

export default Tech;