import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import PublicRoute from './PublicRoutes'
import PrivateRoute from './PrivateRoutes'

import Home from '../pages/Home/'
import Login from '../pages/Login/'
import SelectProprietario from '../pages/SelectProprietario'
import SelectLote from '../pages/SelectLote'

import Navebar from '../pages/Navebar/index.js'
import NavebarMObile from '../pages/NavebarMobile/index.js'
import Header from '../pages/Header/index.js'

const { Content } = Layout;

class routesRecanto extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 0
    }
  }

  resolucao() {
    const width = window.screen.width;
    this.setState({ ...this.state, width: width })
  }

  componentDidMount() {
    this.resolucao()
  }

  render() {
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }} >
          {this.state.width <= 850 ? <NavebarMObile /> : <Navebar />}
          <Layout>
            <Header />
            <Content
              style={{ padding: '30px' }}>
              <Switch name='http://localhost:3000'>
                <PublicRoute restricted={true} exact path='/login' component={Login} />
                <PrivateRoute exact path='/selectlotes' component={SelectLote} />
                <PrivateRoute exact path='/selectproprietarios' component={SelectProprietario} />
                <PrivateRoute component={Home} />
              </Switch>
            </Content>
          </Layout>
        </Layout >
      </BrowserRouter >)
  }
}


export default routesRecanto

