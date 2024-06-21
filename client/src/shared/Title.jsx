import React, { memo } from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({ title = 'We-Chat', description='This is the Chat App', newMessagesCount = 0 }) => {
  return (
    <Helmet>
      {newMessagesCount>0 ? 
        <title>{ `(${newMessagesCount}) ` + title }</title>
        :
        <title>{ title }</title>
      }
        <meta name='description' content={description} />
    </Helmet>
  )
}

export default memo(Title)