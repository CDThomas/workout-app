import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as setsActionCreators from 'redux/modules/sets'
import { values } from 'lodash'
import { SetList } from 'components'

class SetListContainer extends Component {
  static propTypes = {
    setIds: PropTypes.array.isRequired,
    sets: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    deleteSet: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.handleDeleteSetClick = this.handleDeleteSetClick.bind(this)
  }

  handleDeleteSetClick (set, routineId) {
    this.props.deleteSet(set, routineId)
  }

  render () {
    const { sets, isLoading } = this.props

    return (
      <SetList
        sets={sets}
        onDeleteSetClick={this.handleDeleteSetClick}
        isLoading={isLoading}
      />
    )
  }
}

function mapStateToProps ({ sets, unsavedSets, ui }, ownProps) {
  const { setIds } = ownProps
  const savedSets = setIds.map(setId => sets[setId])
  const unsavedSetsArr = values(unsavedSets)

  return {
    sets: [...savedSets, ...unsavedSetsArr],
    isLoading: ui.sets.isLoading
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(setsActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SetListContainer)
