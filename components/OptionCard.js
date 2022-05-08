import { Card, Columns } from "react-bulma-components";
import React from 'react';

export default class OptionCard extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = props.onClick;
        this.app = props.app;
        this.state = {
            //content: props.option[+!!props.inverted],
            option: props.option
        }
    }

    isCorrectAnswer = () => this.app.state.answer === this.state.option[0]

    render() {
        return <Columns.Column size="one-third" className="clickable" onClick={() => this.onClick(this.state.option)}>
            <Card className={`has-text-${this.app.state.hasAnswered ? this.isCorrectAnswer() ? 'success' : 'danger' : 'white'}`}>
                <Card.Content className="has-text-centered">
                    {this.state.option[0]}
                    {this.app.state.hasAnswered ? <><br/>{this.state.option[1]}</> : <><br/><br/></>}
                </Card.Content>
            </Card>
        </Columns.Column>
    }
    
}