import React, { PropTypes } from 'react'
import { ExercisePanel, Message } from 'components'
import RoutineEditorHeader from './RoutineEditorHeader'
import SetList from './SetList'
import styled from 'styled-components'

const { func, string, bool, array, object } = PropTypes
const propTypes = {
  onExerciseClick: func.isRequired,
  onChangeRoutineName: func.isRequired,
  onDeleteRoutineClick: func.isRequired,
  onDeleteRoutineConfirm: func.isRequired,
  onDeleteRoutineCancel: func.isRequired,
  onSaveRoutineClick: func.isRequired,
  onDeleteSetClick: func.isRequired,
  routine: object,
  isLoading: bool.isRequired,
  setsLoading: bool.isRequired,
  isDeleteRoutineConfirmOpen: bool.isRequired,
  info: string,
  errors: array.isRequired,
  sets: array.isRequired
}

const ExercisePanelOffset = styled.div`
  padding-left: 420px;
`

const Container = styled.div`
  padding: 25px 30px;
`

function RoutineEditor (props) {
  const {
    onExerciseClick,
    onChangeRoutineName,
    onDeleteRoutineClick,
    onDeleteRoutineConfirm,
    onDeleteRoutineCancel,
    onSaveRoutineClick,
    onDeleteSetClick,
    isLoading,
    setsLoading,
    routine,
    isDeleteRoutineConfirmOpen,
    info,
    errors,
    sets
  } = props

  return (
    <div>
      <ExercisePanel onExerciseClick={onExerciseClick} />

      <ExercisePanelOffset>
        <Container>
          <RoutineEditorHeader
            onChangeRoutineName={onChangeRoutineName}
            onDeleteRoutineClick={onDeleteRoutineClick}
            onDeleteRoutineConfirm={onDeleteRoutineConfirm}
            onDeleteRoutineCancel={onDeleteRoutineCancel}
            onSaveRoutineClick={onSaveRoutineClick}
            routine={routine}
            isDeleteRoutineConfirmOpen={isDeleteRoutineConfirmOpen}
            isLoading={isLoading}
          />

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
            isLoading={setsLoading}
          />
        </Container>
      </ExercisePanelOffset>
    </div>
  )
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
