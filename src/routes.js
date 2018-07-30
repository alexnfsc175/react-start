import React from "react";
import { isAuthenticated } from './auth';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Button from './components/Buttons/Animated/Animated'
import Box from './components/Buttons/Animated/Box';
// import Column from './components/Buttons/Animated/Column';
import Text from './components/Buttons/Animated/Text';
import PropTypes from 'prop-types';
// https://pinterest.github.io/gestalt/#/Button
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        isAuthenticated() ? (
            <Component {...props} />
        ) : (

                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
    } />
);

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.object
};



const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={() => (
                <Box color="darkGray" maxWidth={320} shape="rounded" padding={4}>
                    <Box marginBottom={4}>
                        <Text color="white">
                            Explore today’s trending ideas, curated finds, and personalized
                            picks.
                    </Text>
                    </Box>
                    <Box display="flex" direction="row" marginLeft={-2} marginRight={-2}>
                        <Box display="flex" direction="row" column={6} paddingX={2}>
                            <Button color="transparent" text="Later" />
                        </Box>
                        <Box column={6} paddingX={2}>
                            <Button color="white" text="Learn more" />
                        </Box>
                    </Box>
                </Box>)} />
            <PrivateRoute path="/app" component={() => (<h1>Você está logado!</h1>)} />
        </Switch>
    </Router>
);

export default Routes;