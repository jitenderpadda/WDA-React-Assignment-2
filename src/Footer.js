import React, { Component } from 'react';
import {
    Paper,
    BottomNavigation,
    BottomNavigationItem
} from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Footer extends Component {


    render() {
        const footerStyle ={
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0
        };
        return (
            <div style={footerStyle}>
                <Paper zDepth={3}>
                    <BottomNavigation>
                        <Row>
                            <Col xs={12}>
                                <Row center="xs">
                                    <Col xs={6} >
                                        <p>&copy; RMIT University</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

export default Footer;