import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Form, Card, Spin, Button, Divider, Table, Icon, Avatar } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Articles.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 150,
  render: () => <Avatar shape="square" size="large" icon="user" />,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  render: () => (
    <div>
      <p>ann86</p>
      <p>some description</p>
    </div>
  )
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
  width: 360
}];
const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

@connect(state => ({
  currentUser: state.user.currentUser,
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class Articles extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newsType: 'Github'
    }
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'spider/fetchGithubNews',
    // });
  }

  componentWillUnmount() {
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'blog/articleSubmit',
            payload: values,
          });
        }
      }
    );
  }

  render() {

    const { currentUser, submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="文章列表">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="在想些什么呢:"
            >
              {getFieldDecorator('body', {
                rules: [{
                  required: true, message: '请输入想法',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入你的想法" rows={4} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
          <Divider style={{ margin: '40px 0 24px' }} />
          <Table showHeader={false} columns={columns} dataSource={data} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
