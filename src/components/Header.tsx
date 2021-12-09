import React from 'react'
import {Container} from "@material-ui/core";

//The heading for the app
const Header = () => {
    return (
        <Container maxWidth="sm">
            <h1 className="Header">Task Manager</h1>
        </Container>
    )
}
export default Header
