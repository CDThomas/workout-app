import React, { PropTypes } from 'react'
import { Modal, Panel, Button, Title } from 'components'
import './styles.css'

const { bool, func, string, oneOf } = PropTypes
const propTypes = {
  isOpen: bool,
  text: string,
  confirmButtonText: string,
  confirmButtonColor: oneOf(['blue', 'white', 'red']),
  onRequestClose: func,
  onConfirm: func,
  onCancel: func
}

const defaultProps = {
  text: 'Are you sure?',
  confirmButtonColor: 'blue',
  confirmButtonText: 'Yes'
}

function ConfirmDialog (props) {
  const {
    isOpen,
    text,
    onRequestClose,
    onConfirm,
    onCancel,
    confirmButtonColor,
    confirmButtonText
  } = props

  return (
    <Modal
      isOpen={isOpen}
      contentLabel='Confirmation dialog'
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
              color={confirmButtonColor}
            >
              {confirmButtonText}
            </Button>
          </div>
        </Panel.Content>
      </Panel>
    </Modal>
  )
}
ConfirmDialog.propTypes = propTypes
ConfirmDialog.defaultProps = defaultProps

export default ConfirmDialog
