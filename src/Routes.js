import { object } from 'prop-types';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router/immutable';

import Login from './containers/Login';
import Main from './containers/Main';

function Routes({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Main} />
      </Switch>
    </ConnectedRouter>
  );
}

Routes.propTypes = {
  history: object.isRequired
};

export default Routes;
