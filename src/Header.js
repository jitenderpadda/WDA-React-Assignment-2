import React, { Component } from 'react';
import firebase from 'firebase'
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

    handleSignout = () => {
        const vm = this;
        vm.setState({
            user: null,
            type: null
        });
        localStorage.setItem('type', null);
        firebase.auth().signOut();
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
        const styles= {
            img :{
                paddingTop:8
            }
        };
        return (
            <div>
                <AppBar title={<span><img src={require("./img/rmit-logo-red.png")} width={50} height={50} style={styles.img}/><text>RMIT Univeristy</text></span>}
                        onLeftIconButtonTouchTap={this.drawerOpen}
                        showMenuIconButton={this.props.user!=null}
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
                                <MenuItem primaryText="Sign out" onTouchTap={this.handleSignout}/>
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