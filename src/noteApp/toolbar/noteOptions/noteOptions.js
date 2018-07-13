import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Modal, Header, Button } from 'semantic-ui-react';


class NoteOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCopy = () => {
    const { note } = this.props;
    this.props.copyNote(note);
  }

  handleDelete = () => {
    const { note } = this.props;
    this.props.deleteNote(note);
    this.handleClose();
  }

  handleOpen = () => { this.setState({ deleteModalOpen: true }); }
  handleClose = () => { this.setState({ deleteModalOpen: false }); }

  render() {
    return (
      <Dropdown className="icon" icon="content" color="grey" floating basic>
        <Dropdown.Menu>
          <Dropdown.Item icon="share alternate" text="Share" disabled />
          <Dropdown.Item
            icon="copy"
            text="Duplicate"
            onClick={this.handleCopy}
          />
          <Dropdown.Item icon="external square" text="Export" disabled />
          <Dropdown.Divider />
          <Dropdown.Item icon="save" text="Save new version" disabled />
          <Dropdown.Item icon="undo alternate" text="Revert to previous version" disabled />
          <Dropdown.Divider />
          <Dropdown.Item icon="info circle" text="Information" disabled />
          <Modal
            trigger={
              <Dropdown.Item
                icon="trash"
                text="Delete"
                onClick={this.handleOpen}
              />
            }
            open={this.state.deleteModalOpen}
            onClose={this.handleClose}
            basic
            size="small"
          >
            <Header
              icon="trash"
              content={
                `Delete ${this.props.note.title ? `"${this.props.note.title}"` : 'untitled'} note?`
              }
            />
            <Modal.Content>
              <p>Are you sure you want to delete this note? (This action cannot be undone)</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleClose} basic color="grey" inverted>
                <Icon name="remove" /> Cancel
              </Button>
              <Button color="red" onClick={this.handleDelete} inverted>
                <Icon name="remove" /> Delete
              </Button>
            </Modal.Actions>
          </Modal>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

NoteOptions.propTypes = {
  note: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  copyNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

NoteOptions.defaultProps = {
  note: {},
  copyNote: null,
  deleteNote: null,
};

export default NoteOptions;