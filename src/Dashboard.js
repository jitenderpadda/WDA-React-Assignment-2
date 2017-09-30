import React,{Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Tickets from './Tickets'
// Material UI Components
import {
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText,
    CardActions,
    FlatButton
} from 'material-ui';

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
                        <Tickets/>
                        {/*<Card style={styles.card}>
                            <CardHeader
                                title="URL Avatar"
                                subtitle="Subtitle"
                                avatar="images/jsa-128.jpg"
                            />
                            <CardMedia
                                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                            >
                                <img src="images/nature-600-337.jpg" alt="" />
                            </CardMedia>
                            <CardTitle title="Card title" subtitle="Card subtitle" />
                            <CardText>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                            </CardText>
                            <CardActions>
                                <FlatButton label="Action1" />
                                <FlatButton label="Action2" />
                            </CardActions>
                        </Card>*/}
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Dashboard;