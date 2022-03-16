import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate('/search/'+keyword)
        } else {
            navigate('/')
        }
    }

  return (
    <Form onSubmit={submitHandler} style={{ display: "flex" }}>

        <Form.Control type='text' name='q' 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder="Search Products..."
            className='me-sm-2 ms-sm-2'>
        </Form.Control>

        <Button type='submit' variant='outline-danger' className='p-2'>
            Search
        </Button>

    </Form>
  )
}

export default SearchBox