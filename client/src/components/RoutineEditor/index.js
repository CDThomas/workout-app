import React, { PropTypes } from 'react'
import {
  ExercisePanel,
  SetList,
  Button,
  Message,
  ConfirmDialog
} from 'components'
import classNames from 'classnames'
import './styles.css'

const { func, string, bool, array } = PropTypes
const propTypes = {
  onExerciseClick: func.isRequired,
  onChangeRoutineName: func.isRequired,
  onDeleteRoutineClick: func.isRequired,
  onDeleteRoutineConfirm: func.isRequired,
  onDeleteRoutineCancel: func.isRequired,
  onCreateRoutineClick: func.isRequired,
  onDeleteSetClick: func.isRequired,
  routineName: string.isRequired,
  isLoading: bool.isRequired,
  isDeleteRoutineConfirmOpen: bool.isRequired,
  info: string.isRequired,
  errors: array.isRequired,
  sets: array.isRequired
}

function RoutineEditor (props) {
  const {
    onExerciseClick,
    onChangeRoutineName,
    onDeleteRoutineClick,
    onDeleteRoutineConfirm,
    onDeleteRoutineCancel,
    onCreateRoutineClick,
    onDeleteSetClick,
    isLoading,
    routineName,
    isDeleteRoutineConfirmOpen,
    info,
    errors,
    sets
  } = props

  const nameInputClass = classNames('RoutineEditor__routineNameInput', {
    'RoutineEditor__routineNameInput--disabled': isLoading
  })

  return (
    <div className='RoutineEditor'>
      <ExercisePanel onExerciseClick={onExerciseClick} />

      <div className='RoutineEditor__exercisePanelOffset'>
        <div className='RoutineEditor__container'>
          <div className='RoutineEditor__header'>
            <input
              className={nameInputClass}
              type='text'
              onChange={onChangeRoutineName}
              value={routineName}
              disabled={isLoading}
            />
            <div className='RoutineEditor__controls'>
              <Button
                onClick={onDeleteRoutineClick}
                color='red'
                disabled={isLoading}
              >
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
              <Button
                className='RoutineEditor__saveButton'
                onClick={onCreateRoutineClick}
                disabled={isLoading}
              >
                Save Routine
              </Button>
            </div>
          </div>

          {info &&
            <Message success>
              {info}
            </Message>}

          {errors &&
            errors.length > 0 &&
            <Message error>
              {errors.map(e => e.message).join('. ')}
            </Message>}
          <SetList
            sets={sets}
            onDeleteSetClick={onDeleteSetClick}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
