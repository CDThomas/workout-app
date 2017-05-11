import React, { PropTypes } from 'react'
import { ExercisePanel, Message } from 'components'
import RoutineEditorHeader from './RoutineEditorHeader'
import { SetListContainer } from 'containers'
import styled from 'styled-components'

const { func, string, bool, array, object } = PropTypes
const propTypes = {
  onExerciseClick: func.isRequired,
  onChangeRoutineName: func.isRequired,
  onDeleteRoutineClick: func.isRequired,
  onDeleteRoutineConfirm: func.isRequired,
  onDeleteRoutineCancel: func.isRequired,
  onSaveRoutineClick: func.isRequired,
  routine: object,
  isLoading: bool.isRequired,
  isDeleteRoutineConfirmOpen: bool.isRequired,
  info: string,
  errors: array.isRequired
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
    isLoading,
    routine,
    isDeleteRoutineConfirmOpen,
    info,
    errors
  } = props
  const setIds = routine ? routine.setIds : []

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

          <SetListContainer setIds={setIds} />
        </Container>
      </ExercisePanelOffset>
    </div>
  )
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
