import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

const content404 = `# Oh no ! Page not found :(

Unfortunately, you hit a dead link, please hit the back button.`

const NotFoundPageMaker = Page => () => {
  return <Page
    pageData={{ sticky: false }}
    route={{
      toc: {},
      content: content404
    }} />
}


class Routes extends Component {
  route = ({ items = [], ...data }) => {
    const {
      pageData,
      componentPage: Page,
    } = this.props

    return [
      items.map(this.route),
      data.input && [
        <Route
          exact
          strict
          key={`route-${data.url}`}
          path={data.url}
          render={({ staticContext }) => (
            <Page
              pageData={pageData}
              route={staticContext || data}
            />
          )}
        />,
        data.url !== '/' &&
          <Redirect
            exact
            strict
            key={`redirect-${data.url}`}
            from={data.url.slice(0, -1)}
            to={data.url}
          />,
        data.url !== '/' &&
          <Redirect
            exact
            strict
            key={`redirect-${data.url}-md`}
            from={data.url.slice(0, -1) + '.md'}
            to={data.url}
          />,
      ],
    ]
  }

  render () {
    const { componentPage: Page } = this.props
    const NotFoundPage = NotFoundPageMaker(Page)
    const {
      manifest,
    } = this.props
    const routes = this.route(manifest)
    return (
      <Switch>
        {routes}
        <Route component={NotFoundPage} />
      </Switch>
    )
  }
}

Routes.propTypes = {
  manifest: PropTypes.object.isRequired,
  componentPage: PropTypes.func.isRequired,
  component404: PropTypes.func.isRequired,
  pageData: PropTypes.object.isRequired,
}

export default Routes
