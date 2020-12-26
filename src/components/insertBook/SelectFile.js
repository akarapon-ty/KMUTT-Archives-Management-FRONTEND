import React from 'react'

import DragAndDrop from './DragAndDrop'
import { DefaultOcrPage, InputPageStart } from './styleDragAndDrop'

const SelectFile = (props) => {
  const { handlerStartPage, startPage } = props

  return (
    <>
      <h4>1. Select file pdf to OCR</h4>
      <DragAndDrop />
      <DefaultOcrPage>
        <p>Start OCR at page :</p>
        <InputPageStart type="number" name="startPage" min="1" defaultValue={startPage} onChange={(e) => handlerStartPage(e)} />
      </DefaultOcrPage>
    </>
  )
}

export default SelectFile