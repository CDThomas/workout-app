import React, { PropTypes } from 'react'
import { Modal, Panel, Button, Title } from 'clientApp/components'
import './styles.css'

const { bool, func, string } = PropTypes
const propTypes = {
  isOpen: bool,
  text: string,
  onRequestClose: func,
  onConfirm: func,
  onCancel: func
}

function ConfirmDialog (props) {
  const {
    isOpen,
    text,
    onRequestClose,
    onConfirm,
    onCancel
  } = props

  return (
    <Modal
      isOpen={isOpen}
      contentLabel='Modal2'
      onRequestClose={onRequestClose}
    >
      <Panel>
        <Panel.Header>
          <Title>
            {text}
          </Title>
        </Panel.Header>
        <Panel.Content>
          <div className='ConfirmDialog__buttonWrapper'>
            <Button
              color='white'
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className='ConfirmDialog__confirmButton'
              onClick={onConfirm}
            >
              Yes
            </Button>
          </div>
        </Panel.Content>
      </Panel>
    </Modal>
  )
}
ConfirmDialog.propTypes = propTypes

export default ConfirmDialog
