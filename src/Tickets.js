import React from 'react';
import Editor from "./Editor";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400} />
    </IconButton>
);

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
    </IconMenu>
);

const Tickets = () => (
    <div>
        <List  style={{backgroundColor: darkBlack}}>
            <Subheader>Tickets</Subheader>
            <ListItem
                leftAvatar={<Avatar src="images/ok-128.jpg" />}
                rightIconButton={rightIconMenu}
                primaryText="Brendan Lim"
                secondaryText={
                    <p>
                        <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
                        I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                    </p>
                }
                secondaryTextLines={2}
            />
            <Divider inset={true} />
        </List>

        {/*Editor*/}
        <Editor/>
    </div>
);

export default Tickets;