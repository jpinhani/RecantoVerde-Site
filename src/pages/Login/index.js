import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Input, Button, message, Spin } from 'antd'
import Remember from './../RecuperarPsw'
import axios from 'axios'

import { login } from '../../auth'
import { urlBackend } from '../../services/urlBackEnd'
import './styles.scss'

function Login() {

  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [spin, setSpin] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()
    setSpin(true)
    const endpoint = `${urlBackend}api/authenticate`
    console.log(endpoint, 'testeendpoint')

    const body = {
      email: email,
      password: password
    }

    //const response = await axios.post(endpoint, body)

    // if (response.data.status === 401)
    //   message.error('Conta Cancelada', 10)

    // else if (response.data.status !== 400) {

    // const token = response.data.token
    // const userId = response.data.user

    const token = 10
    const userId = body.email

    login(userId, token)
    console.log(userId, token)
    setSpin(false)
    history.push('/Home')

    // } else {
    //   message.error('Usuário ou Senha não reconhecida', 5)
    //   setSpin(false)
    // }
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>

        <h1><span className='logoheaderLogin'>Recanto Verde</span></h1>

        <div>
          <Input
            type='email'
            placeholder="Seu melhor e-mail"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type='password' placeholder="Sua senha"
            onChange={e => setPassword(e.target.value)}
          />
          <div className="CustomLinksHeader">

            <div className="CustomLinks">
              <Remember />
            </div>
            <div>
              <Button className='blogar' htmlType='submit'><p> Entrar</p></Button>
            </div>
          </div>
          {/* <Button className='blogar' htmlType='submit'><p> Entrar</p></Button> */}
          <Spin size="large" spinning={spin} />
        </div>
      </form>
    </div>
  )
}

export default Login