import React, { Component } from 'react';
import {
    Paper,
    BottomNavigation
} from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Footer extends Component {


    render() {
        const footerStyle ={
            position: 'fixed',
            right: 0,
            bottom: 0,
            left: 0,
            overflow: 'hidden'
        };
        return (
            <div style={footerStyle}>
                <Paper zDepth={3}>
                    <BottomNavigation>
                        <Col md={12}>
                                <Row center="md">
                                    <Col md={6} >
                                        <p>&copy; RMIT University</p>
                                    </Col>
                                </Row>
                            </Col>
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

export default Footer;