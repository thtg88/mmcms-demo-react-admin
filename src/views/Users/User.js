import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table
} from 'reactstrap';
import getApiErrorMessages from '../../helpers/getApiErrorMessages';

class User extends Component {
    render() {
        const { resources } = this.props;

        const user = resources.find( user => user.id.toString() === this.props.match.params.id)

        const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardHeader>
                                <strong>
                                    <i className="fa fa-user"></i>
                                    {" "}
                                    User id: {this.props.match.params.id}
                                </strong>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped hover>
                                    <tbody>
                                        {userDetails.map(([key, value]) => (<tr key={key}>
                                            <td>{`${key}:`}</td>
                                            <td><strong>{typeof value === 'object' && value !== null ? value.name : value}</strong></td>
                                        </tr>))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const errors = getApiErrorMessages(state.users.error);
    const role_errors = getApiErrorMessages(state.roles.error);
    return {
        errors: errors,
        current_page: state.users.current_page,
        resources: state.users.resources,
        role_errors: role_errors,
        roles: state.roles.resources,
        token: state.auth.token,
        total_resources: state.users.total_resources
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAllRoles(data) {
        dispatch({
            type: 'GET_ALL_ROLES_REQUEST',
            payload: data
        })
    },
    getUser(data) {
        dispatch({
            type: 'GET_USER_REQUEST',
            payload: data
        })
    },
    updateUser(data) {
        dispatch({
            type: 'UPDATE_USER_REQUEST',
            payload: data
        })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
