import React from 'react'
import { useQuery, gql } from '@apollo/client'

import DefaultLayoutStyle from '../../components/util/LayoutStyle'
import { Topic, ContentDiv } from './style'
import StatusCard from '../../components/util/statusCard/StatusCard'

const Status = () => {
  const test = 'test'
  return (
    <DefaultLayoutStyle>
      <Topic>STATUS UPLOAD</Topic>
      <ContentDiv>
        <StatusCard />
      </ContentDiv>
    </DefaultLayoutStyle>
  )
}

export default Status