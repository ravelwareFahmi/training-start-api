import React, { Suspense, useState } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
// routesAdmin config
import Spinner from 'src/component/molecules/Spinner'
import { roleRoutes } from 'src/reusableFunction/CheckPrivileges'

const TheContent = () => {
  const [login] = useState(true)
  const [userNow] = useState('admin')

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={<Spinner />}>
          <Switch>
            { roleRoutes(userNow).map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    login ? 
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                      :
                      <Redirect from="/" to="/login" />
                    )} />
                )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
