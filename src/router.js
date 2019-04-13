import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import BoxDetail from './pages/BoxDetail';

/*não usa exact na rota de box, pois tem ids diferentes */
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/box/:id" component={BoxDetail}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;