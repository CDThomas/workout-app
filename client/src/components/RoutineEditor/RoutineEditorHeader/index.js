import React, { PropTypes } from 'react'
import { Button, ConfirmDialog } from 'components'
import styled, { css } from 'styled-components'

const { func, bool, object } = PropTypes
const propTypes = {
  onChangeRoutineName: func.isRequired,
  onDeleteRoutineClick: func.isRequired,
  onDeleteRoutineConfirm: func.isRequired,
  onDeleteRoutineCancel: func.isRequired,
  onSaveRoutineClick: func.isRequired,
  routine: object,
  isLoading: bool.isRequired,
  isDeleteRoutineConfirmOpen: bool.isRequired
}

function disable () {
  return css`
    opacity: .45;
    pointer-events: none;
    cursor: default;
  `
}

const RoutineNameInput = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid #5f5f5f;
  font-size: 24px;
  color: #5f5f5f;
  padding: 0 0 2px 0;
  ${props => (props.disabled ? disable() : '')}

  &:focus {
    outline: none;
  }
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const SaveButton = styled(Button)`
  margin-left: 10px;
`

function RoutineEditorHeader (props) {
  const {
    onChangeRoutineName,
    routine,
    isLoading,
    onDeleteRoutineClick,
    isDeleteRoutineConfirmOpen,
    onDeleteRoutineConfirm,
    onDeleteRoutineCancel,
    onSaveRoutineClick
  } = props

  return (
    <Header>
      <RoutineNameInput
        type='text'
        onChange={onChangeRoutineName}
        value={routine ? routine.name : ''}
        disabled={isLoading}
      />
      <div>
        <Button onClick={onDeleteRoutineClick} color='red' disabled={isLoading}>
          Delete Routine
        </Button>
        <ConfirmDialog
          text='Are you sure you want to delete this routine?'
          confirmButtonText='Delete'
          confirmButtonColor='red'
          isOpen={isDeleteRoutineConfirmOpen}
          onConfirm={onDeleteRoutineConfirm}
          onCancel={onDeleteRoutineCancel}
          onRequestClose={onDeleteRoutineCancel}
        />
        <SaveButton onClick={onSaveRoutineClick} disabled={isLoading}>
          Save Routine
        </SaveButton>
      </div>
    </Header>
  )
}
RoutineEditorHeader.propTypes = propTypes

export default RoutineEditorHeader
