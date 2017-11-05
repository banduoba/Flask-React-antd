import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Spin, Select, Divider } from 'antd';

import styles from './NewsBoard.less';

@connect(state => ({
  githubNews: state.spider.githubNews,
  toutiaoNews: state.spider.toutiaoNews,
  hackerNews: state.spider.hackerNews,
  segmentNews: state.spider.segmentNews,
  jobboleNews: state.spider.jobboleNews,
}))
export default class NewsBoard extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      newsFetched: this.props.githubNews
    }
  }

  componentDidMount() {
    this.state.newsFetched = this.props.githubNews;
    this.props.dispatch({
      type: 'spider/fetchGithubNews',
    });
    this.props.dispatch({
      type: 'spider/fetchHackerNews',
    });
    this.props.dispatch({
      type: 'spider/fetchSegmentNews',
    });
    this.props.dispatch({
      type: 'spider/fetchToutiaoNews',
    });
    this.props.dispatch({
      type: 'spider/fetchJobboleNews',
    });
  }

  componentWillUnmount() {
  }

  handleChange(value) {
    switch (value) {
      case 'Github':
        this.state.newsFetched = this.props.githubNews;
        this.props.dispatch({
          type: 'spider/fetchGithubNews',
        });
        break;
      case 'Hacker News':
        this.state.newsFetched = this.props.hackerNews;
        this.props.dispatch({
          type: 'spider/fetchHackerNews',
        });
        break;
      case 'Segment Fault':
        this.state.newsFetched = this.props.segmentNews;
        this.props.dispatch({
          type: 'spider/fetchSegmentNews',
        });
        break;
      case '开发者头条':
        this.state.newsFetched = this.props.toutiaoNews;
        this.props.dispatch({
          type: 'spider/fetchToutiaoNews',
        });
        break;
      case '伯乐头条':
        this.state.newsFetched = this.props.jobboleNews;
        this.props.dispatch({
          type: 'spider/fetchJobboleNews',
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <Card title="信息聚合阅读">
          <Select defaultValue="Github" style={{ width: 160 }} onChange={this.handleChange}>
            <Select.Option value="Github">Github</Select.Option>
            <Select.Option value="Hacker News">Hacker News</Select.Option>
            <Select.Option value="Segment Fault">Segment Fault</Select.Option>
            <Select.Option value="开发者头条">开发者头条</Select.Option>
            <Select.Option value="伯乐头条">伯乐头条</Select.Option>
          </Select>
          {this.state.newsFetched.data ? (
            <ul>
            {
              this.state.newsFetched.data.map((post, i) => {
                return (
                  <div key={i}>
                      <a href={post.url} target="_blank">{post.title}</a>
                    {
                      post.desc ?
                        <div>
                          <div>
                            <p>{post.desc}</p>
                          </div>
                        </div>
                        : null
                    }
                    <Divider style={{ marginBottom: 32 }} />
                  </div>
                );
              }, this)
            }
            </ul>) : <Spin size="small" style={{ marginLeft: 8 }} />}
        </Card>
      </div>
    );
  }
}
