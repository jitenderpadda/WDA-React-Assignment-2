import React,{Component} from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Tickets from '../Tickets'
import Helpdesk from "./Helpdesk";
import Tech from "./Tech";

class Dashboard extends  Component{

    constructor(props) {
        super(props);
    }

    render (){
        const styles ={
            card : {
                paddingTop: 5
            }
        }
        return (
            <div>
                <Row>
                    <Col>
                        {this.props.type === 'helpdesk' ? (
                                <Helpdesk />
                            )
                            : this.props.type === 'tech' ? (
                                    <Tech user={this.props.user} />
                                )
                                :null}
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Dashboard;