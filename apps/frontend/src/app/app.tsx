import React, { useMemo } from 'react';

import { theme } from './theme';
import { Route, Redirect, Switch, Router } from 'react-router';
import { ThemeProvider } from '@material-ui/styles';

import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react-lite';
import { syncHistoryWithStore } from 'mobx-react-router';
import { useStores } from './stores';
import { Main } from './scenes/main';
import { Sight } from './scenes/sight';
import { Routes } from '@mogilev-guide/frontend/scenes/routes';
import { Map } from './scenes/map';

const browserHistory = createBrowserHistory();

export const App: React.FC = observer(() => {
  const { routerStore } = useStores();

  const history = useMemo(
    () => syncHistoryWithStore(browserHistory, routerStore),
    [routerStore]
  );

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/sight/:sightId" component={Sight} />
          <Route exact path="/routes" component={Routes} />
          <Route exact path="/map" component={Map} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
});
