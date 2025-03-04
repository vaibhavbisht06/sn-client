import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Icon } from '@sensenet/icons-react'
import React from 'react'
import { connect } from 'react-redux'
import * as DMSActions from '../../Actions'
import { resources } from '../../assets/resources'
import { rootStateType } from '../../store/rootReducer'
import RemoveUserFromGroupDialog from '../Dialogs/RemoveUserFromGroupDialog'
import GroupSelector from './GroupSelector/GroupSelector'

const styles = {
  appbar: {
    background: 'transparent',
    boxShadow: 'none',
    padding: '0 12px',
    borderBottom: 'solid 1px #fff',
  },
  toolbar: {
    padding: 0,
    minHeight: 36,
  },
  toolbarAdmin: {
    padding: 0,
    minHeight: 64,
  },
  title: {
    flexGrow: 1,
    color: '#666',
    fontFamily: 'Raleway SemiBold',
    fontSize: 18,
    textTransform: 'uppercase',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  button: {
    fontSize: 15,
    fontFamily: 'Raleway SemiBold',
  },
  buttonRaised: {
    fontSize: 14,
    fontFamily: 'Raleway ExtraBold',
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
}

const mapStateToProps = (state: rootStateType) => {
  return {
    isAdmin: state.dms.usersAndGroups.user.isAdmin,
    groups: state.dms.usersAndGroups.group.selected,
    user: state.dms.usersAndGroups.user.currentUser || null,
  }
}

const mapDispatchToProps = {
  openDialog: DMSActions.openDialog,
  closeDialog: DMSActions.closeDialog,
}

class GroupListToolbar extends React.Component<ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps, {}> {
  public handleClick = () => {
    this.props.openDialog(
      <RemoveUserFromGroupDialog user={this.props.user} groups={this.props.groups} />,
      resources.DELETE,
      this.props.closeDialog,
    )
  }
  public render() {
    return (
      <AppBar position="static" style={styles.appbar}>
        <Toolbar style={this.props.isAdmin ? styles.toolbarAdmin : styles.toolbar}>
          <Typography variant="h6" color="inherit" noWrap={true} style={styles.title as any}>
            {resources.GROUPS}
          </Typography>
          {this.props.isAdmin ? (
            <div>
              <GroupSelector />
              <Button color="primary" style={styles.button} onClick={() => this.handleClick()}>
                <Icon iconName="delete" style={styles.icon} />
                {resources.REMOVE_FROM_SELECTED_GROUPS}
              </Button>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupListToolbar)
