import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {
    AppBar,
    IconButton,
    IconMenu,
    MenuItem,
    Drawer,
} from 'material-ui';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            openDialog: true,
            openDrawer: false
        };
    }

    drawerClose=()=> {
        this.setState({
            openDrawer: false
        });
    }

    drawerOpen=() => {
        this.setState({
            openDrawer: true
        });
    }
    render() {
        return (
            <div>
                <AppBar title="RMIT Support"
                        onLeftIconButtonTouchTap={this.drawerOpen}
                        iconElementRight={
                            <IconMenu
                                iconButtonElement={
                                    <IconButton><MoreVertIcon/></IconButton>
                                }
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText="Refresh"/>
                                <MenuItem primaryText="Help"/>
                                <MenuItem primaryText="Sign out"/>
                            </IconMenu>
                        }/>
                <Drawer docked={false}
                        open={this.state.openDrawer}
                        onRequestChange={(openDrawer) => this.setState({openDrawer})}
                >
                    <MenuItem onTouchTap={this.drawerClose}>Menu Item</MenuItem>
                    <MenuItem onTouchTap={this.drawerClose}>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default Header;