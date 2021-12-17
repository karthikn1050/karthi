import React, { Component } from 'react';

import { MDBDataTable, Row, Col, Card, CardBody } from 'mdbreact';

import axios from 'axios';

const url = 'http://localhost:8080/items';


class TableSectionInbound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
            tableRows: [],

        };

    }

    componentWillMount = async () => {
        await axios.get(url)
            .then(response => response.data)
            .then(data => {
                // console.log(data);
                // if (err) throw err;
                this.setState({ posts: data })
            })
            .then(async () => {
                this.setState({ tableRows: this.assemblePosts(), isLoading: false })

                console.log(this.state.tableRows);
            });

    }


    assemblePosts = () => {
        let posts = this.state.posts.map((post) => {
            return (
                {

                    number: post.ID,

                    title: post.ItemName,

                    user: post.Status,

                    body: post.Date,

                }

            )

        });

        return posts;

    }


    render() {
        const data = {
            columns: [

                {

                    label: 'ID',

                    field: 'number',

                },

                {

                    label: 'ItemName',

                    field: 'title',

                },

                {

                    label: 'Status',

                    field: 'user',

                },

                {

                    label: 'Date',

                    field: 'body',

                },

            ],

            rows: this.state.tableRows,

        }

        return (

            <Row className="mb-4">

                <Col md="12">

                    <Card>

                        <CardBody>

                            <MDBDataTable

                                striped

                                bordered

                                hover

                                data={data}

                            />

                        </CardBody>

                    </Card>

                </Col>

            </Row>

        )

    }

}




export default TableSectionInbound;