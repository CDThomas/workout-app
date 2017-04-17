import React, { PropTypes } from 'react'
import { ExercisePanel, Message } from 'components'
import RoutineEditorHeader from './RoutineEditorHeader'
import SetList from './SetList'
import styled from 'styled-components'

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
    onCreateRoutineClick,
    onDeleteSetClick,
    isLoading,
    routineName,
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
            onCreateRoutineClick={onCreateRoutineClick}
            routineName={routineName}
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
            isLoading={isLoading}
          />
        </Container>
      </ExercisePanelOffset>
    </div>
  )
}
RoutineEditor.propTypes = propTypes

export default RoutineEditor
